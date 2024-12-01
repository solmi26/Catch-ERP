package com.cherp.app.acct.service;

import java.util.List;

import com.cherp.app.acct.vo.InsertPayableVO;
import com.cherp.app.acct.vo.InsertReceivableVO;
import com.cherp.app.acct.vo.PayablesVO;
import com.cherp.app.acct.vo.SalesVO;

/**
 * 매출, 채권, 채무, 전자세금계산서 Service
 */
public interface SalesService {
	// 전체 조회
	public List<SalesVO> salesList(); 				// 매출 조회
	public List<PayablesVO> payablesList(); 		// 채무거래 내역 전체 조회
	public List<SalesVO> receivablesList(); 		// 채권거래 내역 전체 조회
	public List<SalesVO> invoiceList();				// 세금계산서 내역 전체 조회
	public List<PayablesVO> ClientPayableList(String clientCode);	// 채무 거래처 전체 조회
	public List<SalesVO> ClientReceivableList(String clientCode);	// 채권 거래처 전체 조회
	public List<SalesVO> acctList(String debitSide);
	public List<SalesVO> selectAllSlip(); // 매출, 매입전표 전체 조회
	
	//단건 조회
	public SalesVO slipInfo(SalesVO salesVO);		// 매출, 매입 단건 조회
	public PayablesVO payableInfo(PayablesVO payablesVO); // 채무거래 단건 조회
	public SalesVO receivableInfo(SalesVO salesVO); // 채권거래 단건 조회
	public SalesVO invoiceInfo(SalesVO salesVO);	// 세금계산서 내역 단건 조회
	
	//추가
	// 매출전표 추가, 채권 내역 추가, 거래처 채권 총 잔액 업데이트, 세금계산서 발행, 판매전표 상태 변경
	public void insertSale(SalesVO salesVO);			
	public String insertPayable(InsertPayableVO insertPayableVO);	// 채무거래 추가
	public int insertReceivable(SalesVO salesVO);	// 채권거래 추가
	public String insertDecreaseReceivable(InsertReceivableVO insertReceivableVO);	// 채권거래 추가
	public int insertInvoice(SalesVO salesVO);		// 세금 계산서 추가
	// 매입전표 추가, 채무 내역 추가, 거래처 채권 총 잔액 업데이트, 구매전표 상태 변경
	public void insertPurchase(PayablesVO payblesVO);
	
	//수정
	public int updateSalesInvoiceNo(SalesVO salesVO); // 매출전표 인보이스 번호 수정
	public int updateSales(SalesVO salesVO); // 매출전표 수정
	public int updatePayable(PayablesVO payablesVO); // 채무거래 단건 수정
	public int updateReceivable(SalesVO salesVO);	 // 채권거래 단건 수정
	public int updateInvoice(SalesVO salesVO);		 // 세금 계산서 수정
	
	//삭제
	public void deleteSlip(List<SalesVO> salesVO);	// 매출, 매입 삭제
	public int deletePayable(int recLogId);			// 채무거래 단건 삭제
	public int deleteReceivable(int logId);			// 채권거래 단건 삭제
	public int deleteInvoice(int invoiceNo);		// 세금 계산서 삭제
}
