package com.cherp.app.stck.mapper;

import java.util.List;

import com.cherp.app.buss.vo.ClientVO;
import com.cherp.app.stck.vo.ContractItemVO;

public interface StockMapper {
	
	public List<ContractItemVO> selectAllItemList();
}
