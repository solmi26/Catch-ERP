package com.cherp.app.buss.mapper;

import java.util.List;

import com.cherp.app.buss.vo.SalesChitVO;

public interface SalesChitMapper {
	// 거래처 전체 조회
	public int insertSalesChit(SalesChitVO salesChitVO);
	
	// 판매전표 전체 조회
	public List<SalesChitVO> selectSalesChit();
	
	// 판매전표 전표상태별 조회
	public List<SalesChitVO> selectSalesChitState(String slipState);
}
