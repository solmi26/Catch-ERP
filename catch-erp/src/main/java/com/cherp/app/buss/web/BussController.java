package com.cherp.app.buss.web;

import com.cherp.app.buss.service.ClientService;
import com.cherp.app.buss.vo.ClientVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Slf4j
@Controller
public class BussController {

    private ClientService clientService;

    public BussController(ClientService clientService){
        this.clientService = clientService;
    }

    // 구매 페이지
    @GetMapping("testPurchase")
    public String testPurchase() {
        return "purchase/purchasePage";
    }
    
    // 판매 페이지
    @GetMapping("testSalesChit")
    public String testSalesChit(Model model) {
        List<ClientVO> list = clientService.clientList();
        model.addAttribute("client", list);
        log.info("clientList = {}", list);
        return "sales/salesChit";
    }
    
}