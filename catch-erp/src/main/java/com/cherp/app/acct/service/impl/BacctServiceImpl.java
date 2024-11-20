package com.cherp.app.acct.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cherp.app.acct.mapper.BacctMapper;
import com.cherp.app.acct.service.BacctService;
import com.cherp.app.acct.vo.BacctVO;

@Service
public class BacctServiceImpl implements BacctService{
	private BacctMapper bacctMapper;
	
	public BacctServiceImpl(BacctMapper bacctMapper) { // 순환 참조 회피 방법 @Lazy : 필요한 시점에만 참조를 생성
		this.bacctMapper = bacctMapper;
	}
	
	@Override
	public List<BacctVO> bacctList() {
		return bacctMapper.selectAllBacctList();
	}

	@Override
	public BacctVO bacctInfo(BacctVO bacctVO) {
		return bacctMapper.selectBacct(bacctVO);
	}

	@Override
	public int bacctInsert(BacctVO bacctVO) {
		return bacctMapper.insertBacct(bacctVO);
	}

	@Override
	public int bacctUpdate(BacctVO bacctVO) {
		return bacctMapper.updateBacct(bacctVO);
	}

	@Override
	public int bacctDelete(int bacct) {
		return bacctMapper.deleteBacct(bacct);
	}

}
