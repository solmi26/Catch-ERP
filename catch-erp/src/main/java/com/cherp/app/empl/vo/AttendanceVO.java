package com.cherp.app.empl.vo;

import java.util.Date;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
@Data
public class AttendanceVO {
	private String employeeCode;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date attendanceDate;
	@DateTimeFormat(pattern = "HH:mm")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
	private Date attendanceTime;
	@DateTimeFormat(pattern = "HH:mm")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
	private Date leaveTime;
	@DateTimeFormat(pattern = "HH:mm")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
	private Date totalWorktime;
	@DateTimeFormat(pattern = "HH:mm")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
	private Date overtimeWorktime;
	@DateTimeFormat(pattern = "HH:mm")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
	private Date nightWorktime;
	@DateTimeFormat(pattern = "HH:mm")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
	private Date weekendWorktime;
	private String attCode;
	private String attHistoryCode;
	
	
	//조인으로 추가될 컬럼
	private String name;
	private String attName;
	private String employeeId;
}
