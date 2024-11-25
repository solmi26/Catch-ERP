package com.cherp.app.common.dto;

import java.util.Date;

import lombok.Data;
@Data
public class EmployeeSearchDto {
	private String employeePosition;
	private String employeeName;
	private String employeeId;
	private String departmentCode;
	private String statusType;
	private Date hireDateStart;
	private Date hireDateEnd;
	private Date resignationDateStart;
	private Date resingationDateEnd;
}
