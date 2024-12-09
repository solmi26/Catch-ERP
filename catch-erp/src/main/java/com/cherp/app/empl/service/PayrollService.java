package com.cherp.app.empl.service;

import java.util.List;
import java.util.Map;

import com.cherp.app.common.dto.EmployeeSearchDto;
import com.cherp.app.empl.vo.PayrollVO;


public interface PayrollService {
	public List<PayrollVO> payrollList (EmployeeSearchDto search);
	public List<PayrollVO> payrollInfo (String[] salaryNumber);
	public int payrollInsert(PayrollVO employee);
	public int payrollUpdate(PayrollVO payroll);
	public int payrollDelete(String[] salaryNumber);
	
	public int salaryCheckUpdate (String salaryCheck, List<PayrollVO> payroll);

}
