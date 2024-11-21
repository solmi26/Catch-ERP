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
	}	
})