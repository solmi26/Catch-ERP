package com.cherp.app.stck.vo;

import java.sql.Array;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Struct;
import java.util.List;

import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeHandler;


import oracle.jdbc.OracleConnection;

public class StockAdjustArrayStructHandler implements TypeHandler<Object>{

	@Override
	public void setParameter(PreparedStatement ps, int i, Object parameter, JdbcType jdbcType) throws SQLException {
		OracleConnection conn = ps.getConnection().unwrap(OracleConnection.class);
		List<StocksAdjustVO> list = (List<StocksAdjustVO>)parameter;
		Object[] StocksAdjustvo = new Object[7];
		if(list == null || list.size() == 0) {
			Array stockadjustvoarray = (Array)conn.createOracleArray("STOCKADJUSTVOARRAY", null);
			ps.setArray(i, stockadjustvoarray);
			return;
		}
		
		Struct[] array = new Struct[list.size()];
		
		int arrayIndex = 0;
		for(StocksAdjustVO vo : list) {
			StocksAdjustvo[0] = "";
			StocksAdjustvo[1] = vo.getPurNo();
			StocksAdjustvo[2] = vo.getSaleslipNo();
			StocksAdjustvo[3] = vo.getClientCode();
			StocksAdjustvo[4] = vo.getStocksStocks();
			StocksAdjustvo[5] = vo.getItemCode();
			StocksAdjustvo[6] = vo.getUpdateReason();
		}
		Array stockadjustvoarray = (Array)conn.createOracleArray("STOCKADJUSTVOARRAY", (Struct[])array);
		ps.setArray(i, stockadjustvoarray);
	}
	
	
	
	@Override
	public Object getResult(ResultSet rs, String columnName) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object getResult(ResultSet rs, int columnIndex) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object getResult(CallableStatement cs, int columnIndex) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}
	
}
