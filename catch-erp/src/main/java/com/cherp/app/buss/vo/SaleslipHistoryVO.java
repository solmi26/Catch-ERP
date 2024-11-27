package com.cherp.app.buss.vo;

import lombok.Data;

import java.util.Date;

@Data
public class SaleslipHistoryVO {
    private int salesNo; // 판매 번호
    private String whCode; // 창고 코드
    private String whName; // 창고 명
    private String itemCode; // 품목 코드
    private String itemName; // 품목 명
    private int quantity; // 수량
    private int deliveryPrice; // 출고 단가
    private String deliveryStatus; // 출고 상태
    private Date deliveryDate; // 출하 예정일
    private String saleslipNo; // 판매전표 번호
    private String acc; // 매출계정
    private int incompleteQuantity; // 미완료 수량
}
