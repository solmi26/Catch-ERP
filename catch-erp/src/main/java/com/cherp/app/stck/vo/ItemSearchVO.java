package com.cherp.app.stck.vo;

import lombok.Data;

/*제품정보 조건검색을 위한 VO*/
@Data
public class ItemSearchVO {
	private String clientInput;
	private String clientHiddenInput;
	private String itemInput;
	private String itemHiddenInput;
	private String minPrice;
	private String maxPrice;
	private Long result;
}
