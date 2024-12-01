package com.cherp.app.empl.vo;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
@Data
public class EmployeeHistoryVO {
	private String ehNo;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")	
	private Date ehDate;
	private String ehType;
	private String employeeCode;
	private String prevPosition;
	private String assignedPosition;
	private String prevDepartment;
	private String assignedDepartment;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")	
	private Date standardDate;
}
