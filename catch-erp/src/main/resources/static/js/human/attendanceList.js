/**
 * 
 */
let currentTarget = null;
//#region 그리드클릭이벤트
datoToGrid ()
//그리드 클릭 이벤트
 grid.on('click',function (ev) {
	console.log(ev)
	if (ev.targetType == 'cell') {
		window.setTimeout(function(){
        atModifyGrid.refreshLayout();
        }, 200)
        let code = grid.getFormattedValue(ev.rowKey,'attHistoryCode')
        dataToatModifyGrid(code)
		atModifyModal.show()
	}
 })
//#endregion 그리드클릭이벤트

//수정모달 그리드 이벤트
//#region
atModifyGrid.on('click',function(ev){
	if (ev.columnName == 'attName') {
		currentTarget = ev;
		dataToatItemGrid()
		window.setTimeout(function(){
        atItemGrid.refreshLayout();
        }, 200)
		atItemModal.show()
	}
})
//#endregion
//근태항목 그리드 클릭이벤트
atItemGrid.on('click',function (ev) {
	console.log(ev)
	if(ev.targetType == 'cell') {
		let attCode = atItemGrid.getFormattedValue(ev.rowKey,'attCode')
		let attName = atItemGrid.getFormattedValue(ev.rowKey,'attName')
		atModifyGrid.setValue(currentTarget.rowKey,'attCode',attCode)
		atModifyGrid.setValue(currentTarget.rowKey,'attName',attName)
		atItemModal.hide()
		
	}	
})

//#region 수정모달 저장 버튼 클릭 함수
document.querySelector('.save-Btn').addEventListener('click',function () {
	let AttendanceVO = atModifyGrid.getData()
	fetch("/employees/att",{
		method:"put",
		headers:{"Content-Type":"application/json"},
		body:JSON.stringify(AttendanceVO[0])
	})
	.then(data => data.json())
	.then(data => {
		datoToGrid()
		atModifyModal.hide()
	})
})
//#endregion

//#region 삭제버튼 클릭이벤트
document.querySelector('.delete-Btn').addEventListener('click',function () {
	let checkRow = grid.getCheckedRows()
	if  (checkRow.length == 0 ) {
		return;
	}
	let str = ''
	checkRow.forEach(ele => {
		str += ','
		str += ele.attHistoryCode
	})
	fetch('/employees/att?attHistoryCode='+str.substring(1),
	      {method:'delete'})
	.then(data => data.json())
	.then(data => {
		datoToGrid()
	})
})
//#endregion 삭제버튼


//#region 검색 
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
	fetch("/employees/att"+parameter)
	.then(data => data.json())
	.then(data => {
		grid.resetData(data)
	})
	
	
})
//#endregion

//신규버튼클릭시 이벤튼
//#region
document.querySelector('.new-Btn').addEventListener('click',function(){
	location.href='/employees/attendanceinput'
})
//#endregion


//#region 메인그리드 데이터 로드 함수
 async function datoToGrid () {
	await fetch("/employees/att")
	      .then(data => data.json())
	      .then(data => {
			grid.resetData(data)
		  })
 }
//#endregion