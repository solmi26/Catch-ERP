package com.cherp.app.buss.service.impl;

import com.cherp.app.buss.mapper.OrdersMapper;
import com.cherp.app.buss.service.OrdersService;
import com.cherp.app.buss.vo.OrdersVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdersServiceImpl implements OrdersService {

    private OrdersMapper ordersMapper;

    @Autowired
    public OrdersServiceImpl(OrdersMapper ordersMapper) {
        this.ordersMapper = ordersMapper;
    }

    @Override
    public List<OrdersVO> ordersList() {
        return ordersMapper.selectOrders();
    }
}
