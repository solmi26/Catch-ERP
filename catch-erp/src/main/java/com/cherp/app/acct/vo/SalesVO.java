package com.cherp.app.acct.vo;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor // 기본생성자
@Getter
@Setter
@ToString
public class SalesVO { 				// 매출 테이블 , 채권거래 내역, 채무거래 내역
	private Integer salesChitNo; 	// 매출전표번호 PK
	private Integer invoiceNo; 		// 판매전표번호 FK
	private String saleslipNo; 		// 세금계산서번호 FK, 전자 세금 계산서 PK
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date chitDate; 			// 전표 일자
	private String client; 			// 거래처
	private String acctName; 		// 계정 과목
	private Integer supplyPrice; 	// 공급가 액
	private Integer vat;			// 부가가치세
	private Integer totalPrice; 	// 총 금액
	private String writer; 			// 작성자
	private Integer recBalance; 	// 채권 잔액
	private String recStatus; 		// 채권 상태
	private String summary; 		// 적요
	
	/*---------------채무거래 내역----------------*/
	private Integer recLogId; 		// 채권 로그 아이디
	/*---------------채권거래 내역----------------*/
	private Integer logId; 			// 로그 아이디
	/*---------------채무/채권 공통---------------*/
	@DateTimeFormat(pattern = "yyyy-MM-dd") // DB에 저장할때 날짜 포맷
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul") // JSON으로 출력할 때의 날짜 포맷
	private Date recDate; 			// 거래발생 일자
	private Integer decreasePrice; 	// 채무감소 금액
	private Integer bacctCode; 		// 계좌코드
	private String clientName;		// 거래처 명
	/*-------------전자 세금 계산서----------------*/
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date invoiceDate;		// 발송 일자
	private String invoiceStatus;	// 전송 상태
	private Date ntsInvoiceDate;	// 국세청 전송 일자
	private String refType;			// 원세금계산서 유형
	
}
