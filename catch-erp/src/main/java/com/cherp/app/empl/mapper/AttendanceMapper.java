package com.cherp.app.empl.mapper;

import java.util.List;

import com.cherp.app.empl.vo.AttItemVO;
import com.cherp.app.empl.vo.AttendanceVO;

public interface AttendanceMapper {
	public int insertAttendance (List<AttendanceVO> attendace);//근태기록 등록
	
	
}
