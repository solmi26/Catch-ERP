package com.cherp.app.empl.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cherp.app.empl.service.EmployeeService;
import com.cherp.app.empl.vo.EmployeeVO;

@Controller

public class EmployeesController {
	
	@Autowired
	EmployeeService employeeService;
	
	
	@GetMapping("employee")
	public String employeeList(Model model) {
		List<EmployeeVO> list = employeeService.employeeList();
		return "human/employeeList";
	}
	
	@ResponseBody
	@GetMapping("test200")
	public List<EmployeeVO> test11 () {
		return employeeService.employeeList();
	} 
	
}
