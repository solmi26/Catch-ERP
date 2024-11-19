/**
 * 
 */



const salModifyModal = new bootstrap.Modal(document.getElementById('salModifyModal'))

        let columnList = [
    {
    header: '귀속연월',
    name: 'payrollDate'
    },
    {
    header: '사원코드',
    name: 'emoloyeeCode'
    },
    {
    header: '사원명',
    name: 'employeeName'
    },
    {
    header: '기본급',
    name: 'monthlySalary',
    editor: {
		type:gridNumber
		}
    },
    {
    header: '연장수당',
    name: 'overtimePay',
    editor: {
		type:gridNumber
		}

    },
    {
    header: '주말근무수당',
    name: 'weekendPay',
   	editor: {
		type:gridNumber
		}

    },
    {
    header:'야간근무수당',
    name:'nightPay',
    editor: {
		type:gridNumber
		}

    },
    {
    header: '지급총액',
    name: 'totalPayment',
    editor: {
		type:gridNumber
		}

    },
    {
    header: '소득세',
    name: 'incomeTax',
    editor: {
		type:gridNumber
		}

    },
    {
    header: '지방세',
    name: 'localTax',
    editor: {
		type:gridNumber
		}

    },
    {
    header: '국민연금료',
    name: 'nationalPension',
    editor: {
		type:gridNumber
		}

    },
    {
    header: '건강보험료',
    name: 'healthInsurance',
    editor: {
		type:gridNumber
		}
    },
    {
    header: '고용보험료',
    name: 'employmentInsurance',
    editor: {
		type:gridNumber
		}
    },
    {
    header: '공제금액',
    name: 'totalDeductions',
    editor: {
		type:gridNumber
		}
    },
    {
    header: '실지급액',
    name: 'realPay',
    editor: {
		type:gridNumber
		}
    }
]

const salModifyGrid = new Grid({
el: document.getElementById('salModifyGrid'), // Container element
scrollY: true,
width:1400,

columns: columnList,
data: [
    {
    payrollDate:'2024.11.17',
    employeeName:'유석진',
    emoloyeeCode:'2024-001',
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
