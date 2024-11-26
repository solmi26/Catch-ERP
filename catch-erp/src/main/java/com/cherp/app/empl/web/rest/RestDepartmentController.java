package com.cherp.app.empl.web.rest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cherp.app.empl.service.DepartmentService;
import com.cherp.app.empl.vo.DepartmentVO;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class RestDepartmentController {
	
	private final DepartmentService service;
	
	@PostMapping("employees/dept")
	public int departmentInsert (@RequestBody DepartmentVO department) {
		return service.departmentInsert(department);
	}
	
}
