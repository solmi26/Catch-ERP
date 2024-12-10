package com.cherp.app;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.encrypt.AesBytesEncryptor;

@SpringBootTest
public class SecurityTests {
	
	@Autowired
	BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	AesBytesEncryptor aesEncoder;

	
	@Test
	public void passwordEncoder() {
		//String pwd = "password123"; // $2a$10$P86MxK.lWRLmLpurN/7dO.hD0MaPkhxpVWeox04E2GmPD4ijClTfe
		String pwd = "password456"; // $2a$10$e36ww.kBwlHsXk0JjylW7u/I2TtuOEAmo9Hnn/ucTAgw4.SksjBUW
		/* 
		String encPwd = passwordEncoder.encode(pwd);
		
		System.out.printf("변환된 값 : \n%s\n",encPwd);
		
		boolean result = passwordEncoder.matches(pwd, encPwd);
		System.out.println("비교 : " + result);
		*/
		/*
		String identity = "9990101";
		byte[] a = aesEncoder.encrypt(identity.getBytes());
		StringBuilder builder = new StringBuilder();
		
		for (byte b : a) {
			builder.append(b);
			builder.append(",");
		}
		String result = builder.toString();
		String[] split = result.split(",");
		System.out.println("gd");
		byte[] bytes = new byte[split.length];
		int index = 0;
		System.out.println("gd");
		for (String b : split) {
			bytes[index] = (byte) Integer.parseInt(b);
		}
		System.out.println("3");
		System.err.println("왜안됨?"+bytes);
		byte[] g = aesEncoder.decrypt(bytes);
		System.out.println("4");
		System.out.println(new String(g, StandardCharsets.UTF_8));
		*/
		LocalDate today = LocalDate.now();
		LocalDate monthmin = today.plusMonths(-1);
		LocalDate first = monthmin.withDayOfMonth(1);
		String sec = first.format(DateTimeFormatter.ofPattern("yyyy-MM"));
		
		System.out.println(first);


		
		
		
		
		
	}
}
