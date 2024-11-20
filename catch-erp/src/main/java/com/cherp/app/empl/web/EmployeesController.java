package com.cherp.app.empl.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.cherp.app.empl.service.impl.EmployeeServiceImpl;

@Controller
public class EmployeesController {
	
	EmployeeServiceImpl employeeServiceImpl;
	
	public EmployeesController (EmployeeServiceImpl employeeServiceImpl) {
		this.employeeServiceImpl = employeeServiceImpl;
	}
	
	@GetMapping("employee")
	public String employeeList(Model model) {
		
		return "human/employeeList";
	}
	
	
}
