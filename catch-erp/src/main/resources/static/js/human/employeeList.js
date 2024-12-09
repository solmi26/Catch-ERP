/**
 * 
 */
 const contextPath = document.querySelector('#contextPathHolder').dataset.contextPath;
console.log(contextPath)
/*
document.querySelector('#employeeTabContent').querySelectorAll('input')
*/
let currentTarget = null;

document.addEventListener('DOMContentLoaded', function() {
	
    const tableRows = document.querySelectorAll('.employee-list tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {

            tableRows.forEach(r => r.classList.remove('table-active'));
            this.classList.add('table-active');
            console.log('zzzz')

            // Here you would typically populate the form with the selected employee's data
        });
    });
    //셀렉트 박스에 데이터 뿌리는 반복문
/*
    let selectBox = {employeePosition:'',
                     duty:'0K',
                     statusType:'0M',
                     hireType:'0L',
                     empStatus:'0J'
                     }
    for (ele in selectBox) {
		let commonCode = {}
	    commonCode[ele] = selectBox[ele];
	    datoToSelect(ele,selectBox[ele]);
	}
    	//부서 셀렉트박스 뿌리기
        fetch('/employees/dept')
		.then(data => data.json())
		.then(data => {
			document.querySelectorAll(`[name="departmentCode"]`).forEach(ele => {
				for (item of data) {
					let tag = `<option value="${item.departmentCode}">${item.departmentName}</option>`;
					ele.insertAdjacentHTML('beforeend',tag);
				}
			})
		})
*/
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
		document.querySelector('.employee-box').querySelectorAll('.hide-opt').forEach(ele => {
		ele.style = 'opacity:100;'
		})
		console.log(ev);
		window.setTimeout(function(){
		allowanceGrid.refreshLayout();
		}, 200) 
		let empCode = grid.getFormattedValue(ev.rowKey,'employeeCode');
		fetch('/employees/emps/'+empCode)
		.then(data => data.json())
		.then(data => {
			//데이터 인풋에 뿌리는 함수
				dataToInput(data)

		})
	}	
})

//고정수당 추가버튼
let appends = document.querySelectorAll('.appendRowBtn')
appends.forEach(btn => {
	
btn.addEventListener('click',function(){
	allowanceGrid.appendRow();
})
	
})


//고정수당 삭제버튼
let deletes = document.querySelectorAll('.deleteRowBtn')
deletes.forEach(btn => {
btn.addEventListener('click',  function () {
	 allowanceGrid.removeCheckedRows();
	 
	refreshRowNum(allowanceGrid.el.id);		
	
})
	
})

//열을 추가후 체크박스에 다시 숫자부여하는 코드
function refreshRowNum (id) {
	 window.setTimeout(function () {
	let checkList = document.querySelectorAll('.countCheck-'+id)
	let num = 1;
	checkList.forEach(items => {
		items.innerText = num;
		num += 1;
	})
		
	 }, 50)
}


//고정수당 모달 이벤트
allowanceGrid.on('click',function (ev) {
	if (ev.targetType == 'cell' && ev.columnName != 'allowancePrice') {
	currentTarget = ev;		
    fetch ("/employees/allItem")
	.then(data => data.json())
	.then(data => {
		window.setTimeout(function(){
        allowanceItemGrid.refreshLayout();
        }, 200)
		allowanceItemGrid.resetData(data)
		allowanceItemModal.show();
	})
		
	}
})

//고정수당모달 이벤트
allowanceItemGrid.on('click',function (ev) {
	if(ev.targetType == 'cell') {
		let allowanceCode = allowanceItemGrid.getFormattedValue(ev.rowKey,'allowanceCode')
		let allowanceName =	allowanceItemGrid.getFormattedValue(ev.rowKey,'allowanceName')
		let allowanceCheck =	allowanceItemGrid.getFormattedValue(ev.rowKey,'allowanceCheck')
		allowanceGrid.setValue(currentTarget.rowKey,'allowanceCode',allowanceCode)
		allowanceGrid.setValue(currentTarget.rowKey,'allowanceName',allowanceName)
		allowanceGrid.setValue(currentTarget.rowKey,'allowanceCheck',allowanceCheck)
		
		allowanceItemModal.hide();
		
		
	}
})




//은행버튼 클릭 이벤트 (모달)
document.querySelector('.bank-Btn').addEventListener('click', function () {
    fetch ("/api/account/bank")
	.then(data => data.json())
	.then(data => {
		window.setTimeout(function(){
        bankGrid.refreshLayout();
        }, 200)
		bankGrid.resetData(data)
		bankModal.show();
	})
})

