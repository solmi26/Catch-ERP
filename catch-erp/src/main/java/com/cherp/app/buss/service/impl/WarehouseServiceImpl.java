package com.cherp.app.buss.service.impl;

import com.cherp.app.buss.mapper.WarehouseMapper;
import com.cherp.app.buss.service.WarehouseService;
import com.cherp.app.buss.vo.WarehouseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WarehouseServiceImpl implements WarehouseService {

    private WarehouseMapper warehouseMapper;

    @Autowired
    public WarehouseServiceImpl(WarehouseMapper warehouseMapper) {
        this.warehouseMapper = warehouseMapper;
    }

    @Override
    public List<WarehouseVO> whList() {
        return warehouseMapper.selectWhList();
    }

    @Override
    public WarehouseVO whQuantity(String whCode, String itemCode) {
        return warehouseMapper.selectWhQuantity(whCode, itemCode);
    }

}
