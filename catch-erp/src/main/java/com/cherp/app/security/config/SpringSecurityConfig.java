package com.cherp.app.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.encrypt.AesBytesEncryptor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig {
	/**
	 * 강제 서비스 생성자 주입(Security 기준)
	  	@Autowired
		EmployeeLoginMapper loginMapper;	
		@Bean
		UserDetailsService detailService() {
			return new EmployeeUserDetailsService(loginMapper);
		};	
		http.userDetailsService(detailService());
	 * */

	
	
	//비밀번호 암호화 : 1234 => 암호환된 값으로 인지
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	// AesBytesEncryptor 사용을 위한 Bean등록
    @Bean
    AesBytesEncryptor aesBytesEncryptor() {
        return new AesBytesEncryptor("test","1a2b3c");
    }
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		// Spring , Lambda DSL
		// 인증 및 인가를 적용할 URL
		http
		    .authorizeHttpRequests((authrize)
		    		-> authrize
		    		//MANAGER/EMPLOYEE/SALES/BUSINESS/STOCK 권한을 가진 사용자만 각 허용한 url 접근 허용
		    		.requestMatchers("/all", "/login/**").permitAll() // 전체 접근 허용 보통 접근권한은 여기서 부여함.
		    		.requestMatchers("/employees/**","/api/**").hasAnyRole("MANAGER","EMPLOYEE")
		    		.requestMatchers("/sales/**","/bacct/**","/account/**","/receivable/**","/payable/**","/api/**")
		    		.hasAnyRole("MANAGER","SALES")
		    		.requestMatchers("/sales/**","/business/**","/api/**").hasAnyRole("MANAGER","BUSINESS")
		    		.requestMatchers("/stocks/**","/api/**").hasAnyRole("MANAGER","STOCK")
		    		.requestMatchers("/employees/**","/api/**").hasAnyRole("ADMIN")
		    		//ROLE_ADMIN 권한을 가진 사용자만 접근 허용
		    		.requestMatchers("/admin/**","/api/**").hasAuthority("ROLE_ADMIN")
		    		.anyRequest().authenticated() // 권한 상관 없이 인증받은 사용자만
		    		); 
		// <form/>를 기반으로 인증 처리시 설정
		http
			.formLogin((formlogin) 
					-> formlogin
					.loginPage("/login/userLogin") // security loginpage 설정 해당 URL을 거쳐서 로그인을 진행함
					.usernameParameter("employeeId")
					.loginProcessingUrl("/login")
					.defaultSuccessUrl("/index", true));
		// logout를 기반으로 처리부분 설정
		http
			.logout(logout -> logout
					.logoutSuccessUrl("/login")
					.invalidateHttpSession(true));
		// csrf 비활성화
		http.csrf(csrf -> csrf.disable());
		
		/**
		 * security 5.4버전 이후로 SecurityFilterChain사용
		 * userDetailService를 설정하지 않아도 됨.
		 * */
		http.rememberMe(rememberMe -> rememberMe
			.rememberMeParameter("remember") // => <input type="checkbox" name="remember">
			.tokenValiditySeconds(604800) // 1시간(3600초) => 7일
			);
		
		// 인가 예외 처리
		http.exceptionHandling((exceptionHandling) ->
 				exceptionHandling
 					.accessDeniedPage("/errors/accessDenied")
 			);

		
		return http.build();
	}
	
	@Bean
	WebSecurityCustomizer webSecurityCustomizer() {
		return (web) -> web.ignoring() // Security 설정을 제외할 url
					.requestMatchers("/images/**","/js/**","/css/**","/imgs/**","/index/login/**");
	}
}
