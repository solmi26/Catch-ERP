package com.cherp.app.stck.vo;

import java.util.Date;

import lombok.Data;

@Data
public class HistorySearchVO {
	private String clientInput; //거래처명
	private String clientHiddenInput; //거래처코드
	private String humanInput; //사원명
	private String humanHiddenInput; //사원코드
	private String itemInput; //품목명
	private String itemHiddenInput; //품목코드
	private String startDate; //조회시작일
	private String endDate; //조회종료일
}
