/**
 * 
 */
console.log("gd")
/*
document.querySelector('#employeeTabContent').querySelectorAll('input')
*/

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
	
	console.log(EmployeeVO);
	//만약 사용자가 신규버튼을 누른 상태라면
	if (saveBtn.dataset.mode == 'insert') {
		
	} 
	//만약 사용자가 수정을 할려고하면
	else {
		
	}
})
















 
//데이터 인풋에 뿌리는 함수
function dataToInput (data) {
				//틀릭시 받아온 인사세부정보 인풋태그에 뿌리기
	for (let ele in data) {
		console.log(typeof(data[ele]))
		//받아온 json VO객체 안의 VO객체 뿌리기
		if (typeof(data[ele]) == "object") {
			for (comp in data[ele]) {
				let input = document.querySelector(`input[name="${comp}"]`)
				if (input != null) {
					input.value = data[ele][comp]
				}
			}
		//받아온 json VO객체 안의 속성 뿌리기

		} else {
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

