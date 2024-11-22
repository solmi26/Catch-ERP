package com.cherp.app.acct.vo;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class PayablesVO { // 구매전표, 매입, 채무거래내역 VO
	// PURCHASE TABLE
	private String purchaseChitNo; // 구매전표번호 PK
	private String purcslipNo; 		// 구매전표번호 FK
	private String invoiceCode; 	// 세금계산서코드 실 사용X
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date chitDate; 			// 전표 일자
	private String client; 			// 거래처
	private String acctName; 		// 계정 과목
	private Integer supplyPrice; 	// 공급가 액 purchase_chit 공통
	private Integer vat;			// 부가가치세 purchase_chit 공통
	private Integer totalPrice; 	// 총 금액
	private String writer; 			// 작성자
	private Integer decreaseBalance;// 채권 잔액
	private String decreaseStatus; 	// 채권 상태
	private String summary; 		// 적요
	
	// PAYABLES_LOG TABLE
	/*---------------채무거래 내역----------------*/
	private Integer recLogId; 		// 채권 로그 아이디
	@DateTimeFormat(pattern = "yyyy-MM-dd") // DB에 저장할때 날짜 포맷
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul") // JSON으로 출력할 때의 날짜 포맷
	private Date recDate; 			// 거래발생 일자
	private Integer decreasePrice; 	// 채무감소 금액
	private Integer bacctCode; 		// 계좌코드
	private String clientName;		// 거래처 명
}
