package com.cherp.app.acct.web;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.cherp.app.acct.service.ContractService;
import com.cherp.app.stck.vo.ContractItemVO;

import lombok.RequiredArgsConstructor;

/**
 * 매입 단가 계약 관리, 등록 컨트롤러
 */

@RequiredArgsConstructor
@Controller
public class ContractController {
	private final ContractService conService;
	
    @Value("${file.upload.path}")
    private String uploadPath;
	
	// 매입 단가 계약 등록
	@Secured("ROLE_USER")
	@PostMapping("sales/insertContract")
	@ResponseBody
	public String insertContract(@RequestPart("contract") ContractItemVO contractVO,
	        					 @RequestPart(value = "file", required = false) MultipartFile file) {
	   // 파일 업로드 처리
		if(file != null && !file.isEmpty()) {
			// 날짜별 디렉토리 생성
			String folderPath = makeFolder();
			String  originalFilename = file.getOriginalFilename();
			String filePath = uploadPath + File.separator + folderPath + File.separator + originalFilename;
			
			File dest = new File(filePath);
			try {
				file.transferTo(dest);
			} catch (IllegalStateException | IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
            // VO에 파일 경로 설정
	        String dbFilePath = folderPath.replace(File.separator, "/") + "/" + originalFilename;
	        contractVO.setUrl(dbFilePath);
		}
		
	   conService.insertContract(contractVO);
	   
	    return "등록 성공";
	}
	
    // 날짜별 디렉토리 생성
    private String makeFolder() {
        String str = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
        String folderPath = str.replace("/", File.separator);

        File uploadPathFolder = new File(uploadPath, folderPath);
        if (!uploadPathFolder.exists()) {
            uploadPathFolder.mkdirs();
        }

        return folderPath;
    }
}
