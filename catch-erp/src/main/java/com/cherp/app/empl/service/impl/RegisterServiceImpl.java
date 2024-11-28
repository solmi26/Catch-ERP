package com.cherp.app.empl.service.impl;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cherp.app.empl.mapper.RegisterMapper;
import com.cherp.app.empl.service.RegisterService;
import com.cherp.app.empl.vo.AttItemVO;
import com.cherp.app.empl.vo.DepartmentVO;
@Service
public class RegisterServiceImpl implements RegisterService {
	
	private RegisterMapper mapper;
	
	
	public RegisterServiceImpl(RegisterMapper mapper) {
		this.mapper = mapper;
	}
	
	//부서목록 조회
	@Override
	public List<DepartmentVO> deapartmentList() {
		return mapper.selectAllDepartment();
	}
	//부서단건조회
	@Override
	public DepartmentVO departmentInfo(DepartmentVO department) {
		return mapper.selectDepartment(department);
	}
	//부서단건수정
	@Override
	public int departmentUpdate(DepartmentVO department) {
		return mapper.updateDepartment(department);
	}
	//부서 등록
	public Map<String,Object> departmentInsert(DepartmentVO department) {
		//Map<String,Object> map = new HashMap<>();
		int result = mapper.insertDepartment(department);
		//map.put("result",result);
		return Collections.singletonMap("result",result);
	}
	//부서삭제
	@Override
	public int departmentDelete(String[] department) {
		return mapper.deleteDepartment(department);
	}
	
	
	//근태항목 다건조회
	@Override
	public List<AttItemVO> attItemList() {
		return mapper.selectAttItemList();
	}
	//근태항목 단건조회
	@Override
	public AttItemVO attItmeInfo(String attCode) {
		return mapper.selectAttItem(attCode);
	}
	//근태항목등록
	@Override
	public int attItemInsert(AttItemVO attItem) {
		return mapper.insertAttItem(attItem);
	}
	//근태항목수정
	@Override
	public int attItemUpdate(AttItemVO attItem) {
		return mapper.updateAttItem(attItem);
	}
	//근태항목 다건삭제
	@Override
	public int attItemDelete(String[] attItem) {
		return mapper.deleteAttItem(attItem);
	}

}
