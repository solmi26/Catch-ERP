package com.cherp.app.empl.vo;


import java.util.ArrayList;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;
import lombok.NoArgsConstructor;
@NoArgsConstructor // 기본생성자
@Data
public class EmployeeVO {
//인사기본정보
	private String employeeCode; //사원코드
	private String employeeId; //사원아이디
	private String name;  //사원명
	private Date hireDate;  //입사일
	private String password;  //비밀번호
	private String employeePosition;  //직위,직급 ex)사장,대리,부장,과장
	private String statusType; //재직 구분 ex) 재직 휴직 퇴직
	private Date resignationDate; //퇴사일
	private String hireType; //입사구분
	private String departmentCode;  //부서코드
	
//인사세부정보
	private EmployeeDetailVO employeeDetailVO; 
	
//인사급여정보
	
	private EmployeeSalaryVO employeeSalaryVO;
	
// 고정수당
	
	private ArrayList<FixedVO> fixedVO;
	
//  조인으로 추가할 컬럼들
	private String departmentName; //부서이름
	private String employeeImage; //사원이미지
	private String employeePositionName;//직급이름
	
	
	
}
