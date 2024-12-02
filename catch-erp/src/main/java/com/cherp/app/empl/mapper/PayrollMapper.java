package com.cherp.app.empl.mapper;

import java.util.List;

import com.cherp.app.common.dto.EmployeeSearchDto;
import com.cherp.app.empl.vo.PayrollVO;

public interface PayrollMapper {
	public List<PayrollVO> selectAllPayrollList (EmployeeSearchDto search);
	public PayrollVO selectPayroll (String salaryNumber);
	public int updatePayroll (PayrollVO payroll);
	public int deletePayroll (String[] salartNumber);
}
