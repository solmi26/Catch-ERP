package com.cherp.app.buss.web;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.cherp.app.acct.vo.ClientPsVO;
import com.cherp.app.buss.service.ClientService;

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
	public Map<String, Object> viewClientDetail(@PathVariable("clientCode") String clientCode) {
		System.out.println(clientCode);
		//Map<String,Object> 활용해서 client 단일 조회, client의 매입계약 전체조회, client의 계약품목 전체조회 담아서 보내기
		
		return clientService.getClientInfo(clientCode);
	}
	
}
