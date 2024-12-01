package com.cherp.app.stck.vo;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ContractItemVO {
	
	/* 매입계약품목 Contract_Item 테이블 */
	private String itemName;   	// 품목명
	private int price;     		// 단가
	private int stocksQuantity; // 재고수량
	private int supplyPirce; 	// 공급가액
	private int vat;			// 부가세
	private String conNo;		// 계약번호
	private String itemCode; 	// 품목코드
	private int totalPrice; 	// 총금액
	private String image; 		// 이미지
	
	/* 거래처 [CLIENT] 테이블 컬럼 */
	private String clientName; // 거래처명
	private String clientCode; // 거래처코드
	
	/* 매입계약 [CONTRACT] 테이블 컬럼 */
	@DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date conSdate; //계약시작일
	@DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date conEdate; //계약종료일
	
	/* 창고별 수량을 알기위한 추가필드 */
	private String whCode; //창고코드
	private int currentQuantity; //현수량(창고와 제품에 따른 조건적인 수량)
	
}
