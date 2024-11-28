package com.cherp.app.buss.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.cherp.app.acct.vo.ClientPsVO;
import com.cherp.app.buss.service.ClientService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class GWClientController {
	private final ClientService clientService;
	
	@GetMapping("business/clientList")
	public String clientList(Model model) {
		List<ClientPsVO> clientList = clientService.gwClientList();
		model.addAttribute("clientList",clientList);
		return "sales/clientList";
	}
	
	@PostMapping("business/insertClient")
	public String insertClient(ClientPsVO client) {
		clientService.insertClient(client);
		return "sales/clientList";
	}
}
