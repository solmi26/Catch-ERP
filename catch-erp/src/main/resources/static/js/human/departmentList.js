/**
 * 
 */
//기본변수선언
let currentTarget = null;
//모달선언

const departmentReqModal = new bootstrap.Modal('#departmentReqModal')
const deptModifyModal = new bootstrap.Modal('#deptModifyModal')
//신규등록 모달버튼
document.querySelector('.req-Btn').addEventListener('click', function () {
	departmentReqModal.show()
})
//그리드 데이터 불러오기
document.addEventListener('DOMContentLoaded',{
	
})
mainGridDataLoad()
 
//신규입력 모달창에서 저장클릭시 이벤트 
document.querySelector('.insert-Btn').addEventListener('click',function (ev) {
	let departmentVO = null;
	let inputs = document.querySelectorAll('.insert-input')
	departmentVO = nullCheck(inputs)
	if (departmentVO === false) {
		alert("값을입력하세요")
		return;
	}
	fetch("/employees/dept",{
		method:'post',
		headers: {
			"Content-Type":"application/json"
		},
		body:JSON.stringify(departmentVO)
		})
	.then(data => data.json())
	.then(data => {
		if (data.result != '1') {
			alert("오류가 발생!")
		}else {
			alert("성공!")
		}
		mainGridDataLoad()
		departmentReqModal.hide()
		inputs.forEach(ele => {
			ele.value = "";
		})
	})
		
})

//삭제버튼 클릭 이벤트
document.querySelector('.del-Btn').addEventListener('click',function () {
	let rows = grid.getCheckedRows();
	if (rows.length == 0) {
		console.log("열을체크")
		return;
	}
	let list = ""
	for (ele of rows) {
		list += ","
		list += ele.departmentCode
	}
	let result = "departmentCode="+list.substring(1);
	console.log(result);
	fetch("/employees/dept?"+result,{
		method:'Delete',
		header: {
			"Content-Type":"application/json"
		},
		body:JSON.stringify(rows)
		})
	.then(data => data.json())
	.then(data => {
		mainGridDataLoad()
	})
	
})

//그리드 클릭시 이벤트
grid.on('click',function (ev) {
	if (ev.targetType == "cell") {
		currentTarget = ev;
		let departmentCode = grid.getFormattedValue(ev.rowKey,'departmentCode');
		console.log(departmentCode);
		selectDataLoad(departmentCode)
		deptModifyModal.show();
		
	}
})

//수정모달창에 저장버튼 클릭 이벤트
document.querySelector('.modify-save-Btn').addEventListener('click',function () {
	let departmentVO = null;
	let inputs = document.querySelectorAll('.modify-input')
	departmentVO = nullCheck(inputs)
	if (departmentVO === false) {
		alert("값을입력하세요")
		return;
	}
	fetch("/employees/dept",{
		method:'put',
		headers: {
			"Content-Type":"application/json"
		},
		body:JSON.stringify(departmentVO)
		})
	.then(data => data.json())
	.then(data => {
		if (data.result != '1') {
			alert("오류가 발생!")
		}else {
			alert("성공!")
		}
		mainGridDataLoad()
		departmentReqModal.hide()
		inputs.forEach(ele => {
			ele.value = "";
		})
	})
	

})


//널값 체크
function nullCheck (target) {
	let VO = {}
	for (let input of target ) {
		if (input.value === null || input.value == "") {
			return false;
		}
		VO[input.name] = input.value
	}
	return VO;
}



//단건 데이터 받기(수정모달)
async function selectDataLoad(departmentCode) {
	await fetch("/employees/dept/"+departmentCode)
	     .then(data => data.json())
	     .then(data => {
			console.log(data)
			for (ele in data) {
				console.log(ele)
			document.querySelector("#deptModifyModal").querySelector(`[name="${ele}"]`).value = data[ele]
			}
				
			})
	
}

//메인그리드 데이터 받기

async function mainGridDataLoad() {
await   fetch('/employees/dept')
		.then(data => data.json())
		.then(data => {
			db = data
			grid.resetData(data);
		})

	
}
