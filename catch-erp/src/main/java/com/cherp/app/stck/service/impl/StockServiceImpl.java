package com.cherp.app.stck.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import com.cherp.app.buss.vo.PurchaseChitVO;
import com.cherp.app.buss.vo.PurchaseHistoryVO;
import com.cherp.app.stck.mapper.StockMapper;
import com.cherp.app.stck.service.StockService;
import com.cherp.app.stck.vo.ContractItemVO;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
public class StockServiceImpl implements StockService{


	private StockMapper stockMapper;
	//	public StockServiceImpl(StockMapper stockMapper, EmployeeMapper employeeMapper, ClientMapper clientMapper) {
	//	this.stockMapper = stockMapper;
	//	this.employeeMapper = employeeMapper;
	//	this.clientMapper = clientMapper;
	//	}
	
	public StockServiceImpl(StockMapper stockMapper) {
		this.stockMapper = stockMapper;
	}

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
		//구매 전표번호 불러온다. 조건:사원코드이거나 사원이름 AND 거래처코드이거나 거래처명
		clientInit = client.equals("all") ? "" : client;
		employeeInit = employee.equals("all") ? "" : employee;
		itemInit = item.equals("all") ? "" : item;
		List<PurchaseChitVO> chitNoList = stockMapper.selectPurcSlipNoList(type1, type2, clientInit, employeeInit);

		//구매 전표번호에서 품목에 대한 조회조건으로 걸러준다. 조건:입고날짜 AND 품목
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

	@Override
	public ContractItemVO getItemStocks(String itemCode) {
		return stockMapper.selectStocks(itemCode);
	}


}