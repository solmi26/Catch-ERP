/**
 * 
 */

//#region 그리드클릭이벤트
datoToGrid ()
//그리드 클릭 이벤트
 grid.on('click',function (ev) {
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
document.querySelector('delete-Btn').addEventListener('click',function () {
	let 
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




//#region 메인그리드 데이터 로드 함수
 async function datoToGrid () {
	await fetch("/employees/att")
	      .then(data => data.json())
	      .then(data => {
			grid.resetData(data)
		  })
 }
//#endregion