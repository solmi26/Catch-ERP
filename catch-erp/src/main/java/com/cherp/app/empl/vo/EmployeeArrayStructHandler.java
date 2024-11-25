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

public class EmployeeArrayStructHandler implements TypeHandler<Object> {
	@Override
	public void setParameter(PreparedStatement ps, int i, Object parameter, JdbcType jdbcType) throws SQLException {
			OracleConnection conn = ps.getConnection().unwrap(OracleConnection.class);
			List<FixedVO> list = (List<FixedVO>)parameter;
			Object[] fixedvo = new Object[4];
			if (list == null || list.size() == 0) {
				Array fixedarray = (Array)conn.createOracleArray("FIXEDARRAY", null);
				ps.setArray(i, fixedarray);
				return;
			}

			Struct[] array = new Struct[list.size()];
			
			int arrayIndex = 0;
			for (FixedVO vo : list ) {
				fixedvo[0] = "";
				fixedvo[1] = vo.getFixedNo();
				fixedvo[2] = vo.getAllowancePrice();
				fixedvo[3] = vo.getAllowanceCode();
				array[arrayIndex++] = conn.createStruct("FIXEDVO",fixedvo);
			}
			Array fixedarray = (Array)conn.createOracleArray("FIXEDARRAY", (Struct[])array);
			ps.setArray(i, fixedarray);
			
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
