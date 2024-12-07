package com.cherp.app.common.myPage.web;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cherp.app.common.myPage.service.MyPageService;
import com.cherp.app.common.myPage.vo.ModifiedInfoVO;
import com.cherp.app.empl.service.EmployeeService;
import com.cherp.app.empl.vo.EmployeeVO;
import com.cherp.app.security.service.LoginVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class myPageController {
	
	@Value("${file.upload.path}")
	private String uploadPath;
	
	private final EmployeeService employeeService;
	private final MyPageService myPageService;
	
	//마이페이지 초기정보 로딩 (3개탭 모두)
	@Secured("ROLE_MANAGER,ROLE_NAME,ROLE_EMPLOYEE,ROLE_BUSINESS,ROLE_SALES,ROLE_STOCK") 
	@GetMapping("/myPage")
	public String myPage(Model model) { 
		LoginVO loginVO = (LoginVO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		EmployeeVO employeeCodeVO = new EmployeeVO();  
		employeeCodeVO.setEmployeeCode("133"); //loginVO.getEmployeeLoginVO().getEmployeeCode()
		EmployeeVO employeeVO = employeeService.employeeInfo(employeeCodeVO); //나의 사원정보
		
		model.addAttribute("employeeVO", employeeVO);
		return "index/main/myPage";
	}
	
	@PostMapping("/modifyEmployeeInfo")
	@ResponseBody
	public void modifyEmployeeInfo(@RequestPart("imageFile") MultipartFile imageFile, ModifiedInfoVO modifiedInfoVO){
		System.out.println("이미지내놔" + imageFile);
		System.out.println(modifiedInfoVO);
		//저장경로 설정
		String fileName = imageFile.getOriginalFilename();
		//날짜 폴더생성
		String folderPath = makeFolder();
		//UUID 고유값 보장
		String uuid = UUID.randomUUID().toString();
		//저장되는 파일 이름 중간에 _를 이용하여 구분
		String uploadFileName = folderPath + File.separator + uuid + "_" + fileName;
		String saveName = uploadPath + File.separator + uploadFileName;
		Path savePath = Paths.get(saveName); //Paths.get() => 특정경로의 파일반환 (경로정의)

		try {
			imageFile.transferTo(savePath);
        } catch (Exception e) {
            e.printStackTrace();
        }
		
		//DB 저장 처리
		modifiedInfoVO.setEmployeeImage(setImagePath(uploadFileName)); 
		myPageService.modifyEmployeeInfo(modifiedInfoVO);
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
	
	//나의 사진 조회
	@GetMapping("/employeeDetailInfo/{employeeCode}")
	@ResponseBody
	public EmployeeVO getEmployeeImage (@PathVariable("employeeCode") String employeeCode) {
		return myPageService.getEmployeeImage(employeeCode);
	}
}
