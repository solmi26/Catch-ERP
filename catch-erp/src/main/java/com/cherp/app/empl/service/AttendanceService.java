package com.cherp.app.empl.service;
/**
 * @
 */
import java.util.List;

import com.cherp.app.common.dto.EmployeeSearchDto;
import com.cherp.app.empl.vo.AttItemVO;
import com.cherp.app.empl.vo.AttendanceVO;

public interface AttendanceService {

	public List<AttendanceVO> attendanceList(EmployeeSearchDto search);//근태 다건조회
	public AttendanceVO attendanceInfo(String attnedanceHistoryCode);//근태 단건조회
	public int attendanceInsert(List<AttendanceVO> attendace);//근태기록 다중기록
	public int attendanceUpdate(AttendanceVO attendance);
	public int attendanceDelete(String[] attHistoryCode);
}
