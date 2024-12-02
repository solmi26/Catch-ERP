package com.cherp.app.empl.mapper;

import java.util.List;
import java.util.Map;

import com.cherp.app.empl.vo.EmployeeHistoryVO;

public interface EmployeeHistoryMapper {
	public int insertEmployeeHistory(Map<String,List<EmployeeHistoryVO>> employeeHistory);
}
