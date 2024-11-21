package com.cherp.app.empl.web.rest;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.cherp.app.empl.service.EmployeeService;
import com.cherp.app.empl.vo.EmployeeVO;

import lombok.RequiredArgsConstructor;


@CrossOrigin
@RestController
@RequiredArgsConstructor
public class RestEmployeeController {

	final EmployeeService employeeService;
	
	//사원목록 데이터
	@GetMapping("emps")
	public List<EmployeeVO> employeeList () {
		return employeeService.employeeList();
	} 
	
	//사원 단건데이터    
	@GetMapping("emps/{employeeCode}")  //패스바리어블에 name 정의해주지않으면 컴파일일러가 변수명을 인식못하는 경우가 자주있음.
	public EmployeeVO employeeInfo(@PathVariable(name = "employeeCode") String employeeCode) {
		EmployeeVO emp = new EmployeeVO();
		emp.setEmployeeCode(employeeCode);
		return employeeService.employeeInfo(emp);
	}
	
	
	
}
