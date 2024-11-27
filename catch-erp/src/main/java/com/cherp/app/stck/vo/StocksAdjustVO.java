package com.cherp.app.stck.vo;

import lombok.Data;

@Data
public class StocksAdjustVO {
	
	private int purNo; 	        //구매내역번호
	private int saleslipNo;     //판매내역번호
	private String clientCode;  //사원 코드
	private int stocksStocks;   //증감수량
	private String itemCode;    //품목코드
	private String updateReason; //조정 사유
	
}
