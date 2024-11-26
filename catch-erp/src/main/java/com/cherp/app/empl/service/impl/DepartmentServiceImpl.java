package com.cherp.app.empl.service.impl;

import org.springframework.stereotype.Service;

import com.cherp.app.empl.mapper.DepartmentMapper;
import com.cherp.app.empl.service.DepartmentService;
import com.cherp.app.empl.vo.DepartmentVO;
@Service
public class DepartmentServiceImpl implements DepartmentService {
	
	private DepartmentMapper mapper;
	
	
	public DepartmentServiceImpl(DepartmentMapper mapper) {
		this.mapper = mapper;
	}
	
	
	public int departmentInsert(DepartmentVO department) {
		return mapper.insertDepartment(department);
	}
}
