/**
 * 다음 API관련
 * 나의 정보 탭 정보수정
 * 근태 조회
 * 
 */
  
  /*============================================
  ====================다음 API===================
  ==============================================*/
  function daumMapApi(state) {
      new daum.Postcode({
          oncomplete: function(data) {
              // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

              // 각 주소의 노출 규칙에 따라 주소를 조합한다.
              // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
              let addr = ''; // 주소 변수
              let extraAddr = ''; // 참고항목 변수

              //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
              if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                  addr = data.roadAddress;
              } else { // 사용자가 지번 주소를 선택했을 경우(J)
                  addr = data.jibunAddress;
              }

              // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
              if(data.userSelectedType === 'R'){
                  // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                  // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                  if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                      extraAddr += data.bname;
                  }
                  // 건물명이 있고, 공동주택일 경우 추가한다.
                  if(data.buildingName !== '' && data.apartment === 'Y'){
                      extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                  }
                  // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                  if(extraAddr !== ''){
                      extraAddr = ' (' + extraAddr + ')';
                  }
                  // 조합된 참고항목을 해당 필드에 넣는다.
                  if(state == 0) {
                      document.getElementById("detailAddress").value = extraAddr;
                  }                        
              
              } else {
                  document.getElementById("detailAddress").value = '';
              }
              // 우편번호와 주소 정보를 해당 필드에 넣는다.
              if(state == 0) {
                  document.getElementById('zipcode').value = data.zonecode;
                  document.getElementById("address").value = addr;
                  // 커서를 상세주소 필드로 이동한다.
                  document.getElementById("detailAddress").focus();
              }
          }
      }).open();
  }
  
  
  document.addEventListener('DOMContentLoaded', function () {
      
      // 우편번호 검색 이벤트(Daum Api)
      document.querySelectorAll('.findZipCode').forEach(ele=>{
    	  ele.addEventListener('click', function () {
              daumMapApi(0);
          })  
      })


  })
  
  
  /*============================================
  ====================첫번째 탭 수정버튼 이벤트 ========
  ==============================================*/
  
  let modifiedBtn = document.getElementById('saveBtn');
  modifiedBtn.addEventListener('click',function(){
	
		
	  let tel = document.getElementById('tel');
	  let phone = document.getElementById('phone'); //필수입력값
	  let email = document.getElementById('email'); //필수입력값
	  let zipcode = document.getElementById('zipcode');
	  let address = document.getElementById('address'); //필수입력값
	  let detailAddress = document.getElementById('detailAddress'); //필수입력값
	  let employeeImage = document.getElementById('employeeImage');				
	  let employeeCode = document.getElementById('employeeCode');
	  
	  if(phone.value == '' || email.value == '' || address.value == '' || detailAddress.value == ''){
		alert("필수 입력란을 확인하세요.");
		return;
	  }
	  if(isHpFormat(phone.value) == false){
		alert("모바일 입력란 형식을 확인하세요.");
		return;
	  }
	  
	  let formData = new FormData();
	  if(document.querySelector("#employeeImage").value != ''){
	  	formData.append('imageFile', employeeImage.files[0]);
	  }
	  formData.append('tel', tel.value); 
	  formData.append('phone', phone.value);
	  formData.append('email', email.value);
	  formData.append('zipcode', zipcode.value);
	  formData.append('address', address.value);
	  formData.append('detailAddress', detailAddress.value);
	  formData.append('employeeCode', employeeCode.value);
	  
	/*for (const data of formData.entries()) {
		console.log(data);
	};*/
	  
	  fetch("/modifyEmployeeInfo",{
			method: 'post',
			body: formData
	  })
	  .then(result => {
		    employeeImage.value = '';		
			let employeeCodeForImageChange = employeeCode.value;
			fetch(`/employeeDetailInfo/${employeeCodeForImageChange}`) 
			.then(result=> result.json())
			.then(result=>{
				document.querySelector('img[name="employeePhoto"]').src = '/images/' + result.employeeImage;
			})
			alert('사원정보가 정상적으로 변경되었습니다.')
		})
	  .then()
	  .catch(err=>{console.log(`제품사진변경 실패! ${err}`)
			alert("사원정보 변경 중 에러가 발생했습니다.")
		})
  })
  	//휴대폰번호 유효성 체크
  	function isHpFormat(hp){
		if(hp == ""){
			return true;	
		}	
		var phoneRule = /^010\d{8}$/;
		return phoneRule.test(hp);
	}
	
  /*============================================
  ====================두 번째 탭 근태정보 관련=========
  ==============================================*/
  /*-- 근태정보 페이지 그리드 --*/
   const Grid = tui.Grid;
   Grid.applyTheme('default',  {
            outline:{
            border : '#dee2e6'
        },
        cell: {
            normal: {
                border: '#dee2e6'
            },
            header: {
                background: '#f8f9fa',
                text: 'black'
            },
            focused: {
                background: '#f8f9fa',
                border: '#f64a4a'
            },
            evenRow: {
                background: 'white'
            },
            oddRow: {
                background: 'white'
            }
        }
    });
    const attendanceGrid = new Grid({
      el: document.getElementById('attendanceGrid'),
      scrollX: true,
      scrollY: true,
      bodyHeight: 700,
      rowHeaders: [{
                    type: 'rowNum',
                    header: "No.",
                    width: 50,
                    className:'border'
            }],
      columns: [
    	{
    	 header:'근태기록번호',
    	 name:'attHistoryCode',
    	 width: 140,
    	 hidden:true
    	},
        {
          header: '날짜',
          width: 153,
          name: 'attendanceDate',
        },
        {
          header: '근태유형',
          width: 153,
          name: 'attName'
          
        },
        {
          header: '출근시간',
          width: 153,
          name: 'attendanceTime',
        },
        {
          header: '퇴근시간',
          width: 153,
          name: 'leaveTime',
        },
        {
          header: '연장 근로시간',
          width: 153,
          name: 'overtimeWorktime',
        },
        {
          header: '야간 근로시간',
          width: 153,
          name: 'nightWorktime',
        },
        {
          header: '주말 근로시간',
          width: 153,
          name: 'weekendWorktime',
        },
        {
          header: '총 근로시간',
          width: 153,
          name: 'totalWorktime',
        }
        
      ],
      
    });
    	
    	attendanceGrid.resetData(attendanceList); //근태정보 초기로드. 현재기준 년도,월로 근태정보 조회
	 
	 
	 let attendanceInqueryBtn = document.getElementById('attendanceInqueryBtn');
	 attendanceInqueryBtn.addEventListener('click', function(){
		 let yearConditionBox = document.getElementById('yearCondition'); document.getElementById('yearCondition')
		 let monthConditionBox = document.getElementById('monthCondition');
		 let yearCondition = yearConditionBox.options[yearConditionBox.selectedIndex].value;
		 let monthCondition = monthConditionBox.options[monthConditionBox.selectedIndex].value;
		 let employeeCode = document.getElementById('employeeCode').value;
		 if(yearCondition == 'year' || monthCondition == 'month'){
			alert('조회하실 기간을 설정해주세요.')
			return;
		 } else {
			fetch(`/attendance?employeeCode=${employeeCode}&yearCondition=${yearCondition}&monthCondition=${monthCondition}`)
			.then(result => result.json())
			.then(result => {
				attendanceGrid.resetData(result)
				window.setTimeout(function(){attendanceGrid.refreshLayout();},200);
			})
			.catch(err=>{`근태정보 조회 실패! ${err}`})
		 }
	 })
	
	
	//토스트 그리드 refreshLayout().... 
	document.querySelector("#myAttendance-tab").addEventListener("click",function(){
		console.log('체킹')
		window.setTimeout(function(){attendanceGrid.refreshLayout();},200);
	})
	
	window.addEventListener("resize", function() {
  		attendanceGrid.refreshLayout();
	});