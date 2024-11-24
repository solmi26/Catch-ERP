package com.cherp.app.stck.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import com.cherp.app.stck.mapper.StockMapper;
import com.cherp.app.stck.service.StockService;
import com.cherp.app.stck.vo.ContractItemVO;


@Service
public class StockServiceImpl implements StockService{
	
	
	private StockMapper stockMapper;
	
	
	public StockServiceImpl(StockMapper stockMapper) { 
		this.stockMapper = stockMapper;
	}

	@Override
	public List<ContractItemVO> getItemList() {
		List<ContractItemVO> list = stockMapper.selectAllItemList();
		return list;
	}
	
	
}
