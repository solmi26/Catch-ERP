package com.cherp.app.empl.web.rest;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	
	
	@GetMapping("/employees/payroll/sel")
	public List<PayrollVO> payrollInfo(@RequestParam(value="salaryNumber")String[] salaryNumber) {
		return service.payrollInfo(salaryNumber);
		
	}
	@PutMapping("/employees/payroll")
	public int payrollUpdate(@RequestBody PayrollVO payroll) {
		return service.payrollUpdate(payroll);
	}
	@DeleteMapping("/employees/payroll")
	public int payrollDelete (@RequestParam(value="salaryNumber") String[] salaryNumber) {
		return service.payrollDelete(salaryNumber);
	}
	
	@GetMapping("/employees/pay")
	public int payrollInsert (@RequestParam(value="mode")String mode) {
		return service.payrollInsert(mode);
	}
	
	@GetMapping("/employees/payrollcheck")
	public Map<String,Object> salaryCheckInfo() {
		return service.checkSalaryInfo();
	}
	
	
	@PutMapping("/employees/salaryCheck/{payrollCheck}")
	public int updateSalaryCheck(@PathVariable(name="payrollCheck") String payrollCheck,
			                     @RequestBody List<PayrollVO> payroll) {
		return service.salaryCheckUpdate(payrollCheck, payroll);
		
	}
	
	
}
