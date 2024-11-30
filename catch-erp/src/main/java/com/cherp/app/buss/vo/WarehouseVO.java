package com.cherp.app.buss.vo;

import lombok.Data;

@Data
public class WarehouseVO {
    private String whCode; // 창고 코드
    private String whPlace; // 창고 장소
    private String whName; // 창고 이름
    private String whType; // 창고 타입
    
    // 매입계약품목
    private String itemCode; // 품목 코드
    private int stocksQuantity; // 재고
}
