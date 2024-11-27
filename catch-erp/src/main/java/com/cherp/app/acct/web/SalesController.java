package com.cherp.app.acct.web;

import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cherp.app.acct.service.SalesService;
import com.cherp.app.acct.vo.InsertPayableVO;
import com.cherp.app.acct.vo.PayablesVO;
import com.cherp.app.acct.vo.SalesVO;
import com.fasterxml.jackson.databind.JsonNode;

import lombok.RequiredArgsConstructor;

/**
 * 채권, 채무, 세금계산서, 매출 컨트롤러
 */

@RequiredArgsConstructor
@Controller
public class SalesController {

	private final SalesService salesService;
	
	// 채권 전체 조회
	@GetMapping("receivable/receivableList")
	public String receivableList(Model model) {
		List<SalesVO> receList = salesService.receivablesList();
		model.addAttribute("receive",receList);
		return "account/regSalesSlipReduction";
	}
	// 채무 전체 조회
	@GetMapping("payable/payablesList")
	public String payablesList(Model model) {
		List<PayablesVO> payList = salesService.payablesList();
		model.addAttribute("pay",payList);
		return "account/regPayReduction";
	}
	
	// 매출 전표 등록(화면) 
	@GetMapping("sales/insertSales")
	public String insertSalesForm(Model model) {
		return "account/salesSlip";
	}
	
	
	// 매출 전표 등록(기능)
	@PostMapping("sales/insertSales")
	@ResponseBody
	public String insertPurchase(@RequestBody SalesVO salesVO) {
		salesService.insertSale(salesVO);
		return "저장성공";
	}
	
	// 매입 전표 등록(화면)
	@GetMapping("sales/insertPurchase")
	public String insertPurchaseForm(Model model) {
		return "account/PurchaseSlip";
	}
	
	
	// 매입 전표 등록(기능)
	@PostMapping("sales/insertPurchase")
	@ResponseBody
	public String insertSales(@RequestBody SalesVO salesVO) {
		salesService.insertSale(salesVO);
		return "저장 성공";
	}
	
	// 회계 계정 조회
	@ResponseBody
	@GetMapping("sales/selectAcct")
	public List<SalesVO> selectAcct(Model model){
		return salesService.acctList("o1");
	}

	@PostMapping("insertPayablesBalance")
	@ResponseBody
	public String insertPayablesBalance(@RequestBody JsonNode payables) { // JsonNode : HashMap보다 Json객체를 더 쉽게 사용할 수 있게 해줌

		String message = "success";
		Iterator<Entry<String, JsonNode>> fields = payables.fields();
		fields.forEachRemaining(field -> {
			int cnt = 0;
			System.out.println("field : " + field.getValue());
			System.out.println("field length : " + field.getValue().size());
			for (int i = 0; i < field.getValue().size(); i++) {
				System.out.println("i:"+field.getValue().get("clientCode"));
			}
			if(cnt == 1) {
				System.out.println(field.getValue().get("bacctCode"));
			}
			cnt++;
		});
		for (JsonNode node : payables) {
			InsertPayableVO payable = new InsertPayableVO();
//			payable.setBacctCode(payables.get("bacctInfo").get("bacctCode").toString());
//			payable.setClientCode(node.get("clientCode").toString());
//			payable.setDecreasePrice(node.get("decreasePrice").asInt());
//			System.out.println(node.get("clientCode").toPrettyString());
//			System.out.println(node.get("clientCode").toString());
//			salesService.insertPayable(payable);
		}

		return message;
	}
	
}
