package com.cherp.app.acct.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cherp.app.acct.mapper.SalesMapper;
import com.cherp.app.acct.service.SalesService;
import com.cherp.app.acct.vo.InsertPayableVO;
import com.cherp.app.acct.vo.InsertReceivableVO;
import com.cherp.app.acct.vo.PayablesVO;
import com.cherp.app.acct.vo.SalesVO;

/**
 * 매출 ServiceImpl
 */
@Service
public class SalesServiceImpl implements SalesService{
	private SalesMapper salesMapper;
	
	public SalesServiceImpl(SalesMapper salesMapper) {
		this.salesMapper = salesMapper;
	}
	
	// 매출 전표 전체 조회 // by sm
	@Override
	public List<SalesVO> salesList() {
		return salesMapper.selectAllSalesList();
	}
	
	// 매입전표 전체 조회 // by sm
	@Override
	public List<PayablesVO> payablesList() {
		return salesMapper.payablesList();
	}
	
	@Override
	public List<SalesVO> receivablesList() {
		return salesMapper.receivablesList();
	}
	
	// 전자세금계산서 전체 조회 // by sm
	@Override
	public List<SalesVO> invoiceList() {
		return salesMapper.invoiceList();
	}
	
	// 매출, 매입전표 전체 조회 // by sm
	@Override
	public List<SalesVO> selectAllSlip() {
		return salesMapper.selectAllSlip();
	}
	
	@Transactional // 트랜잭션이 성공하면 커밋, 예외가 발생하면 롤백.
	@Override
	// 매출전표 등록 // by sm
	public void insertSale(SalesVO salesVO) {

	    // 매출 내역 추가
	    salesMapper.insertSale(salesVO); 
	    
	    // 채권 내역 추가
	    salesMapper.insertReceivable(salesVO);
	    
	    // 거래처 총 채권 잔액 업데이트
	    salesMapper.updateClientBalancek(salesVO.getClientCode(), salesVO.getTotalPrice());
	    
	    // 세금계산서 발행
	    salesMapper.insertInvoice(salesVO);
	    
	    // 매출 전표 인보이스 번호 추가
	    salesMapper.updateSalesInvoiceNo(salesVO);
	    
	    // 판매전표 전표 발행 상태 변경
	    salesMapper.updateSalesSlipState(salesVO.getSaleslipNo(), "r2");
	        
	}
	
	@Transactional // 트랜잭션이 성공하면 커밋, 예외가 발생하면 롤백.
	@Override
	// 매입전표 발행 // by sm
	public void insertPurchase(PayablesVO payblesVO) {
		
		// 매입 내역 추가
		salesMapper.insertPurchase(payblesVO);
		
		// 채무 내역 추가
		salesMapper.insertReceivableSM(payblesVO);
		
		// 거래처 총 채무 잔액 업데이트
		salesMapper.updateClientBalancem(payblesVO.getClientCode(), payblesVO.getTotalPrice());
		
		// 구매전표 발행 상태 변경
		salesMapper.updatePurchaseSlipState(payblesVO.getPurcslipNo());
	}
	
	// 회계 계정 조회 by sm
	@Override
	public List<SalesVO> acctList(String debitSide) {
		return salesMapper.selectAcctList(debitSide);
	}
	
	// 세금계산서 업데이트(발행상태, 국세청 전송 날짜) // by sm
	@Override
	public void updateInvoice(List<SalesVO> salesVO) {
		//int result = salesVO.stream().mapToInt((data) -> salesMapper.updateInvoice(data.getInvoiceNo())).sum();
		salesVO.forEach((data) -> {		
			System.out.println(data.getType());
			System.out.println(data.getInvoiceNo());
			if(data.getType().equals("now")) {
				salesMapper.updateInvoice(data.getInvoiceNo(), "f3");
			}else if(data.getType().equals("yet")){
				salesMapper.updateInvoice(data.getInvoiceNo(), "f2");
			}else {
				salesMapper.updateInvoice(data.getInvoiceNo(), "f1");
			}
		});

	}
	
