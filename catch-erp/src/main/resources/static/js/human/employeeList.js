/**
 * 
 */
console.log("gd")
/*
document.querySelector('#employeeTabContent').querySelectorAll('input')
*/



//사원목록 클릭 이벤트
grid.on('click', function (ev) {
	if (ev.targetType == 'cell') {
		console.log(ev);
		let empCode = grid.getFormattedValue(ev.rowKey,'employeeCode');
		fetch('/emps/'+empCode)
		.then(data => data.json())
		.then(data => {
				for (let ele in data) {
					//모든 인풋태그에 값부여 이벤트
					let input = document.querySelector(`input[name="${ele}"]`)
					if (input != null) {
						input.value = data[ele]
					}
					//특정 인풋에 readonly 부여 이벤트

					}
				let readonly = [
					'employeeCode',
					'employeePosition',
					'statusType',
					'hireType',
					'departmentCode',
					'headCheck',
					'duty',
					'zipcode',
					'address',
					'detailAddress',
					'bank']
				readonly.forEach(ele => {
					console.log(ele)
					document.querySelector(`input[name='${ele}']`).readOnly = true;
				})	
		})
	}	
})


//신규버튼 클릭 이벤트
document.querySelector('#newBtn').addEventListener('click',function () {
	let input = document.querySelector('#employeeTabContent').querySelectorAll('input')
	input.forEach(ele => {
		ele.readOnly = false;
		ele.value = null;
	})
})

 

