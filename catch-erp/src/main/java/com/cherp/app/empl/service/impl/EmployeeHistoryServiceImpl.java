package com.cherp.app.empl.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cherp.app.empl.mapper.EmployeeHistoryMapper;
import com.cherp.app.empl.service.EmployeeHistoryService;
import com.cherp.app.empl.vo.EmployeeHistoryVO;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor

public class EmployeeHistoryServiceImpl implements EmployeeHistoryService {
	
	private final EmployeeHistoryMapper mapper; 
	
	@Override
	public int employeeHistoryInsert(List<EmployeeHistoryVO> employeeHistory) {
		Map<String,List<EmployeeHistoryVO>> map = new HashMap<>();
		map.put("employeeHistory", employeeHistory);
		return mapper.insertEmployeeHistory(map);
	}
}
