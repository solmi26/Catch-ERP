package com.cherp.app.acct.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor // 기본생성자
@Getter
@Setter
@ToString
public class BacctVO { 			// 계좌 테이블
	private Integer bacctCode;		// 계좌 코드
	private String bacctNo;			// 계좌 번호
	private String bacctName;		// 계좌 명
	private String bankName;		// 은행 명
	private String summary;			// 적요
}
