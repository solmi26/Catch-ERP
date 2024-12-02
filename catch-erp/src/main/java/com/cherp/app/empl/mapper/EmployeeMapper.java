
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
}
