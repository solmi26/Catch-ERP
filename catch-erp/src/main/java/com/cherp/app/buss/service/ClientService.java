package com.cherp.app.buss.service;

import com.cherp.app.acct.vo.ClientPsVO;
import com.cherp.app.buss.vo.ClientVO;

import java.util.List;
import java.util.Map;

public interface ClientService {

    // 거래처 전체 조회
    public List<ClientVO> clientList();
    // 채권(판매) 거래처 조회
    public List<ClientVO> salesClientList();
    // 채무(거래) 거래처 조회
    public List<ClientVO> purchaseClientList();

    public List<ClientPsVO> gwClientList();     // 거래처 목록 조회 - GW
    
    public Map<String, Object> getClientInfo(String clientCode); // 거래처 단건 조회 - GW
    
    public int insertClient(ClientPsVO clientPsVO); // 거래처 등록 - GW
    
    public int updateClient(ClientPsVO clientPsVO); // 거래처 정보 수정 - GW


}
