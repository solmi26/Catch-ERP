package com.cherp.app.buss.service.impl;

import com.cherp.app.buss.mapper.SalesChitMapper;
import com.cherp.app.buss.service.SalesChitService;
import com.cherp.app.buss.vo.SalesChitVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SalesChitServiceImpl implements SalesChitService {

    private SalesChitMapper salesChitMapper;

    @Autowired
    public SalesChitServiceImpl(SalesChitMapper salesChitMapper) {
        this.salesChitMapper = salesChitMapper;
    }

    @Override
    public int salesChitInsert(SalesChitVO salesChitVO) {
        return salesChitMapper.insertSalesChit(salesChitVO);
    }
}
