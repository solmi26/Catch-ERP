package com.cherp.app.empl.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.cherp.app.common.dto.EmployeeSearchDto;
import com.cherp.app.common.vo.CommonCodeVO;
import com.cherp.app.empl.service.EmployeeService;
import com.cherp.app.empl.service.PayrollService;
import com.cherp.app.empl.service.RegisterService;
import com.cherp.app.empl.vo.AllowanceVO;
import com.cherp.app.empl.vo.DeductionsVO;
import com.cherp.app.empl.vo.DepartmentVO;
import com.cherp.app.empl.vo.EmployeeVO;
import com.cherp.app.empl.vo.PayrollVO;

@Controller

public class EmployeeController {
	
	@Autowired
	EmployeeService employeeService;
	@Autowired
	PayrollService payrollService;
	@Autowired
	RegisterService regService;
	
	//인사목록 페이지
	@Secured("ROLE_MANAGER,ROLE_EMPLOYEE")
	@GetMapping("employees/employee")
	public String employeeList(Model model) {
		EmployeeSearchDto search = new EmployeeSearchDto();
		search.setStatusType("m1");
		List<EmployeeVO> empList = employeeService.employeeList(search);
		String[] commonCode = {"0H","0I","0J","0K","0L","0M"};
		List<CommonCodeVO> comList = employeeService.commonCodeList(commonCode);
		List<DepartmentVO> deptList =  regService.deapartmentList();
		model.addAttribute("empList", empList);
		model.addAttribute("deptList", deptList);
		model.addAttribute("comList", comList);
		return "human/employeeList";
	}
	
	


	//근태조회페이지
	@GetMapping("employees/attendance")
	public String attendance() {
		return "human/attendanceList";
	}
	
	//근태입력페이지
	@GetMapping("employees/attendanceinput")
	public String attendanceInput () {
		return "human/attendanceInput";
	}
	

	
	
	//급여조회 페이지
	@GetMapping("employees/payment")
	public String paymentList (Model model) {
		EmployeeSearchDto search = new EmployeeSearchDto();
		List<PayrollVO> list = payrollService.payrollList(search);
		model.addAttribute("list",list);
		return "human/paymentList";
	}
	
	
	@GetMapping("employees/employeehisoryinput")
	public String employeeHistoryInput () {
		return "human/employeeHistoryInput";
	}
	
	
	
	//기초등록
	
	//부서목록 페이지
	@GetMapping("employees/department")
	public String departmentList() {
		return "human/departmentList";
	}	
	
	//근태항목등록페이지
	@GetMapping("employees/attendanceElementInput")
	public String attendanceElementInput (Model model) {
		String[] list = {"0I"};
		List<CommonCodeVO> ccList =  employeeService.commonCodeList(list);
		model.addAttribute("ccList", ccList);
		return "human/attendanceElementInput";
	}
	
	//수당항목페이지
	@GetMapping("employees/allowanceElement")
	public String allowanceElemnet(Model model) {
		List<AllowanceVO> list = regService.allowanceItemList();
		model.addAttribute("list", list);
		return "human/allowanceElement";
	}	
	//공제항목페이지
	@GetMapping("employees/deductionsItem")
	public String deductionsItem (Model model) {
		List<DeductionsVO> deduList = regService.deductionsItemList();
		List<DeductionsVO> incomeList = regService.incomeTaxList();
		model.addAttribute("deduList", deduList);
		model.addAttribute("incomeList", incomeList);
		return "human/deductionItem";
	}	

}
