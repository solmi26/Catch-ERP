/**
 * 
 */
 //변수선언
let currentTarget = null; 
let currentName = '';
//모달선언
const deduModifyModal = new bootstrap.Modal('#deduModifyModal')
const incomeModifyModal = new bootstrap.Modal('#incomeModifyModal')
//모달이벤트설정


//공제그리드 이벤트 설정
deduGrid.on('click',function (ev) {
	if (ev.targetType =='cell') {
		let target = document.querySelector('#deduModifyModal')
		currentName = deduGrid.getFormattedValue(ev.rowKey,'deductionsName')
		let deduCode = deduGrid.getFormattedValue(ev.rowKey,'deductionsCode')
		deduModalDataLoad(deduCode,target)
		deduModifyModal.show()
	}
})
//소득세그리드 이벤트 설정
incomeGrid.on('click',function (ev) {
	if (ev.targetType =='cell') {
		let target = document.querySelector('#incomeModifyModal')
		currentName = incomeGrid.getFormattedValue(ev.rowKey,'deductionsName')
		let deduCode = incomeGrid.getFormattedValue(ev.rowKey,'deductionsCode')
		incomeModalDataLoad(deduCode,target)
		incomeModifyModal.show()
	}
})


//공제모달 저장버튼클릭시
document.querySelector('.dedu-save-Btn').addEventListener('click',function (ev) {
	let modal = document.querySelector('#deduModifyModal')
	let name = modal.querySelector('[name="deductionsName"]')
	let rate = modal.querySelector('[name="deductionsDeductible"]')
	if (name.value == "") {
		alert("이름을 다시 입력해주세요.")
		name.focus()
		return;
	}
	if (rate < 0 || rate > 100) {
		alert("공제율을 다시 입력해주새요.")
		rate.value = 0;
		rate.focus();
		return;
	}
	if(!duplicationModCheck(ev.target)) {
		return;
	}
	let deductionVO = {}
	for (let input of modal.querySelectorAll('input') ) {
		deductionVO[input.name] = input.value
	}
	
	fetch("/employees/deduItem",{
		method:'put',
		headers:{'Content-Type':'application/json'},
		body:JSON.stringify(deductionVO)
	})
	.then(data => {
		alert("공제가 수정되었습니다.")
		deduGridDataLoad()
		deduModifyModal.hide()
	})
	
})

//소득세모달 저장버튼클릭시
document.querySelector('.income-save-Btn').addEventListener('click',function (ev) {
	let modal = document.querySelector('#incomeModifyModal')
	let name = modal.querySelector('[name="deductionsName"]')
	let rate = modal.querySelector('[name="deductionsDeductible"]')
	let min = modal.querySelector('[name="maxval"]')
	let max = modal.querySelector('[name="minval"]')
	if (name.value == "") {
		alert("이름을 다시 입력해주세요.")
		name.focus()
		return;
	}
	if (rate < 0 || rate > 100 || rate == "") {
		alert("공제율을 다시 입력해주새요.")
		rate.value = 0;
		rate.focus();
		return;
	}
	if (min < 0 || min == "") {
		alert("최소금액을 다시 입력해주새요.")
		min.value = 0;
		min.focus();
		return;
	}
	if (max < 0 || max == "") {
		alert("최대금액을 다시 입력해주새요.")
		max.value = 0;
		max.focus();
		return;
	}
	
	let deductionVO = {}
	for (let input of modal.querySelectorAll('input') ) {
		deductionVO[input.name] = input.value
	}
	
	fetch("/employees/deduItem",{
		method:'put',
		headers:{'Content-Type':'application/json'},
		body:JSON.stringify(deductionVO)
	})
	.then(data => {
		alert("공제가 수정되었습니다.")
		incomeGridDataLoad()
		incomeModifyModal.hide()
	})
	
})

//단건 데이터 받기(공제수정모달)
async function deduModalDataLoad(deduCode,target) {
	await fetch("/employees/deduItem/"+deduCode)
	     .then(data => data.json())
	     .then(data => {
			console.log(data)
			for (ele in data) {
			  let input = target.querySelector(`[name="${ele}"]`)
			  if (input != null) {
				input.value = data[ele];
			  }
			}
				
			})
	
}
//단건 데이터 받기(소득세수정모달)
async function incomeModalDataLoad(deduCode,target) {
	await fetch("/employees/deduItem/"+deduCode)
	     .then(data => data.json())
	     .then(data => {
			for (ele in data) {
			  let input = target.querySelector(`[name="${ele}"]`)
			  if (input != null) {
				input.value = data[ele];
			  }
			}
				
			})
	
}

//공제그리드 데이터 받기
async function deduGridDataLoad() {
await   fetch('/employees/deduItem')
		.then(data => data.json())
		.then(data => {
			deduGrid.resetData(data);
		})

	
}

//소득세 그리드 데이터 받기
async function incomeGridDataLoad() {
await   fetch('/employees/income')
		.then(data => data.json())
		.then(data => {
			incomeGrid.resetData(data);
		})

	
}


//수정모달 중복검사
function duplicationModCheck (target) {
	let flag = true;
	let codeName = target.closest('.modal').querySelector('[name="deductionsName"]')
	let nameList = deduGrid.getColumnValues('deductionsName')
	for (let name of nameList) {
		if (name == currentName) {
			continue;
		} else if (codeName.value == name) {
			flag = false;
			break;
		}
	} 
	if (!flag) {
		alert("해당되는 공제명이 이미 존재합니다.")
		return false;
	}
	return true;
}

