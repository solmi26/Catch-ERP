package com.cherp.app.acct.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cherp.app.acct.service.BacctService;
import com.cherp.app.acct.vo.BacctVO;

@Service
public class BacctServiceImpl implements BacctService{
	private BacctService bacctService;
	
	public BacctServiceImpl(BacctService bacctService) { // 순환 참조 회피 방법 @Lazy : 필요한 시점에만 참조를 생성
		this.bacctService = bacctService;
	}
	
	@Override
	public List<BacctVO> bacctList() {
		return bacctService.bacctList();
	}

	@Override
	public BacctVO bacctInfo(BacctVO bacctVO) {
		return bacctService.bacctInfo(bacctVO);
	}

	@Override
	public int bacctInsert(BacctVO bacctVO) {
		return bacctService.bacctInsert(bacctVO);
	}

	@Override
	public int bacctUpdate(BacctVO bacctVO) {
		return bacctService.bacctUpdate(bacctVO);
	}

	@Override
	public int bacctDelete(int bacct) {
		return bacctService.bacctDelete(bacct);
	}

}
