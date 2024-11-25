package com.cherp.app.buss.mapper;

import com.cherp.app.buss.vo.AcntAcctVO;

import java.util.List;

public interface AcntAcctMapper {
	// 창고 전체 조회
	public List<AcntAcctVO> selectAcntList();
}
