/**
 * 
 */
 const bankModal = new bootstrap.Modal(document.getElementById('bankModal'))
 
 
        const bankGrid = new Grid({
        el: document.getElementById('bankGrid'), // Container element
        scrollX: false,
        scrollY: true,
        bodyHeight: 350,

        columns: [
            {
            header: '은행코드',
            name: 'codeRule'
            
            },
            {
            header: '은행명',
            name: 'commonName',
            sortingType: 'asc',
            sortable: true
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