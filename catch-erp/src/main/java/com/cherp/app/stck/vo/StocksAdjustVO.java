package com.cherp.app.stck.vo;

import lombok.Data;

@Data
public class StocksAdjustVO {
	
	/* 재고조정 프로시저 인자로 넘기기 위한 DB등록 VO클래스 */
	private Long purNo; 	          //구매내역번호
	private Long salesNo;     	  //판매내역번호
	private String employeeCode;  //사원 코드
	private Long stocksStocks;     //증감수량
	private String itemCode;      //품목코드
	private String updateReason;  //조정 사유
	private Long currentQuantity; //조정전 수량
	
	/* DBMS에는 등록하지 않은 필드 */
	//private String itemName; //품목 명 => 재고조정보고서 재조회 시 필요
}
