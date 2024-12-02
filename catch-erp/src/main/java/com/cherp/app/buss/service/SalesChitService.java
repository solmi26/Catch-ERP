package com.cherp.app.buss.service;

import java.util.List;

import com.cherp.app.buss.vo.SalesChitVO;
import com.cherp.app.buss.vo.SaleslipHistoryVO;
import org.apache.ibatis.annotations.Param;

public interface SalesChitService {

    // 판매전표 추가
    public int salesChitInsert(SalesChitVO salesChitVO);
    
    // 판매전표 전체 조회
    public List<SalesChitVO> selectSalesChit();

    // 판매전표별 판매내역 보기
    public List<SaleslipHistoryVO> selectSelectSaleslip(SaleslipHistoryVO saleslipHistoryVO,
                                                        String saleslipNo);

    // 판매전표 검색
    public List<SalesChitVO> searchSalesChit(SalesChitVO salesChitVO);
    
    // 판매전표 전표 발행 상태별 조회
    public List<SalesChitVO> selectsalesChitState(String slipState);

    // 판매전표별 총 금액 조회
    public List<SalesChitVO> selectSalesTotalPrice();
    
}
