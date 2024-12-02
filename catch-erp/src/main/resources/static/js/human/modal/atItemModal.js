/**
 * 
 */

 
 const atItemModal = new bootstrap.Modal(document.getElementById('atItemModal'))

        const atItemGrid = new Grid({
        el: document.getElementById('atItemGrid'), // Container element
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
			header:"근태유형",
			name:"commonName"
			}
        ],
        data: [{}],
        showDummyRows: true
        });
function dataToatItemGrid() {
	fetch ("/employees/attitem")
	.then(data => data.json())
	.then(data => {
		atItemGrid.resetData(data);
	})
}