package com.cherp.app.empl.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cherp.app.empl.mapper.EmployeeMapper;
import com.cherp.app.empl.service.EmployeeService;
import com.cherp.app.empl.vo.EmployeeVO;

@Service
public class EmployeeServiceImpl implements EmployeeService{

	private EmployeeMapper employeemapper;
	
	public EmployeeServiceImpl (EmployeeMapper employeemapper) {
		this.employeemapper = employeemapper;
	}
	
	@Override
	public List<EmployeeVO> employeeList() {
		return employeemapper.selectAllemployeeList();
	}
	
}
