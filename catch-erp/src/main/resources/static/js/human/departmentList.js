/**
 * 
 */

let requireDept = ["D001","D002","D003","D004"]



//기본변수선언
let currentTarget = null;
let currentName = "";
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
	let flag;
	let inputs = document.querySelectorAll('.insert-input')
	departmentVO = nullCheck(inputs)
	if (departmentVO === false) {
		toastr.warning("값을입력하세요")
		return;
	}
	//중복값체크
	flag =duplicationReqCheck(ev.target)
	if (!flag) {
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
		toastr.success("부서가 등록되었습니다.")
		mainGridDataLoad()
		departmentReqModal.hide()
		inputs.forEach(ele => {
			ele.value = "";
		})
		departmentReqModal.hide()
	})
		
})
//부서장 클릭시
document.querySelectorAll('[name="name"]').forEach(ele => {
ele.addEventListener('click',function (ev) {
	currentTarget = ev;
	window.setTimeout(function(){
		empGrid.refreshLayout();
		}, 200) 
	dataToEmpModal ()
	empModal.show()
	})
})
//사원검색모달 이벤트
empGrid.on('click',function (ev) {
	console.log()
	if(ev.targetType == 'cell') {
		
		let managerCode = empGrid.getFormattedValue(ev.rowKey,'employeeCode')
		let name = empGrid.getFormattedValue(ev.rowKey,'name')
		currentTarget.target.value = name;
		currentTarget.target.nextElementSibling.value = managerCode;
		empModal.hide()
		
	}
})



//삭제버튼 클릭 이벤트
document.querySelector('.del-Btn').addEventListener('click',function () {
	let rows = grid.getCheckedRows();
	flag = false;
	if (rows.length == 0) {
		return;
	}
	flag = countCheck(rows);
	if (!flag) {
		return;
	}
	flag = checkRequireDept(rows);
	if (!flag) {
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
		currentName = grid.getFormattedValue(ev.rowKey,'departmentName')
		let departmentCode = grid.getFormattedValue(ev.rowKey,'departmentCode');
		console.log(departmentCode);
		selectDataLoad(departmentCode)
		deptModifyModal.show();
		
	}
})

//수정모달창에 저장버튼 클릭 이벤트
document.querySelector('.modify-save-Btn').addEventListener('click',function (ev) {
	let departmentVO = null;
	let inputs = document.querySelectorAll('.modify-input')
	departmentVO = nullCheck(inputs)
	if (departmentVO === false) {
		toastr.warning("값을입력하세요")
		return;
	}
	//중복값체크
	//중복값체크
	flag =duplicationModCheck(ev.target)
	if (!flag) {
		return;
	}
	//필수부서 체크
	flag = checkRequireDept([departmentVO]);
	if (!flag) {
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
		toastr.success("수정이 완료되었습니다.")
		deptModifyModal.hide()
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
				let input = document.querySelector("#deptModifyModal").querySelector(`[name="${ele}"]`)
			    if (input != null) {
					document.querySelector("#deptModifyModal").querySelector(`[name="${ele}"]`).value = data[ele]
				}
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

//부서코드 중복값 검사
function duplicationReqCheck (target) {
	let flag = true;
	let codeInput = target.closest('.modal').querySelector('[name="departmentCode"]')
	let codeName = target.closest('.modal').querySelector('[name="departmentName"]')
	let codeList = grid.getColumnValues('departmentCode')
	let nameList = grid.getColumnValues('departmentName')
	for (let code of codeList) {
		if (codeInput.value == code) {
			flag = false;
			break;
		}
	} 
	if (!flag) {
		toastr.warning("해당되는 부서코드가 이미 존재합니다.")
		return false;
	}
	for (let name of nameList) {
		if (codeName.value == name) {
			flag = false;
			break;
		}
	} 
	if (!flag) {
		toastr.warning("해당되는 부서명이 이미 존재합니다.")
		return false;
	}
	return true;
}
//수정모달 중복검사
function duplicationModCheck (target) {
	let flag = true;
	let codeName = target.closest('.modal').querySelector('[name="departmentName"]')
	let nameList = grid.getColumnValues('departmentName')
	for (let name of nameList) {
		if (name == currentName) {
			continue;
		} else if (codeName.value == name) {
			flag = false;
			break;
		}
	} 
	if (!flag) {
		toastr.warning("해당되는 부서명이 이미 존재합니다.")
		return false;
	}
	return true;
}
//총원검사
function countCheck(row) {
	for (let ele of row) {
		if (ele.count != 0) {
			toastr.warning("부서원이 있는 부서는 삭제할수 없습니다.")
			grid.focus(ele.rowKey,'count')
			return false;
		}
	}
	return true;
}
function checkRequireDept(rows) {
	for (let ele of rows) {
		for (let code of requireDept) {
			if (ele.departmentCode == code) {
				toastr.warning(ele.departmentName+"은 변경하시거나 삭제할수 없습니다.")
				return false;
			}
		} 
	}
	return true;
}
