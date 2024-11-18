/**
 * 
 */

 console.log('zzz')
 document.querySelector('.addRowBtn').addEventListener('click',function () {
	let standardDate =document.querySelector('.standard-date')
	
	grid.appendRow({name:standardDate})
 })