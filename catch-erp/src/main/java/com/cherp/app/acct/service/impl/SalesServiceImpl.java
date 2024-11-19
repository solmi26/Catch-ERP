package com.cherp.app.acct.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cherp.app.acct.mapper.SalesMapper;
import com.cherp.app.acct.service.SalesService;
import com.cherp.app.acct.vo.SalesVO;

@Service
public class SalesServiceImpl implements SalesService{
	private SalesMapper salesMapper;
	
	public SalesServiceImpl(SalesMapper salesMapper) {
		this.salesMapper = salesMapper;
	}
	
	@Override
	public List<SalesVO> salesList() {
		return salesMapper.selectAllSalesList();
	}

	@Override
	public List<SalesVO> payablesList() {
		return salesMapper.payablesList();
	}

	@Override
	public List<SalesVO> receivablesList() {
		return salesMapper.receivablesList();
	}

	@Override
	public List<SalesVO> invoiceList() {
		return salesMapper.invoiceList();
	}

	@Override
	public SalesVO saleInfo(SalesVO salesVO) {
		return null;
	}

	@Override
	public SalesVO payableInfo(SalesVO salesVO) {
		return null;
	}

	@Override
	public SalesVO receivableInfo(SalesVO salesVO) {
		return null;
	}

	@Override
	public SalesVO invoiceInfo(SalesVO salesVO) {
		return null;
	}

	@Override
	public int insertSale(SalesVO salesVO) {
		return 0;
	}

	@Override
	public int insertPayable(SalesVO salesVO) {
		return 0;
	}

	@Override
	public int insertReceivable(SalesVO salesVO) {
		return 0;
	}

	@Override
	public int insertInvoice(SalesVO salesVO) {
		return 0;
	}

	@Override
	public int updateSale(SalesVO salesVO) {
		return 0;
	}

	@Override
	public int updatePayable(SalesVO salesVO) {
		return 0;
	}

	@Override
	public int updateReceivable(SalesVO salesVO) {
		return 0;
	}

	@Override
	public int updateInvoice(SalesVO salesVO) {
		return 0;
	}

	@Override
	public int deleteSale(int salesChitNo) {
		return 0;
	}

	@Override
	public int deletePayable(int recLogId) {
		return 0;
	}

	@Override
	public int deleteReceivable(int logId) {
		return 0;
	}

	@Override
	public int deleteInvoice(int invoiceNo) {
		return 0;
	}
	
}
