package com.cherp.app.buss.service;

import com.cherp.app.buss.vo.AcntAcctVO;

import java.util.List;

public interface AcntAcctService {
    // 회계(매출) 계정 전체 조회
    public List<AcntAcctVO> acntAcctList();
}
