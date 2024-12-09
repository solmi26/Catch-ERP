package com.cherp.app.acct.web;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.cherp.app.acct.service.ContractService;
import com.cherp.app.stck.vo.ContractItemVO;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

/**
 * 매입 단가 계약 관리, 등록 컨트롤러
 */

@RequiredArgsConstructor // 생성자 자동 생성
@Controller
public class ContractController {
	
	// 서비스 계층 주입
	private final ContractService conService;
	
    @Value("${file.upload.path}") // application.properties에서 파일 업로드 경로를 가져옴.
    private String uploadPath;
	
	// 매입 계약 전체 조회 페이지(화면) by sm
	@Secured("ROLE_MANAGER,ROLE_SALES")
	@GetMapping("sales/selectContractView")
	public String contractView(Model model) {
		return "account/contract";
	}
	
    // 매입 계약 전체 조회 페이지(기능) by sm
    @Secured("ROLE_MANAGER,ROLE_SALES") // 권한 설정
	@GetMapping("sales/selectContract")
    @ResponseBody
	public List<ContractItemVO> selectContracts() {
	    return conService.contractList();
	}
    
    // 매입 계약 상세 조회 페이지(기능) by sm
    @Secured("ROLE_MANAGER,ROLE_SALES") // 권한 설정
	@GetMapping("sales/infoContract")
    @ResponseBody
	public ContractItemVO infoContract(@RequestParam("conNo") String conNo) {
	    return conService.contractInfo(conNo);
	}
    
	// 매입 계약 등록 페이지(화면) by sm
	@Secured("ROLE_MANAGER,ROLE_SALES")
	@GetMapping("sales/insertContractView")
	public String insertContractView(Model model) {
		return "account/contractInsert";
	}
	
	 /**
     * 매입 단가 계약 수정 처리 메서드(기능)  by sm
     * @param contractVO 클라이언트에서 전달받은 계약 정보
     * @param file 클라이언트에서 전달받은 첨부 파일
     * @return 처리 결과 메시지
     */
    @Secured("ROLE_MANAGER,ROLE_SALES") // 권한 설정
	@PostMapping("sales/updateContract")
	@ResponseBody // HTTP 응답으로 문자열 반환.
	public String updateContract(@RequestPart("contract") ContractItemVO contractVO,
	        					 @RequestPart(value = "file", required = false) MultipartFile file) {
       
        // 파일 삭제 처리
        if (Boolean.TRUE.equals(contractVO.getDeleted())) {
            ContractItemVO existingContract = conService.contractInfo(contractVO.getConNo());
            if (existingContract != null && existingContract.getUrl() != null) {
                String existingFilePath = uploadPath + File.separator + existingContract.getUrl().replace("/", File.separator);
                File existingFile = new File(existingFilePath);

                if (existingFile.exists()) {
                    existingFile.delete(); // 기존 파일 삭제
                }
                
                contractVO.setUrl(null); // URL 제거
            }
        }

    	
    	// 파일 업로드 처리
		if(file != null && !file.isEmpty()) {  // 파일이 존재하고 비어 있지 않은 경우에 처리.
			// 날짜별 디렉토리 생성
			String folderPath = makeFolder();
			String  originalFilename = file.getOriginalFilename(); // 파일 원본 이름 가져오기.
			
			 // 파일 저장 경로 설정
			String uniqueFilename = UUID.randomUUID().toString() + "_" + originalFilename;
		    String filePath = uploadPath + File.separator + folderPath + File.separator + uniqueFilename;
			
			// 파일 객체 생성 및 저장
			File dest = new File(filePath);
			try {
				file.transferTo(dest);  // MultipartFile 객체의 데이터를 파일로 저장.
			} catch (IllegalStateException | IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			
			
			// VO에 DB에 저장할 파일 경로 설정
	        String dbFilePath = folderPath.replace(File.separator, "/") + "/" + originalFilename;
	        contractVO.setUrl(dbFilePath);
		}
		
	    // 상태 초기화
	    contractVO.setDeleted(false);
		
		// DB에 저장
	   conService.updateContract(contractVO);
	   
	    return "수정 성공";
	}
    
    /**
     * 매입 단가 계약 등록 처리 메서드(기능)  by sm
     * @param contractVO 클라이언트에서 전달받은 계약 정보
     * @param file 클라이언트에서 전달받은 첨부 파일
     * @return 처리 결과 메시지
     */
    @Secured("ROLE_MANAGER,ROLE_SALES") // 권한 설정
	@PostMapping("sales/insertContract")
	@ResponseBody // HTTP 응답으로 문자열 반환.
	public String insertContract(@RequestPart("contract") ContractItemVO contractVO,
	        					 @RequestPart(value = "file", required = false) MultipartFile file) {
	   // 파일 업로드 처리
		if(file != null && !file.isEmpty()) {  // 파일이 존재하고 비어 있지 않은 경우에 처리.
			// 날짜별 디렉토리 생성
			String folderPath = makeFolder();
			String  originalFilename = file.getOriginalFilename(); // 파일 원본 이름 가져오기.
			
			 // 파일 저장 경로 설정
			String uniqueFilename = UUID.randomUUID().toString() + "_" + originalFilename;
		    String filePath = uploadPath + File.separator + folderPath + File.separator + uniqueFilename;
			
			// 파일 객체 생성 및 저장
			File dest = new File(filePath);
			try {
				file.transferTo(dest);  // MultipartFile 객체의 데이터를 파일로 저장.
			} catch (IllegalStateException | IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			// VO에 DB에 저장할 파일 경로 설정
	        String dbFilePath = folderPath.replace(File.separator, "/") + "/" + originalFilename;
	        contractVO.setUrl(dbFilePath);
		}
		
		// DB에 저장
	   conService.insertContract(contractVO);
	   
	    return "등록 성공";
	}
	
    /**
     * 날짜별 디렉토리 생성 메서드 by sm
     * @return 생성된 디렉토리 경로
     */
    private String makeFolder() {
    	
    	// 1. 오늘 날짜를 yyyy/MM/dd 포맷으로 문자열 생성.
        String str = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
        // 2. 경로 구분자로 변경.
        String folderPath = str.replace("/", File.separator);
        // 3. 업로드 경로에 해당 디렉토리 생성.
        File uploadPathFolder = new File(uploadPath, folderPath);
        if (!uploadPathFolder.exists()) { // 해당 경로가 존재하지 않는 경우에만 디렉토리 생성.
            uploadPathFolder.mkdirs();
        }
        // 4. 생성된 디렉토리 경로 반환.
        return folderPath;
    }
    
    // 파일 다운로드 처리
    @RequestMapping("/fileDownload")
    public void fileDownload(@RequestParam String file,
                             HttpServletResponse response) throws IOException {
        File f = new File(uploadPath, file);
        // file 다운로드 설정
        response.setContentType("application/download");
        response.setContentLength((int)f.length());
        response.setHeader("Content-disposition", "attachment;filename=\"" + file + "\"");
        // response 객체를 통해서 서버로부터 파일 다운로드
        OutputStream os = response.getOutputStream();
        // 파일 입력 객체 생성
        FileInputStream fis = new FileInputStream(f);
        FileCopyUtils.copy(fis, os);
        fis.close();
        os.close();
    }
}
