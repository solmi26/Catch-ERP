package com.cherp.app.buss.web;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cherp.app.acct.vo.ClientPsVO;
import com.cherp.app.buss.service.ClientService;
import com.fasterxml.jackson.databind.JsonNode;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class RestGWClientController {
	
	private final ClientService clientService;
	
	@GetMapping("api/business/client")
	public List<ClientPsVO> clientList() {
		return clientService.gwClientList();
	}
	
	// 클라이언트 정보 단건 조회
	@GetMapping("api/business/clientDetail/{clientCode}")
	public ClientPsVO viewClientDetail(@PathVariable("clientCode") String clientCode) {
		System.out.println(clientCode);
		return clientService.getClientInfo(clientCode);
	}
	
	@PutMapping("api/business/clientDetail")
	@ResponseBody
	public String updateClientDetail(@RequestBody JsonNode client) {
		System.out.println("putMapping");
		return "";
	}
}
