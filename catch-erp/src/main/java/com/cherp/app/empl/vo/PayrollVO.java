package com.cherp.app.empl.vo;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
@Data
public class PayrollVO {
	private String salaryNumber; //급여명세서 번호
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")	
	private Date   payrollYdate;  //귀속연월
	private int    monthlySalary; //급여(월급)
	private int    overtimeAllowance;//연장근무
	private int    nightAllowance;//야간근무
	private int    weekendAllowance;//주말근무
	private int    paymentTotal;//지급총액(비과세포함)
	private int    incomeTax;//소득세
	private int    localTax;//지방세
	private int    nationalInsurance;//국민연금
	private int    healthInsurance;//건강보험료
	private int    employmentInsurance;//고용보험료
	private int    leaveRate;//무급휴가비
	private int    deductionsTotal;//공제금액
	private int    realPay;//실급여액
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")	
	private Date   payrollSdate ;//근무시작일
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")	
	private Date   payrollEdate;//근무종료일
	private String employeeCode;//사원코드
	private int    notaxPayment;//지급총액(비과세미포함)
	
	//수당기록
	private ArrayList<AllowanceHistoryVO> allowanceHistoryVO;
	
	
	//조인으로 추가되는 컬럼들
	private String name; //사원명
	private String employeeId; //사원아이디
}
