package com.cherp.app.empl.vo;

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


public class PayrollArrayStructHandler implements  TypeHandler<Object>{

	@Override
	public void setParameter(PreparedStatement ps, int i, Object parameter, JdbcType jdbcType) throws SQLException {
		OracleConnection conn =ps.getConnection().unwrap(OracleConnection.class);
		List<AllowanceHistoryVO> list = (List<AllowanceHistoryVO>) parameter;
		Object[] obj = new Object[2];
		Struct[] array = new Struct[list.size()];
		
		int arrayIndex = 0;
		for (AllowanceHistoryVO ele : list ) {
			obj[0] = ele.getAwhiNo();
			obj[1] = ele.getAllowancePrice();
			array[arrayIndex++] = conn.createStruct("ALLOWANCE_HISTORY_VO", obj);
		}
	    Array payrollArray = (Array) conn.createARRAY("ALLOWANCE_HISTORY_TABLE", array);
	    ps.setArray(i, payrollArray);
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
