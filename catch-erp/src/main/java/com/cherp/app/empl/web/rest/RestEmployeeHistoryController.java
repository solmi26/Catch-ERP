package com.cherp.app.empl.web.rest;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cherp.app.empl.service.EmployeeHistoryService;
import com.cherp.app.empl.vo.EmployeeHistoryVO;

import lombok.RequiredArgsConstructor;
@RestController
@RequiredArgsConstructor

public class RestEmployeeHistoryController {
	private final EmployeeHistoryService service;
	
	@PostMapping("employees/emphistory")
	public int employeeHistoryInsert (@RequestBody List<EmployeeHistoryVO> employeeHistory) {
		return service.employeeHistoryInsert(employeeHistory);
	}
}
