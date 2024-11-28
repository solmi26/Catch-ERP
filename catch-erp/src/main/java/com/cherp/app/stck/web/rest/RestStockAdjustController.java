package com.cherp.app.stck.web.rest;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cherp.app.buss.service.ClientService;
import com.cherp.app.buss.vo.ClientVO;
import com.cherp.app.buss.vo.PurchaseChitVO;
import com.cherp.app.buss.vo.PurchaseHistoryVO;
import com.cherp.app.buss.vo.SalesHistoryVO;
import com.cherp.app.stck.mapper.StockMapper;
import com.cherp.app.stck.service.StockService;
import com.cherp.app.stck.vo.ContractItemVO;
import com.cherp.app.stck.vo.HistorySearchVO;
import com.cherp.app.stck.vo.StocksAdjustVO;
import com.cherp.app.stck.web.StockAdjustController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("stocks")
public class RestStockAdjustController {
	
	private final StockService stockAdjustService;
	private final ClientService clientService;
	
	//거래처 검색
	@GetMapping("/client") //거래처전체조회
	public List<ClientVO> getClientList() {  
		return clientService.clientList();
	}
	
	//품목전체조회
	@GetMapping("/item") 
	public List<ContractItemVO> getItemList() {
		return stockAdjustService.getItemList();
	}
	
	//구매내역조회
	@GetMapping("/purchaseChitNo/{type1}/{type2}/{type3}/{client}/{employee}/{item}/{startDate}/{endDate}")
	public List<PurchaseHistoryVO> getPurcChitNo(@PathVariable("type1") String type1, 
			                                     @PathVariable("type2") String type2, 
			                                     @PathVariable("type3") String type3, 
			                                     @PathVariable("client") String client, 
			                                     @PathVariable("employee") String employee, 
			                                     @PathVariable("item") String item, 
			                                     @PathVariable("startDate") String startDate, 
			                                     @PathVariable("endDate") String endDate){
		return stockAdjustService.getPurchaseHistoryList(type1, type2, type3, client, employee, item, startDate, endDate);
	}
	
	//판매내역조회 
	@GetMapping("/salesChitNo")
	public List<SalesHistoryVO> getSalesChitNo(HistorySearchVO searchVO){
		
		return stockAdjustService.getSalesHistoryList(searchVO);
	}
	
	//재고조정 (프로시저)
	@PostMapping("/stocksAdjustment")
	public int stocksAdjustment(@RequestBody List<StocksAdjustVO> stocksAdjustVO) {
		return stockAdjustService.insertStocksAdjustment(stocksAdjustVO);
	}
	
	//최신재고조정번호 조회
	@GetMapping("/stocksAdjustNo")
	public Long stocksAdjustNo() {
		return stockAdjustService.getAdjustNo();
	}
	
}