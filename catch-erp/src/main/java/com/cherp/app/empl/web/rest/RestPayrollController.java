package com.cherp.app.empl.web.rest;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cherp.app.common.dto.EmployeeSearchDto;
import com.cherp.app.empl.service.PayrollService;
import com.cherp.app.empl.vo.PayrollVO;

import lombok.RequiredArgsConstructor;

@RestController

@RequiredArgsConstructor
public class RestPayrollController {
	
	private final PayrollService service;
	
	@GetMapping("/employees/payroll")
	public List<PayrollVO> payrollList (EmployeeSearchDto search) {
		return service.payrollList(search);
	} 
	
	
	@GetMapping("/employees/payroll/{salaryNumber}")
	public PayrollVO payrollInfo(@PathVariable(name="salaryNumber")String salaryNumber) {
		System.out.println(service.payrollInfo(salaryNumber));
		return service.payrollInfo(salaryNumber);
		
	}
	@PutMapping("/employees/payroll")
	public int payrollUpdate(@RequestBody PayrollVO payroll) {
		System.out.println();
		return service.payrollUpdate(payroll);
	}
	@DeleteMapping("/employees/payroll")
	public int payrollDelete (@RequestParam(value="salaryNumber") String[] salaryNumber) {
		return service.payrollDelete(salaryNumber);
	}
	
	
}
