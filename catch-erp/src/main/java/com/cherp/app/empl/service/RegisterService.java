package com.cherp.app.empl.service;

import java.util.List;
import java.util.Map;

import com.cherp.app.empl.vo.AllowanceVO;
import com.cherp.app.empl.vo.AttItemVO;
import com.cherp.app.empl.vo.DeductionsVO;
import com.cherp.app.empl.vo.DepartmentVO;

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
	
	
	public List<AllowanceVO> allowanceItemList();
	public AllowanceVO allowanceItemInfo(String allowanceCode);//근태항목 단건조회
	public int allowanceItemInsert(AllowanceVO allowanceItem);//근태항목 등록
	public int allowanceItemUpdate (AllowanceVO allowanceItem);//근태항목 수정
	public int allowanceItemDelete (String[] allowanceItem); //근태항목 다건삭제

	public List<DeductionsVO> deductionsItemList(); //공제항목 다건조회
	public List<DeductionsVO> incomeTaxList(); //소득세 다건조회
	public DeductionsVO deductionsItemInfo(String deductionsCode);//공제항목 단건조회
	public int deductionsItemUpdate (DeductionsVO deductionsItem);//공제항목 수정

}
