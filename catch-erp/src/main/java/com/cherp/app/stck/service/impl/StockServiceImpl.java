package com.cherp.app.stck.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cherp.app.buss.vo.PurchaseChitVO;
import com.cherp.app.buss.vo.PurchaseHistoryVO;
import com.cherp.app.stck.mapper.StockMapper;
import com.cherp.app.stck.service.StockService;
import com.cherp.app.stck.vo.ContractItemVO;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class StockServiceImpl implements StockService{
	
	
	private StockMapper stockMapper;
	

//	public StockServiceImpl(StockMapper stockMapper, EmployeeMapper employeeMapper, ClientMapper clientMapper) { 
//		this.stockMapper = stockMapper;
//		this.employeeMapper = employeeMapper;
//		this.clientMapper = clientMapper;
//	}

	
	public StockServiceImpl(StockMapper stockMapper) { 
		this.stockMapper = stockMapper;
	}

	
	//품목모달_품목전체조회
	@Override
	public List<ContractItemVO> getItemList() {
		List<ContractItemVO> list = stockMapper.selectAllItemList();
		return list;
	}
	
	//전표No 리스트 조건조회
	@Transactional
	@Override
	public List<PurchaseHistoryVO> getPurchaseHistoryList(String type1, String type2, String type3, String client, String employee, String item, String startDate, String endDate) {
		String clientInit = "";
		String employeeInit = "";
		String itemInit = "";
		//구매 전표번호 불러온다.
		clientInit = client.equals("all") ? "" : client;
		employeeInit = client.equals("all") ? "" : employee;	
		itemInit = item.equals("all") ? "" : item;
		List<PurchaseChitVO> chitNoList = stockMapper.selectPurcSlipNoList(type1, type2, clientInit, employeeInit);
		
		//구매 전표번호에서 품목에 대한 조회조건으로 걸러준다.
		Map<String, Object> conditionMap = new HashMap<>();
		String[] chitNoArr = new String[chitNoList.size()];
		int cnt = 0;
		for(PurchaseChitVO obj : chitNoList) {
			chitNoArr[cnt++] = obj.getPurcslipNo();
		}
		
		conditionMap.put("chitNoArr", chitNoArr);
		conditionMap.put("type3", type3);
		conditionMap.put("item", itemInit);
		conditionMap.put("startDate", startDate);
		conditionMap.put("endDate", endDate);
		List<PurchaseHistoryVO> historyList = stockMapper.selectPurcHistoryList(conditionMap);
		
		return historyList;
	}
	
	
}	
