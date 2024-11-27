package com.cherp.app.empl.service;

import java.util.List;

import com.cherp.app.empl.vo.AttItemVO;
import com.cherp.app.empl.vo.AttendanceVO;

public interface AttendanceService {
	public int attendanceInsert(List<AttendanceVO> attendace);//근태기록 다중기록
	
	
}
