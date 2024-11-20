package com.cherp.app.acct.mapper;

import java.util.List;

import com.cherp.app.acct.vo.SalesVO;

public interface SalesMapper {
	// 전체 조회
	public List<SalesVO> selectAllSalesList(); 				// 매출 조회
	public List<SalesVO> payablesList(); 			// 채무거래 내역 전체 조회
	public List<SalesVO> receivablesList(); 		// 채권거래 내역 전체 조회
	public List<SalesVO> invoiceList();				// 세금계산서 내역 전체 조회
	
	//단건 조회
	public SalesVO selectSaleInfo(SalesVO salesVO);		// 매출 단건 조회
	public SalesVO selectPayableInfo(SalesVO salesVO); 	// 채무거래 단건 조회
	public SalesVO selectReceivableInfo(SalesVO salesVO); // 채권거래 단건 조회
	public SalesVO selectInvoiceInfo(SalesVO salesVO);	// 세금계산서 내역 단건 조회
	
	//추가
	public int insertSale(SalesVO salesVO);			// 매출내역 추가
	public int insertPayable(SalesVO salesVO);		// 채무거래 추가
	public int insertReceivable(SalesVO salesVO);	// 채권거래 추가
	public int insertInvoice(SalesVO salesVO);		// 세금 계산서 추가
	
	//수정
	public int updateSale(SalesVO salesVO);			// 매출 단건 수정
	public int updatePayable(SalesVO salesVO);		// 채무거래 단건 수정
	public int updateReceivable(SalesVO salesVO);	// 채권거래 단건 수정
	public int updateInvoice(SalesVO salesVO);		// 세금 계산서 수정
	
	//삭제
	public int deleteSale(int salesChitNo);			// 매출 단건 삭제
	public int deletePayable(int recLogId);			// 채무거래 단건 삭제
	public int deleteReceivable(int logId);			// 채권거래 단건 삭제
	public int deleteInvoice(int invoiceNo);		// 세금 계산서 삭제

}
