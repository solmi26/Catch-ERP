/**
 * 
 */
let currentTarget = null;

//인사기록 토스트 그리드 이벤트
grid.on('click', function (ev) {
	console.log(ev)
	if (ev.columnName == 'employeeCode' || ev.columnName == 'employeeName') {
		currentTarget = ev;
		window.setTimeout(function(){
        empGrid.refreshLayout();
        }, 200) 
		empModal.show()
	}
	if (ev.columnName == 'assignedDepartment') {
		currentTarget = ev
		window.setTimeout(function(){
        dsGrid.refreshLayout();
        }, 200)
        dsModal.show(); 
	}
	if (ev.columnName == 'assignedPosition') {
		currentTarget = ev
		window.setTimeout(function(){
        empPositionGrid.refreshLayout();
        }, 200)
        empPositionModal.show()

	}
})

//사원검색 모달창 이벤트
empGrid.on('click',function (ev) {
	if (ev.targetType == 'cell') {
		let empName = empGrid.getFormattedValue(ev.rowKey,'employeeName');
		grid.setValue(currentTarget.rowKey,'employeeName',empName)
		empModal.hide()
	}
})

//부서검색 모달창 이벤트
dsGrid.on('click', function (ev) {
	if (ev.targetType == 'cell') {
		let deptName = dsGrid.getFormattedValue(ev.rowKey,'departmentName')
		grid.setValue(currentTarget.rowKey,'assignedDepartment',deptName)
		dsModal.hide()
	}
})
 
//직급/직위검색 모달창 이벤트
empPositionGrid.on('click',function (ev) {
	if (ev.targetType == 'cell') {
		let position = empPositionGrid.getFormattedValue(ev.rowKey,'name')
		grid.setValue(currentTarget.rowKey,'assignedPosition',position)
		empPositionModal.hide()
		
		
	}
})