/**
 * 
 */



const dsModal = new bootstrap.Modal(document.getElementById('dsModal'))

 
 const dsGrid = new Grid({
el: document.getElementById('dsGrid'), // Container element
scrollX: false,
scrollY: true,
bodyHeight: 350,

columns: [
    {
    header: '부서 코드',
    name: 'departmentCode'
    
    },
    {
    header: '부서명',
    name: 'departmentName',
    sortingType: 'asc',
    sortable: true
    }
],
data: [
    {
    departmentCode: '001',
    departmentName: '인사부서',
    },
    {
    departmentCode: '002',
    departmentName: '회계부서',
    },
    {
    departmentCode: '003',
    departmentName: '영업부서',
    },

],
showDummyRows: true
});
