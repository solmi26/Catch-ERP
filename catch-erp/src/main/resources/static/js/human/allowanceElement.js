/**
 * 
 */
//변수선언
let currentTarget = null; 
let currentName = '';
//모달선언
const allReqModal = new bootstrap.Modal('#allReqModal')
const allModifyModal = new bootstrap.Modal('#allModifyModal')
//모달이벤트설정

//신구버튼클릭시 이벤트
document.querySelector('.req-Btn').addEventListener('click',function (){
	allReqModal.show()
})
 

//신규입력 모달창에서 저장클릭시 이벤트
document.querySelector('.insert-Btn').addEventListener('click',function (ev) {
	let flag;	
	let allowanceVO = null;
	let inputs = document.querySelectorAll('.insert-input')
	allowanceVO = nullCheck(inputs)
	if (allowanceVO === false) {
		toastr.warning("값을입력하세요")
		return;
	}
	// 중복값 검사
	flag = duplicationReqCheck(ev.target)
	if (!flag) {
		return;
	}
	fetch("/employees/allItem",{
		method:'post',
		headers: {
			"Content-Type":"application/json"
		},
		body:JSON.stringify(allowanceVO)
		})
	.then(data => data.json())
	.then(data => {
		toastr.success("수당항목이 등록되었습니다.")
		mainGridDataLoad()
		allReqModal.hide()
		inputs.forEach(ele => {
			ele.value = "";
		})
	})
})

//그리드 클릭시 이벤트
grid.on('click',function (ev) {
	if (ev.targetType == "cell") {
		currentTarget = ev;
		currentName = grid.getFormattedValue(ev.rowKey,'allowanceName');
		let allCode = grid.getFormattedValue(ev.rowKey,'allowanceCode');
		selectDataLoad(allCode)
		allModifyModal.show();
		
	}
})

//수정모달에서 저장 클릭시
document.querySelector('.modify-Btn').addEventListener('click',function(ev){
	let flag;
	AllItemVO = null;
	let inputs = document.querySelectorAll('.modify-input')
	AllItemVO = nullCheck(inputs);
	if (AllItemVO === false){
		toastr.warning("값을입력하세요")
		return;
	}
	flag = duplicationModCheck(ev.target) 
	if (!flag) {
		return;
	}
	fetch("/employees/allItem",{
		method:"put",
		headers:{"Content-Type":"application/json"},
		body:JSON.stringify(AllItemVO)
	})
	.then(data => data.json())
	.then(data => {
		mainGridDataLoad()
		allModifyModal.hide()
	})
})

//삭제버튼 클릭
document.querySelector('.delete-Btn').addEventListener('click',function () {
	let rows = grid.getCheckedRows();
	if (rows.length == 0) {
		return;
	}
    let flag = countCheck(rows);
	if (!flag) {
		return;
	}

	let list = ''
	for (ele of rows) {
		list += ','
		list += ele.allowanceCode		
	}
	fetch('/employees/allItem?allowanceCode='+list.substring(1),{
		method:'delete'
	})
	.then(data=>data.json())
	.then(data=>{
		mainGridDataLoad() 
	})
})




//단건 데이터 받기(수정모달)
async function selectDataLoad(allowanceCode) {
	await fetch("/employees/allItem/"+allowanceCode)
	     .then(data => data.json())
	     .then(data => {
			for (ele in data) {
			document.querySelector("#allModifyModal").querySelector(`[name="${ele}"]`).value = data[ele]
			}
			})
}

async function mainGridDataLoad() {
await   fetch('/employees/allItem')
		.then(data => data.json())
		.then(data => {
			db = data
			grid.resetData(data);
		})

	
}

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

//수당코드 중복값 검사
function duplicationReqCheck (target) {
	let flag = true;
	let codeInput = target.closest('.modal').querySelector('[name="allowanceCode"]')
	let codeName = target.closest('.modal').querySelector('[name="allowanceName"]')
	let codeList = grid.getColumnValues('allowanceCode')
	let nameList = grid.getColumnValues('allowanceName')
	for (let code of codeList) {
		if (codeInput.value == code) {
			flag = false;
			break;
		}
	} 
	if (!flag) {
		toastr.warning("해당되는 수당코드가 이미 존재합니다.")
		return false;
	}
	for (let name of nameList) {
		if (codeName.value == name) {
			flag = false;
			break;
		}
	} 
	if (!flag) {
		toastr.warning("해당되는 수당명이 이미 존재합니다.")
		return false;
	}
	return true;
}

//수정모달 중복검사
function duplicationModCheck (target) {
	let flag = true;
	let codeName = target.closest('.modal').querySelector('[name="allowanceName"]')
	let nameList = grid.getColumnValues('allowanceName')
	for (let name of nameList) {
		if (name == currentName) {
			continue;
		} else if (codeName.value == name) {
			flag = false;
			break;
		}
	} 
	if (!flag) {
		toastr.warning("해당되는 수당명이 이미 존재합니다.")
		return false;
	}
	return true;
}


//총횟수검사
function countCheck(row) {
	for (let ele of row) {
		if (ele.count != 0) {
			toastr.warning("해당 수당항목은 삭제할수 없는 상태입니다.")
			grid.focus(ele.rowKey,'attCode')
			return false;
		}
	}
	return true;
}