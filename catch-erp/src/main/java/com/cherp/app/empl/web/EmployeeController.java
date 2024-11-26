package com.cherp.app.empl.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.cherp.app.common.dto.EmployeeSearchDto;
import com.cherp.app.empl.service.EmployeeService;

@Controller

public class EmployeeController {
	
	@Autowired
	EmployeeService employeeService;
	
	//인사목록 페이지
	@GetMapping("employees/employee")
	public String employeeList(Model model) {
		EmployeeSearchDto search = new EmployeeSearchDto();
		search.setEmployeeName("gd");
		model.addAttribute("search", search);
		
		return "human/employeeList";
	}
	
	
	//부서목록 페이지
	@GetMapping("employees/department")
	public String departmentList() {
		return "human/departmentList";
	}

}
