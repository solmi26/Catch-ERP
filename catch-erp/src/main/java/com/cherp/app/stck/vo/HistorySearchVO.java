package com.cherp.app.stck.vo;

import java.util.Date;

import lombok.Data;

@Data
public class HistorySearchVO {
	private String clientInput;
	private String clientHiddenInput;
	private String humanInput;
	private String humanHiddenInput;
	private String itemInput;
	private String itemHiddenInput;
	private String startDate;
	private String endDate;
}
