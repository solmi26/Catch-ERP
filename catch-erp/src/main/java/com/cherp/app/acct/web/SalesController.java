package com.cherp.app.acct.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.cherp.app.acct.service.SalesService;
import com.cherp.app.acct.vo.PayablesVO;
import com.cherp.app.acct.vo.SalesVO;

import lombok.RequiredArgsConstructor;


@Controller
@RequiredArgsConstructor
/**
 * 채권, 채무, 세금계산서, 매출 컨트롤러
 */
public class SalesController {

	private final SalesService salesService;
	
	// 채권 전체 조회
	@GetMapping("receivableList")
	public String receivableList(Model model) {
		List<SalesVO> receList = salesService.receivablesList();
		model.addAttribute("receive",receList);
		return "account/regSalesSlipReduction";
	}
	// 채무 전체 조회
	@GetMapping("payablesList")
	public String payablesList(Model model) {
		List<PayablesVO> payList = salesService.payablesList();
		model.addAttribute("pay",payList);
		return "account/regPayReduction";
	}
	
	// 매출 전표 등록(화면)
	@GetMapping("insertSales")
	public String insertSales(SalesVO salesVO) {
		return "account/salesSlip";
	}
	
	
	// 매출 전표 등록(기능)
	@PostMapping("insertSales")
	//@ResponseBody
	public String insertSalesFun(SalesVO salesVO) {
		//salesService
		//bacctService.bacctInsert(bacctVO);
		return "account/salesSlip";
	}
	
	
}
