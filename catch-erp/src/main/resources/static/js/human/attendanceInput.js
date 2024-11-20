/**
 * 
 *
console.log("gd")

열을 추가하는 이벤트
document.querySelector(".addBtn").addEventListener('click',function() {
	let tbody = document.querySelector('tbody');
	let html ='<tr class="blank"><td><input type="checkbox"></td><td><input type="text" readonly size=4 name="employeeCode"></td><td><input type="text" readonly size=4 ></td><td><input type="date" class="lock"  name="attendanceDate"></td><td><input type="text" class="lock" name="attCode" readonly size=4 ></td><td><input type="time" class="lock" name="attendanceTime" readonly size=4 ></td><td><input type="time" class="lock" name="leaveTime" readonly size=4 ></td><td><input type="text" name="toalWorktime" readonly size=4 ></td><td><input type="text" name="overtimeWorktime" readonly size=4 ></td><td><input type="text" name="nightWorktime" readonly size=4 ></td><td><input type="text" name="weekendWorktime" readonly size=4 ></td></tr>'


	tbody.insertAdjacentHTML('beforeend',html)
})
**/
let currentTarget = null;

//인사발령입력 테이블의 이벤트
grid.on('click',function (ev) {
	console.log(ev)
	
	if (ev.columnName == 'employeeCode') {
			currentTarget = ev;
            window.setTimeout(function(){
            empGrid.refreshLayout();
            }, 200) 
            empModal.show()
	}
	if (ev.columnName == 'attCode') {
		currentTarget = ev
        window.setTimeout(function(){
        aeSearchGrid.refreshLayout();
        }, 200) 
        aeSearchModal.show()
				
	}
})



//사원검색 테이블의 이벤트
empGrid.on('dblclick', function(ev) {
	if(ev.columnName == 'employeeCode') {
		let empCode = empGrid.getFormattedValue(ev.rowKey,ev.columnName)
		let empName = empGrid.getFormattedValue(ev.rowKey,'employeeName')
		grid.setValue(currentTarget.rowKey,ev.columnName,empCode)
		grid.setValue(currentTarget.rowKey,'employeeName',empName)
		empModal.hide()
	}
})

//근태유형 테이블의 이벤트

aeSearchGrid.on('dblclick', function (ev) {
	console.log(ev)
	if (ev.columnName == 'attCode'){
	let attName = aeSearchGrid.getFormattedValue(ev.rowKey,'attName');
		grid.setValue(currentTarget.rowKey,ev.columnName,attName);
		aeSearchModal.hide();
	}
	
		
})
