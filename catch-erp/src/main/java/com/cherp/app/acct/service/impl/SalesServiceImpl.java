package com.cherp.app.acct.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cherp.app.acct.mapper.SalesMapper;
import com.cherp.app.acct.service.SalesService;
import com.cherp.app.acct.vo.InsertPayableVO;
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
	
	@Transactional // 트랜잭션이 성공하면 커밋, 예외가 발생하면 롤백.
	@Override
	// 매출전표 등록
	public void insertSale(SalesVO salesVO) {
//		try {
	        // 매출 내역 추가
	        int resultSale = salesMapper.insertSale(salesVO); 
//	        if (resultSale != 1) {
//	            throw new RuntimeException("매출 내역 추가 실패");
//	        }
//	        
	        // 채권 내역 추가
	        int resultRe = salesMapper.insertReceivable(salesVO);
//	        if (resultRe != 1) {
//	            throw new RuntimeException("채무 내역 추가 실패");
//	        }
	        
	        // 거래처 총 채권 잔액 업데이트
	        int resultUp = salesMapper.updateClientBalancek(salesVO.getClientCode(), salesVO.getTotalPrice());
//	        if (resultUp != 1) {
//	            throw new RuntimeException("거래처 총 잔액 업데이트 실패");
//	        }
//			}catch(Exception e) {
//				e.printStackTrace();
//			}
	        
	        // 세금계산서 발행
	        int resultIv = salesMapper.insertInvoice(salesVO);
	        
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
	public int updateSale(SalesVO salesVO) {
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
	public int deleteSale(int salesChitNo) {
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
	public List<SalesVO> acctList(String debitSide) {
		return salesMapper.selectAcctList(debitSide);
	}
	
}
