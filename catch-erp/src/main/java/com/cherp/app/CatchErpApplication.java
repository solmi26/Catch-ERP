package com.cherp.app;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan(basePackages = "com.cherp.app.**.mapper")
@SpringBootApplication
public class CatchErpApplication {

	public static void main(String[] args) {
		SpringApplication.run(CatchErpApplication.class, args);
	}

}
