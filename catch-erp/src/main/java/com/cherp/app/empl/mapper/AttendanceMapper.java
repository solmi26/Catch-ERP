package com.cherp.app.empl.mapper;

import java.util.List;
import java.util.Map;

import com.cherp.app.empl.vo.AttendanceVO;

public interface AttendanceMapper {
	public int insertAttendance (Map<String,List<AttendanceVO>> attendanceVO);//근태기록 다건등록
	
	
}
