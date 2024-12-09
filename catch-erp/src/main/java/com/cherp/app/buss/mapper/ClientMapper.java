package com.cherp.app.buss.mapper;

import com.cherp.app.acct.vo.ClientPsVO;
import com.cherp.app.buss.vo.ClientVO;
import com.cherp.app.buss.vo.ContractVO;
import com.cherp.app.stck.vo.ContractItemVO;

import java.util.List;

public interface ClientMapper {
	// 거래처 전체 조회
	public List<ClientVO> selectClientList();
	public List<ClientVO> salesClientList();
	public List<ClientVO> purchaseClientList();

	public List<ClientPsVO> gwSelectAllClientList();     // 거래처 목록 조회 - GW

	public ClientPsVO selectClientInfo(String clientCode); 				// 거래처 단건 조회 (거래처 상세 조회) - GW
	public List<ContractVO> selectAllClientContract(String clientCode); // 거래처 계약 전체 조회(거래처 상세 조회 -> 거래처 계악조회) - GW
	public List<ContractVO> selectAllClientContractItem(String clientCode);  // 거래처 계약 상품 전체 조회(거래처 상세 조회 -> 거래처 계약품목조회) -GW 
	
	public int insertClient(ClientPsVO clientPsVO); // 거래처 등록 - GW
	public int updateClient(ClientPsVO clientPsVO); // 거래처 정보 수정 - GW
}
