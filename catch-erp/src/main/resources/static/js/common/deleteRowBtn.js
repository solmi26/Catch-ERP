/**
 * 
 */
//딜리트버튼에 deleteRowBtn 클래스 추가할것
 
//열을 삭제하는 이벤트
 
let deletes = document.querySelectorAll('.deleteRowBtn')
deletes.forEach(btn => {
btn.addEventListener('click',  function () {
	 grid.removeCheckedRows();
	 
	refreshRowNum(gird.el.id);		
	
})
	
})

//열을 추가후 체크박스에 다시 숫자부여하는 코드
function refreshRowNum (id) {
	 window.setTimeout(function () {
	let checkList = document.querySelectorAll('.countCheck-'+id)
	let num = 1;
	checkList.forEach(items => {
		items.innerText = num;
		num += 1;
	})
		
	 }, 50)
}
