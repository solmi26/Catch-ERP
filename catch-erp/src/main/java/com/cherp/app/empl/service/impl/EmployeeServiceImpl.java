package com.cherp.app.empl.service.impl;

import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.encrypt.AesBytesEncryptor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cherp.app.common.dto.EmployeeSearchDto;
import com.cherp.app.common.vo.CommonCodeVO;
import com.cherp.app.empl.mapper.EmployeeMapper;
import com.cherp.app.empl.service.EmployeeService;
import com.cherp.app.empl.vo.EmployeeVO;

@Service
public class EmployeeServiceImpl implements EmployeeService{

	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	AesBytesEncryptor aesEncoder;
	
	@Autowired
	EmployeeMapper employeemapper;
	
	
	@Override
	public List<EmployeeVO> employeeList(EmployeeSearchDto search) {
		return employeemapper.selectAllEmployeeList(search);
	}
	
	@Override
	public EmployeeVO employeeInfo(EmployeeVO employee) {
		EmployeeVO emp = employeemapper.seleectEmployee(employee);
		String decrypt = emp.getEmployeeDetailVO().getIdentityNo();
		byte[] decryptByte = StringTobyte(decrypt);
		String result = new String(aesEncoder.decrypt(decryptByte),StandardCharsets.UTF_8);
		emp.getEmployeeDetailVO().setIdentityNo(result);
		return emp;
	}
	@Override
	public int employeeInsert(EmployeeVO employee) {
		String identity = employee.getEmployeeDetailVO().getIdentityNo();
		byte[] encrypt = aesEncoder.encrypt(identity.getBytes(StandardCharsets.UTF_8));
		
		String password = identity.substring(0, 6);
		String passencode = passwordEncoder.encode(password);
		employee.setPassword(passencode);
		employee.getEmployeeDetailVO().setIdentityNo(byteToString(encrypt));
		return employeemapper.insertEmployee(employee);
	}
	@Override
	public int employeeUpdate(EmployeeVO employee) {
		String identity = employee.getEmployeeDetailVO().getIdentityNo();
		byte[] encrypt = aesEncoder.encrypt(identity.getBytes(StandardCharsets.UTF_8));
		employee.getEmployeeDetailVO().setIdentityNo(byteToString(encrypt));
		
		
		return employeemapper.updateEmployee(employee);
	}
	@Override
	public List<CommonCodeVO> commonCodeList(String[] commonCode) {
		return employeemapper.selectCommonCodeList(commonCode);
	}
	@Override
	public int statusTypeUpdate(List<EmployeeVO> employee) {
		return employeemapper.updateStatusType(employee);
	}
	@Override
	public int employeeDelete(String[] employeeCode) {
		int backup = employeemapper.insertBackUpPayroll(employeeCode);
		int salary = employeemapper.deleteEmployeeSalary(employeeCode);
		int detail = employeemapper.deleteEmployeeDetail(employeeCode);
		int fixed = employeemapper.deleteFixed(employeeCode);
		int attHi = employeemapper.deleteAttHistory(employeeCode);
		int allHi = employeemapper.deleteAllowanceHistory(employeeCode);
		int pay = employeemapper.deleteSalaryPayroll(employeeCode);
		int emp = employeemapper.deleteEmployee(employeeCode);

		return (salary + detail + emp + fixed+attHi+pay+allHi)/7;
	}
	
	public String byteToString (byte[] bytes) {
		StringBuilder builder = new StringBuilder();
		for (byte ele : bytes) {
			builder.append(ele);
			builder.append(",");
		}
		return builder.toString();
	}
	public byte[] StringTobyte (String str) {
		String[] split = str.split(",");
		ByteBuffer buffer = ByteBuffer.allocate(split.length);
		for (String ele : split) {
			buffer.put((byte) Integer.parseInt(ele));
		}
		return buffer.array();
	}
}
