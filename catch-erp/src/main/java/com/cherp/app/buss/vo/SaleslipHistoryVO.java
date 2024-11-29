package com.cherp.app.buss.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class SaleslipHistoryVO {
    private Long salesNo; // 판매 번호
    private String whCode; // 창고 코드
    private String whName; // 창고 명
    private String itemCode; // 품목 코드
    private String itemName; // 품목 명
    private int quantity; // 수량
    private int deliveryPrice; // 출고 단가
    private String deliveryStatus; // 출고 상태
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private Date deliveryDate; // 출하 예정일
    private String saleslipNo; // 판매전표 번호

    private int incompleteQuantity; // 미완료 수량

    private int price;
    private int supplyPrice; // 공급가액
    private int vat; // 부가세

}
