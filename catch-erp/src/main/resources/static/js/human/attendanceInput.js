/**
 * 
 *
/**
 * dataToAeSearch() = 모달 그리드 데이터불러어기

 */
//열을 추가하는 이벤트
document.querySelector(".addBtn").addEventListener('click',function() {
	let tbody = document.querySelector('tbody');
	let html ='<tr class="blank"><td><input type="checkbox"></td><td><input type="text" readonly size=4 name="employeeCode"></td><td><input type="text" readonly size=4 ></td><td><input type="date" class="lock"  name="attendanceDate"></td><td><input type="text" class="lock" name="attCode" readonly size=4 ></td><td><input type="time" class="lock" name="attendanceTime" readonly size=4 ></td><td><input type="time" class="lock" name="leaveTime" readonly size=4 ></td><td><input type="text" name="toalWorktime" readonly size=4 ></td><td><input type="text" name="overtimeWorktime" readonly size=4 ></td><td><input type="text" name="nightWorktime" readonly size=4 ></td><td><input type="text" name="weekendWorktime" readonly size=4 ></td></tr>'


	tbody.insertAdjacentHTML('beforeend',html)
})

let currentTarget = null;

//그리드 크기 새로고침
window.addEventListener(`resize`, function() {
		window.setTimeout(function(){
			grid.refreshLayout();
			}, 200)     	  
    });


//인사발령입력 테이블의 이벤트
grid.on('click',function (ev) {
	console.log(ev)
	
	if (ev.columnName == '사원아이디' || ev.columnName == '성명') {
			currentTarget = ev;
            window.setTimeout(function(){
            empGrid.refreshLayout();
            }, 200)
            dataToEmpModal()
            empModal.show()
	}
	if (ev.columnName == '근태명' || ev.columnName == '근태유형코드') {
		currentTarget = ev
        window.setTimeout(function(){
        aeSearchGrid.refreshLayout();
        }, 200)
        dataToAeSearch() 
        aeSearchModal.show()
				
	}
	
})



//사원검색 테이블의 이벤트
empGrid.on('click', function(ev) {
	if(ev.targetType == 'cell') {
		let empId = empGrid.getFormattedValue(ev.rowKey,'employeeId')
		let empName = empGrid.getFormattedValue(ev.rowKey,'name')
		let empCode = empGrid.getFormattedValue(ev.rowKey,'employeeCode')
		grid.setValue(currentTarget.rowKey,'사원코드',empCode)
		grid.setValue(currentTarget.rowKey,'사원아이디',empId)
		grid.setValue(currentTarget.rowKey,'성명',empName)
		empModal.hide()
	}
})

//근태유형 테이블의 이벤트

aeSearchGrid.on('click', function (ev) {
	console.log(ev)
	if (ev.targetType == 'cell'){
	let attName = aeSearchGrid.getFormattedValue(ev.rowKey,'attName');
	let attCode = aeSearchGrid.getFormattedValue(ev.rowKey,'attCode');
	let commonName = aeSearchGrid.getFormattedValue(ev.rowKey,'commonName');
	if (commonName == '휴가' || commonName == '공제' ) {
		grid.setValue(currentTarget.rowKey,'attendanceTime',null);
		grid.setValue(currentTarget.rowKey,'leaveTime',null);
	}
		grid.setValue(currentTarget.rowKey,'근태유형코드',attCode);	
		grid.setValue(currentTarget.rowKey,'근태명',attName);
		grid.setValue(currentTarget.rowKey,'근태유형',commonName);
		
		aeSearchModal.hide();
	}	
})

//저장버튼 클릭시 이벤트
document.querySelector('.insert-Btn').addEventListener('click',function () {
	//널검사
	
	if (validateCheck()) {
		return;
	}
	
	let row = grid.getData()
	let flag = nullCheck(row)
	console.log(flag)
	if (flag == false ) {
		return;
	}
	let arr =[]
	row.forEach(ele => {
		let obj ={}
		obj['employeeCode'] = ele.사원코드
		obj['employeeId'] = ele.사원아이디
		obj['name'] = ele.성명
		obj['attendanceDate'] = ele.날짜
		obj['attName'] = ele.근태명
		obj['attCode'] =ele.근태유형코드
		obj['commonName'] =ele.근태유형
		obj['attendanceTime'] =ele.출근시간
		obj['leaveTime']= ele.퇴근시간
		arr.push(obj)
	})
	console.log(arr)
	fetch("/employees/att",{
		method:"post",
		headers:{"Content-Type":"application/json"},
		body:JSON.stringify(arr)
	})
	.then(data => data.json())
	.then(data => {
		toastr.success("입력이 완료되었습니다")
		grid.resetData([{}]);
	})
	
})
//모든 버튼에 블러걸기
document.querySelectorAll('Button[type="button"]').forEach(ele => {
	ele.addEventListener('mouseover',function () {
	grid.blur();
})

})
window.addEventListener(`resize`, function() {
        window.setTimeout(function(){
        aeSearchGrid.refreshLayout();
        }, 200)
});
//다시쓰기 버튼
document.querySelector('.resetBtn').addEventListener('click',function () {
	grid.resetData([{}])
})



function validateCheck () {
	let nullCheck = grid.validate();
    if (nullCheck.length !== 0 ) {
		grid.focus(nullCheck[0].rowKey, nullCheck[0].errors[0].columnName)
		let header =grid.getColumn(nullCheck[0].errors[0].columnName).header
		toastr.warning(header + "의 내용을 입력해주세요")
		return true;
	}
}
function nullCheck (data) {
	
	for (let ele of data) {
		console.log(ele)
		console.log(ele.commonName)
		
		if ((ele.근태유형 !== '휴가') && (ele.근태유형 !== '공제')) {
			if (ele.출근시간 == null) {
				toastr.warning("출근시간을 입력해주세요")
				grid.focus(ele.rowKey, '출근시간')
				return false ; 
			} else if (ele.퇴근시간 == null) {
				grid.focus(ele.rowKey, '퇴근시간')
				toastr.warning("퇴근시간 입력을 입력해주세요")
				return false;
			}
		}
	}
	return true;
}



//엑셀클릭이벤트
document.querySelector('.excel-Btn').addEventListener('click',function () {
	document.querySelector('.excel-Input').click()
})
document.querySelector('.excel-Input').addEventListener('input',function (ev) {
	readExcel(ev)
	ev.target.value = null;
	
})
let row
function readExcel(event) {
    let input = event.target;
    let reader = new FileReader();
    let rows
    reader.onload = function () {
        let data = reader.result;
        let workBook = XLSX.read(data, { type: 'binary' });
        
        workBook.SheetNames.forEach(function (sheetName) {
            
            rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
        })
            grid.appendRows(rows)
    };
    reader.readAsBinaryString(input.files[0]);
}
