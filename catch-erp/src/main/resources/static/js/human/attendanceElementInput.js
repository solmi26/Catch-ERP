/**
 * 
 */
let requireAtt = ["AT002"]
//변수선언
let currentTarget = null; 
let currentName = '';
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
	let flag;	
	let attendanceVO = null;
	let inputs = document.querySelectorAll('.insert-input')
	attendanceVO = nullCheck(inputs)
	if (attendanceVO === false) {
		toastr.warning("값을입력하세요")
		return;
	}
	// 중복값 검사
	flag = duplicationReqCheck(ev.target)
	if (!flag) {
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
		toastr.success("근태항목이 등록되었습니다.")
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
		currentName = grid.getFormattedValue(ev.rowKey,'attName');
		let attCode = grid.getFormattedValue(ev.rowKey,'attCode');
		console.log(attCode);
		selectDataLoad(attCode)
		attModifyModal.show();
		
	}
})
//수정모달에서 저장 클릭시
document.querySelector('.modify-Btn').addEventListener('click',function(ev){
	let flag;
	AttItemVO = null;
	let inputs = document.querySelectorAll('.modify-input')
	AttItemVO = nullCheck(inputs);
	if (AttItemVO === false){
		toastr.warning("값을입력하세요")
		return;
	}
	flag = duplicationModCheck(ev.target) 
	if (!flag) {
		return;
	}
	//필수항목
	flag = checkRequireAtt([AttItemVO])
	if (!flag) {
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
	let flag = false;
	let rows = grid.getCheckedRows();
	if (rows.length == 0) {
		return;
	}
    flag = countCheck(rows);
	if (!flag) {
		return;
	}
	//필수항목
	flag = checkRequireAtt(rows)
	if (!flag) {
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

//근태코드 중복값 검사
function duplicationReqCheck (target) {
	let flag = true;
	let codeInput = target.closest('.modal').querySelector('[name="attCode"]')
	let codeName = target.closest('.modal').querySelector('[name="attName"]')
	let codeList = grid.getColumnValues('attCode')
	let nameList = grid.getColumnValues('attName')
	for (let code of codeList) {
		if (codeInput.value == code) {
			flag = false;
			break;
		}
	} 
	if (!flag) {
		toastr.warning("해당되는 근태코드가 이미 존재합니다.")
		return false;
	}
	for (let name of nameList) {
		if (codeName.value == name) {
			flag = false;
			break;
		}
	} 
	if (!flag) {
		toastr.warning("해당되는 근태명이 이미 존재합니다.")
		return false;
	}
	return true;
}
//수정모달 중복검사
function duplicationModCheck (target) {
	let flag = true;
	let codeName = target.closest('.modal').querySelector('[name="attName"]')
	let nameList = grid.getColumnValues('attName')
	for (let name of nameList) {
		if (name == currentName) {
			continue;
		} else if (codeName.value == name) {
			flag = false;
			break;
		}
	} 
	if (!flag) {
		toastr.warning("해당되는 근태명이 이미 존재합니다.")
		return false;
	}
	return true;
}

//총횟수검사
function countCheck(row) {
	for (let ele of row) {
		if (ele.count != 0) {
			toastr.warning("해당 근태항목은 삭제할수 없는 상태입니다.")
			grid.focus(ele.rowKey,'attCode')
			return false;
		}
	}
	return true;
}

function checkRequireAtt(rows) {
	for (let ele of rows) {
		for (let code of requireAtt) {
			if (ele.attCode == code) {
				toastr.warning(ele.attName+"는 변경하시거나 삭제할수 없습니다.")
				return false;
			}
		} 
	}
	return true;
}
