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
	public int salaryCheckUpdate(String salaryCheck, List<PayrollVO> payroll) {
		Map<String, Object> map = new HashMap<>();
		map.put("salaryCheck", salaryCheck);
		map.put("payroll", payroll);
		return mapper.updateSalaryCheck(map);
	}

}
