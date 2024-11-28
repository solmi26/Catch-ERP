package com.cherp.app.empl.mapper;

import java.util.List;
import java.util.Map;

import com.cherp.app.empl.vo.AttItemVO;
import com.cherp.app.empl.vo.DepartmentVO;

public interface RegisterMapper {
	public List<DepartmentVO> selectAllDepartment ();
	public DepartmentVO selectDepartment(DepartmentVO department);//부서단건조회
	public int updateDepartment(DepartmentVO department);//부서 수정
	public int insertDepartment(DepartmentVO department); //부서등록하기
	public int deleteDepartment(String[] deparment);//부서 삭제
	
	
	public List<AttItemVO> selectAttItemList(); //근태항목 전체조회
	public int insertAttItem (AttItemVO attitem); //근태항목등록
	
}