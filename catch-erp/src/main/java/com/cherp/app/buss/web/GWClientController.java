package com.cherp.app.buss.web;

import java.util.List;

import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cherp.app.acct.vo.ClientPsVO;
import com.cherp.app.buss.service.ClientService;
import com.fasterxml.jackson.databind.JsonNode;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class GWClientController {
	private final ClientService clientService;
	
	@Secured("ROLE_USER")
	@GetMapping("business/clientList")
	public String clientList(Model model) {
		List<ClientPsVO> clientList = clientService.gwClientList();
		model.addAttribute("clientList",clientList);
		return "sales/clientList";
	}
	
	@Secured("ROLE_USER")
	@PostMapping("business/insertClient")
	public String insertClient(ClientPsVO client) {
		int result = clientService.insertClient(client);
		String url = "";
		if(result > -1) {
			url = "redirect:/business/clientList"; // 성공 => 해당 게시글 단건 조회 이동
		} else {
			url = "redirect:/business/clientList"; // 실패 => 등록페이지 다시 이동
		}
		return url;
	}
	
	@Secured("ROLE_USER")
	@PostMapping("business/updateClient")
	public String updateClientDetail(ClientPsVO client) {
		int result = clientService.updateClient(client);
		String url = "";
		if(result > -1) {
			url = "redirect:/business/clientList"; // 성공 => 해당 게시글 단건 조회 이동
		} else {
			url = "redirect:/business/clientList"; // 실패 => 등록페이지 다시 이동
		}
		return url;
	}
}
