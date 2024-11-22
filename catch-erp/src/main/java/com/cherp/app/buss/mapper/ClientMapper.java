package com.cherp.app.buss.mapper;

import com.cherp.app.acct.vo.BacctVO;
import com.cherp.app.buss.vo.ClientVO;
import com.cherp.app.common.vo.CommonCodeVO;

import java.util.List;

public interface ClientMapper {
	// 거래처 전체 조회
	public List<ClientVO> selectClientList();
}
