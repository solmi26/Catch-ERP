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
        myModal.hide(modalToggle);
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
                name: 'c1',
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
                name: 'c2',
                align: "center",
                width: 135,
                whiteSpace: 'normal',
                className: 'border',
                filter: 'select'
            }, {
                header: '부서명',
                name: 'c3',
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

    // 샘플 데이터
    const empData = [{
        c1: 'A20241205-1', c2: '김기현', c3: '개발팀'
    }];

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
                name: 'c1',
                align: "center",
                width: 183,
                whiteSpace: 'normal',
                className: 'border',
                renderer: {
                    type: ButtonRenderer
                },
                filter: 'select'

            }, {
                header: '창고코드', name: 'c2', align: "center", width: 183, whiteSpace: 'normal', className: 'border'
            }, {
                header: '위치',
                name: 'c3',
                align: "center",
                width: 184,
                whiteSpace: 'normal',
                className: 'border',
                filter: 'select'
            }, {
                header: '구분',
                name: 'c4',
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

    // 샘플 데이터
    const warehouseData = [{
        c1: '물류창고', c2: 'A0000045', c3: '천안아산', c4: '소요량높음'
    }];

    /*============================
            매출계정 모달 JS
    ==============================*/
    // 모달 관련 JavaScript
    const accCodeModal = document.getElementById('accCodeGrid')

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
                header: "계정 코드", name: "accode",
                align: "center",
                renderer: {
                    type: ButtonRenderer
                },
            },
                {
                    header: "계정명", name: "acname", sortingType: "asc", sortable: true, align: "center",
                }],
            showDummyRows: true,
        });

        return accCodeGrid;
    }

    const accCodeData = [{
        accode: 10100, acname: "현금",
    }, {
        accode: 10200, acname: "당좌예금",
    }, {
        accode: 10300, acname: "보통예금",
    }]

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
            bodyHeight: 500,
            rowHeight: 102,
            width: 'auto',
            contextMenu: null,
            rowHeaders: [
                {
                    type: 'checkbox',
                    header: `
                        <span class="custom-input">
                            <input type="checkbox" id="all-checkbox" class="hidden-input" name="_checked" />
                            <label for="all-checkbox" class="checkbox selectCheck">✔</label>
                        </span>`
                    ,
                    renderer: {
                        type: gridCheckbox
                    }
                }
            ],
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
                header: '출고단가',
                name: 'deliveryPrice',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border'
            }, {
                header: '수량',
                name: 'quantity',
                align: "center",
                width: 100,
                whiteSpace: 'normal',
                editor: 'text',
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
            }, {header: '이미지', name: 'image', align: "center", width: 200, whiteSpace: 'normal', className: 'border'}, {
                header: '내용',
                name: 'salesSummary',
                align: "center",
                width: 225,
                whiteSpace: 'normal',
                editor: 'text',
                className: 'border'
            },],
            summary: {
                height: 40, position: 'bottom', columnContent: {
                    quantity: {template: valueMap => `총합: ${valueMap.sum}`},
                }
            }
        });
        return salesChit;
    }

    const salesChitData = [{}];

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
        const columnName = ev.columnName;

        if (columnName === 'clientName') {
            // 특정 열(columnName)의 값 가져오기
            const columnValue = clientGrid.getValue(ev.rowKey, 'clientName');
            document.getElementById('inputClient').value = columnValue

        }
    });

    //담당자 input
    humanGrid.on("click", (ev) => {
        const columnName = ev.columnName;
        const rowKey = ev.rowKey

        if (columnName === 'c1') {
            // 특정 열(columnName)의 값 가져오기
            const columnValue = humanGrid.getValue(rowKey, 'c2');
            document.getElementById('empInput').value = columnValue

        }
    });

    //창고 input
    warehouseGrid.on("click", (ev) => {
        const columnName = ev.columnName;

        if (columnName === 'c1') {
            // 특정 열(columnName)의 값 가져오기
            const columnValue = warehouseGrid.getValue(ev.rowKey, 'c1');
            document.getElementById('warehouse').value = columnValue

        }
    });

    //매출계정 input
    accCodeGrid.on("click", (ev) => {
        const columnName = ev.columnName;

        if (columnName === 'accode') {
            // 특정 열(columnName)의 값 가져오기
            const columnValue = accCodeGrid.getValue(ev.rowKey, 'acname');
            document.getElementById('accCodeInput').value = columnValue

        }
    });

});

