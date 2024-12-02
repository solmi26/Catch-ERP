/**
 * 
 */
 const allowanceItemModal = new bootstrap.Modal(document.getElementById('allowanceItemModal'))
 
 
        const allowanceItemGrid = new Grid({
        el: document.getElementById('allowanceItemGrid'), // Container element
        scrollX: false,
        scrollY: true,
        bodyHeight: 350,

        columns: [
            {
            header: '수당코드',
            name: 'allowanceCode'
            
            },
            {
            header: '수당명',
            name: 'allowanceName',
            sortingType: 'asc',
            sortable: true
            },
            {
			header:'과세여부',
			name:'allowanceCheck'
			}
        ],
        data: [
            {
            name: '001',
            artist: '농협',
            },
            {
            name: '002',
            artist: '국민은행',
            },
            {
            name: '003',
            artist: '대구은행',
            },

        ],
        showDummyRows: true
        });