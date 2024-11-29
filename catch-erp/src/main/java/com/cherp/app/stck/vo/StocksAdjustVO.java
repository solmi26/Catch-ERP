package com.cherp.app.stck.vo;

import lombok.Data;

@Data
public class StocksAdjustVO {
	
	private Long purNo; 	          //구매내역번호
	private Long salesNo;     	  //판매내역번호
	private String employeeCode;  //사원 코드
	private Long stocksStocks;     //증감수량
	private String itemCode;      //품목코드
	private String updateReason;  //조정 사유
	
}
