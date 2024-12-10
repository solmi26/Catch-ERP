package com.cherp.app.stck.vo;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ContractItemVO {
	
	/* 매입계약품목 Contract_Item 테이블 */
	private String itemName;   	// 품목명
	private int price;     		// 단가
	private int stocksQuantity; // 재고수량
	private int supplyPrice; 	// 공급가액
	private int vat;			// 부가세
	private String conNo;		// 계약번호
	private String itemCode; 	// 품목코드
	private int totalPrice; 	// 총금액
	private String image; 		// 이미지
	private Boolean deleted = false; // 삭제
	private String updateUrl; // 업데이트 url
	
	List<ContractItemVO> detailContraceVO; // 계약 디테일 List

	// 수량 연산을 위한
	private int totalPriceHidden;
	private int supplyPriceHidden;
	private int vatHidden;
	
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
	@DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date conDate; //계약일
	private String emoloyeeName; // 담당자명
	private String emoployeeCode; // 담당자코드
	private String status; // 계약상태
	private String url; // 첨부파일경로
	private String writer; // 작성자 
	private String conName; // 계약명
	private String summary; // 적요
	
	
	/* 창고별 수량을 알기위한 추가필드 */
	private String whCode; //창고코드
	private int currentQuantity; //현수량(창고와 제품에 따른 조건적인 수량)
	
	/* 안전 재고 부족 알림을 위한 추가필드 */
	private int result; // result = (총재고 - 7일이후 까지의 미완료지시수량)
	private int outQuantity; // D+7 까지의 미완료 지시수량
	
}
