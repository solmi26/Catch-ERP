package com.cherp.app.security.service;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Role {
	MANAGER("ROLE_EMPL,ROLE_SALES,ROLE_STOCK,ROLE_USER"), // 회사 관리자
	EMPLOYEE("ROLE_EMPL"), // 인사팀
	BUSINESS("ROLE_BUSS"), // 영업팀
	SALES("ROLE_SALES"), // 회계팀
	STOCK("ROLE_STOCK"), // 물류팀
	ADMIN("ROLE_ADMIN");
	
	private String value;
	
}
