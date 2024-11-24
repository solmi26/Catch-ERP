package com.cherp.app.stck.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cherp.app.acct.mapper.BacctMapper;
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
	
	public StockServiceImpl(StockMapper stockMapper, EmployeeMapper employeeMapper, ClientMapper clientMapper) { 
		this.stockMapper = stockMapper;
		this.employeeMapper = employeeMapper;
		this.clientMapper = clientMapper;
	}

	@Override
	public List<ContractItemVO> getItemList() {
		List<ContractItemVO> list = stockMapper.selectAllItemList();
		return list;
	}
	
	
}
