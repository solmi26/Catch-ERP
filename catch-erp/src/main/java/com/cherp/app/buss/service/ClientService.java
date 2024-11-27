package com.cherp.app.buss.service;

import com.cherp.app.buss.vo.ClientVO;

import java.util.List;

public interface ClientService {

    // 거래처 전체 조회
    public List<ClientVO> clientList();
}
