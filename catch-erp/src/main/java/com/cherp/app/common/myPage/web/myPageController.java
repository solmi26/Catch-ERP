package com.cherp.app.common.myPage.web;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.cherp.app.empl.service.EmployeeService;
import com.cherp.app.empl.vo.EmployeeVO;
import com.cherp.app.security.service.LoginVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class myPageController {
	
	private final EmployeeService employeeService;
	
	@GetMapping("/myPage")
	public String myPage(Model model) { 
		LoginVO loginVO = (LoginVO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		EmployeeVO employeeCodeVO = new EmployeeVO();
		employeeCodeVO.setEmployeeCode(loginVO.getEmployeeLoginVO().getEmployeeCode());
		EmployeeVO employeeVO = employeeService.employeeInfo(employeeCodeVO); //나의 사원정보
		
		System.out.println(employeeVO);
		model.addAttribute("employeeVO", employeeVO);
		return "index/main/myPage";
	}
}
