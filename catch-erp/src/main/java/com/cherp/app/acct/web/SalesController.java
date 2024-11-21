package com.cherp.app.acct.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.cherp.app.acct.service.SalesService;
import com.cherp.app.acct.vo.SalesVO;

import lombok.RequiredArgsConstructor;


@Controller
@RequiredArgsConstructor
/**
 * 매출 컨트롤러
 */
public class SalesController {

	private final SalesService salesService;
	
	// 채권 전체 조회
	@GetMapping("receivableList")
	public String receivableList(Model model) {
		List<SalesVO> receList = salesService.receivablesList();
		model.addAttribute("receive",receList);
		return "account/regReceReduction";
	}
	// 채무 전체 조회
	@GetMapping("payablesList")
	public String payablesList(Model model) {
		List<SalesVO> payList = salesService.payablesList();
		model.addAttribute("pay",payList);
		return "account/regPayReduction";
	}
	
}
