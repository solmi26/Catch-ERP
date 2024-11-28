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
	
	@Override
	public List<SalesVO> salesList() {
		return salesMapper.selectAllSalesList();
	}

	@Override
	public List<PayablesVO> payablesList() {
		return salesMapper.payablesList();
	}

	@Override
	public List<SalesVO> receivablesList() {
		return salesMapper.receivablesList();
	}

	@Override
	public List<SalesVO> invoiceList() {
		return salesMapper.invoiceList();
	}
	
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
	    salesMapper.updateSalesSlipState(salesVO.getSaleslipNo());
	        
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
	
	// 매출, 매입 전표 삭제
	@Override
	public void deleteSlip(List<SalesVO> salesVO) {
		salesVO.forEach((data) -> {if(data.getType().equals("매출전표")) {
			salesMapper.deleteSales(data.getSalesChitNo());
		}else {
			salesMapper.deletePurchase(data.getSalesChitNo());
		}
		});
		
	}
	
	@Override
	public SalesVO saleInfo(SalesVO salesVO) {
		return null;
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
	public int updateInvoice(SalesVO salesVO) {
		return 0;
	}


	@Override
	public int deletePayable(int recLogId) {
		return 0;
	}

	@Override
	public int deleteReceivable(int logId) {
		return 0;
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
