/**
 * 
 */
console.log('불러옴?')
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

instance.resetData(newData); // Call API of instance's public method

Grid.applyTheme('striped'); // Call API of static method

