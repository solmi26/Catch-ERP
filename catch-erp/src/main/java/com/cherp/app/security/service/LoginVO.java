package com.cherp.app.security.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class LoginVO implements UserDetails {

	private EmployeeLoginVO employeeLoginVO;
	
	public LoginVO(EmployeeLoginVO employeeLoginVO) {
		this.employeeLoginVO = employeeLoginVO;
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();
		for (String role : employeeLoginVO.getEmployeeRole()) {
			list.add(new SimpleGrantedAuthority(role));
		}
		return list;
	}

	@Override
	public String getPassword() {
		return employeeLoginVO.getPassword();
	}

	@Override
	public String getUsername() {
		return employeeLoginVO.getEmployeeId();
	}

	@Override
	public boolean isAccountNonExpired() { // 계정 만료 여부
		return true;
	}

	@Override
	public boolean isAccountNonLocked() { // 계정 잠금 여부
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() { // 계정의 패스워드 만료 여부
		return true;
	}

	@Override
	public boolean isEnabled() { // 계정의 사용 여부
		return true;
	}

}
