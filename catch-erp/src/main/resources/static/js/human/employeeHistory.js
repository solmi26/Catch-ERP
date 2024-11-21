/**
 * 
 */

let currentTarget = null;
let subTarget = null;
//메인페이지 인사발령조회 토스트 그리드 이벤트
grid.on('click',function (ev) {
	if (ev.targetType == 'cell') {
		currentTarget = ev
		window.setTimeout(function () {
		ehModifyGrid.refreshLayout();
		},200)
		ehModifyModal.show();
	}
})





//인사발령수정 모달창 이벤트
ehModifyGrid.on('click',function (ev){
	//사원검색모달창 띄우기
	if (ev.columnName == 'employeeCode' || ev.columnName == 'employeeName') {
		console.log(ev	)
		subTarget = ev;
		window.setTimeout(function () {
		empGrid.refreshLayout();
		},200)
		empModal.show();
	}
	//부서검색 모달창
	if (ev.columnName == 'assignedDepartment') {
		subTarget = ev;
		window.setTimeout(function () {
		dsGrid.refreshLayout();
		},200)
		ehModifyModal.hide();
		dsModal.show();
	}
	//직급,직책 모달창
	if (ev.columnName == 'assignedPosition') {
		subTarget = ev;
		window.setTimeout(function () {
		empPositionGrid.refreshLayout();
		},200)
		ehModifyModal.hide();
		empPositionModal.show();
	}
})





//사원검색 모달창 이벤트
empGrid.on('click',function (ev) {
	if (ev.targetType == 'cell') {
		let empName = empGrid.getFormattedValue(ev.rowKey,'employeeName')
		let empCode = empGrid.getFormattedValue(ev.rowKey,'employeeCode')
		ehModifyGrid.setValue(subTarget.rowKey,'employeeName',empName);
		ehModifyGrid.setValue(subTarget.rowKey,'employeeCode',empCode);
		empModal.hide();
		ehModifyModal.show();
		
	}
})


//부서검색 모달창 이벤트
dsGrid.on('click',function (ev) {
	if (ev.targetType == 'cell') {
		let deptName = dsGrid.getFormattedValue(ev.rowKey,'departmentName')
		ehModifyGrid.setValue(subTarget.rowKey,'assignedDepartment',deptName);
		dsModal.hide();
		ehModifyModal.show();
		
	}
})


//직급,직책 모달창 이벤트
empPositionGrid.on('click', function (ev) {
	if (ev.targetType == 'cell') {
		let position = empPositionGrid.getFormattedValue(ev.rowKey,'name')
		ehModifyGrid.setValue(subTarget.rowKey,'assignedPosition',position);
		empPositionModal.hide();
		ehModifyModal.show();
		
	}
	
} )
