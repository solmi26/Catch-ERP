package com.cherp.app.empl.vo;

import lombok.Data;

@Data
public class FixedVO {
	
	private String fixedNo; //고정수당번호
	private int allowancePrice;  //수당액
	private String allowanceCode;  //수당번호
	
	//조인으로 추가할 컬럼 (수당항목테이블)
	private String allowanceName; //수당명
	private String allowanceCheck;//과세여부

}
