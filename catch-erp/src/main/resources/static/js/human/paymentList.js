/**
 * 
 */

grid.on('click',function (ev) {
	if (ev.targetType == 'cell') {
		let salaryNumber = grid.getFormattedValue(ev.rowKey,'salaryNumber')
		dataToSalModifyGrid(salaryNumber)
	    window.setTimeout(function(){
	    salModifyGrid.refreshLayout();
	    }, 200) 		
		
		salModifyModal.show()
		
	}
})

//급여수정내역 저장버튼 클릭시
document.querySelector('.update-Btn').addEventListener('click',function () {
	let datas = extractSalModifyGrid()
	fetch("/employees/payroll", {
		method:'put',
		headers:{"Content-Type": "application/json"},
		body:JSON.stringify(datas[0])
	})
	.then(data => data.json())
	.then(data => {
		salModifyModal.hide()
		datoToGrid()
	})
})

//삭제버튼클릭시
document.querySelector('.delete-Btn').addEventListener('click',function () {
	let checkRow = grid.getCheckedRows()
	if  (checkRow.length == 0 ) {
		return;
	}
	let str = ''
	checkRow.forEach(ele => {
		str += ','
		str += ele.salaryNumber
	})
	fetch('/employees/payroll?salaryNumber='+str.substring(1),
	      {method:'delete'})
	.then(data => data.json())
	.then(data => {
		datoToGrid()
		
	})
})

//메인그리드 데이터 불러오기
function datoToGrid() {
	fetch("/employees/payroll")
	      .then(data => data.json())
	      .then(data => {
			grid.resetData(data)
		  })
 }
 
 
//검색버튼 클릭 이벤트
document.querySelector('.search-btn').addEventListener('click',function (ev) {
	//검색옵션들 들고오기
	let str = "";
	let option = document.querySelectorAll('.search-option')
	let radio = document.querySelector('input[name="statusType"]:checked')
	option.forEach(ele =>{
		if (ele.value !== "" && ele.value != null ) {
			str += '&' 
			str += ele.name
			str += '='
			str += ele.value 
		}
	})
	str += '&' 
	str += 'statusType';
	str += '='
	if (radio != null) {
		str += radio.value;
	} else {
		str += ""
	}
	parameter = '?'+str.substr(1)
	fetch("/employees/payroll"+parameter)
	.then(data => data.json())
	.then(data => {
		grid.resetData(data)
	})
	
	
}) 