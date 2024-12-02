package com.cherp.app.buss.service;

import java.util.List;

import com.cherp.app.buss.vo.PurchaseChitVO;
import com.cherp.app.buss.vo.PurchaseHistoryVO;
import com.cherp.app.buss.vo.SaleslipHistoryVO;
import com.cherp.app.stck.vo.ContractItemVO;

public interface PurchaseChitService {
    
    // 구매전표 전표 발행 상태별 조회
    public List<PurchaseChitVO> selectPurchaseChitState(String slipState);

    // 구매전표 작성을 위해 품목리스트 조회
    public List<ContractItemVO> selectContractItem();

    // 수량에 맞게 가격 변화
    public ContractItemVO purchaseQuantity(int quantity);

    // 구매전표 등록
    public int insertPurchase(PurchaseChitVO purchaseChitVO);

    // 모든 구매전표 조회
    public List<PurchaseChitVO> selectPurchaseChit();

    // 구매전표별 구매내역 보기
    public List<PurchaseHistoryVO> selectPurchaseHistory(PurchaseHistoryVO purchaseHistoryVO,
                                                         String purcslipNo);
}
