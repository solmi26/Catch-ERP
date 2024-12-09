package com.cherp.app.buss.web;

import com.cherp.app.buss.service.OrdersService;
import com.cherp.app.buss.vo.OrdersVO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestOrdersController {

    private OrdersService ordersService;

    public RestOrdersController(OrdersService ordersService){
        this.ordersService = ordersService;
    }

    // 발주서 조회
    @GetMapping("ordersList")
    public List<OrdersVO> ordersList() {
        return ordersService.ordersList();
    }

    @GetMapping("clientOrderList/{clientName}")
    public List<OrdersVO> clientOrderList(@PathVariable("clientName") String clientName) {
        return ordersService.selectClientOrder(clientName);
    }


}
