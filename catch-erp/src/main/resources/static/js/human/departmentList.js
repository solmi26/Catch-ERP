/**
 * 
 */

//모달선언

const departmentReqModal = new bootstrap.Modal('#departmentReqModal')

document.querySelector('.req-Btn').addEventListener('click', function () {
	departmentReqModal.show()
})
 

document.querySelector('.insert-Btn').addEventListener('click',function (ev) {
	let flag = true
	document.querySelectorAll('.insert-input').forEach(ele =>{
		if (ele.value == '' || ele.value == null) {

			flag = false;

		}

	})
	if (flag != true) {
					alert("값을 입력하세요")
		return;
	}
	console.log('zzz')
})