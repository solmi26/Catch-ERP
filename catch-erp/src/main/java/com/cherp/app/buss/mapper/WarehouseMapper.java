package com.cherp.app.buss.mapper;

import com.cherp.app.buss.vo.WarehouseVO;

import java.util.List;

public interface WarehouseMapper {
	// 창고 전체 조회
	public List<WarehouseVO> selectWhList();

	// 창고별 제품 수량 조회
	public WarehouseVO selectWhQuantity(String whCode);
}
