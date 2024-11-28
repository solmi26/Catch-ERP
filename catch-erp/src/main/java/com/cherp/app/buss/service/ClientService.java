package com.cherp.app.buss.service;

import com.cherp.app.acct.vo.ClientPsVO;
import com.cherp.app.buss.vo.ClientVO;

import java.util.List;

public interface ClientService {

    // 거래처 전체 조회
    public List<ClientVO> clientList();
    
    public List<ClientPsVO> gwClientList();     // 거래처 목록 조회 - GW
    
    public ClientPsVO getClientInfo(String clientCode); // 거래처 단건 조회 - GW
    
    public int insertClient(ClientPsVO clientPsVO); // 거래처 등록 - GW
}
