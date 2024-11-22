package com.cherp.app.buss.service.impl;

import com.cherp.app.buss.mapper.AcntAcctMapper;
import com.cherp.app.buss.service.AcntAcctService;
import com.cherp.app.buss.vo.AcntAcctVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AcntAcctServiceImpl implements AcntAcctService {

    private AcntAcctMapper acntAcctMapper;

    @Autowired
    public AcntAcctServiceImpl(AcntAcctMapper acntAcctMapper) {
        this.acntAcctMapper = acntAcctMapper;
    }

    @Override
    public List<AcntAcctVO> acntAcctList() {
        return acntAcctMapper.selectAcntList();
    }
}
