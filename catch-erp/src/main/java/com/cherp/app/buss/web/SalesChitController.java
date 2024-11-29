package com.cherp.app.buss.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cherp.app.buss.service.SalesChitService;
import com.cherp.app.buss.vo.SalesChitVO;

@Controller
public class SalesChitController {

    private SalesChitService salesChitService;

    public SalesChitController(SalesChitService salesChitService) {
        this.salesChitService = salesChitService;
    }

    // 판매전표 등록
    @PostMapping("insertSalesChit")
    public String insertSalesChit(SalesChitVO salesChitVO) {
        int rowInsert = salesChitService.salesChitInsert(salesChitVO);
		
        return "sales/salesChit";
    }
    
    // 판매전표 전체 조회 by sm
	@ResponseBody
    @GetMapping("sales/selectSalesChit")
	public List<SalesChitVO> selectSalesShit(Model model){
		return salesChitService.selectsalesChit();
	}
	
	// 판매전표 전표상태별 조회 by sm
	@ResponseBody
    @GetMapping("sales/selectSalesChitState")
	public List<SalesChitVO> selectSalesChitState(@RequestParam("state") String state){
		System.out.println(state);
		return salesChitService.selectsalesChitState(state);
	}

	@ResponseBody
	@GetMapping("sales/selectSalesTotalPrice")
	public List<SalesChitVO> selectSalesTotalPrice() {
		return salesChitService.selectSalesTotalPrice();
	}
    

}
