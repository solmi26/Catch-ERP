
package com.cherp.app.empl.mapper;

import java.util.List;

import com.cherp.app.empl.vo.EmployeeVO;


public interface EmployeeMapper {
	public List<EmployeeVO> selectAllEmployeeList();
	public EmployeeVO seleectEmployee(EmployeeVO employee);
}
