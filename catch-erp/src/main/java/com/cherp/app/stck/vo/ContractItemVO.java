package com.cherp.app.stck.vo;

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

}
