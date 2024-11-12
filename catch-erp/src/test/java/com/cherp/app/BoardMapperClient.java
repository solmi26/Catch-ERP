package com.cherp.app;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.cherp.app.test.mapper.TestMapper;

@SpringBootTest
public class BoardMapperClient {
	// DB 접속 테스트
	@Autowired
	TestMapper test;
	
	@Test
	public void test() {
		test.select();
	}
}
