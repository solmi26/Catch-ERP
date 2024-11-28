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
		//Object타입에 담아 인자로 받은 VO객체 List를 자바 List에 담는다.
		List<StocksAdjustVO> list = (List<StocksAdjustVO>) parameter;
		//Object 배열 생성
		Object[] StocksAdjustVO = new Object[6];
		if(list == null || list.size() == 0) {
			//DB에 선언한 유형의 오라클 배열 생성
			Array stockadjustvoarray = (Array)conn.createOracleArray("STOCKADJUSTVOARRAY", null);
			ps.setArray(i, stockadjustvoarray);
			return;
		}
		
		//VO객체의 필드수만큼 Struct 배열 생성 (DB에서는 1부터 돌아서 인덱스 0을 빈값으로지정)
		Struct[] array = new Struct[list.size()];
		int arrayIndex = 0;
		
		for(StocksAdjustVO vo : list) {	
			StocksAdjustVO[0] = vo.getPurNo();
			StocksAdjustVO[1] = vo.getSalesNo();
			StocksAdjustVO[2] = vo.getEmployeeCode();
			StocksAdjustVO[3] = vo.getStocksStocks();
			StocksAdjustVO[4] = vo.getItemCode();
			StocksAdjustVO[5] = vo.getUpdateReason(); 
			//Struct 객체를 생성하고 DB에 만든 VO타입으로 Struct만든다.
			Struct struct = conn.createStruct("STOCKADJUSTVO", StocksAdjustVO);
			//선언 및 초기화된 struct객체를 Struct배열인 array에 넣는다.
			array[arrayIndex++] = struct;
		}
		//위에서 초기화한 Struct 배열을 기반으로 오라클 배열을 생성해줌.
		Array stockadjustvoarray = (Array)conn.createOracleArray("STOCKADJUSTVOARRAY", (Struct[]) array);
		//생서한 오라클 배열을 PreparedStatement의 i번째 파라미터로 설정.
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