//은행모달 이벤트
bankGrid.on('click',function (ev) {
	if(ev.targetType == 'cell') {
		let bank = bankGrid.getFormattedValue(ev.rowKey,'commonName')
		let bankCode =	bankGrid.getFormattedValue(ev.rowKey,'codeRule')
		document.querySelector('[name="bank"]').value = bankCode;
		document.querySelector('[name="bankName"]').value = bank;
		bankModal.hide();
		
		
	}
})



//신규버튼 클릭 이벤트
document.querySelector('#newBtn').addEventListener('click',function () {
	let input = document.querySelector('#employeeTabContent').querySelectorAll('input')
	document.querySelector('#saveBtn').dataset.mode = 'insert';
	input.forEach(ele => {
		ele.value = null;
		
	})
	document.querySelector('.employee-box').querySelectorAll('.hide-opt').forEach(ele => {
		ele.style = 'opacity:0;'
	})
	allowanceGrid.resetData([]);
})


//저장버튼 클릭 이벤트
let saveBtn = document.querySelector('#saveBtn')
saveBtn.addEventListener('click',function(){
	//인풋 유효성검사
	if (!formValidity()){
		return;
	}
	let EmployeeVO = {};
	// EmployeeVO 필드값 넣기
	let empInfo = document.querySelectorAll('.EmployeeVO')
	empInfo.forEach(ele => {
		EmployeeVO[ele.name] = ele.value;
	})
	
	// EmployeeDetailVO 
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
		console.log(ele)
		let obj = {};
		obj['allowanceCheck'] = ele.allowanceCheck
		obj['allowanceCode'] = ele.allowanceCode
		obj['allowanceName'] = ele.allowanceName
		obj['allowancePrice'] = ele.allowancePrice
		FixedVO[index] = obj;
		index += 1;
	})

	EmployeeVO['fixedVO'] = FixedVO;
	
	//사진첨부하기
	let formData = new FormData();
	let imgInput = document.querySelector('#imgInput')
	if (imgInput.files.length != 0) {
	formData.append("imageFile", imgInput.files[0]);		
	}else {
	formData.append("imageFile", imgInput.files[0]);		
	}
	formData.append("EmployeeVO", JSON.stringify(EmployeeVO))
	
	
	
	//만약 사용자가 신규버튼을 누른 상태라면
	if (saveBtn.dataset.mode == 'insert') {
		 fetch('/employees/emps', {method: 'post', 
             body: formData
       }).then(
		alert("사원정보가 등록되었습니다.")
	   )
	   .catch(

	   )
	   .finally(
		document.querySelector('.search-btn').click()	
	   )

	} 
	//만약 사용자가 수정을 할려고하면
	else if (saveBtn.dataset.mode == 'update') {
		fetch('/employees/emps',{
			  method:'put',
			  body: formData
		})
		.then(
		alert("사원정보가 수정되었습니다.")
		)
		.finally(
		document.querySelector('.search-btn').click()	
		)
	}
})
//널체크폼

//검색버튼 클릭 이벤트
document.querySelector('.search-btn').addEventListener('click',function (ev) {
	//검색옵션들 들고오기
	let str = "";
	let option = document.querySelectorAll('.search-option')
	option.forEach(ele =>{
		if (ele.value !== "" && ele.value != null ) {
			str += '&' 
			str += ele.name
			str += '='
			str += ele.value 
		}
	})
	let status = document.querySelector('.search-form').querySelector('[name="statusType"]')
	let delBtn = document.querySelector('.delete-Btn')
	if (status.value == 'm3') {
		delBtn.innerText = '삭제'
		delBtn.dataset.mode = 'delete'
	} else {
		delBtn.innerText = '퇴사'
		delBtn.dataset.mode = 'update'
		
	}
	parameter = '?'+str.substr(1)
	fetch("/employees/emps"+parameter)
	.then(data => data.json())
	.then(data => {
		grid.resetData(data)
		
	})
	
})
console.log('gd')
//파일첨부버튼(미리보기 설정)
//#region
document.querySelector('#imgBtn').addEventListener('click',function () {
	imgInput.click()
})
document.querySelector('#imgInput').addEventListener('change',function (ev) {
	document.querySelector('.img-Text').value = imgInput.files[0].name
	let img = document.querySelector('#employeePhoto')
	if (ev.target.files.length > 0) {
		let reader = new FileReader();
		reader.onload = function(data) {
			img.src = data.target.result;
			img.width = 250;
			img.height = 250;
		}
		reader.readAsDataURL(ev.target.files[0]);
	} else {
		img.src = "";
	}
})

//#endregin


//삭제버튼 클릭 이벤트
/*
document.querySelector('.delete-Btn').addEventListener('click',function(){
	let check = grid.getCheckedRows()
	//널체크
	if (check.length == 0) {
		return;
	}
	fetch('/employees/att',{method:'delete'}
	)
})
*/

