package com.cherp.app.acct.vo;

import lombok.Data;

@Data
public class AccountVO { 			// 계좌 테이블
	private Integer bacctCode;		// 계좌 코드
	private String bacctNo;			// 계좌 번호
	private String bacctName;		// 계좌 명
	private String bankName;		// 은행 명
	private String summary;			// 적요
}
