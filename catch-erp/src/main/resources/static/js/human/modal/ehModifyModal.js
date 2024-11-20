/**
 * 
 */




const ehModifyModal = new bootstrap.Modal(document.getElementById('ehModifyModal'),
{
	backdrop:false,
	keyboard:false,
	focus:false
})


 const ehModifyGrid = new Grid({
el: document.getElementById('ehModifyGrid'), // Container element
scrollX: true,
scrollY: true,
width:1600,

columns: [
    {
    header: '기준일자',
    name: 'name',
    editor: {
        type:gridDate
    }
    
    },
    {
    header: '발령일자',
    name: 'ehDate',
    editor: {
        type:gridDate
    }
    },
    {
    header: '사원코드',
    name: 'employeeCode',
    },
    {
    header: '성명',
    name: 'employeeName',
    },
    {
    header: '발령구분',
    name: 'ehType',
    },
    {
    header: '입사구분',
    name: 'hireType',
    },
    {
    header: '이전 직위/직급',
    name: 'prevPosition',
    },
    {
    header: '발령 직위/직급',
    name: 'assignedPosition',
    },
    {
    header: '이전 부서명',
    name: 'prevDepartment',
    },
    {
    header: '발령 부서명',
    name: 'assignedDepartment',
    },            
    
    
    
],
data: [
{
   name:'2024.11.17',
   ehDate:'2024.11.18',
   employeeCode:'2024-001',
   employeeName:'유석진',
   ehType:'인사이동',
   hireType:'신입',
   prevPosition:'사원',
   assignedPosition:'회장',
   prevDepartment:'개발부서',
   assignedDepartment:'인사부서',
	}
],
showDummyRows: true
});
        