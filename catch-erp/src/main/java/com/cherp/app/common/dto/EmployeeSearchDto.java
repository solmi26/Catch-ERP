package com.cherp.app.common.dto;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;
@Data
public class EmployeeSearchDto {
	private String employeePosition; 
	private String employeeName;
	private String employeeId; 
	private String departmentCode; 
	private String statusType; 
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date hireDateStart;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date hireDateEnd;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date resignationDateStart;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date resingationDateEnd;
	@DateTimeFormat(pattern = "yyyy-MM")
	private Date payrollYStart;
	@DateTimeFormat(pattern = "yyyy-MM")
	private Date payrollYEnd;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date attendanceDateStart;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date attendanceDateEnd;
	
}
