package com.cherp.app.empl.vo;


import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;
@NoArgsConstructor // 기본생성자
@Data
public class EmployeeVO {
//인사기본정보
	private String employeeCode;
	private String employeeId;
	private String name;
	private Date hireDate;
	private String password;
	private String employeePosition;
	private String statusType;
	private Date resignationDate;
	private String hireType;
	private String departmentCode;
	
//인사세부정보
	private EmployeeDetailVO employeeDetailVO;
	
//인사급여정보
	
	private EmployeeSalaryVO employeeSalaryVO;
//  조인으로 추가할 컬럼들
	
	private String departmentName;
	
	
	
	
}
