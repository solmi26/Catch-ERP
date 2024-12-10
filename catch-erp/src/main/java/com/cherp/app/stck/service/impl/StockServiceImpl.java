package com.cherp.app.stck.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import com.cherp.app.buss.vo.PurchaseChitVO;
import com.cherp.app.buss.vo.PurchaseHistoryVO;
import com.cherp.app.buss.vo.SalesHistoryVO;
import com.cherp.app.stck.mapper.StockMapper;
import com.cherp.app.stck.service.StockService;
import com.cherp.app.stck.vo.ContractItemVO;
import com.cherp.app.stck.vo.HistorySearchVO;
import com.cherp.app.stck.vo.ItemSearchVO;
import com.cherp.app.stck.vo.StocksAdjustVO;
import com.cherp.app.stck.vo.StocksVO;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
public class StockServiceImpl implements StockService{


	private StockMapper stockMapper;	
	public StockServiceImpl(StockMapper stockMapper) {
		this.stockMapper = stockMapper;
	}
	//품목 전체조회
	@Override
	public List<ContractItemVO> getItemList() {
		List<ContractItemVO> list = stockMapper.selectAllItemList();
		return list;
	}

	//구매내역 리스트 조건조회
	@Override
	public List<PurchaseHistoryVO> getPurchaseHistoryList(HistorySearchVO searchVO) {
		/*
		 * String clientInit = ""; String employeeInit = ""; String itemInit = ""; //구매
		 * 전표번호 불러온다. 조건:사원코드이거나 사원이름 AND 거래처코드이거나 거래처명 clientInit =
		 * client.equals("all") ? "" : client; employeeInit = employee.equals("all") ?
		 * "" : employee; itemInit = item.equals("all") ? "" : item;
		 * List<PurchaseChitVO> chitNoList = stockMapper.selectPurcSlipNoList(type1,
		 * type2, clientInit, employeeInit); if(chitNoList.size() != 0) { //구매 전표번호에서
		 * 품목에 대한 조회조건으로 걸러준다. 조건:입고날짜 AND 품목 AND 구매전표번호에서 내역번호 조회건수가 1건이상 Map<String,
		 * Object> conditionMap = new HashMap<>(); String[] chitNoArr = new
		 * String[chitNoList.size()]; int cnt = 0; for(PurchaseChitVO obj : chitNoList)
		 * { chitNoArr[cnt++] = obj.getPurcslipNo(); }
		 * 
		 * conditionMap.put("chitNoArr", chitNoArr); conditionMap.put("type3", type3);
		 * conditionMap.put("item", itemInit); conditionMap.put("startDate", startDate);
		 * conditionMap.put("endDate", endDate); List<PurchaseHistoryVO> historyList =
		 * stockMapper.selectPurcHistoryList(conditionMap); return historyList; }
		 */
		Map<String, Object> conditionMap = new HashMap<>();
		String clientCodeInit = searchVO.getClientHiddenInput() == "" ? "no" : searchVO.getClientHiddenInput();
		String humanCodeInit = searchVO.getHumanHiddenInput() == "" ? "no" : searchVO.getHumanHiddenInput();
		String itemCodeInit = searchVO.getItemHiddenInput() == "" ? "no" : searchVO.getItemHiddenInput();
		String startDateInit = searchVO.getStartDate() == "" ? "no" : searchVO.getStartDate();
		String endDateInit = searchVO.getEndDate() == "" ? "no" : searchVO.getEndDate();
		conditionMap.put("clientCode", clientCodeInit);
		conditionMap.put("clientName", searchVO.getClientInput());
		conditionMap.put("employeeCode", humanCodeInit);
		conditionMap.put("employeeName", searchVO.getHumanInput());
		conditionMap.put("itemCode", itemCodeInit);
		conditionMap.put("itemName", searchVO.getItemInput());
		conditionMap.put("startDate", startDateInit);
		conditionMap.put("endDate", endDateInit);
		return stockMapper.selectPurcHistoryList(conditionMap);
	}
	
	//단 건 품목의 재고조회
	@Override
	public ContractItemVO getItemStocks(String itemCode) {
		return stockMapper.selectStocks(itemCode);
	}
	
	//판매내역 조건 조회
	@Override
	public List<SalesHistoryVO> getSalesHistoryList(HistorySearchVO searchVO) {
		Map<String, Object> conditionMap = new HashMap<>();
		String clientCodeInit = searchVO.getClientHiddenInput() == "" ? "no" : searchVO.getClientHiddenInput();
		String humanCodeInit = searchVO.getHumanHiddenInput() == "" ? "no" : searchVO.getHumanHiddenInput();
		String itemCodeInit = searchVO.getItemHiddenInput() == "" ? "no" : searchVO.getItemHiddenInput();
		String startDateInit = searchVO.getStartDate() == "" ? "no" : searchVO.getStartDate();
		String endDateInit = searchVO.getEndDate() == "" ? "no" : searchVO.getEndDate();
		conditionMap.put("clientCode", clientCodeInit);
		conditionMap.put("clientName", searchVO.getClientInput());
		conditionMap.put("employeeCode", humanCodeInit);
		conditionMap.put("employeeName", searchVO.getHumanInput());
		conditionMap.put("itemCode", itemCodeInit);
		conditionMap.put("itemName", searchVO.getItemInput());
		conditionMap.put("startDate", startDateInit);
		conditionMap.put("endDate", endDateInit);
		return stockMapper.selectSalesHistoryList(conditionMap);
	}
	
	//재고조정 프로시저 
	@Override
	public int insertStocksAdjustment(List<StocksAdjustVO> stocksAdjustVO) {

		return stockMapper.insertAdjustment(stocksAdjustVO);
	}
	//최신 재고조정번호 조회
	@Override
	public Long getAdjustNo() {
		Long AdjustmentNo = stockMapper.selectAdjustNo().getRealNo();
		return AdjustmentNo;
	}
	//제품정보 조건조회
	@Override
	public List<ContractItemVO> getItemInfoList(ItemSearchVO itemSearchVO) {	
		return stockMapper.selectAllSearchItemList(itemSearchVO);
	}
	//제품정보 상세조회
	@Override
	public ContractItemVO getItemDetailInfo(String itemCode) {
		return stockMapper.selectItemDetail(itemCode);
	}
	//제품 이미지 수정
	@Override
	public void modifyItemImage(String image, String itemCode) {
		stockMapper.updateItemImage(image, itemCode);		
	}
	//창고별 특정 품목의 현재수량 조회
	@Override
	public ContractItemVO getItemQuantityByWh(String itemCode, String whCode) {
		return stockMapper.selectItemQuantityByWh(itemCode, whCode);
	}
	//창고, 제품별 재고조정이력 조회
	@Override
	public List<StocksVO> getAllAdjustList(String itemCode, String whCode, String date) {
		return stockMapper.selectAllAdjustList(itemCode, whCode, date);
	}
	// 재고조정번호에 따른 재고조정이력 조회
	@Override
	public List<StocksVO> getAdjustLogList(String stocksAdjustNo) {
		return stockMapper.selectAdjustLogList(stocksAdjustNo);
	}


}