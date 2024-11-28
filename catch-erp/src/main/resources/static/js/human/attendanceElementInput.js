/**
 * 
 */
//변수선언
let currentTarget = null;
//모달선언
const attReqModal = new bootstrap.Modal('#attReqModal')
const attModifyModal = new bootstrap.Modal('#attModifyModal')
//모달이벤트설정



//전체데이터불러오기
mainGridDataLoad() 

//신구버튼클릭시 이벤트
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



//그리드 클릭시 이벤트
grid.on('click',function (ev) {
	if (ev.targetType == "cell") {
		currentTarget = ev;
		let attCode = grid.getFormattedValue(ev.rowKey,'attCode');
		console.log(attCode);
		selectDataLoad(attCode)
		attModifyModal.show();
		
	}
})
//수정모달에서 저장 클릭시
document.querySelector('.modify-Btn').addEventListener('click',function(){
	AttItemVO = null;
	let inputs = document.querySelectorAll('.modify-input')
	AttItemVO = nullCheck(inputs);
	if (AttItemVO === false){
		alert("값을입력하세요")
		return;
	}
	fetch("/employees/attitem",{
		method:"put",
		headers:{"Content-Type":"application/json"},
		body:JSON.stringify(AttItemVO)
	})
	.then(data => data.json())
	.then(data => {
		mainGridDataLoad()
		attModifyModal.hide()
	})
})

//삭제버튼 클릭
document.querySelector('.delete-Btn').addEventListener('click',function () {
	let rows = grid.getCheckedRows();
	if (rows.length == 0) {
		return;
	}
	let list = ''
	for (ele of rows) {
		list += ','
		list += ele.attCode		
	}
	fetch('/employees/attitem?attCode='+list.substring(1),{
		method:'delete'
	})
	.then(data=>data.json())
	.then(data=>{
		mainGridDataLoad() 
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
	await fetch("/employees/attItem/"+departmentCode)
	     .then(data => data.json())
	     .then(data => {
			console.log(data)
			for (ele in data) {
				console.log(ele)
			document.querySelector("#attModifyModal").querySelector(`[name="${ele}"]`).value = data[ele]
			}
				
			})
	
}

//메인그리드 데이터 받기
async function mainGridDataLoad() {
await   fetch('/employees/attitem')
		.then(data => data.json())
		.then(data => {
			db = data
			grid.resetData(data);
		})

	
}
