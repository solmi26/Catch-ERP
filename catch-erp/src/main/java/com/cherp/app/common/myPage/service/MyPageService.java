package com.cherp.app.common.myPage.service;

import com.cherp.app.empl.vo.EmployeeVO;

public interface MyPageService {
	public void modifyEmployeeInfo(EmployeeVO employeeVO);  //사원정보수정
	public EmployeeVO getEmployeeImage(String employeeCode); //변경된 사진정보 불러오기
}
