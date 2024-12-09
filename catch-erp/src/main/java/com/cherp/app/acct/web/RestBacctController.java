package com.cherp.app.acct.web;

import java.util.List;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cherp.app.acct.service.BacctService;
import com.cherp.app.acct.vo.BacctVO;
import com.cherp.app.common.vo.CommonCodeVO;

@RestController
/**
 * RestBacct 컨트롤러
 */
public class RestBacctController {
	private final BacctService bacctService;
	
	public RestBacctController(BacctService bacctService) {
		this.bacctService = bacctService;
	}
	
	// JSON 계좌 데이터
	@Secured("ROLE_MANAGER,ROLE_SALES")
	@GetMapping("api/account/bacct")
	public List<BacctVO> bacctList() {
		return bacctService.bacctList();
	}
	
	// JSON 은행목록 데이터
	@Secured("ROLE_MANAGER,ROLE_SALES")
	@GetMapping("api/account/bank")
	public List<CommonCodeVO> bankList() {
		return bacctService.commonBankList();
	}
}
