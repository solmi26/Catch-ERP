package com.cherp.app.security.mapper;

import com.cherp.app.security.service.EmployeeLoginVO;

public interface EmployeeLoginMapper {
	public EmployeeLoginVO getEmployeeInfo(String employeeId);
}
