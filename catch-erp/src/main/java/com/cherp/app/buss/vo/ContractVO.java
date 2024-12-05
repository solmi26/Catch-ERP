package com.cherp.app.buss.vo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ContractVO {
	/*-----------------Contract-----------------*/
	private String conNo;				// 계약 번호 PK 계약아이템 FK
	private String clientCode;			// 거래처 코드
	private String clientName;			// 거래처 명 ( CLIENT TABLE JOIN )
	private String employeeName;		// 담당자 이름
	private String conName;				// 계약 명
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul") // JSON으로 출력할 때의 날짜 포맷
	private Date conSdate;				// 계약 시작일
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul") // JSON으로 출력할 때의 날짜 포맷
	private Date conEdate;				// 계약 종료일
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul") // JSON으로 출력할 때의 날짜 포맷
	private Date conDate;				// 계약 일자
	private Integer totalAmount;		// 총 계약금액
	private String status;				// 계약 상태
	private String statusDetail;	// 계약상태 => 공통코드
	private String url;					// 첨부파일경로 Nullable
	private String writer;				// 작성자
	
	/*------------ContractItem------------------*/
	private String itemCode;			// 품목 코드 PK
	private String itemName;			// 품목 명
	private Integer price;				// 단가
	private Integer stocksQuantity;		// 재고 수량
	private Integer supplyPrice;		// 공급가 액
	private Integer vat;				// 부가세
	private Integer totalPrice;			// 총 금액
	private String image;				// 이미지
}
