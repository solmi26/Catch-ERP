package com.cherp.app.acct.web;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cherp.app.acct.service.SalesService;
import com.cherp.app.acct.vo.InsertPayableVO;
import com.cherp.app.acct.vo.InsertReceivableVO;
import com.cherp.app.acct.vo.PayablesVO;
import com.cherp.app.acct.vo.SalesVO;
import com.fasterxml.jackson.databind.JsonNode;

import lombok.RequiredArgsConstructor;


@Controller
@RequiredArgsConstructor
/**
 * 채권, 채무, 세금계산서, 매출 컨트롤러
 */
public class SalesController {

	private final SalesService salesService;
	
	// 채권 전체 조회
	@GetMapping("receivable/receivableList")
	public String receivableList(Model model) {
		List<SalesVO> receList = salesService.receivablesList();
		model.addAttribute("receive",receList);
		return "account/regReceReduction";
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
	public String insertSales(@RequestBody SalesVO salesVO) {
		try {
			salesService.insertSale(salesVO);
			return "저장 성공";
		} catch (Exception e) {
			return "저장 실패: " + e.getMessage();
		}
	}
	

	@PostMapping("insertPayablesBalance")
	@ResponseBody
	public String insertPayablesBalance(@RequestBody JsonNode payables) { // JsonNode : HashMap보다 Json객체를 더 쉽게 사용할 수 있게 해줌

		String message = "fail";
		
		String bacctCode = "";
		List<InsertPayableVO> pays = new ArrayList<InsertPayableVO>();
		for (JsonNode node : payables) {
			if(node.get("bacctCode")!=null)	bacctCode = node.get("bacctCode").toString(); // bacctCode가 존재하는 node의 경우 해당 값을 저장
			for (JsonNode sel : node) {
				System.out.println("sel : " + sel);
				if(sel.get("clientCode")!=null) { // Client정보가 저장된 node의 값들 중 필요한 정보를 VO에 저장
					InsertPayableVO pay = new InsertPayableVO();
					pay.setClientCode(sel.get("clientCode").asText());
					pay.setDecreasePrice(sel.get("decreasePrice").asInt());
					pays.add(pay);
				}
			}
		}
		for (InsertPayableVO pay : pays) {
			pay.setBacctCode(bacctCode);
			System.out.println(":"+pay.getClientCode()+":");
			pay.setResult("aa");
			message = salesService.insertPayable(pay);
		}
		return message;
	}
	@PostMapping("insertReceivableBalance")
	@ResponseBody
	public String insertReceivableBalance(@RequestBody JsonNode receiables) {
		String message = "fail";
		
		String bacctCode = "";
		List<InsertReceivableVO> recs = new ArrayList<InsertReceivableVO>();
		for (JsonNode node : receiables) {
			if(node.get("bacctCode")!=null)	bacctCode = node.get("bacctCode").toString(); // bacctCode가 존재하는 node의 경우 해당 값을 저장
			for (JsonNode sel : node) {
				System.out.println("sel : " + sel);
				if(sel.get("clientCode")!=null) { // Client정보가 저장된 node의 값들 중 필요한 정보를 VO에 저장
					InsertReceivableVO rec = new InsertReceivableVO();
					rec.setClientCode(sel.get("clientCode").asText());
					rec.setRecPrice(sel.get("decreasePrice").asInt());
					recs.add(rec);
				}
			}
		}
		for (InsertReceivableVO rec : recs) {
			rec.setBacctCode(bacctCode);
			System.out.println(":"+rec.getClientCode()+":");
			rec.setResult("aa");
			message = salesService.insertDecreaseReceivable(rec);
		}
		return message;
	}
	// 회계 계정 조회
	@ResponseBody
	@GetMapping("sales/selectAcct")
	public List<SalesVO> selectAcct(Model model){
		return salesService.acctList("o1");
	}
	
	
}
