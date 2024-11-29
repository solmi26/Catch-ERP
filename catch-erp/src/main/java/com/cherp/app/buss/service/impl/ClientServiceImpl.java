package com.cherp.app.buss.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cherp.app.acct.vo.ClientPsVO;
import com.cherp.app.buss.mapper.ClientMapper;
import com.cherp.app.buss.service.ClientService;
import com.cherp.app.buss.vo.ClientVO;
import com.cherp.app.buss.vo.ContractVO;

@Service
public class ClientServiceImpl implements ClientService {

    private ClientMapper clientMapper;

    public ClientServiceImpl(ClientMapper clientMapper) {
        this.clientMapper = clientMapper;
    }

    // 거래처 전체 조회
    @Override
    public List<ClientVO> clientList() {

        return clientMapper.selectClientList();
    }

	@Override
	public List<ClientPsVO> gwClientList() {
		return clientMapper.gwSelectAllClientList();
	}

	@Override
	public int insertClient(ClientPsVO clientPsVO) {
		clientPsVO.setTradeStatus("거래중");
		return clientMapper.insertClient(clientPsVO);
	}

	@Override
	public Map<String, Object> getClientInfo(String clientCode) {
		//Map<String,Object> 활용해서 client 단일 조회, client의 매입계약 전체조회, client의 계약품목 전체조회 담아서 보내기
		Map<String, Object> totalClientInfo = new HashMap<String, Object>();
		
		ClientPsVO clientInfo = clientMapper.selectClientInfo(clientCode); // 거래처 정보 상세
		
		List<ContractVO> clientContractList = clientMapper.selectAllClientContract(clientCode); // 단일 거래처 계약정보 전체
		
		List<ContractVO> clientContractItemList = new ArrayList<ContractVO>(); // 단일 거래처 계약에 따른 상품품목
		for (ContractVO contract : clientContractList) {
			String conNo = contract.getConNo();
			List<ContractVO> contractItems = clientMapper.selectAllClientContractItem(conNo);
			clientContractItemList.addAll(contractItems);
		}
		
		totalClientInfo.put("clientInfo", clientInfo);
		totalClientInfo.put("clientContractList", clientContractList);
		totalClientInfo.put("clientContractItemList", clientContractItemList);
		
		return totalClientInfo;
	}

	@Override
	public int updateClient(ClientPsVO clientPsVO) {
		return clientMapper.updateClient(clientPsVO);
	}

}
