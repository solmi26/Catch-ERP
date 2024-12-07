package com.cherp.app.acct.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cherp.app.acct.mapper.ContractMapper;
import com.cherp.app.acct.service.ContractService;
import com.cherp.app.stck.vo.ContractItemVO;

/**
 * 매입 단가 계약 등록, 관리 ServiceImpl
 */
@Service
public class ContractServiceImpl implements ContractService{
	private ContractMapper conMapper;
	
	public ContractServiceImpl(ContractMapper conMapper) { 
		this.conMapper = conMapper;
	}
	
	// 매입 단가 계약 등록
	@Transactional
	@Override
	public void insertContract(ContractItemVO conVO) {
		conMapper.insertContractH(conVO); // 마스터
		for(ContractItemVO data : conVO.getDetailContraceVO()) {
			System.out.println(data.getItemCode());
			conMapper.insertContractB(data); // 디테일
			conMapper.updateContractB(conVO.getConNo() , data.getItemCode()); // conNo 업데이트
		}
	}
	
	// 매입 단가 계약 전체 조회(Header)
	@Override
	public List<ContractItemVO> contractList() {
		return conMapper.selectContractsH();
	}
	
	//  매입 단가 계약 상세 조회 
	@Override
	public ContractItemVO contractInfo(String no) {
        // 마스터 데이터 조회
        ContractItemVO masterData = conMapper.infoContractH(no);

        // 디테일 데이터 조회
        List<ContractItemVO> detailData = conMapper.infoContractB(no);

        // 마스터 데이터에 디테일 데이터 추가
        masterData.setDetailContraceVO(detailData);

        return masterData;
	}

}
