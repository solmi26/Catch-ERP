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


public class AttendanceArrayStructHandler implements TypeHandler<Object> {

	@Override
	public void setParameter(PreparedStatement ps, int i, Object parameter, JdbcType jdbcType) throws SQLException {
		OracleConnection conn = ps.getConnection().unwrap(OracleConnection.class);
		System.out.println(parameter);
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
		
		List<AttendanceVO> list = (List<AttendanceVO>) parameter;
		if (list == null || list.size() == 0) {
			Array VOarray = (Array)conn.createOracleArray("ATTARRAY", null);
			ps.setArray(i, VOarray);
			return;
		}
		Object[] obj = new Object[5];
		Struct[] array = new Struct[list.size()];
		
		int arrayIndex = 0;
		for (AttendanceVO vo : list ) {
			obj[0] = vo.getEmployeeCode();
			obj[1] = vo.getAttendanceDate() != null ? simpleDateFormat.format(vo.getAttendanceDate()) : null;			
			obj[2] = vo.getAttendanceTime() != null ? simpleDateFormat.format(vo.getAttendanceTime()) : null;
			obj[3] = vo.getLeaveTime() != null ?simpleDateFormat.format(vo.getLeaveTime()) : null;
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
