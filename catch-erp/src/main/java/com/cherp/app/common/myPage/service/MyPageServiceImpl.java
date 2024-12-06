package com.cherp.app.common.myPage.service;

import org.springframework.stereotype.Service;

import com.cherp.app.common.myPage.mapper.MyPageMapper;
import com.cherp.app.common.myPage.vo.ModifiedInfoVO;
import com.cherp.app.empl.vo.EmployeeVO;
import com.cherp.app.stck.web.StocksController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Service
public class MyPageServiceImpl implements MyPageService {
	
	private MyPageMapper myPageMapper;
	public MyPageServiceImpl(MyPageMapper myPageMapper) {
		this.myPageMapper = myPageMapper;
	}
	
	@Override
	public void modifyEmployeeInfo(ModifiedInfoVO modifiedInfoVO) {
		myPageMapper.updateEmployeeInfo(modifiedInfoVO);
	}

	@Override
	public EmployeeVO getEmployeeImage(String employeeCode) {
		return myPageMapper.selectEmployeeImage(employeeCode);
	}

}
