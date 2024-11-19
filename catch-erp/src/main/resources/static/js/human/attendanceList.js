/**
 * 
 */
//그리드 클릭 이벤트
 grid.on('click',function (ev) {
	if (ev.columnName == 'employeeCode') {
		window.setTimeout(function(){
        atModifyGrid.refreshLayout();
        }, 200) 
		atModifyModal.show()
	}
 })