	// 매출, 매입 전표 삭제 // by sm
	@Transactional // 트랜잭션이 성공하면 커밋, 예외가 발생하면 롤백.
	@Override
	public void deleteSlip(List<SalesVO> salesVO) {
		salesVO.forEach((data) -> {if(data.getType().equals("매출전표")) {
			SalesVO result = salesMapper.selectSales(data.getSalesChitNo());
			String clientCode = result.getClientNo();
			Integer totalPrice = -1 * (result.getTotalPrice());
			String invoiceNo = result.getInvoiceNo();
			String saleSlipNo = result.getSaleslipNo();
			
			// 매출전표 삭제
			salesMapper.deleteSales(data.getSalesChitNo());
			// 채권 삭제
			salesMapper.deleteReceivable(data.getSalesChitNo());
			// 거래처 총 잔액 수정
			System.out.println(data.getTotalPrice());
			salesMapper.updateClientBalancek(clientCode, totalPrice);
			// 세금계산서 삭제
			salesMapper.deleteInvoice(invoiceNo);
		    // 판매전표 전표 발행 상태 변경
		    salesMapper.updateSalesSlipState(saleSlipNo, "r1");
			
		}else {
			salesMapper.deletePurchase(data.getSalesChitNo());
		}
		});
		
	}
	
	// 매출전표 수정 // by sm
	@Transactional // 트랜잭션이 성공하면 커밋, 예외가 발생하면 롤백.
	@Override 
	public int updateSales(SalesVO salesVO) {
		return salesMapper.updateSales(salesVO);
	}
	
	// 매출전표 수정 // by sm
	@Transactional // 트랜잭션이 성공하면 커밋, 예외가 발생하면 롤백.
	@Override 
	public void updateSalesDI(List<SalesVO> salesVO) {
		// 기존 전표 삭제
		deleteSlip(salesVO);
		
		// 전표 재등록
		insertSale(salesVO.get(0));	
	}
	
	// 매입, 매출전표 상세 조회 // by sm
	@Override
	public SalesVO slipInfo(SalesVO salesVO) {
		if(salesVO.getType().equals("매출전표")) {
			return salesMapper.selectSales(salesVO.getSalesChitNo());
		}else {
			return salesMapper.selectPurchase(salesVO.getSalesChitNo());
		}
	}

	@Override
	public PayablesVO payableInfo(PayablesVO payablesVO) {
		return null;
	}

	@Override
	public SalesVO receivableInfo(SalesVO salesVO) {
		return null;
	}

	@Override
	public SalesVO invoiceInfo(SalesVO salesVO) {
		return null;
	}


	@Override
	public String insertPayable(InsertPayableVO insertPayableVO) {
		salesMapper.insertPayable(insertPayableVO);
		return insertPayableVO.getResult();
	}

	@Override
	public int insertReceivable(SalesVO salesVO) {
		return 0;
	}

	@Override
	public int insertInvoice(SalesVO salesVO) {
		return 0;
	}

	@Override
	public int updateSalesInvoiceNo(SalesVO salesVO) {
		return 0;
	}

	@Override
	public int updatePayable(PayablesVO payablesVO) {
		return 0;
	}

	@Override
	public int updateReceivable(SalesVO salesVO) {
		return 0;
	}


	@Override
	public int deletePayable(int recLogId) {
		return 0;
	}

	@Override
	public int deleteReceivable(String no) {
		return salesMapper.deleteReceivable(no);
	}

	@Override
	public int deleteInvoice(int invoiceNo) {
		return 0;
	}

	@Override
	public List<PayablesVO> ClientPayableList(String clientCode) {
		return salesMapper.SelectAllClientPayableList(clientCode);
	}

	@Override
	public List<SalesVO> ClientReceivableList(String clientCode) {
		return salesMapper.SelectAllClientReceivableList(clientCode);
	}
	

	@Override
	public String insertDecreaseReceivable(InsertReceivableVO insertReceivableVO) {
		salesMapper.insertDecreaseReceivable(insertReceivableVO);
		return insertReceivableVO.getResult();
	}
	
}
