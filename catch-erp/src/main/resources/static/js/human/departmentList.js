/**
 * 
 */

//모달선언

const departmentReqModal = new bootstrap.Modal('#departmentReqModal')

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
	let flag = true
	let departmentVO = {}
	let inputs = document.querySelectorAll('.insert-input')
	for (let input of inputs ) {
		if (input.value === null || input.value == "") {
			flag = false;
			break;
		}
		departmentVO[input.name] = input.value
	}
	if (flag != true) {
		alert("값을 입력하세요")
		return;
	}
	console.log(departmentVO)
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
	})
		
})

//삭제버튼 클릭 이벤트
document.querySelector('.del-Btn').addEventListener('click',function () {
	let rows = grid.getCheckedRows();
	if (rows.length == 0) {
		return;
	}
	
	
})



async function mainGridDataLoad() {
await   fetch('/employees/dept')
		.then(data => data.json())
		.then(data => {
			db = data
			grid.resetData(data);
		})

	
}
