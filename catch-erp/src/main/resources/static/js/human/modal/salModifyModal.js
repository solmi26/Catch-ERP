/**
 * 
 */



const salModifyModal = new bootstrap.Modal(document.getElementById('salModifyModal'))
//#region

const salModifyGrid = new Grid({
el: document.getElementById('salModifyGrid'), // Container element
scrollY: true,
width:1400,

columns: [],
data: [
    {
    payrollDate:'2024.11.17',
    employeeName:'유석진',
    emoloyeeId:'2024-001',
    monthlySalary:'2,000,000',
    overtimePay:'200,000',
    weekendPay:'200,000',
    nightPay:'200,000',
    totalPayment:'2,600,000',
    incomeTax:'100,000',
    localTax:'10,000',
    nationalPension:'10,000',
    healthInsurance:'10,000',
    employmentInsurance:'10,000',
    totalDeductions:'140,000',
    realPay:'2,460,000',
}
]
});

//#endregion
let datas = null;
//모달 그리드에 데이터 전달하기
//#region
function dataToSalModifyGrid (salaryNumber) {
	fetch("/employees/payroll/"+salaryNumber)
	.then(data => data.json())
	.then(data => {
		console.log(data)
		remodelSalModifyGrid(data)
		datas = data
	})
}
//#endregion

//모달그리드의 형식을 재설계하기(컬럼형식을 재구축)
//#region 
function remodelSalModifyGrid(data) {
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
                editor: 'text',
		        validation: {
                    dataType: 'number',
                    min: 1,
                    max: 99999999
                },
                formatter: function (e) {
		          const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
		          return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
		        },
	          },
	          {
	        	header:'연장수당',
	        	name:'overtimeAllowance',
                editor: 'text',
		        validation: {
                    dataType: 'number',
                    min: 1,
                    max: 99999999
                },
                formatter: function (e) {
		          const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
		          return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
		        },
                
	          },
	          {
		        header:'야간수당',
		        name:'nightAllowance',
                editor: 'text',
		        validation: {
                    dataType: 'number',
                    min: 1,
                    max: 99999999
                },
                formatter: function (e) {
		          const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
		          return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
		        },
                
		      },
	          {
	            header: '주말근무수당',
	            name: 'weekendAllowance',
                editor: 'text',
		        validation: {
                    dataType: 'number',
                    min: 1,
                    max: 99999999
                },
                formatter: function (e) {
		          const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
		          return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
		        },
	          }]
	 let columnBack =
	          [
			  {
				header:'end',
				name:'end',
				hidden:true
			  },
			  {
		        header: '지급총액',
		        name: 'paymentTotal',
                formatter: function (e) {
					console.log(e)
		          const value = e.value !== undefined || e.value !== null || Number(e.value) === NaN ? e.value : 0; // 기본값 0
		          return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
		        },
		        
	          },
		      {
		        header: '소득세',
		        name: 'incomeTax',
                editor: 'text',
		        validation: {
                    dataType: 'number',
                    min: 1,
                    max: 99999999
                },
                formatter: function (e) {
		          const value = e.value !== undefined && e.value !== null && Number(e.value) === NaN? e.value : 0; // 기본값 0
		          return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
		        },
                
	          },
		      {
		        header: '지방세',
		        name: 'localTax',
                editor: 'text',
		        validation: {
                    dataType: 'number',
                    min: 1,
                    max: 99999999
                },
                formatter: function (e) {
		          const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
		          return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
		        },
                
	          },
		      {
		        header: '국민연금',
		        name: 'nationalInsurance',
                editor: 'text',
		        validation: {
                    dataType: 'number',
                    min: 1,
                    max: 99999999
                },
                formatter: function (e) {
		          const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
		          return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
		        },
                
	          },
		      {
		        header: '건강보험료',
		        name: 'healthInsurance',
                editor: 'text',
		        validation: {
                    dataType: 'number',
                    min: 1,
                    max: 99999999
                },
                formatter: function (e) {
		          const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
		          return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
		        },                
	          },
		      {
		        header: '고용보험료',
		        name: 'employmentInsurance',
                editor: 'text',
                validation: {
                    dataType: 'number',
                    min: 1,
                    max: 99999999
                },
                  formatter: function (e) {
    		          const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
		          return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
		        },

	          },
	          {
				header:'유급휴가비',
				name:'leaveRate',
                editor: 'text',
                validation: {
                    dataType: 'number',
                    min: 1,
                    max: 99999999
                },
                formatter: function (e) {
		          const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
		          return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
		        },
                
	          },
		      {
		        header: '공제금액',
		        name: 'deductionsTotal',
                  formatter: function (e) {
		          const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
		          return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
		        },

	          },
	          
		      {
		        header: '실지급액',
		        name: 'realPay',
                formatter: function (e) {
		          const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
		          return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
		        },
		        
	          }]
	 let columnMiddle = []
	 for (let i in data.allowanceHistoryVO) {
		let obj = {}
		obj.header = data.allowanceHistoryVO[i].allowanceName
		obj.name = data.allowanceHistoryVO[i].awhiNo
		obj.formatter = function (e) {
		                const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
		                return Number(value).toLocaleString() + "원"; }// 숫자로 변환 후 포맷팅
		columnMiddle[i] = obj
		
	 }
	 let column = columnFront.concat(columnMiddle,columnBack)
	 console.log('시작!!!')
	 console.log(column)
	 salModifyGrid.setColumns(column);
	 salModifyGrid.resetData([{realPay:0}])
	 for (let ele of data.allowanceHistoryVO) {
		let name = ele.awhiNo
		data[name] = ele.allowancePrice
	 }
	 d = data
	 salModifyGrid.resetData([data])
	 
}
//#endregion

//모달그리드에서 데이터 뽑기
//#region
function extractSalModifyGrid () {
	let data = salModifyGrid.getData()
	let index = salModifyGrid.getIndexOfColumn('end')
	let colList = salModifyGrid.getColumns()
	let allowanceHistoryVO = []
	
	
	for (let i =8 ; i < index ; i++) {
		let obj = {}
		obj.awhiNo = colList[i].name
		obj.allowancePrice = data[0][colList[i].name]
	    allowanceHistoryVO[i-8] = obj
	}
	data[0].allowanceHistoryVO = allowanceHistoryVO
	return data;
}



//#endregion
