document.addEventListener("DOMContentLoaded", async function () {

    // 입력일자 sysdate input
    document.getElementById('currentDate').value = new Date().toISOString().substring(0, 10);

    // 출금계좌 테이블
    function makeReceivableTabulator(accountList) {
        let accList = new Tabulator("#example-table", {
            layout:"fitColumns",
            pagination:"local",
            data: accountList,
            paginationSize:8,
            movableColumns:true,
            paginationCounter:"rows",
            paginationCounter:function(pageSize, currentRow, currentPage, totalRows, totalPages){
                return "";
            },
            langs:{
                "default":{
                    "pagination":{
                        "first":"처음",
                        "first_title":"처음으로",
                        "last":"끝",
                        "last_title":"마지막으로",
                        "prev":"이전",
                        "prev_title":"이전으로",
                        "next":"다음",
                        "next_title":"다음으로",
                        "all":"전체",
                    }
                }
            },
            columns:[
                {title:"계좌코드", field:"bacctCode", visible:false},
                {title:"계좌번호", field:"bacctNo", width:220, sorter:"string", headerFilter:"input"},
                {title:"은행명", field:"bankName", width:220, sorter:"string", headerFilter:"input"},
                {title:"계좌명", field:"bacctName", width:330, sorter:"string", headerFilter:"input"},
            ],
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

    //     accList.on("cellClick", (e, cell) => {
    //
    //     const rowData = cell.getRow().getData(); // 클릭한 셀의 값
    //
    //     document.getElementById('accountInput').value = rowData.accName;
    //     console.log("rowData:", rowData.accName);
    //     const modalToggle = document.getElementById('accountSearchModal');
    //     modalToggle.hide(modalToggle);
    // });

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
             판매 등록 그리드
    ==============================*/
    async function loadWhList() {
        let result = await fetch('/whList');
        result = await result.json();
        // 리스트 항목을 whName과 whCode로 구성
        result = result.map(ele => ({text: ele.whName, value: ele.whCode}));
        return result;
    }

    let whList = await loadWhList();

    let purchaseChit;
    const initSalesChitGrid = () => {

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
                header: '품목코드',
                name: 'itemCode',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                className: 'border',
            }, {
                header: '품목명',
                name: 'itemName',
                align: "center",
                width: 250,
                whiteSpace: 'normal',
                editor: 'text',
                className: 'border'
            }, {
                header: '창고',
                name: 'whCode',
                align: "center",
                width: 180,
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
                header: '수량',
                name: 'quantity',
                editor: 'text',
                defaultValue : 1,
                align: "center",
                width: 100,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border'
            }, {
                header: '총 금액',
                name: 'totalPrice',
                editor: 'text',
                align: "center",
                width: 200,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border',
                formatter: ({value}) => {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'; // 숫자에 콤마 추가
                }
            }, {
                header: '총 금액',
                name: 'totalPriceHidden',
                hidden: true,
                editor: 'text',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border',
            }, {
                header: '단가',
                name: 'price',
                editor: 'text',
                align: "center",
                width: 200,
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
                width: 200,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border',
                formatter: ({value}) => {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'; // 숫자에 콤마 추가
                }
            }, {
                header: '공급가액',
                name: 'supplyPriceHidden',
                hidden: true,
                editor: 'text',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border',
            }, {
                header: '부가세',
                name: 'vat',
                editor: 'text',
                align: "center",
                width: 200,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border',
                formatter: ({value}) => {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'; // 숫자에 콤마 추가
                }
            }, {
                header: '부가세',
                name: 'vatHidden',
                editor: 'text',
                hidden: true,
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border',
            },],
        });

        purchaseChit.on('editingFinish', (ev) => {

            const columnName = ev.columnName;

            if(columnName === 'quantity'){
                let quantity = ev.value;

                // 총 금액 증가
                let inputQuantity = purchaseChit.getValue(ev.rowKey, 'totalPriceHidden')
                console.log(inputQuantity)
                let sumQuantity = inputQuantity * quantity;
                purchaseChit.setValue(ev.rowKey, 'totalPrice', sumQuantity);

                // 공급가액 증가
                let inputSupplyPrice = purchaseChit.getValue(ev.rowKey, 'supplyPriceHidden')
                let sumSupplyPrice = inputSupplyPrice * quantity;
                purchaseChit.setValue(ev.rowKey, 'supplyPrice', sumSupplyPrice);

                // 부가세 증가
                let inputVat = purchaseChit.getValue(ev.rowKey, 'vatHidden')
                let sumVat = inputVat * quantity;
                purchaseChit.setValue(ev.rowKey, 'vat', sumVat)
            }



        })

        return purchaseChit;
    }

    /*============================
             품목 그리드
    ==============================*/

    var contractItemModal = document.getElementById('contractItem')

    contractItemModal.addEventListener('show.bs.modal', function () {
        // 모달이 표시되기 전에 실행할 코드
        window.setTimeout(function () {
            itemListGrid.refreshLayout();
        }, 200)
    })

    let itemListGrid;
    const initItemListGrid = () => {

        itemListGrid = new Grid({
            el: document.getElementById('itemListGrid'),
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
                header: '품목코드', name: 'itemCode', align: "center", width: 150, whiteSpace: 'normal', className: 'border'
            }, {
                header: '품목명',
                name: 'itemName',
                align: "center",
                width: 200,
                whiteSpace: 'normal',
                editor: 'text',
                className: 'border',
                filter: 'select'
            }, {
                header: '재고수량',
                name: 'stocksQuantity',
                editor: 'text',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border',
            }, {
                header: '총 금액',
                name: 'totalPrice',
                editor: 'text',
                align: "center",
                width: 100,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border',
                formatter: ({value}) => {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'; // 숫자에 콤마 추가
                }
            }, {
                header: '총 금액',
                name: 'totalPriceHidden',
                hidden: true,
                editor: 'text',
                align: "center",
                width: 100,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border',
            }, {
                header: '단가',
                name: 'price',
                editor: 'text',
                align: "center",
                width: 100,
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
                header: '공급가액',
                name: 'supplyPrice',
                editor: 'text',
                hidden: true,
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border',
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
            }, {
                header: '부가세',
                name: 'vat',
                editor: 'text',
                hidden: true,
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className: 'border',
            },],
        });
        return itemListGrid;
    }
    initItemListGrid();

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
            purchaseChit.removeCheckedRows();
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

    // 모달 관련 JavaScript
    const whSearchModal = document.getElementById('whSearchModal')

    // window.setTimeout(function () {
    //     fetch('/whList')
    //         .then(result => result.json())
    //         .then(data => whGrid.resetData(data))
    //         .catch(error => alert("창고 조회 실패입니다."))
    // }, 200)

    //발주서 모달에서 선택버튼 클릭시 페이지그리드로 데이터이동
    let itemInputBtn = document.getElementById('itemInputBtn');
    itemInputBtn.addEventListener("click", function () {
        let arr = itemListGrid.getCheckedRows();
        let dataArr = [];

        //price에 넣을 데이터를 위한 fetch함수 필요
        arr.forEach(ele => {
            let data = {};
            data.itemCode = ele.itemCode;
            data.itemName = ele.itemName;
            data.totalPrice = ele.totalPrice;
            data.price = ele.price;
            data.quantity = ele.quantity;
            data.supplyPrice = ele.supplyPrice;
            data.vat = ele.vat;
            data.totalPriceHidden = ele.totalPrice;
            data.supplyPriceHidden = ele.supplyPrice;
            data.vatHidden = ele.vat;
            dataArr.push(data)
        })
        let selectedCtn = arr.length;
        let exitedRowsInPage = purchaseChit.getRowCount()
        let checkingMaxRows = selectedCtn + exitedRowsInPage;
        if (checkingMaxRows < 16) {
            purchaseChit.appendRows(dataArr);
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
        let insertPurchase = {};
        // 마스터 정보
        // 거래처
        insertPurchase.clientName = document.getElementById('inputClientName').value;
        insertPurchase.clientCode = document.getElementById('inputClientCode').value;
        // 담당자
        insertPurchase.employeeName = document.getElementById('empNameInput').value;
        insertPurchase.employeeCode = document.getElementById('empCodeInput').value;
        // 출금계좌
        insertPurchase.witBacct = document.getElementById('accountInput').value;

        // 그리드 정보
        insertPurchase.purchaseHistories = purchaseChit.getData();

        // 부가세, 공급가액 합계 계산
        let vat = 0;
        let supplyPrice = 0;
        for (ele of insertPurchase.purchaseHistories) {
            vat += ele.vat;
            supplyPrice += ele.supplyPrice;
        }
        // 부가세, 공급가액 계산
        insertPurchase.vat = vat;
        insertPurchase.supplyPrice = supplyPrice;

        // ajax 호출 전 확인
        console.log(insertPurchase);
        console.log(JSON.stringify(insertPurchase));

        // ajax 호출
        fetch('/purchase/insertPurchaseChit', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(insertPurchase),
        })
            .then(result => {
                if (result.status === 200) {
                    alert("저장 완료");
                }
            })
            .then(error => {
                console.log("판매전표 에러 : ", error)
            })

    })

    let inputClientName = document.getElementById('inputClientName');

    inputClientName.addEventListener('change', () => {
        let inputClientNameValue = document.getElementById('inputClientName').value;
        if(inputClientNameValue !== '') {
            window.setTimeout(function () {
                fetch('/purchase/contractItem/' + inputClientNameValue)
                    .then(result => result.json())
                    .then(data => itemListGrid.resetData(data))
                    .catch(error => console.log(error))
            }, 200)
        }
    })

    const myModal = new bootstrap.Modal('#accountSearchModal')
});

