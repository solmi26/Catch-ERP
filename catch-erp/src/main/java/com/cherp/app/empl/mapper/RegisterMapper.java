package com.cherp.app.empl.mapper;

import java.util.List;

import com.cherp.app.empl.vo.DepartmentVO;

public interface RegisterMapper {
	public List<DepartmentVO> selectAllDepartment ();
	public int insertDepartment(DepartmentVO department); //부서등록하기
}
