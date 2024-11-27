package com.cherp.app.buss.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cherp.app.acct.vo.ClientPsVO;
import com.cherp.app.buss.mapper.ClientMapper;
import com.cherp.app.buss.service.ClientService;
import com.cherp.app.buss.vo.ClientVO;

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

}
