/**
 * 
 */
console.log("gd")

//열을 추가하는 이벤트
document.querySelector(".addBtn").addEventListener('click',function() {
	let tbody = document.querySelector('tbody');
	let html ='<tr class="blank"><td><input type="checkbox"></td><td><input type="text" readonly size=4 name="employeeCode"></td><td><input type="text" readonly size=4 ></td><td><input type="date" class="lock"  name="attendanceDate"></td><td><input type="text" class="lock" name="attCode" readonly size=4 ></td><td><input type="time" class="lock" name="attendanceTime" readonly size=4 ></td><td><input type="time" class="lock" name="leaveTime" readonly size=4 ></td><td><input type="text" name="toalWorktime" readonly size=4 ></td><td><input type="text" name="overtimeWorktime" readonly size=4 ></td><td><input type="text" name="nightWorktime" readonly size=4 ></td><td><input type="text" name="weekendWorktime" readonly size=4 ></td></tr>'


	tbody.insertAdjacentHTML('beforeend',html)
})