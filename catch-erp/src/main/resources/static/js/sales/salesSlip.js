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

    let salesChit;
    const initSalesChitGrid = () => {

        salesChit = new Grid({
            el: document.getElementById('salesChit'),
            scrollX: true,
            scrollY: true,
            header: {height: 40},
            bodyHeight: 400,
            rowHeight: 40,
            width: 'auto',
            contextMenu: null,
            data: [],
            rowHeaders: [{
                type: 'rowNum',
                header: "No.",
                width: 50, className: 'border'
            }],
            columns: [{
                header: '판매전표번호',
                name: 'saleslipNo',
                align: "center",
                width: 210,
                whiteSpace: 'normal',
                className: 'border'
            }, {
                header: '발주일자',
                name: 'insertDate',
                align: "center",
                width: 210,
                whiteSpace: 'normal',
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
                align: "center",
                width: 210,
                whiteSpace: 'normal',
                className: 'border'
            }, {
                header: '금액합계',
                name: 'deliveryPrice', align: "right",
                width: 210,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border',
                formatter: ({value}) => {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'; // 숫자에 콤마 추가
                }
            }, {
                header: '공급가액',
                name: 'supplyPrice', align: "right",
                width: 210,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border',
                formatter: ({value}) => {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'; // 숫자에 콤마 추가
                }

            }, {
                header: '부가세',
                name: 'vat', align: "right",
                width: 210,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border',
                formatter: ({value}) => {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'; // 숫자에 콤마 추가
                }
            },],
            summary: {
                height: 40,
                position: 'bottom', // or 'top'
                columnContent: {
                    saleslipNo: {
                        template: function (valueMap) {
                            return `MIN: ${Math.floor(valueMap.min).toLocaleString()}<br>MAX: ${Math.floor(valueMap.max).toLocaleString()}`;
                        }
                    },
                    deliveryPrice: {
                        template: function (valueMap) {
                            return `평균 금액: ${Math.floor(valueMap.avg).toLocaleString()}<br>총 금액: ${Math.floor(valueMap.sum).toLocaleString()}`;
                        }
                    },
                    supplyPrice: {
                        template: function (valueMap) {
                            return `평균 공급가액: ${Math.floor(valueMap.avg).toLocaleString()}<br>총 공급가액: ${Math.floor(valueMap.sum).toLocaleString()}`;
                        }
                    },
                    vat: {
                        template: function (valueMap) {
                            return `평균 부가세: ${Math.floor(valueMap.avg).toLocaleString()}<br>총 부가세: ${Math.floor(valueMap.sum).toLocaleString()}`;
                        }
                    }
                }
            }
        });

        // 모든 판매전표 조회
        fetch('/sales/selectSalesChit')
            .then(result => result.json())
            .then(data => salesChit.resetData(data))
            .catch(error => console.log(error))

        // 판매내역 전표 모달
        salesChit.on("click", (ev) => {

            const salesChitColumn = ev.columnName

            if (salesChitColumn === 'saleslipNo') {
                var saleslipHistoryModal = new bootstrap.Modal(document.getElementById('saleslipHistoryModal'), {
                    keyboard: false
                })

                saleslipHistoryModal.show();
            }

            let saleSlip = salesChit.getValue(ev.rowKey, 'saleslipNo');

            // 판매내역 조회
            fetch('/sales/selectSaleslip/' + saleSlip)
                .then(result => result.json())
                .then(data => {
                    saleslipHistory.resetData(data);
                    sortColor();
                })
                .catch(error => alert('판매전표별 내역을 불러오지 못했습니다.'))

            window.setTimeout(function () {
                saleslipHistory.refreshLayout();
            }, 300)
        })
        return salesChit;
    }
    initSalesChitGrid();

    // 판매전표 그리드
    let saleslipHistory;
    const initSaleslipHistory = () => {

        saleslipHistory = new Grid({
            el: document.getElementById('saleslipHistory'),
            scrollX: true,
            scrollY: true,
            header: {height: 40},
            bodyHeight: 400,
            rowHeight: 40,
            width: 'auto',
            contextMenu: null,
            columnOptions: {
                frozenCount: 1,
                frozenBorderWidth: 1
            },
            data: [],
            rowHeaders: [{
                type: 'rowNum', header: "No.", width: 50, className: 'border'
            }],
            columns: [{
                header: '판매번호',
                name: 'salesNo',
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
                className: 'border'
            }, {
                header: '품목명',
                name: 'itemName',
                align: "center",
                width: 100,
                whiteSpace: 'normal',
                className: 'border'
            }, {
                header: '출고상태',
                name: 'deliveryStatus',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                sortable: true,
                className: 'border'
            }, {
                header: '출하예정일',
                name: 'deliveryDate',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                sortable: true,
                className: 'border'
            }, {
                header: '수량',
                name: 'quantity',
                align: "right",
                width: 150,
                whiteSpace: 'normal',
                sortingType: 'desc',
                className: 'border',
                formatter: ({value}) => {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') // 숫자에 콤마 추가
                }

            }, {
                header: '출고단가',
                name: 'deliveryPrice',
                align: "right",
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
                align: "right",
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
                align: "right",
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

        return saleslipHistory;
    }
    initSaleslipHistory();

    // 출고상태에 따른 그리드 색상 변화
    function sortColor() {
        saleslipHistory.getData().forEach((row) => {
            let check = row.deliveryStatus;
            if (check === '미완료') {
                saleslipHistory.addRowClassName(row.rowKey, 'increase');
                console.log(check)
            } else if (check === '완료') {
                saleslipHistory.addRowClassName(row.rowKey, 'decrease');
                console.log(check)
            } else if (check === '진행중') {
                saleslipHistory.addRowClassName(row.rowKey, 'ongoing');
                console.log(check)
            }
        });
    }

    document.getElementById('searchButton').addEventListener('click', () => {
        const formData = new FormData(document.getElementById('searchForm'));
        const params = new URLSearchParams();

        for (const [key, value] of formData.entries()) {
            if (value) {
                params.append(key, value);
            }
        }

        fetch(`/sales/selectSalesChit/search?${params.toString()}`)
            .then(result => result.json())
            .then(data => {
                salesChit.resetData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    })

    //모달실행 시 grid refresh를 위한 코드
    document.getElementById('openClientModal').addEventListener('click', function () {
        window.setTimeout(function () {
            clientGrid.refreshLayout();
        }, 200)
    });

    // 거래처 그리드
    let clientGrid;
    const initClientGrid = () => {

        clientGrid = new Grid({
            el: document.getElementById("clientGrid"),
            pageOptions: {
                useClient: true, perPage: 12,
            },
            scrollX: true,
            scrollY: true,
            data: clientData,
            header: {height: 40},
            bodyHeight: 500,
            width: 'auto',
            contextMenu: null,
            rowHeaders: [{
                type: 'rowNum', header: "No.", width: 50, className: 'border'
            }],
            columns: [{
                header: '거래처명',
                name: 'clientName',
                align: "center",
                width: 183,
                whiteSpace: 'normal',
                className: 'border',
                renderer: {
                    type: ButtonRenderer
                },
                filter: 'select'
            }, {
                header: '거래처코드',
                name: 'clientCode',
                hidden: true,
                align: "center",
                width: 100,
                whiteSpace: 'normal',
                className: 'border',
                filter: 'select'
            }, {
                header: '대표자명',
                name: 'ceoName',
                align: "center",
                width: 100,
                whiteSpace: 'normal',
                className: 'border',
                filter: 'select'
            }, {
                header: '회사 연락처',
                name: 'companyTel',
                align: 'center',
                width: 120,
                whiteSpace: 'normal',
                className: 'border'
            }, {
                header: '담당자명',
                name: 'employeeName',
                align: "center",
                width: 110,
                whiteSpace: 'normal',
                className: 'border',
                filter: 'select'
            }, {
                header: '담당자 연락처',
                name: 'employeeTel',
                align: "center",
                width: 120,
                whiteSpace: 'normal',
                className: 'border',
                filter: 'select'
            }, {
                header: '종목',
                name: 'event',
                align: "center",
                width: 100,
                whiteSpace: 'normal',
                className: 'border',
                filter: 'select'
            }]
        });

        //거래처 input
        clientGrid.on("click", (ev) => {
            const clientRowData = clientGrid.getRow(ev.rowKey);

            if (clientRowData && clientRowData.clientName) {
                // 특정 열(columnName)의 값 가져오기
                // const columnValue = clientGrid.getValue(ev.rowKey, 'clientName');
                document.getElementById('inputClientName').value = clientRowData.clientName;
            }
        });
        return clientGrid;
    }
    initClientGrid();

    //모달실행 시 grid refresh를 위한 코드
    document.getElementById('openItemModal').addEventListener('click', function () {
        window.setTimeout(function () {
            itemGrid.refreshLayout();
        }, 200)
    });

    window.setTimeout(function () {
        fetch('/purchase/contractItem')
            .then(result => result.json())
            .then(data => itemGrid.resetData(data))
            .catch(error => console.log(error))
    }, 200)

    // 품목 그리드
    let itemGrid;
    const initItemGrid = () => {

        itemGrid = new Grid({
            el: document.getElementById("itemGrid"),
            pageOptions: {
                useClient: true, perPage: 12,
            },
            scrollX: true,
            scrollY: true,
            data: [],
            header: {height: 40},
            bodyHeight: 500,
            width: 'auto',
            contextMenu: null,
            rowHeaders: [{
                type: 'rowNum', header: "No.", width: 50, className: 'border'
            }],
            columns: [{
                header: '품목코드',
                name: 'itemCode',
                align: "center",
                width: 215,
                whiteSpace: 'normal',
                className: 'border',
                renderer: {
                    type: ButtonRenderer
                },
                filter: 'select'
            }, {
                header: '품목명',
                name: 'itemName',
                align: "center",
                width: 215,
                whiteSpace: 'normal',
                className: 'border',
            },]
        });

        //품목 input
        itemGrid.on("click", (ev) => {
            const itemGridRowData = itemGrid.getRow(ev.rowKey);

            if (itemGridRowData && itemGridRowData.itemName) {
                // 특정 열(columnName)의 값 가져오기
                // const columnValue = clientGrid.getValue(ev.rowKey, 'clientName');
                document.getElementById('inputItemName').value = itemGridRowData.itemName;
            }
        });
        return itemGrid;
    }
    initItemGrid()

});

