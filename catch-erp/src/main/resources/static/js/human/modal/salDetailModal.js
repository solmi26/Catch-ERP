/**
 * 
 */


const salDetailModal = new bootstrap.Modal(document.getElementById('salDetailModal'))
//#region

const salDetailGrid = new Grid({
el: document.getElementById('salDetailGrid'), // Container element
scrollY: true,
width:'auto',
columnOptions: {
    frozenCount: 3,
    frozenBorderWidth: 2,
    minWidth: 100
  },
columns: [],
data: [
    {
}
]
});

//#endregion
//모달 그리드에 데이터 전달하기
//#region
function dataToSalDetailGrid (salaryNumber) {
	fetch("/employees/payroll/sel?salaryNumber="+salaryNumber)
	.then(data => data.json())
	.then(data => {
		remodelSalDetailGrid(data[0])
	})
}
//#endregion

//모달그리드의 형식을 재설계하기(컬럼형식을 재구축)
//#region 
function remodelSalDetailGrid(data) {
     let columnFront = 
		      [
			  {
	        	  header:'급여명세번호',
	        	  name:'salaryNumber',
	        	  hidden:true
	          },
	          {
	            header: '귀속연월',
	            name: 'payrollYdate'
	          },
	          {
	            header: '사원코드',
	            name: 'employeeId'
	          },
	          {
	        	header:'성명',
	        	name:'name'
	          },
	          {
	            header: '기본급',
	            name: 'monthlySalary',
	          },
	          {
	        	header:'연장수당',
	        	name:'overtimeAllowance',
	          },
	          {
		        header:'야간수당',
		        name:'nightAllowance',
		      },
	          {
	            header: '주말근무수당',
	            name: 'weekendAllowance',
	          }]
	 let columnBack =
	          [
			  {
				header:'end',
				name:'end',
				hidden:true
			  },
		      {
		        header: '소득세',
		        name: 'incomeTax',
	          },
		      {
		        header: '지방세',
		        name: 'localTax',
	          },
		      {
		        header: '국민연금',
		        name: 'nationalInsurance',
	          },
		      {
		        header: '건강보험료',
		        name: 'healthInsurance',
	          },
		      {
		        header: '고용보험료',
		        name: 'employmentInsurance',
	          },
	          {
				header:'유급휴가비',
				name:'leaveRate',
	          }
	          ]
	 let columnMiddle = []
	 for (let i in data.allowanceHistoryVO) {
		let obj = {}
		let vali = {}
		obj.header = data.allowanceHistoryVO[i].allowanceName
		obj.name = data.allowanceHistoryVO[i].awhiNo
		columnMiddle[i] = obj
	 }
	 let column;
	 if (columnMiddle[0].name == null) {
	 column = columnFront.concat(columnBack)		
	 } else {
	 column = columnFront.concat(columnMiddle,columnBack)
	 }
	 salDetailGrid.setColumns(column);
	 for (let ele of data.allowanceHistoryVO) {
		let name = ele.awhiNo
		data[name] = ele.allowancePrice
	 }
	 salDetailGrid.resetData([data])
	 
}
//#endregion

