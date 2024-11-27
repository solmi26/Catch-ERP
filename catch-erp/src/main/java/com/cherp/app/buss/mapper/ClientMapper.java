package com.cherp.app.buss.mapper;

import com.cherp.app.buss.vo.ClientVO;

import java.util.List;

public interface ClientMapper {
	// 거래처 전체 조회
	public List<ClientVO> selectClientList();
}
