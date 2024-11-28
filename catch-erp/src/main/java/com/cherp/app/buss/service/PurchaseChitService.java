package com.cherp.app.buss.service;

import java.util.List;

import com.cherp.app.buss.vo.PurchaseChitVO;

public interface PurchaseChitService {
    
    // 구매전표 전표 발행 상태별 조회
    public List<PurchaseChitVO> selectPurchaseChitState(String slipState);
    
    
}
