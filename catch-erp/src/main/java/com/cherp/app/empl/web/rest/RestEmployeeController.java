package com.cherp.app.empl.web.rest;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cherp.app.common.dto.EmployeeSearchDto;
import com.cherp.app.common.vo.CommonCodeVO;
import com.cherp.app.empl.service.EmployeeService;
import com.cherp.app.empl.vo.EmployeeVO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

/**
 * 사원관리
 * 유석진
 * 2024.11.27
 */

@RestController
@RequiredArgsConstructor
public class RestEmployeeController {

	@Value("${file.upload.path}")
	private String uploadPath;
	
	private final EmployeeService employeeService;
	
	/**
	 * 
	 * @param search
	 * @return
	 */
	//사원목록 데이터
	@GetMapping("employees/emps")
	public List<EmployeeVO> employeeList (EmployeeSearchDto search) {
		System.out.println(search);
		return employeeService.employeeList(search);
	} 
	
	//사원 단건데이터    
	@GetMapping("employees/emps/{employeeCode}")  //패스바리어블에 name 정의해주지않으면 컴파일일러가 변수명을 인식못하는 경우가 자주있음.
	public EmployeeVO employeeInfo(@PathVariable(name = "employeeCode") String employeeCode) {
		EmployeeVO emp = new EmployeeVO();
		emp.setEmployeeCode(employeeCode);
		return employeeService.employeeInfo(emp);
	}
	
	//사원단건데이터 추가
	@PostMapping("employees/emps")
	public int employeeInsert (@RequestPart(value="imageFile",required = false) MultipartFile imageFile, @RequestParam(name="EmployeeVO") String employeeVO) throws JsonMappingException, JsonProcessingException {
		ObjectMapper obj = new ObjectMapper();
		EmployeeVO emp = obj.readValue(employeeVO, EmployeeVO.class);
		if (imageFile != null) {
			String fileName = imageFile.getOriginalFilename();
			String folderPath = makeFolder();
			String uuid = UUID.randomUUID().toString();
			String uploadFileName = folderPath + "/" + uuid + "_" + fileName;
			String saveName = uploadPath + "/" + uploadFileName;
			Path savePath = Paths.get(saveName);
			try {
				imageFile.transferTo(savePath);
				emp.getEmployeeDetailVO().setEmployeeImage(setImagePath(uploadFileName));
			} catch (Exception e) {
				e.printStackTrace();
			}			
		}
		//DB 저장 처리
		return employeeService.employeeInsert(emp);
	}
	//사원데이터 수정
	@PutMapping("employees/emps")
	public int employeeUpdate (@RequestPart(value="imageFile",required = false) MultipartFile imageFile, @RequestParam(name="EmployeeVO") String employeeVO) throws JsonMappingException, JsonProcessingException {
		ObjectMapper obj = new ObjectMapper();
		EmployeeVO emp = obj.readValue(employeeVO, EmployeeVO.class);
		System.out.println(emp);
		if (imageFile != null) {
			String fileName = imageFile.getOriginalFilename();
			String folderPath = makeFolder();
			String uuid = UUID.randomUUID().toString();
			String uploadFileName = folderPath + "/" + uuid + "_" + fileName;
			String saveName = uploadPath + "/" + uploadFileName;
			Path savePath = Paths.get(saveName);
			try {
				imageFile.transferTo(savePath);
				emp.getEmployeeDetailVO().setEmployeeImage(setImagePath(uploadFileName));
			} catch (Exception e) {
				e.printStackTrace();
			}			
		}
		return employeeService.employeeUpdate(emp);
	}
	
	
	@DeleteMapping("/employees/emps")
	public int employeeDelete (@RequestParam(value="employeeCode") String[] employeeCode) {
		return employeeService.employeeDelete(employeeCode);
	}
	
	//공통코드 검색 다건데이터
	@GetMapping("employees/empCommon")
	public List<CommonCodeVO> CommonCodeSelect (String[] commonCode) {
		return employeeService.commonCodeList(commonCode);
	}
	//사원다건 퇴직처리
	@PutMapping("employees/statusType")
	public int statusUpdate (@RequestBody List<EmployeeVO> employee) {
		return employeeService.statusTypeUpdate(employee);
	}
	
	
	/* 파일저장를 위한 private 메서드 */
	private String makeFolder() {
		String str = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
		// LocalDate를 문자열로 포멧
		String folderPath = str.replace("/", File.separator);
		File uploadPathFoler = new File(uploadPath, folderPath);
		// File newFile= new File(dir,"파일명");

		// 해당 경로의 존재유무를 확인
		if (uploadPathFoler.exists() == false) {
			// mkdirs(): 디렉토리의 상위 디렉토리가 존재하지 않을 경우에는 상위 디렉토리까지 모두 생성하는 함수
			uploadPathFoler.mkdirs();
		}
		return folderPath;
	}
	
	private String setImagePath(String uploadFileName) {
		return uploadFileName.replace(File.separator, "/");
	}	
}
