package com.cherp.app.empl.vo;

import lombok.Data;

@Data
public class DeductionsVO {
	private String deductionsCode;
	private String deductionsName;
	private Double deductionsDeductible;
	private Integer minval;
	private Long maxval;
	private Integer incomeTax;
	private int count;
}
