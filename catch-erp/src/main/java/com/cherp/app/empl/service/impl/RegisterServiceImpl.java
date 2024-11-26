package com.cherp.app.empl.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cherp.app.empl.mapper.RegisterMapper;
import com.cherp.app.empl.service.RegisterService;
import com.cherp.app.empl.vo.DepartmentVO;
@Service
public class RegisterServiceImpl implements RegisterService {
	
	private RegisterMapper mapper;
	
	
	public RegisterServiceImpl(RegisterMapper mapper) {
		this.mapper = mapper;
	}
	
	//부서 등록
	public Map<String,Object> departmentInsert(DepartmentVO department) {
		Map<String,Object> map = new HashMap<>();
		int result = mapper.insertDepartment(department);
		map.put("result",result);
		return map;
	}
	//부서목록 조회
	@Override
	public List<DepartmentVO> deapartmentList() {
		return mapper.selectAllDepartment();
	}
}
