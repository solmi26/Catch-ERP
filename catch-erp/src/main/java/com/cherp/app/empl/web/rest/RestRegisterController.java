package com.cherp.app.empl.web.rest;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cherp.app.empl.service.RegisterService;
import com.cherp.app.empl.vo.AllowanceVO;
import com.cherp.app.empl.vo.AttItemVO;
import com.cherp.app.empl.vo.DeductionsVO;
import com.cherp.app.empl.vo.DepartmentVO;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class RestRegisterController {
	
	private final RegisterService service;
	

	
	/**
	 * 
	 * @return 전체부서의 vo타입을 반환합니다 
	 */
	//부서목록 조회
	@GetMapping("employees/dept")
	public List<DepartmentVO> departmentList() {
		return service.deapartmentList();
	}
	
	//부서 단건조회    
	@GetMapping("employees/dept/{departmentCode}")  //패스바리어블에 name 정의해주지않으면 컴파일일러가 변수명을 인식못하는 경우가 자주있음.
	public DepartmentVO employeeInfo(@PathVariable(name = "departmentCode") String departmentCode) {
		DepartmentVO department = new DepartmentVO();
		department.setDepartmentCode(departmentCode);
		
		return service.departmentInfo(department);
	}
	//부서 단건수정
	@PutMapping("employees/dept")
	public int departmentUpdate (@RequestBody DepartmentVO department) {
		return service.departmentUpdate(department);	
	}
	//부서등록
	@PostMapping("employees/dept")
	public Map<String,Object> departmentInsert (@RequestBody DepartmentVO department) {
		return service.departmentInsert(department);
	}
	
	//부서삭제
	@DeleteMapping("employees/dept")
	public int departmentDelete (@RequestParam(value="departmentCode")String[] department) {
		return service.departmentDelete(department);
	}
	
	
	
	//근태항목 다건조회
	@GetMapping("/employees/attitem")
	public List<AttItemVO> attItemList () {
		return service.attItemList();
	}
	//근태항목 단건조회
	@GetMapping("/employees/attItem/{attCode}")
	public AttItemVO attItemInfo(@PathVariable(name="attCode") String attCode) {
		return service.attItmeInfo(attCode);
	}
	
	//근태항목 등록
	@PostMapping("/employees/attitem")
	public int attItemInsert(@RequestBody AttItemVO attitem) {
		return service.attItemInsert(attitem);
	}
	
	//근태항목 수정
	@PutMapping("/employees/attitem")
	public int attItemUpdate(@RequestBody AttItemVO attitem) {
		return service.attItemUpdate(attitem);
	}
	
	//근태항목 다건삭제
	@DeleteMapping("/employees/attitem")
	public int attItemDelete(@RequestParam(value="attCode") String[] attItem) {
		return service.attItemDelete(attItem);
	}
	
	
	
	//수당항목 조회
	@GetMapping("/employees/allItem")
	public List<AllowanceVO> allowanceItemList () {
		return service.allowanceItemList();
	}
	//수당항목 단건조회
	@GetMapping("/employees/allItem/{allowanceCode}")
	public AllowanceVO allowanceItemInfo(@PathVariable(name="allowanceCode") String allitem) {
		return service.allowanceItemInfo(allitem);
	}
	
	//수당항목 등록
	@PostMapping("/employees/allItem")
	public int allowanceItemInsert(@RequestBody AllowanceVO allitem) {
		return service.allowanceItemInsert(allitem);
	}
	
	//수당항목 수정
	@PutMapping("/employees/allItem")
	public int allowanceUpdate(@RequestBody AllowanceVO allitem) {
		return service.allowanceItemUpdate(allitem);
	}
	
	//수당항목 다건삭제
	@DeleteMapping("/employees/allItem")
	public int allowanceItemDelete(@RequestParam(value="allowanceCode") String[] allItem) {
		return service.allowanceItemDelete(allItem);
	}
	
	
	//공제항목
	//수당항목 조회
	@GetMapping("/employees/deduItem")
	public List<DeductionsVO> deductionsItemList () {
		return service.deductionsItemList();
	}
	//소득세항목 조회
	@GetMapping("/employees/income")
	public List<DeductionsVO> incomeTaxList () {
		return service.incomeTaxList();
	}
	//수당항목 단건조회
	@GetMapping("/employees/deduItem/{deductionsCode}")
	public DeductionsVO deductionsItemInfo(@PathVariable(name="deductionsCode") String deductionsCode) {
		return service.deductionsItemInfo(deductionsCode);
	}
	//수당항목 수정
	@PutMapping("/employees/deduItem")
	public int deductionsItemUpdate(@RequestBody DeductionsVO deductionsItem) {
		return service.deductionsItemUpdate(deductionsItem);
	}
	
	
	
}
