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

    //숫자타입 인풋 렌더러 (석진제작1)
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

            // console.log(grid.el.id);
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
                header: '판매전표번호',
                name: 'saleslipNo',
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
                className: 'border'
            }, {
                header: '거래처명',
                name: 'clientName',
                editor: 'text',
                align: "center",
                width: 100,
                whiteSpace: 'normal',
                className: 'border'
            }, {
                header: '매출계정명',
                name: 'accCode',
                editor: 'text',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                sortingType: 'desc',
                className: 'border'
            }, {
                header: '금액합계',
                name: 'deliveryPrice',
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

            fetch('/sales/selectSaleslip/' + saleSlip)
                .then(result => result.json())
                .then(data => saleslipHistory.resetData(data))
                .catch(error => alert('판매전표별 내역을 불러오지 못했습니다.'))

            window.setTimeout(function () {
                saleslipHistory.refreshLayout();
            }, 300)
        })
        return salesChit;
    }
    initSalesChitGrid();

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
                name: 'deliveryPrice',
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
                header: '출고상태',
                name: 'deliveryStatus',
                editor: 'text',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                sortable: true,
                className: 'border'
            }, {
                header: '출하예정일',
                name: 'deliveryDate',
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

        return saleslipHistory;
    }
    initSaleslipHistory();
});

