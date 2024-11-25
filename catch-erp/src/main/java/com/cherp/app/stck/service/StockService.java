package com.cherp.app.stck.service;

import java.util.List;

import com.cherp.app.buss.vo.PurchaseChitVO;
import com.cherp.app.buss.vo.PurchaseHistoryVO;
import com.cherp.app.stck.vo.ContractItemVO;

public interface StockService {
	
	public List<ContractItemVO> getItemList();
	public List<PurchaseHistoryVO> getPurchaseHistoryList(String type1, String type2, String type3, String client, String employee, String item, String startDate, String endDate);
}
