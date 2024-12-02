package com.cherp.app;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
public class SecurityTests {
	
	@Autowired
	BCryptPasswordEncoder passwordEncoder;
	
	@Test
	public void passwordEncoder() {
		String pwd = "password123"; // $2a$10$P86MxK.lWRLmLpurN/7dO.hD0MaPkhxpVWeox04E2GmPD4ijClTfe
		
		String encPwd = passwordEncoder.encode(pwd);
		
		System.out.printf("변환된 값 : \n%s\n",encPwd);
		
		boolean result = passwordEncoder.matches(pwd, encPwd);
		System.out.println("비교 : " + result);
	}
}
