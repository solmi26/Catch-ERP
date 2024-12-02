package com.cherp.app.empl.vo;

import lombok.Data;

@Data
public class DepartmentVO {
	private String departmentCode;
	private String departmentName;
	private String managerCode;
	
	
	//조인으로 추가될 컬럼
	private String name;
}
