package com.cherp.app.common.myPage.vo;

import lombok.Data;

@Data
public class AttendanceSearchVO {
	private String employeeCode; //사원 코드
	private String yearCondition; //검색대상 년도
	private String monthCondition; //검색대상 월
}
