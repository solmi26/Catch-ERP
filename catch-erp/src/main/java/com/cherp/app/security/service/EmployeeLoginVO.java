package com.cherp.app.security.service;


import java.util.Date;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor // 기본생성자
@Data
public class EmployeeLoginVO{
//인사기본정보
	private String employeeCode; //사원코드
	private String employeeId; //사원아이디
	private String name;  //사원명
	private Date hireDate;  //입사일
	private String password;  //비밀번호
	private String employeePosition;  //직위,직급 ex)사장,대리,부장,과장
	private String statusType; //재직 구분 ex) 재직 휴직 퇴직
	private Date resignationDate; //퇴사일
	private String hireType; //입사일
	private String departmentCode;  //부서코드

	/*Spring Security*/
	private List<String> employeeRole; // 사원 권한

}
