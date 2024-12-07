package com.cherp.app.stck.web;


import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/*재고조정페이지 Controller*/

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("stocks")
public class StocksController {
	
	@Secured("ROLE_MANAGER,ROLE_STOCK") 
	//재고조정페이지
	@GetMapping("/stockAdjustment")
	public String stockAdjustment() {
		return "stock/stockAdjustment";
	}
	
	@Secured("ROLE_MANAGER,ROLE_STOCK, ROLE_BUSINESS, ROLE_SALES") 
	//재고조회&관리페이지
	@GetMapping("/stockInquery") 
	public String stockInquery() {
		return "stock/stockInquery";
	}
}
