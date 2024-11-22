package com.cherp.app.buss.web;

import com.cherp.app.buss.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RestClientController {

    private ClientService clientService;

    @Autowired
    public RestClientController(ClientService clientService) {
        this.clientService = clientService;
    }

}
