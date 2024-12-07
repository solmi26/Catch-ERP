package com.cherp.app.common.myPage.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.cherp.app.common.myPage.mapper.MyPageMapper;
import com.cherp.app.common.myPage.vo.AttendanceSearchVO;
import com.cherp.app.common.myPage.vo.ModifiedInfoVO;
import com.cherp.app.empl.vo.AttendanceVO;
import com.cherp.app.empl.vo.EmployeeVO;
import com.cherp.app.stck.web.StocksController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Service
public class MyPageServiceImpl implements MyPageService {
	
	private MyPageMapper myPageMapper;
	public MyPageServiceImpl(MyPageMapper myPageMapper) {
		this.myPageMapper = myPageMapper;
	}
	
	//마이페이지 내 정보수정
	@Override
	public void modifyEmployeeInfo(ModifiedInfoVO modifiedInfoVO) {
		myPageMapper.updateEmployeeInfo(modifiedInfoVO);
	}

	//본인 사진조회
	@Override
	public EmployeeVO getEmployeeImage(String employeeCode) {
		return myPageMapper.selectEmployeeImage(employeeCode);
	}

	//근태정보조회
	@Override
	public List<AttendanceVO> getAttendance(AttendanceSearchVO searchVO) {
		AttendanceSearchVO filteredSearchVO = new AttendanceSearchVO();
		if(searchVO.getYearCondition() == null) {
			SimpleDateFormat yearFormat = new SimpleDateFormat("yyyy");
			SimpleDateFormat monthFormat = new SimpleDateFormat("MM");
			Date now = new Date();         
			String year = yearFormat.format(now);
			String month = monthFormat.format(now);
			filteredSearchVO.setEmployeeCode(searchVO.getEmployeeCode());
			filteredSearchVO.setYearCondition(year);
			filteredSearchVO.setMonthCondition(month);
			System.out.println("체크합니다." + year + "년 / 달" + month); //-> 2024년 / 달12 정상
			return myPageMapper.selectAttendance(filteredSearchVO); //페이지 최초로드시 최신 년도와 달의 근태조회
		} else {
			return myPageMapper.selectAttendance(searchVO); //수동조회 시 입력받은 값에따른 근태조회
		}
	}

}
