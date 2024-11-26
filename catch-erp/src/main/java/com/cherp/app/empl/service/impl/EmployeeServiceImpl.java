package com.cherp.app.empl.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cherp.app.common.dto.EmployeeSearchDto;
import com.cherp.app.common.vo.CommonCodeVO;
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
	public List<EmployeeVO> employeeList(EmployeeSearchDto search) {
		return employeemapper.selectAllEmployeeList(search);
	}
	
	@Override
	public EmployeeVO employeeInfo(EmployeeVO employee) {
		return employeemapper.seleectEmployee(employee);
	}
	@Override
	public int employeeInsert(EmployeeVO employee) {
		return employeemapper.insertEmployee(employee);
	}
	@Override
	public List<CommonCodeVO> commonCodeList(CommonCodeVO commonCode) {
		return employeemapper.selectCommonCodeList(commonCode);
	}
}
