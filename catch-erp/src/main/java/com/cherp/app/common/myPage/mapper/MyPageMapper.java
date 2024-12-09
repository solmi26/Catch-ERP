package com.cherp.app.common.myPage.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cherp.app.common.myPage.vo.AttendanceSearchVO;
import com.cherp.app.common.myPage.vo.ModifiedInfoVO;
import com.cherp.app.empl.vo.AttendanceVO;
import com.cherp.app.empl.vo.EmployeeVO;

public interface MyPageMapper {
	public void updateEmployeeInfo (ModifiedInfoVO modifiedInfoVO); //사원정보수정
	public EmployeeVO selectEmployeeImage(@Param("employeeCode") String employeeCode); //사원의 이미지 조회, 수정 후 즉시 바뀐것을 출력하기위함
	public List<AttendanceVO> selectAttendance(AttendanceSearchVO searchVO); //개인의 근태 정보 조회
}
