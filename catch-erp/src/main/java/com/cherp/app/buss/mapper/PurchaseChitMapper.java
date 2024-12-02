package com.cherp.app.buss.mapper;

import java.util.List;

import com.cherp.app.buss.vo.PurchaseChitVO;
import com.cherp.app.buss.vo.PurchaseHistoryVO;
import com.cherp.app.buss.vo.SalesChitVO;
import com.cherp.app.buss.vo.SaleslipHistoryVO;
import com.cherp.app.stck.vo.ContractItemVO;
import org.apache.ibatis.annotations.Param;

public interface PurchaseChitMapper {
	
	// 구매전표 전표 상태별 조회 by sm
	public List<PurchaseChitVO> selectPurchaseChitState(String slipState);

	// 구매전표 작성을 위한 품목리스트 조회
	public List<ContractItemVO> selectContractItem();

	// 수량에 맞게 가격 변화
	public ContractItemVO selectContractQuantity(@Param("quantity")
												 int quantity);

	// 구매전표 등록
	public int insertPurchase(PurchaseChitVO purchaseChitVO);

	// 구매내역 등록
	public int insertPurchaseHistory(PurchaseHistoryVO purchaseHistoryVO);

	// 구매전표 전체 조회
	public List<PurchaseChitVO> selectPurchaseChit();

	// 구매전표별 구매내역 보기
	public List<PurchaseHistoryVO> selectPurchaseHistory(PurchaseHistoryVO purchaseHistoryVO,
														 @Param("purcslipNo") String purcslipNo);
}
