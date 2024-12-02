package com.cherp.app.empl.vo;

import java.sql.Array;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Struct;
import java.text.SimpleDateFormat;
import java.util.List;

import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeHandler;

import oracle.jdbc.OracleConnection;


public class EmployeeHistoryArrayStructHandler implements TypeHandler<Object> {

	@Override
	public void setParameter(PreparedStatement ps, int i, Object parameter, JdbcType jdbcType) throws SQLException {
		OracleConnection conn = ps.getConnection().unwrap(OracleConnection.class);
		System.out.println(parameter);
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
		
		List<EmployeeHistoryVO> list = (List<EmployeeHistoryVO>) parameter;
		if (list == null || list.size() == 0) {
			Array VOarray = (Array)conn.createOracleArray("employee_history_table", null);
			ps.setArray(i, VOarray);
			return;
		}
		Object[] obj = new Object[9];
		Struct[] array = new Struct[list.size()];
		
		int arrayIndex = 0;
		for (EmployeeHistoryVO vo : list ) {
			obj[0] = vo.getEhNo();
			obj[1] = simpleDateFormat.format(vo.getEhDate());			
			obj[2] = vo.getEhType();
			obj[3] = vo.getEmployeeCode();
			obj[4] = vo.getPrevPosition();
			obj[5] = vo.getAssignedPosition();
			obj[6] = vo.getPrevDepartment();
			obj[7] = vo.getAssignedDepartment();
			obj[8] = simpleDateFormat.format(vo.getStandardDate());			
			array[arrayIndex++] = conn.createStruct("employee_history", obj);
		}
		Array VOarray = (Array)conn.createOracleArray("employee_history_array", (Struct[]) array);
		ps.setArray(i,VOarray);
		
		
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
	}}
