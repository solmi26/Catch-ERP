package com.cherp.app.empl.mapper;

import java.util.List;

import com.cherp.app.common.dto.EmployeeSearchDto;
import com.cherp.app.empl.vo.PayrollVO;

public interface PayrollMapper {
	public List<PayrollVO> selectAllPayrollList (EmployeeSearchDto search); //다건 조회
	public List<PayrollVO> selectPayroll (String[] salaryNumber); //선택된 건 조회
	public int updatePayroll (PayrollVO payroll); //수정
	public int deletePayroll (String[] salartNumber); //삭제
}
