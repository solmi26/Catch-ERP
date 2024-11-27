package com.cherp.app.acct.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cherp.app.acct.vo.InsertPayableVO;
import com.cherp.app.acct.vo.InsertReceivableVO;
import com.cherp.app.acct.vo.PayablesVO;
import com.cherp.app.acct.vo.SalesVO;

/**
 * 매출 Mapper
 */
public interface SalesMapper {
	// 전체 조회
	public List<SalesVO> selectAllSalesList(); 		// 매출 조회
	public List<PayablesVO> payablesList(); 		// 채무거래 내역 전체 조회
	public List<SalesVO> receivablesList(); 		// 채권거래 내역 전체 조회
	public List<SalesVO> invoiceList();				// 세금계산서 내역 전체 조회
	public List<PayablesVO> SelectAllClientPayableList(String clientCode);	// 채무 거래처 전체 조회
	public List<SalesVO> SelectAllClientReceivableList(String clientCode);// 채권 거래처 전체 조회
	public List<SalesVO> selectAcctList(String debitSide); // 회계 계정 전체 조회
	
	//단건 조회
	public SalesVO selectSaleInfo(SalesVO salesVO);			// 매출 단건 조회
	public PayablesVO selectPayableInfo(PayablesVO payablesVO);// 채무거래 단건 조회
	public SalesVO selectReceivableInfo(SalesVO salesVO);	// 채권거래 단건 조회
	public SalesVO selectInvoiceInfo(SalesVO salesVO);		// 세금계산서 내역 단건 조회
	
	//추가
	public int insertSale(SalesVO salesVO);			// 매출내역 추가
	public int insertPayable(InsertPayableVO insertPayableVO);// 채무거래 추가
	public int insertReceivable(SalesVO salesVO);	// 채권거래 추가
	public int insertDecreaseReceivable(InsertReceivableVO insertReceivableVO);	// 채권거래 추가
	public int insertInvoice(SalesVO salesVO);		// 세금 계산서 추가
	
	//수정
	public int updateSale(SalesVO salesVO);			// 매출 단건 수정
	public int updatePayable(PayablesVO payablesVO);// 채무거래 단건 수정
	public int updateReceivable(SalesVO salesVO);	// 채권거래 단건 수정
	public int updateInvoice(SalesVO salesVO);		// 세금 계산서 수정
	// 거래처 채권 총 잔액 변경
	public int updateClientBalancek(@Param("clientCode") String clientCode, @Param("balancek") int balancek);
	// 거래처 채무 총 잔액 변경
    public int updateClientBalancem(@Param("clientCode") String clientCode, @Param("balancem") int balancem);
	// 판매전표 전표 상태 변경
    public int updateSalesSlipState(String saleslipNo);
	
	//삭제
	public int deleteSale(int salesChitNo);			// 매출 단건 삭제
	public int deletePayable(int recLogId);			// 채무거래 단건 삭제
	public int deleteReceivable(int logId);			// 채권거래 단건 삭제
	public int deleteInvoice(int invoiceNo);		// 세금 계산서 삭제

}
