package com.cherp.app.empl.vo;

import java.util.Date;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@NoArgsConstructor // 기본생성자
@Getter
@ToString
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
	
	
	
	
	public void setEmployeeCode(String employeeCode) {
		this.employeeCode = employeeCode;
	}
	
	public void setAttendanceDate(Date attendanceDate) {
		this.attendanceDate = attendanceDate;
	}
	public void setAttendanceTime(Date attendanceTime) {
		this.attendanceTime = attendanceTime;
	}
	public void setLeaveTime(Date leaveTime) {
		this.leaveTime = leaveTime;
	}
	public void setTotalWorktime(Date totalWorktime) {
		this.totalWorktime = totalWorktime;
	}
	public void setOvertimeWorktime(Date overtimeWorktime) {
		this.overtimeWorktime = overtimeWorktime;
	}
	public void setNightWorktime(Date nightWorktime) {
		this.nightWorktime = nightWorktime;
	}
	public void setWeekendWorktime(Date weekendWorktime) {
		this.weekendWorktime = weekendWorktime;
	}
	public void setAttCode(String attCode) {
		this.attCode = attCode;
	}
	public void setAttHistoryCode(String attHistoryCode) {
		this.attHistoryCode = attHistoryCode;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setAttName(String attName) {
		this.attName = attName;
	}
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	
	
}
