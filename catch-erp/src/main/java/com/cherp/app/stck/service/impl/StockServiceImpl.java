package com.cherp.app.stck.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cherp.app.buss.mapper.ClientMapper;
import com.cherp.app.buss.vo.ClientVO;
import com.cherp.app.empl.mapper.EmployeeMapper;
import com.cherp.app.empl.vo.EmployeeVO;
import com.cherp.app.stck.mapper.StockMapper;
import com.cherp.app.stck.service.StockService;
import com.cherp.app.stck.vo.ContractItemVO;


@Service
public class StockServiceImpl implements StockService{
	
	private StockMapper stockMapper;
	private EmployeeMapper employeeMapper;
	private ClientMapper clientMapper;
	
	@Override
	public Map<String, List<Map<String,String>>> getModalInfo() {
		Map<String, List<Map<String,String>>> infoMap = new HashMap<>();
		List<Map<String,String>> clientsData = new ArrayList<>();
		List<Map<String,String>> employeesData = new ArrayList<>();
		List<Map<String,String>> itemsData = new ArrayList<>();
		
		List<ClientVO> clientList = clientMapper.selectClientList();
		List<EmployeeVO> employeeList = employeeMapper.selectAllEmployeeList();
		List<ContractItemVO> itemList = stockMapper.selectAllItemList();
		
		clientList.forEach(obj -> {
			Map<String, String> clientData = new HashMap<>();
			clientData.put("c1", obj.getClientName());
			clientData.put("c2", obj.getCeoName());
			clientData.put("c3", obj.getCompanyTel());
			clientData.put("c4", obj.getCeoName());
			clientData.put("c5", obj.getEmployeeTel());
			clientData.put("c6", obj.getEvent());
			clientsData.add(clientData); //배열리스트에 넣기
		});
		
		employeeList.forEach(obj -> {
			Map<String, String> employeeData = new HashMap<>();
			employeeData.put("c1", obj.getEmployeeCode());
			employeeData.put("c2", obj.getName());
			employeeData.put("c3", obj.getDepartmentName());
			employeesData.add(employeeData);
		});
		
		itemList.forEach(obj->{
			Map<String, String> itemData = new HashMap<>();
			itemData.put("c1", obj.getItemCode());
			itemData.put("c2", obj.getItem());
			itemsData.add(itemData);
		});
		
		infoMap.put("clientList", clientsData);
		infoMap.put("employeeList", employeesData);
		infoMap.put("itemList", itemsData);
		
		return infoMap;
	}
}
