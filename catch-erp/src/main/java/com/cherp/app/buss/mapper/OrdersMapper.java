package com.cherp.app.buss.mapper;

import com.cherp.app.buss.vo.OrdersVO;

import java.util.List;

public interface OrdersMapper {
	// 창고 전체 조회
	public List<OrdersVO> selectOrders();
}
