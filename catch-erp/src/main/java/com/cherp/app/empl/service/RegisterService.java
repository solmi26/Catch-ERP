package com.cherp.app.empl.service;

import java.util.List;
import java.util.Map;

import com.cherp.app.empl.vo.AttItemVO;
import com.cherp.app.empl.vo.DepartmentVO;
import com.cherp.app.empl.vo.FixedVO;

public interface RegisterService {
	public List<DepartmentVO> deapartmentList(); //부서전체조회
	public DepartmentVO departmentInfo(DepartmentVO deaprtment); //부서단건조회
	public int departmentUpdate(DepartmentVO department);
	public Map<String,Object> departmentInsert(DepartmentVO department);//부서 등록
	public int departmentDelete(String[] department);//부서 삭제
	
	
	public List<AttItemVO> attItemList();//근태항목 단건조회
	public AttItemVO attItmeInfo(String attCode);//근태항목 단건조회
	public int attItemInsert(AttItemVO attItem);//근태항목 등록
	public int attItemUpdate (AttItemVO attItem);//근태항목 수정
	public int attItemDelete (String[] attItem); //근태항목 다건삭제
	
	
	public List<FixedVO> allowanceItemList();
}
