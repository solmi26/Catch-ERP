/**
 * 
 * 
 * dataToAeSearch () => 모달 그리드 데이터 불러오기 함수
 * 
 */
//모달이벤트
const aeSearchModal = new bootstrap.Modal(document.getElementById('aeSearchModal'))

//그리드 설정

const aeSearchGrid = new Grid({
el: document.getElementById('aeSearchGrid'), // Container element
scrollX: false,
scrollY: true,
bodyHeight: 350,

columns: [
    {
    header: '근태 코드',
    name: 'attCode'
    
    },
    {
    header: '근태명',
    name: 'attName',
    sortingType: 'asc',
    sortable: true
    },
    {
	 header:'근태유형',
	 name:'commonName'
	}
],
data: [
    {
    attCode: '001',
    attName: '정상출근',
    },
    {
    attCode: '002',
    attName: '무단결근',
    },
    {
    attCode: '003',
    attName: '휴가',
    },

],
showDummyRows: true
});



//근태항목조회 테이블 데이터 불러오기 함수
async function dataToAeSearch () {
	await fetch("/employees/attitem")
	      .then(data => data.json())
	      .then(data => {
			aeSearchGrid.resetData(data);
		  })
}
