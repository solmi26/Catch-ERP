//package com.cherp.app.common.upload;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration //Spring 애플리케이션 컨텍스트에 설정 클래스로 등록.
//public class WebMvcConfig implements WebMvcConfigurer{
//
//	@Value("${file.upload.url}")
//	private String uploadPath;
//
//	@Override
//	public void addResourceHandlers(ResourceHandlerRegistry  registry) {
//		registry.addResourceHandler("/images/**") // url은 static 폴더안에있는 이름과 달라야한다
//		.addResourceLocations("file:///" + uploadPath);
//	}
//}
