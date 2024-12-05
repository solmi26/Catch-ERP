package com.cherp.app.acct.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cherp.app.acct.vo.ClientPsVO;
import com.cherp.app.acct.vo.ClientSearchVO;
import com.cherp.app.acct.vo.InsertPayableVO;
import com.cherp.app.acct.vo.InsertReceivableVO;
import com.cherp.app.acct.vo.PayablesVO;
import com.cherp.app.acct.vo.SalesVO;

/**
 * 매출, 매입, 채권, 채무 Mapper
 */
public interface SalesMapper {
	// 전체 조회
	public List<SalesVO> selectAllSalesList(); 		// 매출 조회
	public List<PayablesVO> selectAllPurchaseList(); // 매입 조회
	public List<PayablesVO> payablesList(); 		// 채무거래 내역 전체 조회
	public List<SalesVO> receivablesList(); 		// 채권거래 내역 전체 조회
	public List<SalesVO> invoiceList();				// 세금계산서 내역 전체 조회
	public List<PayablesVO> SelectAllClientPayableList(String clientCode);	// 채무 거래처 전체 조회
	public List<SalesVO> SelectAllClientReceivableList(String clientCode);// 채권 거래처 전체 조회
	public List<SalesVO> selectAcctList(String debitSide); // 회계 계정 전체 조회
	public List<SalesVO> selectAllSlip(); // 매출, 매입전표 조회
	public List<ClientPsVO> payablesOptionList(ClientSearchVO search); // 조건에 맞는 채무내역 조회
	public List<ClientPsVO> salesOptionList(ClientSearchVO search); // 조건에 맞는 채권 내역 조회
	
	public SalesVO selectSales(String no); // 매출 단건 조회
	public SalesVO selectPurchase(String no); // 매입 단건 조회
	
	//단건 조회
	public SalesVO selectSaleInfo(SalesVO salesVO);			// 매출 단건 조회
	public PayablesVO selectPayableInfo(PayablesVO payablesVO);// 채무거래 단건 조회
	public SalesVO selectReceivableInfo(SalesVO salesVO);	// 채권거래 단건 조회
	public SalesVO selectInvoiceInfo(SalesVO salesVO);		// 세금계산서 내역 단건 조회
	
	//추가
	public int insertSale(SalesVO salesVO);			// 매출내역 추가
	public int insertPurchase(PayablesVO payablesVO); // 매입내역 추가
	public int insertReceivable(SalesVO salesVO);	// 채권거래 추가
	public int insertDecreaseReceivable(InsertReceivableVO insertReceivableVO);	// 채권거래 추가
	public int insertReceivableSM(PayablesVO payablesVO);	// 채권거래 추가(by sm)
	public int insertPayable(InsertPayableVO insertPayableVO);// 채무거래 추가
	public int insertInvoice(SalesVO salesVO);		// 세금 계산서 추가
	
	//수정
	public int updateSalesInvoiceNo(SalesVO salesVO); // 매출 인보이스 번호 추가
	public int updateSales(SalesVO salesVO); // 매출전표 수정
	public int updatePurchase(PayablesVO payablesVO); // 매입전표 수정
	public int updatePayable(PayablesVO payablesVO); // 채무거래 단건 수정
	public int updateReceivable(SalesVO salesVO);	 // 채권거래 단건 수정
	public int updateInvoice(@Param("invoiceNo")String invoiceNo, @Param("state")String state); // 세금 계산서 수정
	// 거래처 채권 총 잔액 변경
	public int updateClientBalancek(@Param("clientCode") String clientCode, @Param("balancek") int balancek);
	// 거래처 채무 총 잔액 변경
    public int updateClientBalancem(@Param("clientCode") String clientCode, @Param("balancem") int balancem);
	// 판매전표 전표 상태 변경
    public int updateSalesSlipState(@Param("saleslipNo")String saleslipNo, @Param("state")String state);
	// 구매전표 전표 상태 변경
    public int updatePurchaseSlipState(String purcslipNo);
	
	//삭제
	public int deleteSales(String no); // 매출 삭제
	public int deletePurchase(String no); // 매입 삭제
	public int deletePayable(int recLogId);			// 채무거래 단건 삭제
	public int deleteReceivable(String no);			// 채권거래 단건 삭제
	public int deleteInvoice(String invoiceNo);		// 세금 계산서 삭제

}
