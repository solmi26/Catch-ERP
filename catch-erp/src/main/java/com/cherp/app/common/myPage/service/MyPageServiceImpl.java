package com.cherp.app.common.myPage.service;

import org.springframework.stereotype.Service;

import com.cherp.app.common.myPage.mapper.MyPageMapper;
import com.cherp.app.empl.vo.EmployeeVO;

@Service
public class MyPageServiceImpl implements MyPageService {
	
	private MyPageMapper myPageMapper;
	public MyPageServiceImpl(MyPageMapper myPageMapper) {
		this.myPageMapper = myPageMapper;
	}
	
	
	//시큐리티 세션에서 얻은 회원아이디로 회원이름, 이미지 조회함
	@Override
	public EmployeeVO getEmployeeInfo(String employeeName) {
		return myPageMapper.selectEmployeeInfo(employeeName);
	}

}
