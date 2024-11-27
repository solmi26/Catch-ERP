package com.cherp.app.empl.vo;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
@Data
public class AttendanceVO {
	private String employeeCode;
	private Date attendanceDate;
	private String attendanceTime;
	private String leaveTime;
	private Integer totalWorktime;
	private Integer overtimeWorktime;
	private Integer nightWorktime;
	private Integer weekendWorktime;
	private String attCode;
	private String attHistoryCode;
	
	
	//조인으로 추가될 컬럼
	private String name;
}
