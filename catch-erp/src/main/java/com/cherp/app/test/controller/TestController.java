package com.cherp.app.test.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {
	
	//YSJ TEST
	@GetMapping("test")
	public String testView() {
		return "human/test";
	}
	
	// JSM TEST
	@GetMapping("testac")
	public String testViewAc() {
		return "account/invoice";
	}
	// NKW TEST
	@GetMapping("testStack")
	public String testViewStack() {
		return "stack/stackInquery";
	}
	// SGW TEST
	@GetMapping("test1")
	public String testView2() {
		//return "account/viewBankAccount"; // 계좌목록
		//return "account/regDebtReduction"; // 채무감소
		//return "account/regBondReduction"; // 채권감소
		return "account/contract";
	}
	@GetMapping("test2")
	public String testView3() {
		//return "account/viewBankAccount"; // 계좌목록
		//return "account/regDebtReduction"; // 채무감소
		return "account/regBondReduction"; // 채권감소
		//return "account/contract";
	}
}
