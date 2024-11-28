package com.cherp.app.acct.vo;

import lombok.Data;

@Data
public class InsertPayableVO {
	private Integer decreasePrice; // 채무 감소 금액
	private String bacctCode; // 사용할 계좌 코드
	private String clientCode; // 채무관계 거래처 코드
	private String result; // out 결과값

}
