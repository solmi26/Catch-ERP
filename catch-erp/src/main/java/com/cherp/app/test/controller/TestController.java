package com.cherp.app.test.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {
	
	//YSJ TEST
	@GetMapping("test")
	public String testView() {
		return "human/attendanceElementInput";
	}
	// JSM TEST
	@GetMapping("testac")
	public String testViewAc() {
		//return "human/attendanceInput";
		//return "account/invoice";
		//return "account/contractInsert";
		//return "account/purchaseSlip";
		//return "account/salesSlip";
		// return "account/statement";
	    //return "account/modal/salesSlipModal";
		//return "account/modal/invoicePrintModal";
		return "account/modal/slipPrintModal";
	}
	// NKW TEST
	@GetMapping("testStock")
	public String testViewStock() {
		return "stock/stockAdjustment";
	}
	@GetMapping("testStock2")
	public String testViewStock2() {
		return "stock/stockInquery";
	}
	
	@GetMapping("testMyPage")
	public String testMyPage() {
		return "index/main/myPage";
	}
	// SGW TEST
	@GetMapping("test1")
	public String testView2() {
		//return "account/viewBankAccount"; // 계좌목록
		//return "account/regDebtReduction"; // 채무감소
		return "account/regBondReduction"; // 채권감소
		//return "account/contract";
	}
	@GetMapping("test2")
	public String testView3() {
		//return "account/viewBankAccount"; // 계좌목록
		//return "account/regDebtReduction"; // 채무감소
		return "account/regBondReduction"; // 채권감소
		//return "account/contract";
	}

}
