/**
 * 
 */

grid.on('click',function (ev) {
	if (ev.targetType == 'cell') {
		let salaryNumber = grid.getFormattedValue(ev.rowKey,'salaryNumber')
		dataToSalModifyGrid(salaryNumber)
	    window.setTimeout(function(){
	    salModifyGrid.refreshLayout();
	    }, 200) 		
		
		salModifyModal.show()
		
	}
})

//급여수정내역 저장버튼 클릭시
//#region
document.querySelector('.update-Btn').addEventListener('click',function () {
	let datas = extractSalModifyGrid()
	fetch("/employees/payroll", {
		method:'put',
		headers:{"Content-Type": "application/json"},
		body:JSON.stringify(datas[0])
	})
	.then(data => data.json())
	.then(data => {
		salModifyModal.hide()
		datoToGrid()
	})
})
//#endregion
//삭제버튼클릭시
document.querySelector('.delete-Btn').addEventListener('click',function () {
	let checkRow = grid.getCheckedRows()
	if  (checkRow.length == 0 ) {
		return;
	}
	let str = ''
	checkRow.forEach(ele => {
		str += ','
		str += ele.salaryNumber
	})
	fetch('/employees/payroll?salaryNumber='+str.substring(1),
	      {method:'delete'})
	.then(data => data.json())
	.then(data => {
		datoToGrid()
		
	})
})
/**
 *
 *  @argument ddd
 * 
 * 인쇄버튼클릭시 모달띄우기
 */
let  ary;
let eles;
//#region
document.querySelector('.printModal-Btn').addEventListener('click',function () {
	let checkRow = grid.getCheckedRows()
	if  (checkRow.length == 0 ) {
		return;
	}
	let str = ''
	checkRow.forEach(ele => {
		str += ','
		str += ele.salaryNumber
	})
	fetch('/employees/payroll/sel?salaryNumber='+str.substring(1))
	.then(data => data.json())
	.then(data => {
		data.forEach(ele => {
			deduItem = [{"employmentInsurance":ele.employmentInsurance},{"healthInsurance":ele.healthInsurance},{"incomeTax":ele.incomeTax},
			{"leaveRate":ele.leaveRate},{"localTax":ele.localTax}]
			
			ary = deduItem;
			let index = ele.allowanceHistoryVO.length > 3 ? ele.allowanceHistoryVO.length : 3 
			let arr = []
			arr.push(`<td>연장근무</td><td>${ele.overtimeAllowance}</td>소득세<td></td><td>${ele.incomeTax}</td>`)
			arr.push(`<td>야간근무</td><td>${ele.nightAllowance}</td></td>지방세<td></td><td>${ele.localTax}</td>`)
			arr.push(`<td>주말근무</td><td>${ele.weekendAllowance}</td></td>건강보험료<td></td><td>${ele.healthInsurance}</td>`)
			let seq = 0;
			ele.allowanceHistoryVO.forEach(comp => {
				let td = `<td>${comp.allowanceName}</td><td>${comp.allowancePrice}</td>`
				if (seq = 0) {
					
				} else if (seq = 1) {
					
				} else if (seq = 2) {
				
				} else {
					
				}
				seq += 1;	
			})
			
			
			console.log(arr)
			
			printBody = ``
			html = 
					`<div id="print-content">
					  <h1>급여명세서</h1>
					  <div>
					  <span>${ele.payrollYdate}</span>
					  <span></span>
					  </div>
					  <br>
					  <table>
					      <tr>
					        <td class="background-payment">성명</td>
					        <td colspan="3">${ele.name}</td>
					        <td class="background-payment">사번</td>
					        <td>${ele.employeeId}</td>
					      </tr>
					      <tr>
					        <td class="background-payment">직급/직급</td>
					        <td colspan="3"></td>
					        <td class="background-payment">부서</td>
					        <td></td>
					      </tr>
					      <tr>
					        <td class="background-payment">생년월일</td>
					        <td colspan="3"></td>
					        <td class="background-payment">지급일</td>
					        <td>${ele.payrollYdate}</td>
					      </tr>
					  </table>
					<br>
					<br>
					<table>
					  <thead>
					    <tr>
					      <td colspan="2" class="bold-color">임금지급내역</td>
					      <td colspan="2" class="bold-color">공제내역</td>
					    </tr>
					    <tr>
					      <td class="background-payment">임금항목</td>
					      <td class="background-payment">지급액원(원)</td>
					      <td class="background-payment">공제항목</td>
					      <td class="background-payment">지급액원(원)</td>
					    </tr>
					  </thead>
					  <tbody>
					    <tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
					    </tr>
					    <tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
					    </tr>					  </tbody>
					  <tfoot>
					    <tr>
					      <td class="background-payment">총지급액</td>
					      <td></td>
					      <td class="background-payment">총공제액</td>
					      <td></td>
					    </tr>
					    <tr>
					      <td class="background-payment">실지급액</td>
					      <td colspan="3"></td>
					    </tr>
					  </tfoot>
					</table> 
					  <br>
					  <table>
					    <tr>
					      <td colspan="3" class="bold-color">계산방법</td>
					    </tr>
					    <tr>
					      <td class="background-payment">구분</td>
					      <td class="background-payment">산출식 또는 산출방법</td>
					      <td class="background-payment">지급액(원)</td>
					    </tr>
					    <tr>
					      <td class="background-payment">연장근로수당</td>
					      <td></td>
					      <td></td>
					    </tr>
					    <tr>
					      <td class="background-payment">야간근로수당</td>
					      <td></td>
					      <td></td>
					    </tr>
					    <tr>
					      <td class="background-payment">주말근로수당</td>
					      <td></td>
					      <td></td>
					    </tr>
					  </table>
					</div>`
		})
		
	})
})
//#endregion

//메인그리드 데이터 불러오기
function datoToGrid() {
	fetch("/employees/payroll")
	      .then(data => data.json())
	      .then(data => {
			grid.resetData(data)
		  })
 }
 
 
//검색버튼 클릭 이벤트
document.querySelector('.search-btn').addEventListener('click',function (ev) {
	//검색옵션들 들고오기
	let str = "";
	let option = document.querySelectorAll('.search-option')
	let radio = document.querySelector('input[name="statusType"]:checked')
	option.forEach(ele =>{
		if (ele.value !== "" && ele.value != null ) {
			str += '&' 
			str += ele.name
			str += '='
			str += ele.value 
		}
	})
	str += '&' 
	str += 'statusType';
	str += '='
	if (radio != null) {
		str += radio.value;
	} else {
		str += ""
	}
	parameter = '?'+str.substr(1)
	fetch("/employees/payroll"+parameter)
	.then(data => data.json())
	.then(data => {
		grid.resetData(data)
	})
	
	
}) 