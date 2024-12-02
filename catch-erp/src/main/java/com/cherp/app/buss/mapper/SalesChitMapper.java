package com.cherp.app.buss.mapper;

import java.util.List;

import com.cherp.app.buss.vo.SalesChitVO;
import com.cherp.app.buss.vo.SaleslipHistoryVO;
import org.apache.ibatis.annotations.Param;

public interface SalesChitMapper {

	// 판매전표 등록
	public int insertSalesChit(SalesChitVO salesChitVO);

	// 판매내역 등록
	public int insertSaleslipHistory(SaleslipHistoryVO SaleslipHistoryVO);

	// 판매전표 전체 조회
	public List<SalesChitVO> selectSalesChit();

	// 판매전표별 판매내역 보기
	public List<SaleslipHistoryVO> selectSaleslip(SaleslipHistoryVO saleslipHistoryVO,
												  @Param("saleslipNo") String saleslipNo);

	// 판매전표 검색 기능
	public List<SalesChitVO> searchSalesChit(SalesChitVO salesChitVO);

	// 판매전표 전표상태별 조회
	public List<SalesChitVO> selectSalesChitState(String slipState);

	// 판매전표별 총 금액 조회
	public List<SalesChitVO> selectTotalPrice();


}
