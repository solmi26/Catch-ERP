package com.cherp.app.buss.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cherp.app.buss.service.SalesChitService;
import com.cherp.app.buss.vo.SalesChitVO;
import com.cherp.app.buss.vo.SaleslipHistoryVO;

@Controller
public class SalesChitController {

    private SalesChitService salesChitService;

    public SalesChitController(SalesChitService salesChitService) {
        this.salesChitService = salesChitService;
    }
    
    // 판매전표 전체 조회 by sm
	@ResponseBody
    @GetMapping("sales/selectSalesChit")
	public List<SalesChitVO> selectSalesShit(){
		return salesChitService.selectSalesChit();
	}

	// 판매전표 등록
	@PostMapping("sales/insertSalesChit")
	public String insertSalesChit(@RequestBody SalesChitVO salesChitVO) {
		int rowInsert = salesChitService.salesChitInsert(salesChitVO);
		return "sales/salesChit";
	}

	// 판매전표 검색 조회
	@ResponseBody
	@GetMapping("sales/selectSalesChit/search")
	public List<SalesChitVO> searchSalesChit(@ModelAttribute SalesChitVO salesChitVO){
		return salesChitService.searchSalesChit(salesChitVO);
	}

	// 판매전표별 판매내역 보기
	@ResponseBody
	@GetMapping("sales/selectSaleslip/{saleslipNo}")
	public List<SaleslipHistoryVO> selectSaleslip(SaleslipHistoryVO saleslipHistoryVO,
												  @PathVariable("saleslipNo") String saleslipNo){
		return salesChitService.selectSelectSaleslip(saleslipHistoryVO, saleslipNo);
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
