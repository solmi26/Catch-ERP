package com.cherp.app.acct.service;

import com.cherp.app.stck.vo.ContractItemVO;

/**
 * 매입 단가 계약 등록, 관리 Service
 */
public interface ContractService {

	//추가
	// 매입 단가 계약 등록(HEADER)
	public void insertContract(ContractItemVO conVO);			

}
