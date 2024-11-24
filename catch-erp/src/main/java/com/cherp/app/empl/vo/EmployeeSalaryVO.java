package com.cherp.app.empl.vo;

import lombok.Data;

@Data
public class EmployeeSalaryVO {
	
	//인사급여정보
	private int annualSalary; //연봉
	private int monthlySalary; //월급
	private int timeSalary; //시급
	private int incomeInvoice; //소득세
	private int leaveLeave;  //무급휴가비
	private int healthInsurance;  //건상보험료
}
