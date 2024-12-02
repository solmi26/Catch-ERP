package com.cherp.app.empl.service;

import java.util.List;

import com.cherp.app.empl.vo.EmployeeHistoryVO;

public interface EmployeeHistoryService {
		public int employeeHistoryInsert(List<EmployeeHistoryVO> employeeHistory);
}
