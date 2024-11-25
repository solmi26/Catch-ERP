package com.cherp.app.stck.web;

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
	
	@GetMapping("stocks/stockAdjustment") //재고조정페이지
	public String stockAdjustment(){
		return "stock/stockAdjustment";
	}
}
