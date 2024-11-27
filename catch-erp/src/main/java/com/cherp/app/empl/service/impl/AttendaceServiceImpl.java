package com.cherp.app.empl.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cherp.app.empl.mapper.AttendanceMapper;
import com.cherp.app.empl.service.AttendanceService;
import com.cherp.app.empl.vo.AttendanceVO;
@Service
public class AttendaceServiceImpl implements AttendanceService {
	
	AttendanceMapper mapper;
	
	public AttendaceServiceImpl(AttendanceMapper mapper) {
		this.mapper = mapper;
	}
	
	@Override
	public int attendanceInsert(List<AttendanceVO> attendance) {
		Map<String,List<AttendanceVO>> map = new HashMap<>();
		map.put("attendanceVO",attendance);
		return mapper.insertAttendance(map);
	}
	
	
}
