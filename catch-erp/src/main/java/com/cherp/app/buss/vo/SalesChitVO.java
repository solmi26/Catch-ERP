package com.cherp.app.buss.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class SalesChitVO {
    private String saleslipNo; // 판매전표 번호
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private Date insertDate; // 입력 일자
    private String clientCode; // 거래처 코드
    private String clientName; // 거래처 명
    private String accCode; // 매출계정 코드
    private String depBacct; // 입금 계좌
    private int supply_price; // 공급가 액
    private String salesSummary; // 판매 적요
    private String employeeName; // 담당자 명
    private String employeeCode; // 사원 코드
    private int vat; // 부가세
}
