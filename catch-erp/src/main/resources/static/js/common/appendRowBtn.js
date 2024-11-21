/**
 * 
 */
//클래스 명에 appendRowBtn 추가


//열을 추가하는 이벤트
let appends = document.querySelectorAll('.appendRowBtn')
appends.forEach(btn => {
	
btn.addEventListener('click',function(){
	grid.appendRow();
})
	
})
