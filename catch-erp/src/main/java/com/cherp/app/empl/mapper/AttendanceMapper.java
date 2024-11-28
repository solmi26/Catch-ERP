package com.cherp.app.empl.mapper;

import java.util.List;
import java.util.Map;

import com.cherp.app.common.dto.EmployeeSearchDto;
import com.cherp.app.empl.vo.AttendanceVO;

public interface AttendanceMapper {
	public List<AttendanceVO> selectAttendanceList (EmployeeSearchDto search);//근태다건조회
	public AttendanceVO selectAttendance (String attnedanceHistoryCode);//근태단건조회

	public int insertAttendance (Map<String,List<AttendanceVO>> attendanceVO);//근태기록 다건등록
	public int updateAttendance (AttendanceVO attendanceVO);
	public int deleteAttendance (String[] attHistoryCode);
	
}
