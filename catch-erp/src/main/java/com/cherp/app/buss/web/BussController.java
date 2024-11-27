package com.cherp.app.buss.web;

import com.cherp.app.buss.service.ClientService;
import com.cherp.app.buss.service.SalesChitService;
import com.cherp.app.buss.vo.ClientVO;
import com.cherp.app.buss.vo.SalesChitVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Slf4j
@Controller
@RequestMapping("/sales")
public class BussController {

    private ClientService clientService;
    private SalesChitService salesChitService;

    @Autowired
    public BussController(ClientService clientService, SalesChitService salesChitService){
        this.clientService = clientService;
        this.salesChitService = salesChitService;
    }

    // 구매 페이지
    @GetMapping("testPurchase")
    public String testPurchase() {
        return "purchase/purchasePage";
    }
    
    // 판매 페이지
    @GetMapping("/salesChit")
    public String SalesChit(Model model) {
        List<ClientVO> list = clientService.clientList();
        model.addAttribute("client", list);
        return "sales/salesChit";
    }

    // 판매 조회 페이지
    @GetMapping("/saleSlip")
    public String saleSlip(){
        return "sales/saleSlip";
    }

    // 판매전표 및 판매목록 등록
    @PostMapping("/insertSalesChit")
    public String insertSalesChit(@RequestBody SalesChitVO salesChitVO) {
        salesChitService.salesChitInsert(salesChitVO);
        return "sales/salesChit";
    }
}
