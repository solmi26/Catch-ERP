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
/**
 * 매출 테이블 , 채권거래 내역
 */
public class SalesVO { 				
	private String salesChitNo; 	// 매출전표번호 PK
	private String saleslipNo; 		// 판매전표번호 FK
	private Integer invoiceNo; 		// 세금계산서번호 FK, 전자 세금 계산서 PK
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date chitDate; 			// 전표 일자
	private String clientCode; 		// 거래처 코드
	private String clientBacct;		// 거래처 계좌
	private String acctName; 		// 계정 과목
	private Integer supplyPrice; 	// 공급가 액
	private Integer vat;			// 부가가치세
	private Integer totalPrice; 	// 총 금액
	private String writer; 			// 작성자
	private Integer recBalance; 	// 채권 잔액
	private String recStatus; 		// 채권 상태
	private String summary; 		// 적요
	
	
	/*---------------채권/채무거래 내역----------------*/
	private Integer logId; 			// 로그 아이디
	@DateTimeFormat(pattern = "yyyy-MM-dd") // DB에 저장할때 날짜 포맷
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul") // JSON으로 출력할 때의 날짜 포맷
	private Date recDate; 			// 거래발생 일자
	private Integer decreasePrice; 	// 채권/채무감소 금액
	private Integer increasePrice; 	// 채권/채무증가 금액
	private Integer bacctCode; 		// 계좌코드
	private String clientName;		// 거래처 명
	/*-------------전자 세금 계산서----------------*/
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date invoiceDate;		// 발송 일자
	private String invoiceStatus;	// 전송 상태
	private Date ntsInvoiceDate;	// 국세청 전송 일자
	private String refType;			// 원세금계산서 유형
	
	/*---------------회계 계정----------------------*/
	private Integer acctCode;
	private String debitSide;
}