//다건 퇴직,삭제처리
document.querySelector('.delete-Btn').addEventListener('click',function (ev) {
	let check = grid.getCheckedRows()
	console.log("gd")
	let mode = ev.target.dataset.mode
	if (check.length == 0) {
		return;
	}
	if (mode == 'update') {
		fetch('/employees/statusType',{
			method:'put',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify(check)
		})
		.then(
			alert("사원이 퇴직처리 되었습니다.")
		)
		.then(
			document.querySelector('.search-btn').click()
		)
	} else if (mode =='delete') {
		let str = ''
		check.forEach(ele => {
			str += ','
			str += ele.employeeCode
		})
		fetch('/employees/emps?employeeCode='+str.substring(1),
		{method:'delete',})
		.then(data => {alert("사원정보가 삭제되었습니다.")})
		.then(
			data => {document.querySelector('.search-btn').click()}
		)
	}
})







 
//데이터 인풋에 뿌리는 함수
function dataToInput (data) {
	console.log(data)
				//틀릭시 받아온 인사세부정보 인풋태그에 뿌리기
	document.querySelector('#employeePhoto').src = '/images/'+data.employeeDetailVO.employeeImage
	document.querySelector('#imgInput').value = null;
	document.querySelector('.img-Text').value = null;

	for (let ele in data) {
		//만약 배열타입이면
		if (Array.isArray(data[ele])) {
			console.log(data[ele])
			allowanceGrid.resetData(data[ele])			
		//받아온 json VO객체 안의 VO객체 뿌리기
		} else if (typeof(data[ele]) == "object") {
			for (comp in data[ele]) {
				let input = document.querySelector('.employee-box').querySelector(`input[name="${comp}"]`)
				if (input != null) {
					input.value = data[ele][comp]
				}
			}
		}
		
		
		//받아온 json VO객체 안의 속성 뿌리기
		
		else {
			//받아온 속성이 날짜타입인지 검사
				let input = document.querySelector('.employee-box').querySelector(`input[name="${ele}"]`)
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

		
//폼 유효성 검사
function formValidity() {
	let flag =true;
	let generalinput = document.querySelector('#general').querySelectorAll('input')
	for (let input of generalinput) {
		if (!input.checkValidity()) {
			flag = false;
			document.querySelector('#general-tab').click()
			input.reportValidity()
			break;
		}
	}
	if (!flag) {
		return flag;
	}
	let generalselect = document.querySelector('#general').querySelectorAll('select')
	for (let select of generalselect) {
		if (!select.checkValidity()) {
			flag = false;
			document.querySelector('#general-tab').click()
			select.reportValidity()
			break;
		}
	}
	if (!flag) {
		return flag;
	}
	
	let salary = document.querySelector('#salary').querySelectorAll('input')
	for (let input of salary) {
		if (!input.checkValidity()) {
			flag = false;
			document.querySelector('#salary-tab').click()
			input.reportValidity()
			break;
		}
	}
	return flag;
}	


//예외처리

let hire;
let resign;
//퇴사일자 예외처리
document.querySelector('.employee-box').querySelectorAll('[type="date"]').forEach(ele => {
	ele.addEventListener('change',function (ev) {
	let hireDate = document.querySelector('.employee-box').querySelector('[name="hireDate"]')
	resignationDate = document.querySelector('.employee-box').querySelector('[name="resignationDate"]')
	hire = new Date(hireDate.value)
	resign = new Date(resignationDate.value)
	if (hire > resign) {
		alert("날짜를 다시 입력해주세요");
		ev.target.value = "";
		ev.target.focus()
	}
})
//퇴직일자 예외처리
})
document.querySelector('.employee-box').querySelector('[name="resignationDate"]').addEventListener('change',function (e) {
	let statusType = document.querySelector('.employee-box').querySelector('[name="statusType"]')
	if (statusType.value != 'm3') {
		e.target.value=""
		statusType.focus()
		alert("재직구분을 퇴직으로 지정해주세요")
		
	}
})
//재직상태 예외처리
document.querySelector('.employee-box').querySelector('[name="empStatus"]').addEventListener('change',function (e) {
	let statusType = document.querySelector('.employee-box').querySelector('[name="statusType"]')
	if (statusType.value == 'm1') {
		e.target.value=""
		statusType.focus()
		alert("재직구분을 다시 지정해주세요")
		
	}
})
//숫자포맷 인풋
document.querySelectorAll('.number-format').forEach(ele => {
	ele.addEventListener('change',function (ev) {
		let value = ev.target.value
		if (isNaN(Number(value))) {
			ev.target.value = ""
			ev.target.focus()
			alert("숫자를 입력해 주세요.")
			
		}
		if (Number(ev.target.value) < 0) {
			ev.target.value = ""
			ev.target.focus()
			alert("-없이 입력해 주세요.")
		}
	})
})

