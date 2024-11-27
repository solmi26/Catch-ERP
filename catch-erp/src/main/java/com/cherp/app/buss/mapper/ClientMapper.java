package com.cherp.app.buss.mapper;

import com.cherp.app.acct.vo.ClientPsVO;
import com.cherp.app.buss.vo.ClientVO;

import java.util.List;

public interface ClientMapper {
	// 거래처 전체 조회
	public List<ClientVO> selectClientList();
	
	public List<ClientPsVO> gwSelectAllClientList();     // 거래처 목록 조회 - GW
}
