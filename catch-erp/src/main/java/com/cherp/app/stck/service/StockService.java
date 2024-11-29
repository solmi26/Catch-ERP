package com.cherp.app.stck.service;

import java.util.List;

import com.cherp.app.buss.vo.PurchaseHistoryVO;
import com.cherp.app.buss.vo.SalesHistoryVO;
import com.cherp.app.stck.vo.ContractItemVO;
import com.cherp.app.stck.vo.HistorySearchVO;
import com.cherp.app.stck.vo.StocksAdjustVO;

public interface StockService {
	
	public List<ContractItemVO> getItemList(); //품목 전체조회
	public List<PurchaseHistoryVO> getPurchaseHistoryList(String type1, String type2, String type3, String client, String employee
														, String item, String startDate, String endDate); //구매내역 조건조회 
	public ContractItemVO getItemStocks(String itemCode);  // 단건 품목의 재고 조회
	public List<SalesHistoryVO> getSalesHistoryList(HistorySearchVO searchVO); //판매내역조회
	public int insertStocksAdjustment(List<StocksAdjustVO> stocksAdjustVO); // 재고조정 프로시저 호출
	public Long getAdjustNo(); //최신 재고조정번호 조회
}
