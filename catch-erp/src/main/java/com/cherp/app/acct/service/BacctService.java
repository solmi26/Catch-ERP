package com.cherp.app.acct.service;

import java.util.List;

import com.cherp.app.acct.vo.BacctVO;
import com.cherp.app.common.vo.CommonCodeVO;

public interface BacctService {
	public List<BacctVO> bacctList();		// 계좌 전체 조회
	public BacctVO bacctInfo(BacctVO bacctVO); // 계좌 단건 조회
	public int bacctInsert(BacctVO bacctVO); // 계좌 추가
	public int bacctUpdate(BacctVO bacctVO); // 계좌 수정
	public int bacctDelete(int bacct); // 계좌 삭제
	
	public List<CommonCodeVO> commonBankList(); // 공통코드 등록된 은행목록 조회
	
}
