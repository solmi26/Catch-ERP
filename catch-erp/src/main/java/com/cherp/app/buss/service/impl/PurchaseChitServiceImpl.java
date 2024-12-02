package com.cherp.app.buss.service.impl;

import java.util.List;

import com.cherp.app.stck.vo.ContractItemVO;
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

    // 구매전표 등록을 위한 품목리스트 조회
    @Override
    public List<ContractItemVO> selectContractItem() {
        return purchaseChitMapper.selectContractItem();
    }

    // 수량에 맞게 가격 변화
    @Override
    public ContractItemVO purchaseQuantity(int quantity) {
        return purchaseChitMapper.selectContractQuantity(quantity);
    }




}
