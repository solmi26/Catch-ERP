/**
 * 
 */
console.log("gd")
/*
document.querySelector('#employeeTabContent').querySelectorAll('input')
*/


        document.addEventListener('DOMContentLoaded', function() {
            // Photo upload preview
        /*
            document.getElementById('photoUpload').addEventListener('change', function(e) {
                if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        document.getElementById('employeePhoto').src = e.target.result;
                    }
                    reader.readAsDataURL(e.target.files[0]);
                }
            });

            // Form submission (prevent default for demonstration)
            document.getElementById('searchForm').addEventListener('submit', function(e) {
                e.preventDefault();
                alert('검색 기능이 실행되었습니다.');
            });

            // Button click handlers
            document.getElementById('saveBtn').addEventListener('click', function() {
                alert('저장 버튼이 클릭되었습니다.');
            });

            document.getElementById('resetBtn').addEventListener('click', function() {
                document.getElementById('generalForm').reset();
                document.getElementById('salaryForm').reset();
            });

            document.getElementById('newBtn').addEventListener('click', function() {
                document.getElementById('generalForm').reset();
                document.getElementById('salaryForm').reset();
                document.getElementById('employeePhoto').src = '/placeholder.svg?height=100&width=100';
            });
            */
            // Row selection in employee list
            const tableRows = document.querySelectorAll('.employee-list tbody tr');
            tableRows.forEach(row => {
                row.addEventListener('click', function() {
	
                    tableRows.forEach(r => r.classList.remove('table-active'));
                    this.classList.add('table-active');
                    console.log('zzzz')

                    // Here you would typically populate the form with the selected employee's data
                });
            });
        });

let readonly = [
	'employeeCode',
	'employeePosition',
	'statusType',
	'hireType',
	'departmentCode',
	'headCheck',
	'duty',
	'zipcode',
	'address',
	'detailAddress',
	'bank']
	
	
	
//사원목록 클릭 이벤트
grid.on('click', function (ev) {
	if (ev.targetType == 'cell') {
		document.querySelector('#saveBtn').dataset.mode = 'update';
		console.log(ev);
		window.setTimeout(function(){
		allowanceGrid.refreshLayout();
		}, 200) 
		let empCode = grid.getFormattedValue(ev.rowKey,'employeeCode');
		fetch('/emps/'+empCode)
		.then(data => data.json())
		.then(data => {
			//데이터 인풋에 뿌리는 함수
				dataToInput(data)

		})
	}	
})


//신규버튼 클릭 이벤트
document.querySelector('#newBtn').addEventListener('click',function () {
	let input = document.querySelector('#employeeTabContent').querySelectorAll('input')
	document.querySelector('#saveBtn').dataset.mode = 'insert';
	input.forEach(ele => {
		ele.value = null;
		
	})
})


//저장버튼 클릭 이벤트
let saveBtn = document.querySelector('#saveBtn')
saveBtn.addEventListener('click',function(){
	let EmployeeVO = {};
	// EmployeeVO 필드값 넣기
	let empInfo = document.querySelectorAll('.EmployeeVO')
	empInfo.forEach(ele => {
		EmployeeVO[ele.name] = ele.value;
	})
	
	// EmployeeDetailVO 필드값 넣기
	let EmployeeDetailVO = {}
	let detailInfo = document.querySelectorAll('.EmployeeDetailVO')
	detailInfo.forEach(ele => {
		EmployeeDetailVO[ele.name] = ele.value;
	})
	EmployeeVO['employeeDetailVO'] = EmployeeDetailVO 
	
	// EmployeeSalaryVO 필드값 넣기
	let EmployeeSalaryVO = {};
	let salaryInfo = document.querySelectorAll('.EmployeeSalaryVO')
	salaryInfo.forEach(ele => {
		EmployeeSalaryVO[ele.name] = ele.value;
	})
	EmployeeVO['employeeSalaryVO'] = EmployeeSalaryVO 
	
	
	// FixedVO 필드값넣기
	let FixedVO =[]
	let index = 0;
	allowanceGrid.getData().forEach(ele => {
		console.log(ele+' : ele')
		FixedVO[index] = ele;
		index += 1;
	})
	console.log(FixedVO+' : arr')

	EmployeeVO['fixedVO'] = FixedVO;
	console.log(EmployeeVO+' : vo')
	
	console.log(EmployeeVO);
	//만약 사용자가 신규버튼을 누른 상태라면
	if (saveBtn.dataset.mode == 'insert') {
		 fetch('/emps', {method: 'post', 
             headers: { "Content-Type": "application/json", },
             body: JSON.stringify(EmployeeVO)
       }).then(
		console.log("성공")
	   )
	   .catch(
		console.log("실패")
	   )

	} 
	//만약 사용자가 수정을 할려고하면
	else {
		
	}
})


//검색버튼 클릭 이벤트
document.querySelector('.search-btn').addEventListener('click',function (ev) {
	//검색옵션들 들고오기
	document
	
})













 
//데이터 인풋에 뿌리는 함수
function dataToInput (data) {
	console.log(data)
				//틀릭시 받아온 인사세부정보 인풋태그에 뿌리기
	for (let ele in data) {
				console.log(typeof(data[ele])+' : '+data[ele])
		//만약 배열타입이면
		if (Array.isArray(data[ele])) {
			console.log(data[ele])
			allowanceGrid.resetData(data[ele])			
		//받아온 json VO객체 안의 VO객체 뿌리기
		} else if (typeof(data[ele]) == "object") {
			for (comp in data[ele]) {
				let input = document.querySelector(`input[name="${comp}"]`)
				if (input != null) {
					input.value = data[ele][comp]
				}
			}
		}
		
		
		//받아온 json VO객체 안의 속성 뿌리기
		
		else {
			//받아온 속성이 날짜타입인지 검사
				let input = document.querySelector(`input[name="${ele}"]`)
			if (ele == "hireDate" || ele == "resignationDate") {
				let date = dateFormatter(data[ele])
				console.log(date)
				if (input != null) {
				input.value = date
				}
			} else {
				if (input != null) {
					input.value = data[ele]
				}
			}//end else
			
		}//end else

	}
}



//날짜를 yyyy-mm-dd형식으로 바꿔주는 함수
function dateFormatter (date) {
	let rawData = new Date(date)
	let year = rawData.getFullYear();
	let day = (("0"+(rawData.getDay()+1)).slice(-2));
	let month =	(("0"+(rawData.getMonth()+1)).slice(-2));
	let result = `${year}-${month}-${day}`
	return result;
}

