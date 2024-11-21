package com.cherp.app.empl.web.rest;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cherp.app.empl.service.EmployeeService;
import com.cherp.app.empl.vo.EmployeeVO;

import lombok.RequiredArgsConstructor;


@CrossOrigin
@RestController
@RequiredArgsConstructor
public class RestEmployeeController {

	final EmployeeService employeeService;
	
	@ResponseBody
	@GetMapping("test200")
	public List<EmployeeVO> test11 () {
		return employeeService.employeeList();
	} 

}
