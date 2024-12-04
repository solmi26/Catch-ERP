document.addEventListener("DOMContentLoaded", async function () {

    class CustomTextEditor {
        constructor(props) {
            const el = document.createElement('input');
            const {maxLength} = props.columnInfo.editor.options;

            el.type = 'text';
            el.maxLength = maxLength;
            el.value = String(props.value);

            this.el = el;
        }

        getElement() {
            return this.el;
        }

        getValue() {
            return this.el.value;
        }

        mounted() {
            this.el.select();
        }
    }

    class ButtonRenderer {
        constructor(props) {
            this.el = document.createElement('button');
            this.el.innerText = props.value;
            this.el.style.border = '1px solid gray';
            this.el.style.borderRadius = '3px';
            this.el.style.backgroundColor = 'white';
            this.el.setAttribute("data-bs-dismiss", "modal");
        }

        getElement() {
            return this.el;
        }
    }

    const Grid = tui.Grid;
    Grid.applyTheme('default', {
        outline: {
            border: '#dee2e6'
        }, cell: {
            normal: {
                border: '#dee2e6'
            }, header: {
                background: '#f8f9fa', text: 'black'
            }, focused: {
                background: '#f8f9fa', border: '#f64a4a'
            }, evenRow: {
                background: 'white'
            }, oddRow: {
                background: 'white'
            }
        }
    });

    /*============================
             판매 내역 그리드
    ==============================*/

    let purchaseChit;
    const initPurchaseChitGrid = () => {

        purchaseChit = new Grid({
            el: document.getElementById('purchaseChit'),
            scrollX: true,
            scrollY: true,
            header: {height: 40},
            bodyHeight: 400,
            rowHeight: 40,
            width: 'auto',
            contextMenu: null,
            rowHeaders: [{
                type: 'rowNum', header: "No.", width: 50, className: 'border'
            }],
            data: [],
            columns: [{
                header: '구매전표번호',
                name: 'purcslipNo',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                className: 'border'
            }, {
                header: '발주일자',
                name: 'insertDate',
                align: "center",
                width: 200,
                whiteSpace: 'normal',
                editor: 'text',
                className: 'border',
                filter: {
                    type: 'date',
                    options: {
                        format: 'yyyy-MM-dd',
                        language: 'ko'
                    },
                    showClearBtn: true
                }
            }, {
                header: '거래처명',
                name: 'clientName',
                editor: 'text',
                align: "center",
                width: 100,
                whiteSpace: 'normal',
                className: 'border'
            }, {
                header: '금액합계',
                name: 'totalPrice',
                editor: 'text',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border',
                formatter: ({value}) => {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'; // 숫자에 콤마 추가
                }
            }, {
                header: '공급가액',
                name: 'supplyPrice',
                editor: 'text',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border',
                formatter: ({value}) => {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'; // 숫자에 콤마 추가
                }

            }, {
                header: '부가세',
                name: 'vat',
                editor: 'text',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border',
                formatter: ({value}) => {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'; // 숫자에 콤마 추가
                }
            },],
        });

        // 모든 판매전표 조회
        fetch('/purchase/PurchaseChit')
            .then(result => result.json())
            .then(data => purchaseChit.resetData(data))
            .catch(error => console.log(error))

        // 판매내역 전표 모달
        purchaseChit.on("click", (ev) => {

            const purchaseChitColumn = ev.columnName

            if (purchaseChitColumn === 'purcslipNo') {
                var purchaseHistoryModal = new bootstrap.Modal(document.getElementById('purchaseHistoryModal'), {
                    keyboard: false
                })

                purchaseHistoryModal.show();
            }

            let purcslipNo = purchaseChit.getValue(ev.rowKey, 'purcslipNo');

            fetch('/purchase/PurchaseHistory/' + purcslipNo)
                .then(result => result.json())
                .then(data => purchaseHistory.resetData(data))
                .catch(error => console.log(error))

            window.setTimeout(function () {
                purchaseHistory.refreshLayout();
            }, 300)
        })
        return purchaseChit;
    }
    initPurchaseChitGrid();

    // 판매내역 그리드
    let purchaseHistory;
    const initPurchaseHistory = () => {

        purchaseHistory = new Grid({
            el: document.getElementById('purchaseHistory'),
            scrollX: true,
            scrollY: true,
            header: {height: 40},
            bodyHeight: 400,
            rowHeight: 40,
            width: 'auto',
            contextMenu: null,
            rowHeaders: [{
                type: 'rowNum', header: "No.", width: 50, className: 'border'
            }],
            data: [],
            columns: [{
                header: '구매번호',
                name: 'purNo',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                className: 'border'
            }, {
                header: '창고명',
                name: 'whName',
                align: "center",
                width: 200,
                whiteSpace: 'normal',
                editor: 'text',
                className: 'border'
            }, {
                header: '품목명',
                name: 'itemName',
                editor: 'text',
                align: "center",
                width: 100,
                whiteSpace: 'normal',
                className: 'border'
            }, {
                header: '수량',
                name: 'quantity',
                editor: 'text',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                sortingType: 'desc',
                className: 'border',
                formatter: ({value}) => {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') // 숫자에 콤마 추가
                }

            }, {
                header: '출고단가',
                name: 'restockingPrice',
                editor: 'text',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border',
                formatter: ({value}) => {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'; // 숫자에 콤마 추가
                }
            }, {
                header: '입고상태',
                name: 'restockingStatus',
                editor: 'text',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                sortable: true,
                className: 'border'
            }, {
                header: '입고예정일',
                name: 'restockingDate',
                editor: 'text',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                sortable: true,
                className: 'border'
            }, {
                header: '공급가액',
                name: 'supplyPrice',
                editor: 'text',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border',
                formatter: ({value}) => {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'; // 숫자에 콤마 추가
                }
            }, {
                header: '부가세',
                name: 'vat',
                editor: 'text',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border',
                formatter: ({value}) => {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'; // 숫자에 콤마 추가
                }
            },],
        });

        return purchaseHistory;
    }
    initPurchaseHistory();

    document.getElementById('searchButton').addEventListener('click', () => {
        const formData = new FormData(document.getElementById('searchForm'));
        const params = new URLSearchParams();

        for (const [key, value] of formData.entries()) {
            if (value) {
                params.append(key, value);
            }
        }

        fetch(`/sales/selectpurchaseChit/search?${params.toString()}`)
            .then(result => result.json())
            .then(data => {
                purchaseChit.resetData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    })
});

