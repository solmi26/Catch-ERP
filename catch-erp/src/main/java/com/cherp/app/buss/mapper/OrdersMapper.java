package com.cherp.app.buss.mapper;

import com.cherp.app.buss.vo.OrdersVO;
import org.apache.ibatis.annotations.Param;
import org.hibernate.query.Order;

import java.util.List;

public interface OrdersMapper {
	// 발주서 전체 조회
	public List<OrdersVO> selectOrders();

	public List<OrdersVO> selectClientOrder(@Param("clientName") String clientName);
}
