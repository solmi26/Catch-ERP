package com.cherp.app.stck.service;

import java.util.List;

import com.cherp.app.buss.vo.PurchaseHistoryVO;
import com.cherp.app.buss.vo.SalesHistoryVO;
import com.cherp.app.stck.vo.ContractItemVO;
import com.cherp.app.stck.vo.HistorySearchVO;
import com.cherp.app.stck.vo.ItemSearchVO;
import com.cherp.app.stck.vo.StocksAdjustVO;

public interface StockService {
	
	public List<ContractItemVO> getItemList(); //제품 전체조회
	public List<PurchaseHistoryVO> getPurchaseHistoryList(String type1, String type2, String type3, String client, String employee
														, String item, String startDate, String endDate); //구매내역 조건조회 
	public ContractItemVO getItemStocks(String itemCode);  // 단건 제품의 재고 조회
	public List<SalesHistoryVO> getSalesHistoryList(HistorySearchVO searchVO); //판매내역조회
	public int insertStocksAdjustment(List<StocksAdjustVO> stocksAdjustVO); // 재고조정 프로시저 호출
	public Long getAdjustNo(); //최신 재고조정번호 조회
	public List<ContractItemVO> getItemInfoList(ItemSearchVO itemSearchVO); //제품리스트 조건 조회
	public ContractItemVO getItemDetailInfo(String itemCode); //제품저보상세조회
	public void modifyItemImage(String image, String itemCode); //제품 이미지 수정
	public int getItemQuantityByWh(String itemCode, String whCode); //창고별 특정 품목의 현재수량 조회
}
