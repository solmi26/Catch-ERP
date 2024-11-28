/**
 * 
 */
//변수선언
let currentTarget = null;
//모달선언
const attReqModal = new bootstrap.Modal('#attReqModal')
//const deptModifyModal = new bootstrap.Modal('#deptModifyModal')
 
document.querySelector('.req-Btn').addEventListener('click',function (){
	attReqModal.show()
})
 

//신규입력 모달창에서 저장클릭시 이벤트
document.querySelector('.insert-Btn').addEventListener('click',function (ev) {
	let attendanceVO = null;
	let inputs = document.querySelectorAll('.insert-input')
	attendanceVO = nullCheck(inputs)
	if (attendanceVO === false) {
		alert("값을입력하세요")
		return;
	}
	fetch("/employees/attitem",{
		method:'post',
		headers: {
			"Content-Type":"application/json"
		},
		body:JSON.stringify(attendanceVO)
		})
	.then(data => data.json())
	.then(data => {
		if (data.result != '1') {
			alert("오류가 발생!")
		}else {
			alert("성공!")
		}
		mainGridDataLoad()
		attReqModal.hide()
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
mainGridDataLoad()

//그리드 클릭시 이벤트
grid.on('click',function (ev) {
	if (ev.targetType = "cell") {
		currentTarget = ev;
		let departmentCode = grid.getFormattedValue(ev.rowKey,'departmentCode');
		console.log(departmentCode);
		selectDataLoad(departmentCode)
		deptModifyModal.show();
		
	}
})


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


async function mainGridDataLoad() {
await   fetch('/employees/attitem')
		.then(data => data.json())
		.then(data => {
			db = data
			grid.resetData(data);
		})

	
}
