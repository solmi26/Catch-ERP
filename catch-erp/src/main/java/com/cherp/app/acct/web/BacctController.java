package com.cherp.app.acct.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cherp.app.acct.service.BacctService;
import com.cherp.app.acct.vo.BacctVO;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class BacctController {
	private final BacctService bacctService;

	
	// JSON 계좌 데이터
	@GetMapping("accList")
	public String bacctList(Model model) {
		List<BacctVO> list = bacctService.bacctList();
		model.addAttribute("bacct",list);
		return "account/viewBankAccount";
	}
	
	// 계좌 등록
	@PostMapping("insertBacct")
	@ResponseBody
	public String insertBacct(BacctVO bacct) {
		bacctService.bacctInsert(bacct);
		return "account/viewBankAccount";
	}
}
