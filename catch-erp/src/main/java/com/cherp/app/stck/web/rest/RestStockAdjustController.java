package com.cherp.app.stck.web.rest;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cherp.app.buss.service.ClientService;
import com.cherp.app.buss.vo.ClientVO;
import com.cherp.app.stck.service.StockService;
import com.cherp.app.stck.vo.ContractItemVO;
import com.cherp.app.stck.web.StockAdjustController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class RestStockAdjustController {
	
//	private final StockService stockAdjustService;
	private final ClientService clientServcie;
	
	@GetMapping("stocks/clientList")
	public List<ClientVO> getClientList() {  
		return clientServcie.clientList();
	}
	
	@GetMapping("stocks/itemList")
	public List<ContractItemVO> getItemList() {
		return stockAdjustService.getItemList();
	}
}
