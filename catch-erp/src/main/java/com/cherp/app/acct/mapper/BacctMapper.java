package com.cherp.app.acct.mapper;

import java.util.List;

import com.cherp.app.acct.vo.BacctVO;
import com.cherp.app.common.vo.CommonCodeVO;

/**
 * 은행 계좌 Mapper
 */
public interface BacctMapper {
	public List<BacctVO> selectAllBacctList();		// 계좌 전체 조회
	public BacctVO selectBacct(BacctVO bacctVO); // 계좌 단건 조회
	public int insertBacct(BacctVO bacctVO); // 계좌 추가
	public int updateBacct(BacctVO bacctVO); // 계좌 수정
	public int deleteBacct(int bacct); // 계좌 삭제
	
	public List<CommonCodeVO> selectAllCommonBankList(); // 공통코드 등록된 은행목록 조회
}
