package com.cherp.app.buss.mapper;

import java.util.List;

import com.cherp.app.buss.vo.PurchaseChitVO;

public interface PurchaseChitMapper {
	
	// 구매전표 전표 상태별 조회 by sm
	public List<PurchaseChitVO> selectPurchaseChitState(String slipState);
}
