/**
 * 
 */
let currentPayroll

grid.on('click',function (ev) {
	if (ev.targetType == 'cell') {
		let salaryNumber = grid.getFormattedValue(ev.rowKey,'salaryNumber')
		let salaryCheck = grid.getFormattedValue(ev.rowKey,'payrollCheck')
		if (salaryCheck == '미검토') {
			dataToSalModifyGrid(salaryNumber)
		    window.setTimeout(function(){
		    salModifyGrid.refreshLayout();
		    }, 200) 		
			salModifyModal.show()
			
		} else if (salaryCheck == '검토완료') {
			dataToSalDetailGrid(salaryNumber)
			currentPayroll = salaryNumber;
		    window.setTimeout(function(){
		    salDetailGrid.refreshLayout();
		    }, 200) 		
			salDetailModal.show()
			
		}
		
	}
})
//그리드 크기 새로고침
window.addEventListener(`resize`, function() {
		window.setTimeout(function(){
			grid.refreshLayout();
			}, 200)     	  
    });
    
//급여수정내역 저장버튼 클릭시
//#region
document.querySelector('.update-Btn').addEventListener('click',function () {
	//유효성 검사
	if (validateCheck()) {
		return;	
	}
	//공제금액 체크
	if (sumCheck()) {
		return;
	}
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
 *.
 *  @argument ddd
 * 
 * 인쇄버튼클릭시 모달띄우기
 */
let  ary;
document.querySelector('.publication-Btn').addEventListener('click',async function () {
	let result = await checkSalry()
	console.log(result.result)
	let flag = false;
	let now = new Date();
	let payrollY = new Date(now.getFullYear(),now.getMonth(),now.getDay());
	let month = payrollY.getMonth();
	
	if (result.result > 0 ) {
			Swal.fire({
			  html: `${month}월달의 급여명세서는 이미 발행되어 있습니다. <br> 기존 명세서를 삭제하고 재발행 하시겠습니까?`,
			  icon: "warning",
			  showCancelButton: true,
			  confirmButtonColor: "#3085d6",
			  cancelButtonColor: "#d33",
			  confirmButtonText: "삭제",
			  cancelButtonText:"취소"
			}).then((result) => {
				console.log(result.isConfirmed)
				flag = result.isConfirmed
				
				if (flag) {
				fetch("/employees/pay?mode=replace")
				.then(data => {
					toastr.success("급여명세서가 재발행되었습니다.")
					datoToGrid()
					})
				}	
			});
	} else if (result.result == 0) {
		fetch("/employees/pay?mode=create")
		.then(data => {
			toastr.success("급여명세서가 발행되었습니다.")
			datoToGrid()
		})
	}
		

})
//엑셀버튼
document.querySelector('.excel-Btn').addEventListener('click',function () {
	saveExcel(grid);
	toastr.success("엑셀이 출력되었습니다.")
})
//#region
document.querySelector('.printModal-Btn').addEventListener('click',function () {
	fetch('/employees/payroll/sel?salaryNumber='+currentPayroll)
	.then(data => data.json())
	.then(data => {
		document.querySelector('#print-content').innerHTML = ""
		for (let ele of data) {		
			let index = ele.allowanceHistoryVO.length > 3 ? ele.allowanceHistoryVO.length : 2 
			let tr = "";
			let html ="";
			tr += `<tr><td>기본급</td><td>${(Math.round(ele.monthlySalary/10)*10).toLocaleString()}원</td><td>소득세</td><td>${(Math.round(ele.incomeTax/10)*10).toLocaleString()}원</td></tr>`
			tr += `<tr><td>연장근무</td><td>${(Math.round(ele.overtimeAllowance/10)*10).toLocaleString()}원</td><td>지방세</td><td>${(Math.round(ele.localTax/10)*10).toLocaleString()}원</td></tr>`
			tr += `<tr><td>야간근무</td><td>${(Math.round(ele.nightAllowance/10)*10).toLocaleString()}원</td><td>건강보험료</td><td>${(Math.round(ele.healthInsurance/10)*10).toLocaleString()}원</td></tr>`
			tr += `<tr><td>주말근무</td><td>${(Math.round(ele.weekendAllowance/10)*10).toLocaleString()}원</td><td>국민연금료</td><td>${(Math.round(ele.nationalInsurance/10)*10).toLocaleString()}원</td></tr>`
			for (let i=0; i<index; i++) {
				
				let td ="<tr>";
				if (ele.allowanceHistoryVO[i] == undefined || ele.allowanceHistoryVO[0].awhiNo == null) {
				td += `<td></td><td></td>`					
				}else {
				td += `<td>${ele.allowanceHistoryVO[i].allowanceName}</td><td>${(Math.round(ele.allowanceHistoryVO[i].allowancePrice/10)*10).toLocaleString()}원</td>`
				}
				if (i == 0) {
					td += `<td>고용보험료</td><td>${(Math.round(ele.employmentInsurance/10)*10).toLocaleString()}원</td>`
				} else if (i == 1) {
					td += `<td>유급휴가비</td><td>${(Math.round(ele.leaveRate/10)*10).toLocaleString()}원</td>`
				} else {
					td += `<td></td><td></td>`
				}
				td += `</tr>`
				tr += td
			}
			eles = tr;
			let overtime;
			let nightime;
			let weektime;
			if (ele.overtimeAllowance != 0 ) {
			overtime = isNaN((ele.timeSalary*1.5)/ele.overtimeAllowance) ? 0 : (ele.timeSalary*1.5)/ele.overtimeAllowance
			} else {
			overtime = 0
			}
			
			if (ele.nightAllowance != 0) {
			nightime = isNaN((ele.timeSalary*1.5)/ele.nightAllowance) ? 0 : (ele.timeSalary*1.5)/ele.nightAllowance
				
			}else  {
			nightime = 0	
			}
			
			if (ele.weekendAllowance != 0 ) {
                weektime = isNaN((ele.timeSalary*1.5)/ele.weekendAllowance) ? 0 : (ele.timeSalary*1.5)/ele.weekendAllowance

			} else {
                weektime = 0
			}
			
			console.log(overtime)
			
			printBody = ``
			html = 
					`
					<style>
							#payrollPrintModal table {
		  width:800px;
		  
		
		}
		#payrollPrintModal table, td, th {
		border : 2px solid black;
		border-collapse : collapse;
		text-align: center;
		padding:8px;
		}
		#payrollPrintModal table {
		border: 3px solid black;
		}
		#payrollPrintModal .background-payment{
		background-color: rgb(216, 216, 216);
		font-weight: 500;
		}
		#payrollPrintModal .bold-color {
		background-color:rgb(20, 78, 38);
		font-size: large;
		color:white;
		}
		#payrollPrintModal tfoot {
		border-top: 3px solid black;
		
		}

		</style>			
					
					<div id="a">
					  <h2>급여명세서</h2>
					  <div>
					  <span>${ele.payrollYdate}</span>
					  <span></span>
					  </div>
					  <br>
					  <table>
					      <tr>
					        <td class="background-payment">성명</td>
					        <td colspan="3">${ele.name}</td>
					      </tr>
					      <tr>
					        <td class="background-payment">사번</td>
					        <td>${ele.employeeId}</td>
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
					  ${tr}
					  </tbody>
					  <tfoot>
					    <tr>
					      <td class="background-payment">총지급액</td>
					      <td>${(Math.round(ele.paymentTotal/10)*10).toLocaleString()}원</td>
					      <td class="background-payment">총공제액</td>
					      <td>${(Math.round(ele.deductionsTotal/10)*10).toLocaleString()}원</td>
					    </tr>
					    <tr>
					      <td class="background-payment">실지급액</td>
					      <td colspan="3">${(Math.round(ele.realPay/10)*10).toLocaleString()}원</td>
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
					      <td class="background-payment" >연장근로수당</td>
					      <td>시급의 1.5배(약 ${(Math.round(ele.timeSalary*1.5/10)*10).toLocaleString()}원) X 연장근무시간</td>
					      <td>${(Math.round(ele.overtimeAllowance/10)*10).toLocaleString()}원</td>
					    </tr>
					    <tr>
					      <td class="background-payment">야간근로수당(할증)</td>
					      <td>시급의 1.5배(약 ${(Math.round(ele.timeSalary*0.5/10)*10).toLocaleString()}원) X 야간근무시간</td>
					      <td>${(Math.round(ele.nightAllowance/10)*10).toLocaleString()}원</td>
					    </tr>
					    <tr>
					      <td class="background-payment">주말근로수당</td>
					      <td>시급의 1.5배(약 ${(Math.round(ele.timeSalary*1.5/10)*10).toLocaleString()}원) X 주말근무시간</td>
					      <td>${(Math.round(ele.weekendAllowance/10)*10).toLocaleString()}원</td>
					    </tr>
					  </table>
					</div>`
			document.querySelector('#print-content').insertAdjacentHTML('beforeend',html);	
			payrollPrintModal.show();	
				
		}
		
	})
})
//#endregion

//인쇄버튼클릭시
//#region

document.querySelector('.print-Btn').addEventListener('click',function () {
    const element = document.getElementById('print-content');
	   html2canvas(element).then(function(canvas) { //저장 영역 div id
		
	    // 캔버스를 이미지로 변환
	    var imgData = canvas.toDataURL('image/png');
	    var imgWidth = 190; // 이미지 가로 길이(mm) / A4 기준 210mm
	    var pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
	    var imgHeight = canvas.height * imgWidth/ canvas.width;
	    var heightLeft = imgHeight;
	    var margin = 10; // 출력 페이지 여백설정
	    var doc = new jspdf.jsPDF('p', 'mm');
	    var position = 0;
	       
	    // 첫 페이지 출력
	    doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
	    heightLeft -= pageHeight;
	         
	    // 한 페이지 이상일 경우 루프 돌면서 출력
	    while (heightLeft >= 20) {
	        position = heightLeft - imgHeight;
	        doc.addPage();
	        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
	        heightLeft -= pageHeight;
	    }
	 
	    // 파일 저장
	    doc.save('file-name.pdf');

		  
	});
})

/*
  document.querySelector(".print-Btn").addEventListener("click", () => {
    const element = document.getElementById("print-content");
    html2pdf()
      .from(element)
      .set({
        margin: 1,
        filename: "example.pdf",
        html2canvas: { scale: 1 },
        jsPDF: { orientation: "portrait" },
      })
      .save();
  });
*/  
 /*
       document.querySelector('.print-Btn').onclick = function(){
        var element = document.querySelector('#print-content');
				html2pdf().from(element).toPdf().get('pdf').set({
  scale: 0.8  // 출력 크기를 80%로 축소
}).save();
      }
   */ 
 //#endregion









//메인그리드 데이터 불러오기
function datoToGrid() {
	fetch("/employees/payroll")
	      .then(data => data.json())
	      .then(data => {
			grid.resetData(data)
		  })
 }
 
//수정모달 그리드 편집 이벤트

function sumCheck ()  {
	
	let data = salModifyGrid.getData()
    let monthly = salModifyGrid.getValue(0,'monthlySalary')
    let overtimeAllowance = salModifyGrid.getValue(0,'overtimeAllowance')
    let nightAllowance = salModifyGrid.getValue(0,'nightAllowance')
    let weekendAllowance = salModifyGrid.getValue(0,'weekendAllowance')
    
    let incomeTax = salModifyGrid.getValue(0,'incomeTax')
    let localTax = salModifyGrid.getValue(0,'localTax')
    let nationalInsurance = salModifyGrid.getValue(0,'nationalInsurance')
    let healthInsurance = salModifyGrid.getValue(0,'healthInsurance')
    let employmentInsurance = salModifyGrid.getValue(0,'employmentInsurance')
    let leaveRate = salModifyGrid.getValue(0,'leaveRate')


	let index = salModifyGrid.getIndexOfColumn('end');
	let colList = salModifyGrid.getColumns()
	let allowance = 0;
	console.log(data)
	for (let i =8 ; i < index ; i++) {
		allowance += Number(data[0][colList[i].name])
	}
	let sum = Number(allowance) + Number(monthly) + Number(overtimeAllowance) + Number(nightAllowance) + Number(weekendAllowance);
	let dedu = incomeTax + localTax + nationalInsurance + healthInsurance + employmentInsurance + leaveRate

	if (dedu > sum ) {
		toastr.error("지급총액을 초과한 공제금액을 입력할수 없습니다.")
		return true;
	}
	return false;
}
 
//검색버튼 클릭 이벤트
document.querySelector('.search-btn').addEventListener('click',function (ev) {
	//검색옵션들 들고오기
	let str = "";
	let option = document.querySelectorAll('.search-option')
	option.forEach(ele =>{
		if (ele.value !== "" && ele.value != null ) {
			str += '&' 
			str += ele.name
			str += '='
			str += ele.value 
		}
	})
	parameter = '?'+str.substr(1)
	fetch("/employees/payroll"+parameter)
	.then(data => data.json())
	.then(data => {
		grid.resetData(data)
	})
	
	
}) 
//검토버튼 이벤트
document.querySelectorAll('.examine-Btn').forEach(ele => {
	ele.addEventListener('click',function (ev) {
		let check = grid.getCheckedRows();
		let mode = ev.target.dataset.mode
		if (check.length == 0) {
			return;
		}
		if (mode == 'check') {
			fetch("/employees/salaryCheck/검토완료",{
				method:'put',
				headers:{'Content-Type':'application/json'},
				body:JSON.stringify(check)
			})
			.then(data => {
				toastr.success("급여명세서의 검토여부가 변경되었습니다.")
				datoToGrid()
			})
		} else if (mode == 'cancel') {
			fetch("/employees/salaryCheck/미검토",{
				method:'put',
				headers:{'Content-Type':'application/json'},
				body:JSON.stringify(check)
			})
			.then(data => {
				toastr.success("급여명세서의 검토여부가 변경되었습니다.")
				datoToGrid()
			})
			
		}
	})
})

//유효성검사
function validateCheck () {
	let nullCheck = salModifyGrid.validate();
	n = nullCheck
    if (nullCheck.length !== 0 ) {
		salModifyGrid.focus(nullCheck[0].rowKey, nullCheck[0].errors[0].columnName)
		let header =grid.getColumn(nullCheck[0].errors[0].columnName).header
		if (nullCheck[0].errors[0].errorCode[0] == "MAX") {
			toastr.error(header+"의 값은 10억원 미만으로 지정해주세요.")
		} else if (nullCheck[0].errors[0].errorCode[0] == "MIN") {
			toastr.error(header+"의 값은 1원 초과로 지정해주세요.")
		};
		return true;
	}
	return false;
}
let b
async function checkSalry() {
	let result = await fetch("/employees/payrollcheck")
	resp = await result.json()
	return resp;
}

            