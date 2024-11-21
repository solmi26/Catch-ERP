package com.cherp.app.empl.vo;


import java.util.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@NoArgsConstructor // 기본생성자
@Getter
@Setter
@ToString
public class EmployeeVO {
//인사기본정보
	private String employeeCode;
	private String employeeNo;
	private String name;
	private Date hireDate;
	private String password;
	private String employeePosition;
	private String statusType;
	private Date resignationDate;
	private String hireType;
	private String departmentCode;

//인사세부정보
	private String engName;
	private String identityNumber;
	private String headHousehold;
	private String jobtitle;
	private String tel;
	private String phone;
	private String email;
	private String empStatus;
	private Number zipCode;
	private String address;
	private String detailAddr;
	private String accoount;
	private String depositor;
	private String employeeImage;
	private String bank;
	
	
//인사급여정보
	
	
//  부서명
	private String departmentName;
	
	
	
	
}
