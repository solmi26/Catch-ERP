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
public class RestBussController {

    private ClientService clientService;

    public RestBussController(ClientService clientService){
        this.clientService = clientService;
    }

    // JSON 담당자 조회 데이터


}
