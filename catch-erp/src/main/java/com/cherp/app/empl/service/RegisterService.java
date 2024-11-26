package com.cherp.app.empl.service;

import java.util.List;
import java.util.Map;

import com.cherp.app.empl.vo.DepartmentVO;

public interface RegisterService {
	public List<DepartmentVO> deapartmentList();
	public Map<String,Object> departmentInsert(DepartmentVO department);
	
}
