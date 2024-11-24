package com.cherp.app.buss.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class ClientVO {
    private String clientCode;		// 거래처 코드
    private String clientName;		// 거래처 명
    private String ceoName;			// 대표자 명
    private String tradeItem;		// 거래 품목
    private String tradeType;		// 거래 유형
    private String companyTel;		// 회사 전화
    private String fax;				// 팩스
    private String address;			// 주소
    private String employeeName;	// 담당자 이름
    private String employeeTel;		// 담당자 연락처
    private String employeeEmail;	// 담당자 메일
    private String clientBacct;		// 거래처 계좌
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private Date clientDate;		// 거래처 등록날짜
    private Integer balancek;		// 채권총잔액
    private Integer balancem;		// 채무총잔액
    private String state;			// 업태
    private String event;			// 종목
    private String summary;			// 적요
}
