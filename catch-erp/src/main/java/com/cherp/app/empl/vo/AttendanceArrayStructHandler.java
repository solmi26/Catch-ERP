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

import oracle.jdbc.driver.OracleConnection;

public class AttendanceArrayStructHandler implements TypeHandler<Object> {

	@Override
	public void setParameter(PreparedStatement ps, int i, Object parameter, JdbcType jdbcType) throws SQLException {
		OracleConnection conn = ps.getConnection().unwrap(OracleConnection.class);
		List<AttendanceVO> list = (List<AttendanceVO>) parameter;
		Object[] obj = new Object[6];
		Struct[] array = new Struct[list.size()];
		
		int arrayIndex = 0;
		for (AttendanceVO vo : list ) {
			obj[0] = vo.getEmployeeCode();
			obj[1] = vo.getAttendanceDate();			
			obj[2] = vo.getAttendanceTime();
			obj[3] = vo.getLeaveTime();
			obj[4] = vo.getAttCode();
			array[arrayIndex++] = conn.createStruct("ATTELE", obj);
		}
		Array VOarray = (Array)conn.createOracleArray("ATTARRAY", (Struct[]) array);
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
