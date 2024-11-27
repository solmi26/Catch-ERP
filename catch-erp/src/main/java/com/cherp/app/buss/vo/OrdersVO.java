package com.cherp.app.buss.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class OrdersVO {
    private String orderNo; // 발주번호
    private String clientCode; // 거래처 코드
    private String clientName; // 거래처 이름
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private Date orderDate; // 발주일자
    private String employeeCode; // 사원 코드
    private String name; // 사원 이름
    private String itemCode; // 품목 코드
    private String itemName; // 품목 이름
    private int quantity; // 수량
    private int price; // 단가
    private int supplyPrice; // 공급가액
    private int vat;

    // 출고 단가 포함 유무 고민..
}