package com.cherp.app.buss.service.impl;

import com.cherp.app.buss.mapper.ClientMapper;
import com.cherp.app.buss.service.ClientService;
import com.cherp.app.buss.vo.ClientVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientServiceImpl implements ClientService {

    private ClientMapper clientMapper;

    @Autowired
    public ClientServiceImpl(ClientMapper clientMapper) {
        this.clientMapper = clientMapper;
    }

    // 거래처 전체 조회
    @Override
    public List<ClientVO> clientList() {

        return clientMapper.selectClientList();
    }
}
