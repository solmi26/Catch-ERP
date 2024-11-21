package com.cherp.app.acct.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.cherp.app.acct.service.BacctService;
import com.cherp.app.acct.vo.BacctVO;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
/**
 * 계좌 컨트롤러
 */
public class BacctController {
	private final BacctService bacctService;

	
	// JSON 계좌 데이터
	@GetMapping("accList")
	public String bacctList(Model model) {
		List<BacctVO> list = bacctService.bacctList();
		model.addAttribute("bacct",list);
		return "account/viewBankAccount";
	}
	
	// 신규 계좌 저장
	@PostMapping("insertBacct")
	//@ResponseBody
	public String insertBacct(BacctVO bacctVO) {
		bacctService.bacctInsert(bacctVO);
		return "account/viewBankAccount";
	}
	
	// 계좌 수정
	@PostMapping("updateBacct")
	public String updateBacct(BacctVO bacctVO) {
		bacctService.bacctUpdate(bacctVO);
		return "account/viewBankAccount";
	}
}