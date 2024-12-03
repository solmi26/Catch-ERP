package com.cherp.app.security.service.impl;


import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cherp.app.security.mapper.EmployeeLoginMapper;
import com.cherp.app.security.service.EmployeeLoginVO;
import com.cherp.app.security.service.LoginVO;


@Service
public class EmployeeUserDetailsService implements UserDetailsService{

	private EmployeeLoginMapper userMapper;
	
	public EmployeeUserDetailsService(EmployeeLoginMapper userMapper) {
		this.userMapper = userMapper;
	}
	
	@Override
	public UserDetails loadUserByUsername(String employeeId) throws UsernameNotFoundException {
		// Mapper를 활용해서 DB에 접근
		EmployeeLoginVO employeeVO = userMapper.getEmployeeInfo(employeeId);
		System.out.println(employeeVO);
		System.out.println("id : " + employeeVO.getId());
		List<String> emplRole =  userMapper.getEmployeeRole(employeeVO.getId());
		employeeVO.setEmployeeRole(emplRole);

		if(employeeVO == null) {
			throw new UsernameNotFoundException(employeeId);
		}
		return new LoginVO(employeeVO);
	}

}
