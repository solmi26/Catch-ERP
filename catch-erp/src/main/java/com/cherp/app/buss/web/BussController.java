package com.cherp.app.buss.web;

import com.cherp.app.buss.service.ClientService;
import com.cherp.app.buss.vo.ClientVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Slf4j
@Controller
public class BussController {

    private ClientService clientService;

    @Autowired
    public BussController(ClientService clientService){
        this.clientService = clientService;
    }

    // 구매 페이지
    @GetMapping("purchase/purchaseChit")
    public String purchaseChit(Model model) {
        List<ClientVO> list = clientService.clientList();
        model.addAttribute("client", list);
        return "purchase/purchaseChit";
    }

    // 구매 조회 페이지
    @GetMapping("purchase/purchaseHistory")
    public String purchaseHistory(){
        return "purchase/purchaseHistory";
    }
    
    // 판매 페이지
    @GetMapping("/sales/salesChit")
    public String salesChit(Model model) {
        List<ClientVO> list = clientService.clientList();
        model.addAttribute("client", list);
        return "sales/salesChit";
    }

    // 판매 조회 페이지
    @GetMapping("/sales/saleSlip")
    public String saleSlip(Model model){
        List<ClientVO> list = clientService.clientList();
        model.addAttribute("client", list);
        return "sales/saleSlip";
    }
}
