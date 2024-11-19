/**
 * 
 */

grid.on('click',function (ev) {
	if (ev.targetType == 'cell') {
	    window.setTimeout(function(){
	    salModifyGrid.refreshLayout();
	    }, 200) 		
			
		salModifyModal.show()
		
	}
})
