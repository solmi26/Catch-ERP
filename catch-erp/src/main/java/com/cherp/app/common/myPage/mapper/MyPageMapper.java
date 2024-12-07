package com.cherp.app.common.myPage.mapper;

import org.apache.ibatis.annotations.Param;

import com.cherp.app.common.myPage.vo.ModifiedInfoVO;
import com.cherp.app.empl.vo.EmployeeVO;

public interface MyPageMapper {
	public void updateEmployeeInfo (ModifiedInfoVO modifiedInfoVO); //사원정보수정
	public EmployeeVO selectEmployeeImage(@Param("employeeCode") String employeeCode);
}
