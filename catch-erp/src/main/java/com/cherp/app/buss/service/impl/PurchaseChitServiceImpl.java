package com.cherp.app.buss.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cherp.app.buss.mapper.PurchaseChitMapper;
import com.cherp.app.buss.service.PurchaseChitService;
import com.cherp.app.buss.vo.PurchaseChitVO;

@Service
public class PurchaseChitServiceImpl implements PurchaseChitService {

    private PurchaseChitMapper purchaseChitMapper;

    public PurchaseChitServiceImpl(PurchaseChitMapper purchaseChitMapper) {
        this.purchaseChitMapper = purchaseChitMapper;
    }

    // 구매내역 전표상태별 조회 by sm
    @Override
    public List<PurchaseChitVO> selectPurchaseChitState(String slipState) {
    	return purchaseChitMapper.selectPurchaseChitState(slipState);
    }
    
}
