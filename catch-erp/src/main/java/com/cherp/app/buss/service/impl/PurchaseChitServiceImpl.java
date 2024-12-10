package com.cherp.app.buss.service.impl;

import java.util.List;

import com.cherp.app.buss.vo.PurchaseHistoryVO;
import com.cherp.app.buss.vo.SaleslipHistoryVO;
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
    public List<ContractItemVO> selectContractItem(String clientName) {
        return purchaseChitMapper.selectContractItem(clientName);
    }

    // 수량에 맞게 가격 변화
    @Override
    public ContractItemVO purchaseQuantity(int quantity) {
        return purchaseChitMapper.selectContractQuantity(quantity);
    }

    // 구매전표, 구매내역 등록
    @Override
    public int insertPurchase(PurchaseChitVO purchaseChitVO) {

        // 구매 전표 등록
        int result = purchaseChitMapper.insertPurchase(purchaseChitVO);

        for(int i = 0; i < purchaseChitVO.getPurchaseHistories().size(); i++){
            // purchaseChitVO 객체 가져오기
            PurchaseHistoryVO history = purchaseChitVO.getPurchaseHistories().get(i);
            // history 데이터 삽입
            history.setPurcslipNo(purchaseChitVO.getPurcslipNo());
            purchaseChitMapper.insertPurchaseHistory(history);
        }
        return result;
    }

    @Override
    public List<PurchaseChitVO> selectPurchaseChit() {
        return purchaseChitMapper.selectPurchaseChit();
    }

    @Override
    public List<PurchaseHistoryVO> selectPurchaseHistory(PurchaseHistoryVO purchaseHistoryVO, String purcslipNo) {
        return purchaseChitMapper.selectPurchaseHistory(purchaseHistoryVO, purcslipNo);
    }

    @Override
    public List<PurchaseChitVO> searchPurchaseChit(PurchaseChitVO purchaseChitVO) {
        return purchaseChitMapper.searchPurchaseChit(purchaseChitVO);
    }


}
