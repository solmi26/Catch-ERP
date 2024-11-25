package com.cherp.app.acct.web;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cherp.app.acct.service.SalesService;
import com.cherp.app.acct.vo.PayablesVO;
import com.cherp.app.acct.vo.SalesVO;


@RestController
@CrossOrigin
/**
 * RestSales 컨트롤러
 */
public class RestSalesController {
	private final SalesService salesService;
	
	public RestSalesController(SalesService salesService) {
		this.salesService = salesService;
	}
	
	// JSON 채권 데이터 
	@GetMapping("receList")
	public List<SalesVO> receList() {
		return salesService.receivablesList();
	}
	// JSON 채무 데이터
	@GetMapping("payList")
	public List<PayablesVO> payList() {
		return salesService.payablesList();
	}
	// JSON 거래처 채권 데이터
	@GetMapping("clientPayables")
	public List<PayablesVO> clientPayablesList(String clientCode) {
		return salesService.ClientPayableList(clientCode);
	}
	
}
