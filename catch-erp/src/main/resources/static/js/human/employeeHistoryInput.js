/**
 * 
 */

 console.log('zzz')
 document.querySelector('.addRowBtn').addEventListener('click',function () {
	let standardDate =document.querySelector('.standard-date')
	
	grid.appendRow({name:standardDate.value})
	

 })
 
document.querySelector('.deleteBtn').addEventListener('click',  function () {
	 grid.removeCheckedRows();
	 
	refreshRowNum();		
	
})


function refreshRowNum () {
	 window.setTimeout(function () {
	let checkList = document.querySelectorAll('.countCheck')
	console.log(checkList.length);
	let num = 1;
	checkList.forEach(items => {
		items.innerText = num;
		num += 1;
	})
		
	 }, 50)
}
