package com.cherp.app.acct.vo;

import lombok.Data;

@Data
public class ClientSearchVO {
	private String clientCodeInput;	// 검색용 거래처 코드
	private String clientNameInput; // 검색용 거래처 이름
	private Integer minPrice;		// 검색용 거래처 채권,채무 최소
	private Integer maxPrice;		// 검색용 거래처 채권,채무 최대
}
