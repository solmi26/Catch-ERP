package com.cherp.app.buss.web;

import com.cherp.app.buss.service.WarehouseService;
import com.cherp.app.buss.vo.WarehouseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestWarehouseController {

    private WarehouseService warehouseService;

    @Autowired
    public RestWarehouseController(WarehouseService warehouseService) {
        this.warehouseService = warehouseService;
    }

    @GetMapping("whList")
    public List<WarehouseVO> whList(){
        return warehouseService.whList();
    }

    @GetMapping("/quantity/{whCode}")
    public WarehouseVO whQuantity(@PathVariable String whCode){
        return warehouseService.whQuantity(whCode);
    }

}
