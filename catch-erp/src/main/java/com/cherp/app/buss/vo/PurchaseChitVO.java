package com.cherp.app.buss.vo;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

//구매전표 [purchase_chit] VO
@Data
public class PurchaseChitVO {
	
	private String purcslipNo; 	 // 구매전표 번호
	@DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date insertDate; 	 // 입력 일자
	private String clientCode; 	 // 거래처 코드
	private String clientName; 	 // 거래처 명
	private String witBacct; 	 // 출금 계좌
	private int supplyPrice; 	 // 공급가 액
	private String purSummary; 	 // 구매 적요
	private String employeeName; // 담당자 명
	private String employeeCode; // 사원 코드
	private int vat; 			 // 부가세
	private String slipState; 	 // 전표 발행 상태

	private int restockingPrice;  // 입고 단가
	private int totalPrice; // 전표 금액 합계

	List<PurchaseHistoryVO> purchaseHistories;
}
