document.addEventListener("DOMContentLoaded", function () {

    // 계좌 목록 조회 모달
    let accountList = [{accCode: "000001", accName: "신한(입금)"}, {accCode: "000002", accName: "대구(출금)"},];
    //Build Tabulator
    let accList = new Tabulator("#example-table", {
        layout: "fitColumns",
        pagination: "local",
        data: accountList,
        paginationSize: 6,
        paginationSizeSelector: [3, 6, 8, 10],
        movableColumns: true,
        paginationCounter: "rows",
        columns: [{title: "계좌코드", field: "accCode", width: 320, sorter: "string", headerFilter: "input"}, {
            title: "계좌명", field: "accName", width: 440, sorter: "string", headerFilter: "input"
        },],
    });

    const myModal = new bootstrap.Modal('#accountSearchModal')

    accList.on("cellClick", (e, cell) => {

        const rowData = cell.getRow().getData(); // 클릭한 셀의 값

        document.getElementById('accountInput').value = rowData.accName;
        console.log("rowData:", rowData.accName);
        const modalToggle = document.getElementById('accountSearchModal');
        modalToggle.hide(modalToggle);
    });


    class ImageRenderer {
        constructor(props) {
            this.el = document.createElement('img');
            this.el.src = props.value; // 이미지 URL을 props.value로 설정
            this.el.style.width = '130px'; // 이미지 크기 조절
            this.el.style.height = '100px';
        }

        getElement() {
            return this.el;
        }
    }

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

    //숫자타입 인풋 렌더러 (석진제작)
    class gridNumber {
        constructor(props) {
            const el = document.createElement('input');

            el.type = 'number';
            el.value = String(props.value);
            el.className = 'form-control from-control-sm'
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

    //숫자있는 체크박스 (석진제작)
    class gridCheckbox {
        constructor(props) {
            const {grid, rowKey} = props;

            const label = document.createElement('label');
            label.className = 'checkbox tui-grid-row-header-checkbox selectCheck countCheck';
            label.setAttribute('for', 'selectCheck' + String(rowKey));
            label.innerText = `${grid.getIndexOfRow(rowKey) + 1}`;
            const hiddenInput = document.createElement('input');
            hiddenInput.className = 'hidden-input';
            hiddenInput.id = 'selectCheck' + String(rowKey);


            const customInput = document.createElement('span');
            customInput.className = 'custom-input';

            customInput.appendChild(hiddenInput);
            customInput.appendChild(label);

            hiddenInput.type = 'checkbox';
            label.addEventListener('click', (ev) => {
                ev.preventDefault();

                if (ev.shiftKey) {
                    grid[!hiddenInput.checked ? 'checkBetween' : 'uncheckBetween'](rowKey);
                    return;
                }

                grid[!hiddenInput.checked ? 'check' : 'uncheck'](rowKey);
            });

            this.el = customInput;

            this.render(props);
        }

        getElement() {
            return this.el;
        }

        render(props) {
            const hiddenInput = this.el.querySelector('.hidden-input');
            const checked = Boolean(props.value);

            hiddenInput.checked = checked;
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
            el: document.getElementById("clientGrid"),
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

    fetch('emps')
        .then(result => result.json())
        .then(data => humanGrid.resetData(data))
        .catch(error => alert("데이터를 조회하는데 실패"))

    const empData = [{}];

    let humanGrid;
    const inithumanGrid = () => {
        humanGrid = new Grid({
            el: document.getElementById('humanGrid'),
            scrollX: true,
            scrollY: true,
            header: {height: 40},
            bodyHeight: 500,
            width: 'auto',
            contextMenu: null,
            rowHeaders: [{
                type: 'rowNum', header: "No.", width: 50, className: 'border'
            }],
            columns: [{
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
        return humanGrid;
    }

    const createdhumanGrid = inithumanGrid();

    /*============================
            StackInquery 창고 모달 JS
        ==============================*/
    // 모달 관련 JavaScript
    const warehouseModal = document.getElementById('warehouseModal')

    //모달실행 시 grid refresh를 위한 코드
    document.getElementById('openWarehouseModal').addEventListener('click', function () {
        window.setTimeout(function () {
            warehouseGrid.refreshLayout();
        }, 200)
    });

    fetch('whList')
        .then(result => result.json())
        .then(data => warehouseGrid.resetData(data))
        .catch(error => alert("데이터를 조회하는데 실패"))

    // 샘플 데이터
    const warehouseData = [{}];

    let warehouseGrid;
    const initWarehouseGrid = () => {
        warehouseGrid = new Grid({
            el: document.getElementById('warehouseGrid'),
            scrollX: true,
            scrollY: true,
            header: {height: 40},
            bodyHeight: 500,
            width: 'auto',
            contextMenu: null,
            rowHeaders: [{
                type: 'rowNum', header: "No.", width: 50, className: 'border'
            }],
            columns: [{
                header: '창고명',
                name: 'whName',
                align: "center",
                width: 183,
                whiteSpace: 'normal',
                className: 'border',
                renderer: {
                    type: ButtonRenderer
                },
                filter: 'select'

            }, {
                header: '창고코드', name: 'whCode', align: "center", width: 183, whiteSpace: 'normal', className: 'border'
            }, {
                header: '위치',
                name: 'whPlace',
                align: "center",
                width: 184,
                whiteSpace: 'normal',
                className: 'border',
                filter: 'select'
            }, {
                header: '구분',
                name: 'whType',
                align: "center",
                width: 184,
                whiteSpace: 'normal',
                className: 'border',
                filter: 'select'
            }]
        });
        return warehouseGrid;
    }

    const createdWarehouseGrid = initWarehouseGrid();

    /*============================
            매출계정 모달 JS
    ==============================*/
    // 모달 관련 JavaScript
    const accCodeModal = document.getElementById('accCodeGrid')

    fetch('acctList')
        .then(result => result.json())
        .then(data => accCodeGrid.resetData(data))
        .catch(error => alert("데이터를 조회하는데 실패"))

    //모달실행 시 grid refresh를 위한 코드
    document.getElementById('openAccCodeModal').addEventListener('click', function () {
        window.setTimeout(function () {
            accCodeGrid.refreshLayout();
        }, 200)
    });

    let accCodeGrid;
    const initAccCodeGrid = () => {
        accCodeGrid = new Grid({
            el: document.getElementById('accCodeGrid'), scrollX: false, scrollY: true, bodyHeight: 350, rowHeaders: [{
                type: 'rowNum', header: "No.", width: 50, className: 'border'
            }],

            columns: [{
                header: "계정 코드", name: "acctCode", align: "center", renderer: {
                    type: ButtonRenderer
                },
            }, {
                header: "계정명", name: "acctName", sortingType: "asc", sortable: true, align: "center",
            }], showDummyRows: true,
        });

        return accCodeGrid;
    }

    const accCodeData = [{}]

    const createdAccCodeGrid = initAccCodeGrid();

    /*============================
             판매 등록 그리드
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
            rowHeaders: [{
                type: 'checkbox', header: `
                        <span class="custom-input">
                            <input type="checkbox" id="all-checkbox" class="hidden-input" name="_checked" />
                            <label for="all-checkbox" class="checkbox selectCheck">✔</label>
                        </span>`, renderer: {
                    type: gridCheckbox
                }
            }],
            columns: [{
                header: '품목코드', name: 'prodCode', align: "center", width: 150, whiteSpace: 'normal', className: 'border'
            }, {
                header: '품목명',
                name: 'prodName',
                align: "center",
                width: 200,
                whiteSpace: 'normal',
                editor: 'text',
                className: 'border'
            }, {
                header: '수량',
                name: 'quantity',
                editor: 'text',
                align: "center",
                width: 100,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border'
            }, {
                header: '재고수량',
                name: 'stocksQuantity',
                align: "center",
                width: 100,
                whiteSpace: 'normal',
                className: 'border'
            }, {
                header: '부족수량',
                name: 'deficiencyQuantity',
                align: "center",
                width: 100,
                whiteSpace: 'normal',
                sortingType: 'desc',
                className: 'border'
            }, {
                header: '단가',
                name: 'deliveryPrice',
                editor: 'text',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
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
                className: 'border'
            }, {
                header: '부가세',
                name: 'vat',
                editor: 'text',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border'
            },],
            summary: {
                height: 40, position: 'bottom', // or 'top'
                columnContent: {
                    deliveryPrice: {
                        template: function (valueMap) {
                            return `TOTAL: ${valueMap.sum}`;
                        }
                    }, quantity: {
                        template: function (valueMap) {
                            return `TOTAL: ${valueMap.sum}`;
                        }
                    }
                }
            }
        });
        return salesChit;
    }

    // 그리드 추가
    let appends = document.querySelectorAll('.appendRowBtn')
    appends.forEach(btn => {

        btn.addEventListener('click', function () {
            salesChit.appendRow();
        })

    })

    // 열을 삭제하는 이벤트
    let deletes = document.querySelectorAll('.deleteRowBtn')
    deletes.forEach(btn => {
        btn.addEventListener('click', function () {
            salesChit.removeCheckedRows();

            refreshRowNum();

        })

    })

    //열을 추가후 체크박스에 다시 숫자부여하는 코드
    function refreshRowNum() {
        window.setTimeout(function () {
            let checkList = document.querySelectorAll('.countCheck')
            let num = 1;
            checkList.forEach(items => {
                items.innerText = num;
                num += 1;
            })

        }, 50)
    }

    const salesChitData = [];

    const createdSalesChitGrid = initSalesChitGrid();

    // 그리드 설정
    const createdClientGrid = initClientGrid();

    // 그리드에 데이터 넣기(출력)
    createdWarehouseGrid.resetData(warehouseData);

    createdSalesChitGrid.resetData(salesChitData);

    // 그리드에 데이터 넣기(출력)
    createdhumanGrid.resetData(empData);

    // 그리드에 데이터 넣기(출력)
    createdAccCodeGrid.resetData(accCodeData);

    // 그리드에 데이터 넣기(출력)
    // createdClientGrid.resetData(clientData);

    // 그리드 클릭 시 input 입력


    // 입력일자 sysdate input
    document.getElementById('currentDate').value = new Date().toISOString().substring(0, 10);

    //거래처 input
    clientGrid.on("click", (ev) => {
        const clientRowData = clientGrid.getRow(ev.rowKey);

        if (clientRowData && clientRowData.clientName) {
            // 특정 열(columnName)의 값 가져오기
            // const columnValue = clientGrid.getValue(ev.rowKey, 'clientName');
            document.getElementById('inputClientName').value = clientRowData.clientName;
            document.getElementById('inputClientCode').value = clientRowData.clientCode;
        }
    });

    //담당자 input
    humanGrid.on("click", (ev) => {
        const empRowData = humanGrid.getRow(ev.rowKey);

        if (empRowData && empRowData.employeeCode) {
            // 특정 열(columnName)의 값 가져오기
            // const columnValue = humanGrid.getValue(rowKey, 'name');
            console.log(empRowData);
            document.getElementById('empNameInput').value = empRowData.name;
            document.getElementById('empCodeInput').value = empRowData.employeeId;

        }
    });

    //창고 input
    warehouseGrid.on("click", (ev) => {
        const columnName = ev.columnName;

        if (columnName === 'whName') {
            // 특정 열(columnName)의 값 가져오기
            const columnValue = warehouseGrid.getValue(ev.rowKey, 'whName');
            document.getElementById('warehouse').value = columnValue

        }
    });

    //매출계정 input
    accCodeGrid.on("click", (ev) => {
        const columnName = ev.columnName;

        if (columnName === 'acctCode') {
            // 특정 열(columnName)의 값 가져오기
            const columnValue = accCodeGrid.getValue(ev.rowKey, 'acctName');
            document.getElementById('accCodeInput').value = columnValue
        }
    });


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

    let ordersGrid;
    const initordersGrid = () => {
        ordersGrid = new Grid({
            el: document.getElementById('ordersGrid'),
            scrollX: true,
            scrollY: true,
            header: {height: 40},
            bodyHeight: 500,
            width: 'auto',
            contextMenu: null,
            rowHeaders: [{
                type: 'checkbox', header: `
		              <span class="custom-input">
		              <input type="checkbox" id="all-checkbox" class="hidden-input" name="_checked" />
		            	<label for="all-checkbox" class="checkbox selectCheck">✔</label>
		          	</span>
		          `, renderer: {
                    type: gridCheckbox
                }
            }],
            columns: [{
                header: '발주번호',
                name: 'orderNo',
                align: "center",
                width: 120,
                whiteSpace: 'normal',
                className: 'border',
            }, {
                header: '거래처코드',
                name: 'clientCode',
                align: "center",
                width: 120,
                whiteSpace: 'normal',
            }, {
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
                header: '사원코드',
                name: 'empCode',
                align: "center",
                width: 100,
                whiteSpace: 'normal',
                className: 'border'
            }, {
                header: '사원명',
                name: 'empName',
                align: "center",
                width: 100,
                whiteSpace: 'normal',
                className: 'border'
            }, {
                header: '품목코드',
                name: 'itemCode',
                align: "center",
                width: 100,
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
                header: '수량',
                name: 'quantity',
                align: "center",
                width: 100,
                whiteSpace: 'normal',
                className: 'border'
            }, {
                header: '단가',
                name: 'price',
                align: "center",
                width: 200,
                whiteSpace: 'normal',
                editor: 'text',
                className: 'border',
                formatter: function (e) {
                    return e.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                },
            },{
                header: '공급가액',
                name: 'supplyPrice',
                align: "center",
                width: 200,
                whiteSpace: 'normal',
                editor: 'text',
                className: 'border',
                formatter: function (e) {
                    return e.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                },
            }]
        });
        return ordersGrid;
    }


    // 샘플 데이터
    const sampleData6 = [{
        orderNo: 'A0000045',
        clientCode: 'A0000045-1',
        clientName: '태산물산',
        orderDate: '2023.01.01',
        empCode: 'E001',
        empName: '홍길동',
        itemCode: 'z0001',
        itemName: '컵홀더',
        quantity: '99',
        price: '100000000',
        supplyPrice: '10000',
        vat: '100',
    }, {
        orderNo: 'A0000045',
        clientCode: 'A0000045-1',
        clientName: '2023.01.01',
        orderDate: 'z0001',
        empCode: '컵홀더',
        empName: '태호물산',
        itemCode: '0',
        itemName: '컵홀더',
        quantity: '123',
        price: '100',
        supplyPrice: '10000',
        vat: '100',
    },];

    //출하지시내역 모달에서 선택버튼 클릭시 페이지그리드로 데이터이동
    let orderInputBtn = document.getElementById('orderInputBtn');
    orderInputBtn.addEventListener("click", function () {
        let arr = ordersGrid.getCheckedRows();
        let dataArr = [];

        //price에 넣을 데이터를 위한 fetch함수 필요
        arr.forEach(ele => {
            let data = {};
            data.prodCode = ele.itemCode;
            data.prodName = ele.itemName;
            data.deliveryPrice = ele.price;
            data.quantity = ele.quantity;
            data.stocksQuantity = '디비 값';
            data.deficiencyQuantity = '디비 값 연산';
            data.price = 'fetch필요(출하)';
            data.supplyPrice = ele.supplyPrice;
            data.vat = ele.vat;
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
                if (ele.clientCode == ele2) {
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

    const createdOrderGrid = initordersGrid();
    createdOrderGrid.resetData(sampleData6);
});

