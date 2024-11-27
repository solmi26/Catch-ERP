package com.cherp.app.buss.service.impl;

import com.cherp.app.buss.mapper.SalesChitMapper;
import com.cherp.app.buss.service.SalesChitService;
import com.cherp.app.buss.vo.SalesChitVO;

import java.util.List;

import com.cherp.app.buss.vo.SaleslipHistoryVO;
import org.springframework.stereotype.Service;

@Service
public class SalesChitServiceImpl implements SalesChitService {

    private SalesChitMapper salesChitMapper;

    public SalesChitServiceImpl(SalesChitMapper salesChitMapper) {
        this.salesChitMapper = salesChitMapper;
    }

    // 판매 전표, 판매 내역 추가
    @Override
    public void salesChitInsert(SalesChitVO salesChitVO) {

        //판매 전표 등록
        salesChitMapper.insertSalesChit(salesChitVO);

        for (int i = 0; i < salesChitVO.getSaleslipHistory().size(); i++) {

            // SaleslipHistoryVO 객체 가져오기
            SaleslipHistoryVO history = salesChitVO.getSaleslipHistory().get(i);
            // SalesChitMapper를 사용하여 history 데이터 삽입
            salesChitMapper.insertSaleslipHistory(history);
        }

    }
    
    // 판매 내역 전체 조회
    @Override
    public List<SalesChitVO> selectsalesChit() {
    	return salesChitMapper.selectSalesChit();
    }
    
    // 판매내역 전표상태별 조회
    @Override
    public List<SalesChitVO> selectsalesChitState(String slipState) {
    	return salesChitMapper.selectSalesChitState(slipState);
    }
}
