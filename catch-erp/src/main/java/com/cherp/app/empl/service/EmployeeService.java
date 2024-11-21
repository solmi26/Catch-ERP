package com.cherp.app.empl.service;

import java.util.List;

import com.cherp.app.empl.vo.EmployeeVO;

public interface EmployeeService {
	public List<EmployeeVO> employeeList ();
	public EmployeeVO employeeInfo (EmployeeVO employee);
}
