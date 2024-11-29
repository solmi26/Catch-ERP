package com.cherp.app.buss.service.impl;

import com.cherp.app.buss.mapper.SalesChitMapper;
import com.cherp.app.buss.service.SalesChitService;
import com.cherp.app.buss.vo.SalesChitVO;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class SalesChitServiceImpl implements SalesChitService {

    private SalesChitMapper salesChitMapper;

    public SalesChitServiceImpl(SalesChitMapper salesChitMapper) {
        this.salesChitMapper = salesChitMapper;
    }

    @Override
    public int salesChitInsert(SalesChitVO salesChitVO) {
        return salesChitMapper.insertSalesChit(salesChitVO);
    }
    
    // 판매 내역 전체 조회
    @Override
    public List<SalesChitVO> selectsalesChit() {
    	return salesChitMapper.selectSalesChit();
    }
    
    // 판매내역 전표상태별 조회
    @Override
    public List<SalesChitVO> selectsalesChitState(String slipState) {
    	return salesChitMapper.selectSalesChitState(slipState);
    }
}
