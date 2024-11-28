package com.cherp.app.buss.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cherp.app.buss.service.PurchaseChitService;
import com.cherp.app.buss.vo.PurchaseChitVO;

@Controller
public class PurchaseChitController {

    private PurchaseChitService purchaseChitService;

    public PurchaseChitController(PurchaseChitService purchaseChitService) {
        this.purchaseChitService = purchaseChitService;
    }
	
	// 매출전표 전표상태별 조회 by sm
	@ResponseBody
    @GetMapping("sales/selectPurchaseChitState")
	public List<PurchaseChitVO> selectPurchaseChitState(@RequestParam("state") String state){
		System.out.println(state);
		return purchaseChitService.selectPurchaseChitState(state);
	}
    

}
