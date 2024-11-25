package com.cherp.app.stck.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.cherp.app.buss.vo.PurchaseChitVO;
import com.cherp.app.buss.vo.PurchaseHistoryVO;
import com.cherp.app.stck.vo.ContractItemVO;

public interface StockMapper {
	public List<ContractItemVO> selectAllItemList();
	public List<PurchaseChitVO> selectPurcSlipNoList(@Param("type1") String type1, @Param("type2") String type2, @Param("client") String client, @Param("employee") String employee);
	public List<PurchaseHistoryVO> selectPurcHistoryList(Map<String, Object> map);
}
