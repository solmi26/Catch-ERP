package com.cherp.app.test.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {
	
	@GetMapping("test")
	public String testView() {
		return "human/test";
	}

	@GetMapping("testac")
	public String testViewAc() {
		return "account/invoice";
	}
	
	@GetMapping("testStack")
	public String testViewStack() {
		return "stack/stackInquery";
	}
}
