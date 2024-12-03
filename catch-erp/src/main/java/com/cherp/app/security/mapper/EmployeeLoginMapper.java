package com.cherp.app.security.mapper;

import java.util.List;

import com.cherp.app.security.service.EmployeeLoginVO;

public interface EmployeeLoginMapper {
	public EmployeeLoginVO getEmployeeInfo(String employeeId);
	
	public List<String> getEmployeeRole(int id);
}
