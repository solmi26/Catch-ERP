package com.cherp.app.test.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {
	
	//YSJ TEST
	@GetMapping("test")
	public String testView() {
		return "human/employeeHistoryInput";
	}
	
	// JSM TEST
	@GetMapping("testac")
	public String testViewAc() {
		//return "human/attendanceInput";
		//return "account/invoice";
		return "account/contract";
		//return "account/purchaseSlip";
	}
	// NKW TEST
	@GetMapping("testStack")
	public String testViewStack() {
		return "stack/stackInquery";
	}
	// SGW TEST
	@GetMapping("test1")
	public String testView2() {
		return "account/regBondReduction";
	}
	// GHT TEST
	@GetMapping("testPurchase")
	public String testPurchase() { return "purchase/purchasePage"; }
}
