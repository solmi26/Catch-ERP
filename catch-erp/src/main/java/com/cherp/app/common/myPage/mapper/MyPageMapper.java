package com.cherp.app.common.myPage.mapper;

import org.apache.ibatis.annotations.Param;

import com.cherp.app.empl.vo.EmployeeVO;

public interface MyPageMapper {
	public void updateEmployeeInfo (EmployeeVO employeeVO);
	public EmployeeVO selectEmployeeImage(@Param("employeeCode") String employeeCode);
}
