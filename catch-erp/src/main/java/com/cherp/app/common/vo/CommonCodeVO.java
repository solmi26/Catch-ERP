package com.cherp.app.common.vo;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class CommonCodeVO {			// 공통 코드 테이블
	private String codeRule;		// 부여 규칙
	private String commonName;		// 공통 코드 명
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date updateDate;		// 수정 일자
	private String commonCode;		// 공통 코드
}
