package com.cherp.app.stck.vo;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class StocksVO {
	private Long realNo;		 	  // 입출고 번호 (PK)
	private int stocksStocks;		  // 재고 증감
	private String updateReason;	  // 재고변동 사유
	@DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date regDate;			  // 등록 날짜
	private String stocksStocksCheck; // 재고증감 여부
	private String employeeCode;      // 재고 조정사원 (누가 조정작업을 하였느냐)
	private String whCode;			  // 창고 코드
	private String itemCode;		  // 품목 코드
	private String logNo;			  // 내역 번호(구매내역, 판매내역)
	private int stocksQuantity;		  // 재고 수량(조정전의 수량을 의미
	private int stocksAdjustNo; 	  // 재고 조정 번호 (동시에 처리되는 재고조정건수들은 같은 재고조정번호를 가짐.)
	
	/* 재고조정내역 불러올 때 필요 */
	private String slipNo; // 전표번호
	
}
