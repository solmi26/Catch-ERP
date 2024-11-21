package com.cherp.app.empl.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.cherp.app.empl.service.EmployeeService;
import com.cherp.app.empl.vo.EmployeeVO;

@Controller

public class EmployeesController {
	
	@Autowired
	EmployeeService employeeService;
	
	
	@GetMapping("employee")
	public String employeeList(Model model) {
		return "human/employeeList";
	}
	

}
