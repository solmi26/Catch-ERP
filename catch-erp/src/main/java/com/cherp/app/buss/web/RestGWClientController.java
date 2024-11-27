package com.cherp.app.buss.web;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cherp.app.acct.vo.ClientPsVO;
import com.cherp.app.buss.service.ClientService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class RestGWClientController {
	
	private final ClientService clientService;
	
	@GetMapping("api/business/client")
	public List<ClientPsVO> clientList() {
		return clientService.gwClientList();
	}
}
