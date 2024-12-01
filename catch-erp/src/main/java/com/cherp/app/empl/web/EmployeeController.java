package com.cherp.app.empl.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.cherp.app.common.dto.EmployeeSearchDto;
import com.cherp.app.empl.service.EmployeeService;
import com.cherp.app.empl.service.PayrollService;
import com.cherp.app.empl.vo.PayrollVO;

@Controller

public class EmployeeController {
	
	@Autowired
	EmployeeService employeeService;
	@Autowired
	PayrollService payrollService;
	
	//인사목록 페이지
	@GetMapping("employees/employee")
	public String employeeList(Model model) {
		EmployeeSearchDto search = new EmployeeSearchDto();
		model.addAttribute("search", search);
		
		return "human/employeeList";
	}
	
	


	//근태조회페이지
	@GetMapping("employees/attendance")
	public String attendance() {
		return "human/attendanceList";
	}
	
	//근태입력페이지
	@GetMapping("employees/attendanceinput")
	public String attendanceInput () {
		return "human/attendanceInput";
	}
	

	
	
	//급여조회 페이지
	@GetMapping("employees/payment")
	public String paymentList (Model model) {
		EmployeeSearchDto search = new EmployeeSearchDto();
		List<PayrollVO> list = payrollService.payrollList(search);
		model.addAttribute("list",list);
		return "human/paymentList";
	}
	
	
	@GetMapping("employees/employeehisoryinput")
	public String employeeHistoryInput () {
		return "human/employeeHistoryInput";
	}
	
	
	
	//기초등록
	
	//부서목록 페이지
	@GetMapping("employees/department")
	public String departmentList() {
		return "human/departmentList";
	}	
	
	//근태항목등록페이지
	@GetMapping("employees/attendanceElementInput")
	public String attendanceElementInput () {
		return "human/attendanceElementInput";
	}
	
}
