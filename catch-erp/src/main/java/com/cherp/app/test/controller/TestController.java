package com.cherp.app.test.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {
	
	@GetMapping("test")
	public String testView() {
		return "human/test";
	}
	@GetMapping("test1")
	public String testView2() {
		return "account/regBondReduction";
	}
}
