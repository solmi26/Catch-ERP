package com.cherp.app.buss.service;

import com.cherp.app.buss.vo.OrdersVO;

import java.util.List;

public interface OrdersService {
    public List<OrdersVO> ordersList();

    // 거래처별 발주소 조회
    public List<OrdersVO> selectClientOrder(String clientName);
}
