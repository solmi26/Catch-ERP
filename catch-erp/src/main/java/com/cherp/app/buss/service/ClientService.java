package com.cherp.app.buss.service;

import com.cherp.app.acct.vo.ClientPsVO;
import com.cherp.app.buss.vo.ClientVO;

import java.util.List;

public interface ClientService {

    // 거래처 전체 조회
    public List<ClientVO> clientList();
    
    public List<ClientPsVO> gwClientList();     // 거래처 목록 조회 - GW
}
