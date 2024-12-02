package com.cherp.app.stck.web.rest;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cherp.app.buss.service.ClientService;
import com.cherp.app.buss.vo.ClientVO;
import com.cherp.app.buss.vo.PurchaseHistoryVO;
import com.cherp.app.buss.vo.SalesHistoryVO;
import com.cherp.app.stck.service.StockService;
import com.cherp.app.stck.vo.ContractItemVO;
import com.cherp.app.stck.vo.HistorySearchVO;
import com.cherp.app.stck.vo.ItemSearchVO;
import com.cherp.app.stck.vo.StocksAdjustVO;
import com.cherp.app.stck.vo.StocksVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("stocks")
public class RestStockAdjustController {
	
	private final StockService stockAdjustService;
	private final ClientService clientService;
	
	@Value("${file.upload.path}") 
	private String uploadPath;
	
	//거래처 검색
	@GetMapping("/client") //거래처전체조회
	public List<ClientVO> getClientList() {  
		return clientService.clientList();
	}
	
	//품목전체조회
	@GetMapping("/item") 
	public List<ContractItemVO> getItemList() {
		return stockAdjustService.getItemList();
	}
	
	//구매내역조회
	@GetMapping("/purchaseChitNo/{type1}/{type2}/{type3}/{client}/{employee}/{item}/{startDate}/{endDate}")
	public List<PurchaseHistoryVO> getPurcChitNo(@PathVariable("type1") String type1, 
			                                     @PathVariable("type2") String type2, 
			                                     @PathVariable("type3") String type3, 
			                                     @PathVariable("client") String client, 
			                                     @PathVariable("employee") String employee, 
			                                     @PathVariable("item") String item, 
			                                     @PathVariable("startDate") String startDate, 
			                                     @PathVariable("endDate") String endDate){
		return stockAdjustService.getPurchaseHistoryList(type1, type2, type3, client, employee, item, startDate, endDate);
	}
	
	//판매내역조회 
	@GetMapping("/salesChitNo")
	public List<SalesHistoryVO> getSalesChitNo(HistorySearchVO searchVO){
		return stockAdjustService.getSalesHistoryList(searchVO);
	}
	
	//재고조정 (프로시저)
	@PostMapping("/stocksAdjustment")
	public int stocksAdjustment(@RequestBody List<StocksAdjustVO> stocksAdjustVO) {
		return stockAdjustService.insertStocksAdjustment(stocksAdjustVO);
	}
	
	//최신재고조정번호 조회
	@GetMapping("/stocksAdjustNo")
	public Long stocksAdjustNo() {
		return stockAdjustService.getAdjustNo();
	}
	
	//제품리스트 조건조회 
	@GetMapping("/itemInfo")
	public List<ContractItemVO> getItemInfo (ItemSearchVO itemSearchVO){
		return stockAdjustService.getItemInfoList(itemSearchVO);
	}
	
	//제품상세정보 조회 (단건)
	@GetMapping("/itemDetailInfo/{itemCode}")
	public ContractItemVO getItemDetailInfo(@PathVariable("itemCode") String itemCode) {
		return stockAdjustService.getItemDetailInfo(itemCode);
	}
	
	//제품상세정보에서 사진 변경(단건)
	@PostMapping("/itemImage")
	public void modifyItemImage (@RequestPart("imageFile") MultipartFile imageFile, @RequestParam("itemCode") String itemCode){
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
		stockAdjustService.modifyItemImage(setImagePath(uploadFileName),itemCode);
		
		
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
	
	//창고별 특정 품목의 현재수량 조회
	@GetMapping("/itemQuantity/{itemCode}/{whCode}")
	public Map<String, Object> getItemQuantityByWh (@PathVariable("itemCode") String itemCode, @PathVariable("whCode") String whCode) {
		ContractItemVO vo = stockAdjustService.getItemQuantityByWh(itemCode, whCode);
		Map<String, Object> map = new HashMap<>();
		if(vo != null) {
			map.put("data", vo);
		} else {
			map.put("data", null);
		}
		return map;
	}
	//조정내역리스트 조회
	@PostMapping("/itemAdjust")
	public List<StocksVO> getAllAdjustList(@RequestParam("itemCode") String itemCode, 
			@RequestParam("whCode") String whCode,  @RequestParam("date") String date){
		return stockAdjustService.getAllAdjustList(itemCode, whCode, date);
	}
	
	//조정내역 상세 조회
	@PostMapping("/itemAdjustDetail")
	public List<StocksVO> getAdjustDetail (@RequestParam("stocksAdjustNo") String stocksAdjustNo){
		return stockAdjustService.getAdjustLogList(stocksAdjustNo);
	}
}