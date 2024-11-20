/**
 * 
 */

 const empPositionModal = new bootstrap.Modal(document.getElementById('empPositionModal'))

 const empPositionGrid = new Grid({
el: document.getElementById('empPositionGrid'), // Container element
scrollX: false,
scrollY: true,
bodyHeight: 350,

columns: [
    {
    header: '직위/직급 코드',
    name: 'subNumber'
    
    },
    {
    header: '직급명',
    name: 'name',
    sortingType: 'asc',
    sortable: true
    }
],
data: [
    {
    subNumber: '001',
    name: '회장',
    },
    {
    subNumber: '002',
    name: '사장',
    },
    {
    subNumber: '003',
    name: '대장',
    },

],
showDummyRows: true
});
