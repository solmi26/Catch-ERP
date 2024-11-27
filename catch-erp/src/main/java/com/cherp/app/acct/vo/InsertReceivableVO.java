package com.cherp.app.acct.vo;

import lombok.Data;

@Data
public class InsertReceivableVO {
	private Integer recPrice; // 채권 감소 금액
	private String bacctCode; // 사용할 계좌 코드
	private String clientCode; // 채무관계 거래처 코드
	private String result; // out 결과값

}
