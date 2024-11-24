package com.cherp.app.stck.web;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/*재고조정페이지 Controller*/

@Slf4j
@Controller
@RequiredArgsConstructor
public class StockAdjustController {

//	private final StockService stockAdjustService;

	private final ClientService clientServcie;
	private final StockService stockAdjustService;

	
	@GetMapping("stocks/stockAdjustment")
	public String stockAdjustment(){
		return "stock/stockAdjustment";
	}
}
