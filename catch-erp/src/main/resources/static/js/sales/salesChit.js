document.addEventListener("DOMContentLoaded", async function () {

    // 입력일자 sysdate input
    document.getElementById('currentDate').value = new Date().toISOString().substring(0, 10);

    function makeReceivableTabulator(accountList) {
        let accList = new Tabulator("#example-table", {
            layout: "fitColumns",
            pagination: "local",
            data: accountList,
            paginationSize: 8,
            movableColumns: true,
            paginationCounter: "rows",
            paginationCounter: function (pageSize, currentRow, currentPage, totalRows, totalPages) {
                return "";
            },
            langs: {
                "default": {
                    "pagination": {
                        "first": "처음",
                        "first_title": "처음으로",
                        "last": "끝",
                        "last_title": "마지막으로",
                        "prev": "이전",
                        "prev_title": "이전으로",
                        "next": "다음",
                        "next_title": "다음으로",
                        "all": "전체",
                    }
                }
            },
            columns: [{title: "계좌코드", field: "bacctCode", visible: false}, {
                title: "계좌번호",
                field: "bacctNo",
                width: 220,
                sorter: "string",
                headerFilter: "input"
            }, {title: "은행명", field: "bankName", width: 220, sorter: "string", headerFilter: "input"}, {
                title: "계좌명",
                field: "bacctName",
                width: 330,
                sorter: "string",
                headerFilter: "input"
            },],
        });
        return accList;
    }

    function fetchBacctList() {
        fetch('/api/account/bacct')
            .then(result => result.json())
            .then(accountList => {
                let accList = makeReceivableTabulator(accountList);
                accList.on("rowClick", (e, row) => {

                    const rowData = row.getData().bacctNo; // 클릭한 셀의 값
                    console.log(rowData);

                    document.getElementById('accountInput').value = rowData;

                    const modalElement = document.getElementById('accountSearchModal');
                    const bootstrapModal = bootstrap.Modal.getInstance(modalElement); // Bootstrap 모달 인스턴스 가져오기
                    if (bootstrapModal) {
                        bootstrapModal.hide(); // 모달 닫기
                    }
                });
            })
    }

    fetchBacctList();

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
            },
        }
    });

    //모달실행 시 grid refresh를 위한 코드
    document.getElementById('openClientModal').addEventListener('click', function () {
        window.setTimeout(function () {
            clientGrid.refreshLayout();
        }, 200)
    });

    let clientGrid; //모달에 적용될 그리드라서 refreshLayout() 사용을 위해 전역스코프로 변수를 선언하였음.
    const initClientGrid = () => {

        // 그리드 객체
        clientGrid = new Grid({
            el: document.getElementById("clientGrid"), scrollX: true, scrollY: true, data: clientData,
            pageOptions: {
                useClient: true, perPage: 12,
            }, header: {height: 40}, bodyHeight: 500, width: 'auto', contextMenu: null, rowHeaders: [{
                type: 'rowNum', header: "No.", width: 50, className: 'border'
            }], columns: [{
                header: '거래처명',
                name: 'clientName',
                align: "center",
                width: 183,
                whiteSpace: 'normal',
                className: 'border',
                renderer: {
                    type: ButtonRenderer
                },
                filter: 'select',
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
                align: "center",
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
                document.getElementById('inputClientCode').value = clientRowData.clientCode;

                const ChangeEvent = new Event("change");
                document.getElementById('inputClientName').dispatchEvent(ChangeEvent);

            }
        });

        return clientGrid;
    }

    /*============================
            StackInquery 사원조회 모달 JS
        ==============================*/
    // 모달 관련 JavaScript

    let humanModalBtn = document.getElementById('humanModal')
    humanModalBtn.addEventListener('show.bs.modal', function () {
        // 모달이 표시되기 전에 실행할 코드
        window.setTimeout(function () {
            humanGrid.refreshLayout();
        }, 200)
    })

    humanModalBtn.addEventListener('hidden.bs.modal', function () {
        // 모달이 완전히 숨겨진 후 실행할 코드
    })

    let humanGrid;
    const initHumanGrid = () => {
        humanGrid = new Grid({
            el: document.getElementById('humanGrid'), scrollX: true, scrollY: true, pageOptions: {
                useClient: true, perPage: 12,
            }, header: {height: 40}, bodyHeight: 500, width: 'auto', contextMenu: null, rowHeaders: [{
                type: 'rowNum', header: "No.", width: 50, className: 'border'
            }], columns: [{
                header: '사원 코드',
                name: 'employeeCode',
                align: "center",
                width: 135,
                whiteSpace: 'normal',
                className: 'border',
                renderer: {
                    type: ButtonRenderer
                },
                filter: 'select'

            }, {
                header: '성명',
                name: 'name',
                align: "center",
                width: 135,
                whiteSpace: 'normal',
                className: 'border',
                filter: 'select'
            }, {
                header: '부서명',
                name: 'departmentName',
                align: "center",
                width: 135,
                whiteSpace: 'normal',
                className: 'border',
                filter: 'select'
            }]
        });

        fetch('/employees/emps')
            .then(result => result.json())
            .then(data => humanGrid.resetData(data))
            .catch(error => alert("사원 데이터를 조회하는데 실패"))

        //담당자 input
        humanGrid.on("click", (ev) => {
            const empRowData = humanGrid.getRow(ev.rowKey);

            if (empRowData && empRowData.employeeCode) {
                // 특정 열(columnName)의 값 가져오기
                // const columnValue = clientGrid.getValue(ev.rowKey, 'clientName');
                document.getElementById('empNameInput').value = empRowData.name;
                document.getElementById('empCodeInput').value = empRowData.employeeCode;
            }
        });

        return humanGrid;
    }

    initHumanGrid();

    /*============================
            매출계정 모달 JS
    ==============================*/

    // 모달 관련 JavaScript
    // const accCodeModal = document.getElementById('accCodeGrid')
    //
    // window.setTimeout(function () {
    //     fetch('/acctList')
    //         .then(result => result.json())
    //         .then(data => accCodeGrid.resetData(data))
    //         .catch(error => alert("매출계정 데이터를 조회하는데 실패"))
    // }, 200)
    //
    // //모달실행 시 grid refresh를 위한 코드
    // document.getElementById('openAccCodeModal').addEventListener('click', function () {
    //     window.setTimeout(function () {
    //         accCodeGrid.refreshLayout();
    //     }, 200)
    // });
    //
    // let accCodeGrid;
    // const initAccCodeGrid = () => {
    //     accCodeGrid = new Grid({
    //         el: document.getElementById('accCodeGrid'), scrollX: false, scrollY: true, bodyHeight: 350, rowHeaders: [{
    //             type: 'rowNum', header: "No.", width: 50, className: 'border'
    //         }],
    //
    //         columns: [{
    //             header: "계정 코드",
    //             name: "acctCode",
    //             align: "center",
    //             renderer: {
    //                 type: ButtonRenderer
    //             },
    //         }, {
    //             header: "계정명", name: "acctName", sortingType: "asc", sortable: true, align: "center",
    //         }], showDummyRows: true,
    //     });
    //
    //     return accCodeGrid;
    // }
    //
    // const accCodeData = [{}]
    //
    // const createdAccCodeGrid = initAccCodeGrid();

    /*============================
             판매 등록 그리드
    ==============================*/

    async function loadWhList() {
        let result = await fetch('/whList');
        result = await result.json();
        result = result.map(ele => ({text: ele.whName, value: ele.whCode}));
        return result;
    }

    let whList = await loadWhList();

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
            rowHeaders: [{
                type: 'checkbox', header: `
                      <span class="custom-input">
                          <input type="checkbox" id="all-checkbox" class="hidden-input" name="_checked" />
                          <label for="all-checkbox" class="checkbox selectCheck">✔</label>
                      </span>`, renderer: {
                    type: gridCheckbox
                }
            }],
            data: [],
            columns: [{
                header: '발주번호',
                name: 'orderNo',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                className: 'border',
                hidden: 'true',
            }, {
                header: '품목코드', name: 'itemCode',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                className: 'border',
            }, {
                header: '품목명',
                name: 'itemName',
                align: "center",
                width: 200,
                whiteSpace: 'normal',
                editable: false,
                className: 'border'
            }, {
                header: '요구수량',
                name: 'quantity',
                align: "right",
                width: 100,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border',
                formatter: ({value}) => {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 숫자에 콤마 추가
                }
            }, {
                header: '창고',
                name: 'whCode',
                align: "center",
                width: 125,
                whiteSpace: 'normal',
                formatter: 'listItemText',
                editor: {
                    type: 'select',
                    options: {
                        listItems: whList
                    }
                },
                className: 'border'
            }, {
                header: '재고수량',
                name: 'stocksQuantity',
                align: "right",
                width: 100,
                whiteSpace: 'normal',
                className: 'border',
                formatter: ({value}) => {
                    const displayValue = value != null ? value : 0;
                    return displayValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 숫자에 콤마 추가
                },
            }, {
                header: '부족수량',
                name: 'deficiencyQuantity',
                align: "right",
                width: 100,
                whiteSpace: 'normal',
                sortingType: 'desc',
                className: 'border',
                validation: {dataType: 'string'},
                data:1,
                formatter: ({value}) => {
                    const displayValue = value != null ? value : 0;
                    return displayValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 숫자에 콤마 추가
                }
            }, {
                header: '단가',
                name: 'price',
                align: "right",
                whiteSpace: 'normal',
                width: 150,
                sortable: true,
                sortingType: 'desc',
                className: 'border',
                formatter: ({value}) => {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'; // 숫자에 콤마 추가
                }
            }, {
                header: '출고단가',
                name: 'deliveryPrice',
                editor: {
                    type: 'text', options: {
                        inputType: 'number', placeholder: '금액 입력',
                    }
                },
                align: "right",
                width: 150,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border',
                formatter: ({value}) => {
                    if (value === undefined || value === null || value === '') {
                        return ''; // 비어 있는 경우 아무 값도 표시하지 않음
                    }
                    return Number(value).toLocaleString() + '원'; // 값이 있는 경우 포맷팅
                },
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
                    if (value === undefined || value === null || value === '') {
                        return ''; // 비어 있는 경우 아무 값도 표시하지 않음
                    }
                    return Number(value).toLocaleString() + '원'; // 값이 있는 경우 포맷팅
                },
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
                    if (value === undefined || value === null || value === '') {
                        return ''; // 비어 있는 경우 아무 값도 표시하지 않음
                    }
                    return Number(value).toLocaleString() + '원'; // 값이 있는 경우 포맷팅
                },
            }, {
                header: '출고예정일',
                name: 'deliveryDate',
                editor: {
                    type: 'datePicker',
                    options: {
                        language: 'ko', // 한국어 설정
                        selectableRanges: [[new Date(), new Date(9999, 11, 31)]]
                    }
                },
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                className: 'border',
            }],

        });

        // 창고 수량 검색
        salesChit.on("editingFinish", (ev) => {

            const columnName = ev.columnName;
            if (columnName === 'whCode') {
                let whCode = ev.value;
                let itemCode = salesChit.getValue(ev.rowKey, 'itemCode');

                let params = {
                    whCode: whCode, itemCode: itemCode
                }
                // 창고와 상품이 선택되면 재고 수량 fetch
                if (whCode && itemCode) {
                    fetch('/quantity/' + whCode + '/' + itemCode)
                        .then(result => result.json())
                        .then(data => {
                            salesChit.setValue(ev.rowKey, 'stocksQuantity', data.currentQuantity)
                            let quantity = salesChit.getValue(ev.rowKey, 'quantity');
                            let deficiencyQuantity = Number(data.currentQuantity) - Number(quantity);
                            // 부족수량 체크
                            if (Number(data.currentQuantity) >= Number(quantity)) {
                                salesChit.setValue(ev.rowKey, 'deficiencyQuantity', 'X');
                            } else {
                                salesChit.setValue(ev.rowKey, 'deficiencyQuantity', deficiencyQuantity)
                            }
                        })
                        .catch(error => console.log(error))
                }
            }
        });

        salesChit.on("editingFinish", (ev) => {
            const columnName = ev.columnName;
            let quantity = salesChit.getValue(ev.rowKey, 'quantity');
            let deliveryPrice = salesChit.getValue(ev.rowKey, 'deliveryPrice');
            let supplyPrice = quantity * deliveryPrice;
            let vat = supplyPrice * 0.1;
            console.log(quantity + ' ' + deliveryPrice + ' ');
            if (columnName === 'deliveryPrice') {
                salesChit.setValue(ev.rowKey, 'supplyPrice', supplyPrice);
                salesChit.setValue(ev.rowKey, 'vat', vat);
            }
        })

        return salesChit;
    }

    // 그리드 추가
    let appends = document.querySelectorAll('.appendRowBtn')
    appends.forEach(btn => {

        btn.addEventListener('click', function (ev) {
            salesChit.appendRow();
        })

    })

    //열을 삭제하는 이벤트
    let deletes = document.querySelectorAll('.deleteRowBtn')
    deletes.forEach(btn => {
        btn.addEventListener('click', function () {
            salesChit.removeCheckedRows();
            refreshRowNum();
        })

    })

    // 열을 추가한 후 체크박스에 다시 숫자를 부여하는 코드
    function refreshRowNum() {
        let num = 1;
        window.setTimeout(function () {
            let checkList = document.querySelectorAll('.countCheck');
            // 번호 초기값 설정
            checkList.forEach(items => {
                items.innerText = num; // 번호 부여
                num += 1; // 번호 증가
            });
        }, 200); // 200ms 딜레이 후 실행
    }

    initSalesChitGrid();

    // 그리드 설정
    initClientGrid();

    // 그리드에 데이터 넣기(출력)
    // createdAccCodeGrid.resetData(accCodeData);

    //매출계정 input
    // accCodeGrid.on("click", (ev) => {
    //     const columnName = ev.columnName;
    //
    //     if (columnName === 'acctCode') {
    //         // 특정 열(columnName)의 값 가져오기
    //         const columnValue = accCodeGrid.getValue(ev.rowKey, 'acctName');
    //         document.getElementById('accCodeInput').value = columnValue;
    //     }
    // });


    // 발주서 모달
    /*============================
       StackInquery 구매내역 모달 JS
   ==============================*/
    var orderModal = document.getElementById('orders')

    orderModal.addEventListener('show.bs.modal', function () {
        // 모달이 표시되기 전에 실행할 코드
        window.setTimeout(function () {
            ordersGrid.refreshLayout();
        }, 200)
    })

    //발주서 클릭시 선택건 제외하고 띄워주기
     let orderModalTriggerBtn = document.getElementById('orderModal');
     orderModalTriggerBtn.addEventListener('click', function () {
	 			if(document.getElementById("inputClientName").value == ''){
                    toastr.warning("발주서를 조회할 거래처를 선택해주세요.");
	 				return ;
	 			}
                 let existentNo = []; //페이지 그리드에 있는 행들의 발주번호를 모은 배열
                 let clientName = document.getElementById("inputClientName").value;
                 salesChit.getData().forEach(ele => {
                     existentNo.push(ele.orderNo);
                 })
                 let filteredData = ordersGrid.getData().filter(ele => {
                     return !existentNo.includes(ele.orderNo) && clientName === ele.clientName;
                 })
                 ordersGrid.resetData(filteredData) // 페이지 그리드와 중복되는 건수를 제외한 발주건을 출력시킨다.
     })

	//발주서버튼 mouse over 이벤트
	let orderBtn = document.getElementById('orderModal');
	orderBtn.addEventListener('mouseover',function(){
		if(document.getElementById("inputClientName").value == ''){
			orderBtn.removeAttribute('data-bs-toggle');
		}
		if(document.getElementById("inputClientName").value != ''){
			orderBtn.setAttribute("data-bs-toggle","modal")
		}
	})

    let ordersGrid;
    const initOrdersGrid = () => {
        ordersGrid = new Grid({
            el: document.getElementById('ordersGrid'),
            scrollX: true,
            scrollY: true,
            header: {height: 40},
            bodyHeight: 500,
            columnOptions: {
                frozenCount: 3, frozenBorderWidth: 1
            },
            width: 'auto',
            contextMenu: null,
            data: [],
            rowHeaders: [{
                type: 'checkbox', header: `
                <span class="custom-input">
                <input type="checkbox" id="all-checkbox-2" class="hidden-input" name="_checked" />
                  <label for="all-checkbox-2" class="checkbox selectCheck">✔</label>
              </span>
            `, renderer: {
                    type: gridCheckbox
                }
            }],
            columns: [{
                header: '발주번호', name: 'orderNo', align: "center", width: 100, whiteSpace: 'normal', className: 'border',
            },  {
                header: '거래처명',
                name: 'clientName',
                align: "center",
                width: 120,
                whiteSpace: 'normal',
                className: 'border',
            }, {
                header: '발주일자',
                name: 'orderDate',
                align: "center",
                width: 120,
                whiteSpace: 'normal',
                className: 'border',
                filter: {
                    type: 'date', options: {
                        format: 'yyyy.MM.dd', language: 'ko'
                    }
                }
            }, {
                header: '사원명', name: 'name', align: "center", width: 100, whiteSpace: 'normal', className: 'border'
            }, {
                header: '품목코드', name: 'itemCode', align: "center", width: 200, whiteSpace: 'normal', className: 'border'
            }, {
                header: '품목명', name: 'itemName', align: "center", width: 250, whiteSpace: 'normal', className: 'border'
            }, {
                header: '수량',
                name: 'quantity',
                align: "right",
                width: 100,
                whiteSpace: 'normal',
                className: 'border',
                formatter: ({value}) => {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 숫자에 콤마 추가
                }
            }, {
                header: '단가',
                name: 'price',
                align: "right",
                width: 160,
                whiteSpace: 'normal',
                className: 'border',
                formatter: ({value}) => {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'; // 숫자에 콤마 추가
                }
            }, {
                header: '공급가액',
                name: 'supplyPrice',
                align: "right",
                width: 160,
                whiteSpace: 'normal',
                className: 'border',
                formatter: ({value}) => {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'; // 숫자에 콤마 추가
                }
            }, {
                header: '부가세',
                name: 'vat',
                align: "right",
                width: 160,
                whiteSpace: 'normal',
                className: 'border',
                formatter: ({value}) => {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'; // 숫자에 콤마 추가
                }
            },]
        });
        return ordersGrid;
    }
    // 샘플 데이터
    initOrdersGrid();

    let inputClientName = document.getElementById('inputClientName');

    inputClientName.addEventListener('change', () => {
        let inputClientNameValue = document.getElementById('inputClientName').value;
        if (inputClientNameValue !== '') {
            window.setTimeout(function () {
                fetch('/clientOrderList/' + inputClientNameValue)
                    .then(result => result.json())
                    .then(data => ordersGrid.resetData(data))
                    .catch(error => console.log(error))
            }, 200)
        } else {
            window.setTimeout(function () {
                fetch('/ordersList')
                    .then(result => result.json())
                    .then(data => ordersGrid.resetData(data))
                    .catch(error => console.log(error))
            }, 200)
        }
    })

    //발주서 모달에서 선택버튼 클릭시 페이지그리드로 데이터이동
    let orderInputBtn = document.getElementById('orderInputBtn');
    orderInputBtn.addEventListener("click", function () {
        let arr = ordersGrid.getCheckedRows();
        let dataArr = [];

        //price에 넣을 데이터를 위한 fetch함수 필요
        arr.forEach(ele => {
            let data = {};
            data.orderNo = ele.orderNo;
            data.itemCode = ele.itemCode;
            data.itemName = ele.itemName;
            data.price = ele.price;
            data.quantity = ele.quantity;
            data.vat = ele.vat;
            // data.deficiencyQuantity = '디비 값 연산';
            data.deliveryPrice = '';
            data.deliveryDate = '';
            data.supplyPrice = '';
            data.vat = '';
            dataArr.push(data)
        })
        let selectedCtn = arr.length;
        let exitedRowsInPage = salesChit.getRowCount()
        let checkingMaxRows = selectedCtn + exitedRowsInPage;
        if (checkingMaxRows < 16) {
            salesChit.appendRows(dataArr);
        } else {
            alert('한 번에 15건을 처리할 수 있습니다.')
        }
    })


    //내역,출하모달 띄울 때 조정페이지 grid에 이미 있는 rows들을 거르고 data 배열을 반환시킬 함수
    function exceptExitingRows(data) {
        //페이지 grid에 존재하는 내역No.
        let gridData = grid.getData();
        let exitedNo = [];
        gridData.forEach(ele => {
            exitedNo.push(ele.orderNo);
        })
        let exitedNoSet = new Set(exitedNo);

        //제외 된 후 최종적으로 출력될 row의 clientCode컬럼 값
        let dataSet = new Set();
        data.forEach((ele) => {
            dataSet.add(ele.clientCode)
            exitedNoSet.forEach(ele2 => {
                if (ele.clientCode == ele2) {
                    dataSet.delete(ele2)
                }
            })
        })
        let noArr = Array.from(dataSet);
        let resultObj = [];
        data.forEach(ele => {
            noArr.forEach(ele2 => {
                if (ele.clientCode === ele2) {
                    resultObj.push(ele);
                }
            })
        })
        let resultArr = [];
        let resultObjArr = Array.from(resultObj)
        resultObjArr.forEach(ele => {
            let row = {};
            row.orderNo = ele.orderNo;
            row.clientCode = ele.clientCode;
            row.clientName = ele.clientName;
            row.orderDate = ele.orderDate;
            row.empCode = ele.empCode;
            row.empName = ele.empName;
            row.itemCode = ele.itemCode;
            row.price = ele.price;
            resultArr.push(row);
        })
        return resultArr
    }

    document.getElementById('saveBtn').addEventListener('click', function () {
        // 전송할 데이터
        let insertSales = {};

        // 마스터 정보
        // 거래처
        insertSales.clientName = document.getElementById('inputClientName').value.trim();
        insertSales.clientCode = document.getElementById('inputClientCode').value.trim();
        // 담당자
        insertSales.employeeName = document.getElementById('empNameInput').value.trim();
        insertSales.employeeCode = document.getElementById('empCodeInput').value.trim();
        // 입금계좌
        insertSales.depBacct = document.getElementById('accountInput').value.trim();
        // 그리드 정보
        insertSales.saleslipHistories = salesChit.getData();

        // 빈 값 확인 - 마스터 정보
        if(insertSales.clientName === '') {
            toastr.warning('거래처명을 입력하세요.')
            return;
        }

        if(insertSales.employeeName === '') {
            toastr.warning('담당자명을 입력하세요.')
            return;
        }

        if(insertSales.depBacct === '') {
            toastr.warning('입금계좌를 입력하세요.')
            return;
        }

        if(insertSales.saleslipHistories.length === 0) {
            toastr.warning('발주서를 불러와 작성해주세요.')
            return;
        }

        // 빈 값 확인 - 그리드 정보
        let hasEmptyGridValues = insertSales.saleslipHistories.some(row => {
            return Object.values(row).some(value => value === '' || value === null || value === undefined);
        });

        if (hasEmptyGridValues) {
            toastr.warning('테이블에 빈 값이 포함되어 있습니다. 모든 필드를 입력해주세요.');
            return; // 전송 중단
        }

        // 빈 값 확인 - 그리드 정보 (재고수량 음수 체크 추가)
        let hasInvalidGridData = insertSales.saleslipHistories.some(row => {
            // '재고수량'이 음수인지 체크
            if (row['deficiencyQuantity'] < 0) {
                toastr.warning('창고 수량이 부족합니다. 담당자에게 확인 부탁드립니다.');
                return true; // 음수일 경우 오류 표시 후 중단
            }
            return false;
        });

        if (hasInvalidGridData) {
            return; // 전송 중단
        }

        // 부가세 공급가액 계산
        let vat = 0;
        let supplyPrice = 0;
        for (ele of insertSales.saleslipHistories) {
            vat += ele.vat;
            supplyPrice += ele.supplyPrice;
        }

        console.log(vat);
        console.log(supplyPrice);

        insertSales.vat = vat;
        insertSales.supplyPrice = supplyPrice;

        // ajax 호출 전 확인
        console.log(insertSales);
        console.log(JSON.stringify(insertSales));

        if (insertSales.saleslipHistories.value === '') {
            console.log('전송실패')
        }

        salesChit.blur();



        // ajax 호출
        fetch('/sales/insertSalesChit', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(insertSales),
        })
            .then(result => {
                if (result.status === 200) {
                    toastr.success("판매완료 되었습니다.");
                }
            })
            .then(result => {
                console.log("판매전표 에러 : ", res.message)
            })

        setTimeout(() => {
            location.reload();
        }, 3000)
    })

    // onGridMounted 이벤트 사용
    salesChit.on('onGridMounted', () => {
        // 특정 컬럼의 헤더를 선택
        const wh = document.querySelector('#salesChit .tui-grid-header-area .tui-grid-cell[data-column-name="whCode"]');
        const deliveryPrice = document.querySelector('#salesChit .tui-grid-header-area .tui-grid-cell[data-column-name="deliveryPrice"]');
        const deliveryDate = document.querySelector('#salesChit .tui-grid-header-area .tui-grid-cell[data-column-name="deliveryDate"]');

        if (wh) {
            // 빨간색 * 추가 및 헤더 텍스트 수정
            wh.innerHTML = '창고<span style="color: red;">*</span>';
        }
        if (deliveryPrice) {
            deliveryPrice.innerHTML = '출고단가<span style="color: red;">*</span>';
        }
        if(deliveryDate) {
            deliveryDate.innerHTML = '출고예정일<span style="color: red;">*</span>';
        }
    });

    const myModal = new bootstrap.Modal('#accountSearchModal')
});

