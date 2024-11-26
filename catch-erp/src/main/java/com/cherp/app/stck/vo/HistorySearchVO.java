package com.cherp.app.stck.vo;

import lombok.Data;

@Data
public class HistorySearchVO {
	private String clientInput;
	private String clientHiddenInput;
	private String humanInput;
	private String humanHiddenInput;
	private String itemInput;
	private String itemHiddenInput;
}
