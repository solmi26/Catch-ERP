package com.cherp.app.security.controller;


import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.cherp.app.security.service.LoginVO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class SecurityController {
	@GetMapping("all")
	public void all() {
		
	}
	
	@GetMapping("user")
	public void user(@AuthenticationPrincipal UserDetails userDetails) {
		LoginVO loginVO = (LoginVO) userDetails;
		log.error(loginVO.getEmployeeLoginVO().toString());
	}
	
	@GetMapping("admin")
	public void admin(@AuthenticationPrincipal LoginVO loginVO) {
		log.error(loginVO.getEmployeeLoginVO().toString());
	}
	
	// 메인화면
	@GetMapping("/")
	public String indexPage() {
		return "index/main/login_index";
	}
	// 유저 로그인 화면
	@GetMapping("login/userLogin")
	public String userLogin() {
		System.out.println("login시도중");
		return "index/login/userLogin";
	}
	// 기본 index page 설정
	@GetMapping("index")
	public String goIndex() {
		return "sales/clientList";
	}
	
}
