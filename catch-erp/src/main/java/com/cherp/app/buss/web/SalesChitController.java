package com.cherp.app.buss.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cherp.app.acct.vo.SalesVO;
import com.cherp.app.buss.service.SalesChitService;
import com.cherp.app.buss.vo.SalesChitVO;

@Controller
public class SalesChitController {

    private SalesChitService salesChitService;

    public SalesChitController(SalesChitService salesChitService) {
        this.salesChitService = salesChitService;
    }

    // 매출전표 등록
    @PostMapping("insertSalesChit")
    public String insertSalesChit(SalesChitVO salesChitVO) {
        int rowInsert = salesChitService.salesChitInsert(salesChitVO);
        return "sales/salesChit";
    }
    
    // 매출전표 전체 조회
	@ResponseBody
    @GetMapping("sales/selectSalesChit")
	public List<SalesChitVO> selectAcct(Model model){
		return salesChitService.selectsalesChit();
	}
    

}
