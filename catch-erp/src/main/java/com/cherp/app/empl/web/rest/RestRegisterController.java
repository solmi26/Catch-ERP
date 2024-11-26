package com.cherp.app.empl.web.rest;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cherp.app.empl.service.RegisterService;
import com.cherp.app.empl.vo.DepartmentVO;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class RestRegisterController {
	
	private final RegisterService service;
	
	//부서목록 조회
	@GetMapping("employees/dept")
	public List<DepartmentVO> departmentList() {
		return service.deapartmentList();
	}

	//부서등록
	@PostMapping("employees/dept")
	public Map<String,Object> departmentInsert (@RequestBody DepartmentVO department) {
		return service.departmentInsert(department);
	}
	
	
}
