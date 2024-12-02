package com.cherp.app.buss.web;

import java.util.List;

import com.cherp.app.stck.vo.ContractItemVO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.cherp.app.buss.service.PurchaseChitService;
import com.cherp.app.buss.vo.PurchaseChitVO;

@Controller
public class PurchaseChitController {

    private PurchaseChitService purchaseChitService;

    public PurchaseChitController(PurchaseChitService purchaseChitService) {
        this.purchaseChitService = purchaseChitService;
    }
	
	// 구매전표 전표상태별 조회 by sm
	@ResponseBody
    @GetMapping("sales/selectPurchaseChitState")
	public List<PurchaseChitVO> selectPurchaseChitState(@RequestParam("state") String state){
		System.out.println(state);
		return purchaseChitService.selectPurchaseChitState(state);
	}

    // 판매전표 등록을 위한 품목 조회
	@ResponseBody
	@GetMapping("purchase/contractItem")
	public List<ContractItemVO> selectContractItem(){
		return purchaseChitService.selectContractItem();
	}

	// 수량에 맞게 가격 변화
	@ResponseBody
	@GetMapping("purchase/{quantity}")
	public ContractItemVO purchaseQuantity(@PathVariable("quantity") int quantity){
		return purchaseChitService.purchaseQuantity(quantity);
	}

	// 판매전표 및 판매내역 등록
//	@ResponseBody
//	@PostMapping("purchase/insertPurchase")
//	public PurchaseChitVO insertPurchase(){
//		return purchaseChitService.
//	}

}
