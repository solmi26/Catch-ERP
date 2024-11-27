package com.cherp.app.empl.web.rest;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cherp.app.empl.service.AttendanceService;
import com.cherp.app.empl.vo.AttItemVO;
import com.cherp.app.empl.vo.AttendanceVO;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class RestAttendanceController {
	
	private final AttendanceService service;
	
	
	@PostMapping("/employees/att")
	public int attendanceInsert (@RequestBody List<AttendanceVO> attendanceVO) {
		attendanceVO.forEach(ele -> {
			System.out.println(ele);;
		});
		return service.attendanceInsert(attendanceVO);
	}
	
	

}
