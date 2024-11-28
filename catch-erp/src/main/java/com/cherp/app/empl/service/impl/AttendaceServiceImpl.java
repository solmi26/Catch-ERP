package com.cherp.app.empl.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cherp.app.common.dto.EmployeeSearchDto;
import com.cherp.app.empl.mapper.AttendanceMapper;
import com.cherp.app.empl.service.AttendanceService;
import com.cherp.app.empl.vo.AttendanceVO;
@Service
public class AttendaceServiceImpl implements AttendanceService {
	
	AttendanceMapper mapper;
	
	public AttendaceServiceImpl(AttendanceMapper mapper) {
		this.mapper = mapper;
	}
	//근태 다건조회
	@Override
	public List<AttendanceVO> attendanceList(EmployeeSearchDto search) {
		return mapper.selectAttendanceList(search);
	}
	
	//근태 단건조회
	@Override
	public AttendanceVO attendanceInfo(String attnedanceHistoryCode) {
		return mapper.selectAttendance(attnedanceHistoryCode);
	}
	
	//근태입력
	@Override
	public int attendanceInsert(List<AttendanceVO> attendance) {
		Map<String,List<AttendanceVO>> map = new HashMap<>();
		map.put("ATTELE",attendance);
		return mapper.insertAttendance(map);
	}
	
	//근태수정
	@Override
	public int attendanceUpdate(AttendanceVO attendance) {
		return mapper.updateAttendance(attendance);
	}
	
	//근태 다건삭제
	public int attendanceDelete(String[] attHistoryCode) {
		return mapper.deleteAttendance(attHistoryCode);
	}
}
