package com.cherp.app.acct.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cherp.app.stck.vo.ContractItemVO;

/**
 * 매입 단가 계약 등록, 관리 Mapper
 */
public interface ContractMapper {
	
	// 매입 단가 계약 등록(Header) by sm
	public int insertContractH(ContractItemVO conVO);	
	
	// 매입 단가 계약 등록(Body) by sm
	public int insertContractB(ContractItemVO conVO);	
	
	// 매입 단가 계약 수정 by sm
	public int updateContractB(@Param("conNo") String conNo, @Param("itemCode") String itemCode);
	
	
	
	// 아래는 전부 수정해야 함
	// 매입 단가 계약 전체 조회
	public List<ContractItemVO> selectContracts();
	
	// 매입 단가 계약 단건 조회
	public int infoContract(ContractItemVO conVO);
	

}
