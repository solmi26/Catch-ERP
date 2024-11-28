package com.cherp.app.empl.web.rest;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cherp.app.common.dto.EmployeeSearchDto;
import com.cherp.app.empl.service.AttendanceService;
import com.cherp.app.empl.vo.AttendanceVO;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class RestAttendanceController {
	
	private final AttendanceService service;
	
	
	//근태 다건조회
	@GetMapping("/employees/att")
	public List<AttendanceVO> attendanceList (EmployeeSearchDto search) {
		return service.attendanceList(search);
	}
	
	//근태 단건조회
	@GetMapping("/employees/att/{attnedanceHistoryCode}")
	public AttendanceVO attendanceInfo (@PathVariable(name="attnedanceHistoryCode")String attnedanceHistoryCode) {
		return service.attendanceInfo(attnedanceHistoryCode);
	}
	
	//근태 등록
	@PostMapping("/employees/att")
	public int attendanceInsert (@RequestBody List<AttendanceVO> attendanceVO) {
		attendanceVO.forEach(ele -> {
			System.out.println(ele);;
		});
		return service.attendanceInsert(attendanceVO);
	}
	
	//근태수정
	@PutMapping("/employees/att")
	public int attendanceUpdate(@RequestBody AttendanceVO attendanceVO) {
		return service.attendanceUpdate(attendanceVO);
	}
	
	//근태 다건삭제
	@DeleteMapping("/employees/att")
	public int attendanceDelete(@RequestParam(value="attHistoryCode") String[] attHistoryCode) {
		return service.attendanceDelete(attHistoryCode);
	}
	

}
