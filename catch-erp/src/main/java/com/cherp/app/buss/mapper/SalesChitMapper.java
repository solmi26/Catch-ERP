package com.cherp.app.buss.mapper;

import com.cherp.app.buss.vo.ClientVO;
import com.cherp.app.buss.vo.SalesChitVO;

import java.util.List;

public interface SalesChitMapper {
	// 거래처 전체 조회
	public int insertSalesChit(SalesChitVO salesChitVO);
}
