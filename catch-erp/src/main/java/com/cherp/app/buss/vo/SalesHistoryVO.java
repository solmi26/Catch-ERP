package com.cherp.app.buss.vo;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
/*판매내역 [sales_history] VO*/
@Data
public class SalesHistoryVO {

	private Long salesNo; 		   // 판매 번호
	private String whCode; 		   // 창고 코드
	private String whName; 		   // 창고 명
	private String itemCode; 	   // 품목 코드
	private String itemName; 	   // 품목 명
	private int quantity; 		   // 수량
	private int deliveryPrice;     // 입고 단가
	private String deliveryStatus; // 출고 상태
	@DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date deliveryDate;     // 출하 예정일
	private String saleslipNo;     // 판매전표 번호
	private int incompleteQuantity; // 미완료수량
	
	/* 판매전표 [sales_chit] 컬럼*/
	private String clientCode; 	   // 거래처 코드
	private String clientName; 	   // 거래처 명
	private String employeeCode;   // 사원 코드
	private String employeeName;   // 사원 이름
	/* 매입계약 품목 [contract_item] 컬럼*/
	private int stocksQuantity; // 재고 수량
	
	/* 창고별 재고수량 [stocks] 테이블에서 서브쿼리로 얻을 AS 컬럼*/
	private int currentQuantity; // 현 재고 수량
}
