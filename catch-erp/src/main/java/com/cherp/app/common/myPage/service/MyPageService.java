package com.cherp.app.common.myPage.service;

import com.cherp.app.empl.vo.EmployeeVO;

public interface MyPageService {
	
	public EmployeeVO getEmployeeInfo(String employeeName); //시큐리티 세션에서 얻은 회원아이디로 회원이름, 이미지 조회함
}
