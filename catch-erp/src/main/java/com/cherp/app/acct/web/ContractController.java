package com.cherp.app.acct.web;

import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cherp.app.acct.service.ContractService;
import com.cherp.app.stck.vo.ContractItemVO;

import lombok.RequiredArgsConstructor;

/**
 * 매입 단가 계약 관리, 등록 컨트롤러
 */

@RequiredArgsConstructor
@Controller
public class ContractController {
	private final ContractService conService;
	
	// 매입 단가 계약 등록
	@Secured("ROLE_USER")
	@PostMapping("sales/insertContract")
	@ResponseBody
	public String insertContract(@RequestBody ContractItemVO conVO) {
		conService.insertContract(conVO);
		return "등록 성공";
	}
	
}
