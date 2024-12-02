/**
 *  dataToEmpModal() 사원 모달 그리드 데이터 불러오기
 */
//모달이벤트
const empModal = new bootstrap.Modal(document.getElementById('empModal'))



document.addEventListener('DOMContentLoaded', function () {
    // 툴팁 초기화
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[title]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // 숫자 포맷팅
    // document.querySelectorAll('.number-column').forEach(function (element) {
    //     const value = element.textContent;
    //     if (value && !isNaN(value.replace(/,/g, ''))) {
    //         element.textContent = Number(value.replace(/,/g, '')).toLocaleString('ko-KR');
    //     }
    // });

});

//그리드(사원검색모달) 관련



    
const empGrid = new Grid({
el: document.getElementById('empGrid'), // Container element
scrollX: false,
scrollY: true,
bodyHeight: 350,

columns: [
	{
	 header:'사원번호',
	 name:'employeeCode',
	 hidden:true
	},
    {
    header: '사원아이디',
    name: 'employeeId'
    },
    {
    header: '사원명',
    name: 'name',
    sortingType: 'asc',
    sortable: true
    },
    {
    header: '부서명',
    name: 'departmentName'
    }
],
data: [
    {
    employeeCode: '2024-001',
    employeeName: '유석진',
    release: '볼보이',
    genre: 'Pop'
    },
    {
    employeeCode: '2024-001',
    employeeName: '김석진',
    release: '볼보이',
    genre: 'Pop'
    },
    {
    employeeCode: '2024-001',
    employeeName: '하석진',
    release: '볼보이',
    genre: 'Pop'
    },

],
showDummyRows: true
});

//사원그리드 데이터 불러오기 함수
async function dataToEmpModal () {
	await fetch("/employees/emps")
	      .then(data => data.json())
	      .then(data => {
			empGrid.resetData(data);
		  })
};
