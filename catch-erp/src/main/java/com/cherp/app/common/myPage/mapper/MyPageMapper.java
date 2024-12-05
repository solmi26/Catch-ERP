package com.cherp.app.common.myPage.mapper;

import com.cherp.app.empl.vo.EmployeeVO;

public interface MyPageMapper {
	public EmployeeVO selectEmployeeInfo(String employeeName); //시큐리티 세션에서 얻은 회원아이디로 회원이름, 이미지 조회함
}
