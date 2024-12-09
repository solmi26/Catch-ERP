package com.cherp.app.empl.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cherp.app.common.dto.EmployeeSearchDto;
import com.cherp.app.empl.mapper.PayrollMapper;
import com.cherp.app.empl.service.PayrollService;
import com.cherp.app.empl.vo.PayrollVO;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class PayrollServiceImpl implements PayrollService {

	private final PayrollMapper mapper;
	
	
	@Override
	public List<PayrollVO> payrollList(EmployeeSearchDto search) {
		return mapper.selectAllPayrollList(search);
	}

	@Override
	public List<PayrollVO> payrollInfo(String[] salaryNumber) {
		return mapper.selectPayroll(salaryNumber);
	}

	@Override
	public int payrollInsert(PayrollVO employee) {
		return 0;
	}
	@Override
	public int payrollUpdate(PayrollVO payroll) {
		return mapper.updatePayroll(payroll);
	}
	@Override
	public int payrollDelete(String[] salaryNumber) {
		int history = mapper.deleteAllowanceHistory(salaryNumber);
		int payroll = mapper.deletePayroll(salaryNumber);
		return (payroll + history)/2;
	}
	@Override
	public int salaryCheckUpdate(String payrollCheck, List<PayrollVO> payroll) {
		Map<String, Object> map = new HashMap<>();
		map.put("payrollCheck", payrollCheck);
		map.put("payroll", payroll);
		System.out.println(map);
		return mapper.updateSalaryCheck(map);
	}
	@Override
	public int payrollInsert(String mode) {
		System.out.println(mode);
		if (mode.equals("create")) {
			return mapper.insertPayroll();
		}else if (mode.equals("replace")) {
			mapper.deleteMonthPayroll();
			return mapper.insertPayroll();			
		}
		return 0;
	}
	@Override
	public Map<String,Object> checkSalaryInfo() {
		int result = mapper.selectCheckPayroll();
		Map<String,Object> map = new HashMap<>();
		map.put("result", result);
		return map;
	}
}
