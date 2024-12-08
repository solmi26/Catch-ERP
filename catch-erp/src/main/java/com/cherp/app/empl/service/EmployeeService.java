package com.cherp.app.empl.service;

import java.util.List;

import com.cherp.app.common.dto.EmployeeSearchDto;
import com.cherp.app.common.vo.CommonCodeVO;
import com.cherp.app.empl.vo.EmployeeVO;

public interface EmployeeService {
	public List<EmployeeVO> employeeList (EmployeeSearchDto search);
	public EmployeeVO employeeInfo (EmployeeVO employee);
	public int employeeInsert(EmployeeVO employee);
	public int employeeUpdate(EmployeeVO employee);
	public List<CommonCodeVO> commonCodeList(String[] commonCode);
	public int employeeDelete (String[] employeeCode);
	
	public int statusTypeUpdate (List<EmployeeVO> employee);
	
}
