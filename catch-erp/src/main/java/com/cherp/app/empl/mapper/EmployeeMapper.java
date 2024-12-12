
package com.cherp.app.empl.mapper;

import java.util.List;

import com.cherp.app.common.dto.EmployeeSearchDto;
import com.cherp.app.common.vo.CommonCodeVO;
import com.cherp.app.empl.vo.EmployeeVO;


public interface EmployeeMapper {
	//인사목록 페이지
	public List<EmployeeVO> selectAllEmployeeList(EmployeeSearchDto search); //인사정보 다건조회
	public EmployeeVO seleectEmployee(EmployeeVO employee); //인사정보 단건조회
	public int insertEmployee(EmployeeVO employee); //인사정보 입력
	public int updateEmployee(EmployeeVO employee); //인사정보 수정
	public List<CommonCodeVO> selectCommonCodeList(String[] commonCode); //공통코드 단건조회 
	
	public int deleteEmployee (String[] employeeCode);//인사기본삭제
	public int deleteEmployeeDetail (String[] employeeCode);//인사세부정보삭제
	public int deleteEmployeeSalary (String[] employeeCode);//인사급여정보삭제
	public int deleteFixed (String[] employeeCode); //고정수당삭제
	public int deleteAttHistory (String[] employeeCode);//근태기록삭제
	public int deleteSalaryPayroll (String[] employeeCode);//급여명세서삭제
	public int deleteAllowanceHistory (String[] employeeCode);//수당기록삭제
	public int insertBackUpPayroll (String[] employeeCode);//백업 급여테이블 입력
	public int insertBackUpAwhi (String[] employeeCode);//백업 수당기록테이블 입력
	
	
	public int updateStatusType (List<EmployeeVO> employee); //사원다건 퇴직처리
	public int updateEmployeeSalary (String employeeCode); //사원단건 소득세 재산정
	
	
	
}
