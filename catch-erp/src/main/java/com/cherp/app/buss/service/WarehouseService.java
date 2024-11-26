package com.cherp.app.buss.service;

import com.cherp.app.buss.vo.WarehouseVO;

import java.util.List;

public interface WarehouseService {
    // 창고 전체 조회
    public List<WarehouseVO> whList();

    public WarehouseVO whQuantity(String whCode);
}
