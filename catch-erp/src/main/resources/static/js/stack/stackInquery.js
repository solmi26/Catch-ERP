/**
 * (stackInquery.html) - 재고조회조정 페이지에 적용되는 JS
 */
 
/*==========================================
	  공통사용되는 토스트 UI Grid 렌더러 Class
============================================*/

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
            const { maxLength } = props.columnInfo.editor.options;

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

/*==========================================
		재고조정과 관련된 토스트 그리드 객체와 함수 (첫번째 그리드)
============================================*/
document.addEventListener("DOMContentLoaded", function () {
    

    const initGrid = () => {
        // 그리드 객체
        const Grid = tui.Grid;

        Grid.applyTheme('default',  {
            outline:{
            border : '#dee2e6'
        },
        cell: {
            normal: {
                border: '#dee2e6'
            },
            header: {
                background: '#f8f9fa',
                text: 'black'
            },
            focused: {
                background: '#f8f9fa',
                border: '#f64a4a'
            },
            evenRow: {
                background: 'white'
            },
            oddRow: {
                background: 'white'
            }
        }
    });


    const grid = new Grid({
        el: document.getElementById('adjustmentGrid'),
        scrollX: true,
        scrollY: true,
        header: { height: 40 },
        bodyHeight: 500,
        rowHeight: 102,
        width: 'auto',
        contextMenu: null,
        rowHeaders: [{
                type: 'checkbox',
                header: "No.",
                width: 50,
                className:'border'
        }],
        columns: [
            {
                header: '품목코드',
                name: 'c1',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                className:'border'
                
            },
            {
                header: '품목명',
                name: 'c2',
                align: "center",
                width: 130,
                whiteSpace: 'normal'
            },
            {
                header: '규격',
                name: 'c3',
                align: "center",
                width: 120,
                whiteSpace: 'normal',
                className:'border'
            },
            {
                header: '입고단가',
                name: 'c4',
                align: "center",
                width: 140,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className:'border',
                validation: {
                    dataType: 'number'
                }
            },
            {
                header: '출고단가',
                name: 'c5',
                align: "center",
                width: 140,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className:'border',
                validation: {
                    dataType: 'number'
                }
            },
            {
                header: '출하수량',
                name: 'c6',
                align: "center",
                width: 135,
                whiteSpace: 'normal',
                editor: 'text',
                validation: {
                    dataType: 'number'
                },
                className:'border'
            },
            {
                header: '입고수량',
                name: 'c7',
                align: "center",
                width: 135,
                whiteSpace: 'normal',
                editor: 'text',
                validation: {
                    dataType: 'number',
                    min: 1,
                    max: 100
                },
                className:'border'
            },
            {
                header: '재고수량',
                name: 'c8',
                align: "center",
                width: 135,
                whiteSpace: 'normal',
                className:'border'
            },
            {
                header: '이미지',
                name: 'c9',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                className:'border',
                renderer: {
                    type: ImageRenderer
                }
            }
        ]
    	});

    	return grid;
	}

    // 그리드 설정
    const createdGrid = initGrid();

    // 샘플 데이터
    const sampleData = [
        {
			c1: 'A0000045',
            c2: '컵홀더',
            c3: '2023.01.01',
            c4: '컵홀더',
            c5: '12000',
            c6: '5',
            c7: '0',
            c8: '0',
            c9: '0'
        }
        
    ];

    // 그리드에 데이터 넣기(출력)
    createdGrid.resetData(sampleData);



/*==========================================
		재고조회과 관련된 토스트 그리드 객체와 함수 (두번째 그리드)
============================================*/

    const initGrid2 = () => {
        // 그리드 객체
        const Grid = tui.Grid;

        Grid.applyTheme('default',  {
            outline:{
            border : '#dee2e6'
        },
        cell: {
            normal: {
                border: '#dee2e6'
            },
            header: {
                background: '#f8f9fa',
                text: 'black'
            },
            focused: {
                background: '#f8f9fa',
                border: '#f64a4a'
            },
            evenRow: {
                background: 'white'
            },
            oddRow: {
                background: 'white'
            }
        }
    });


    const grid = new Grid({
        el: document.getElementById('inqueryGrid'),
        scrollX: true,
        scrollY: true,
        header: { height: 40 },
        bodyHeight: 500,
        rowHeight: 102,
        width: 'auto',
        contextMenu: null,
        rowHeaders: [{
                type: 'rowNum',
                header: "No.",
                width: 50,
                className:'border'
        }],
        columns: [
            {
                header: '품목코드',
                name: 'd1',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                className:'border'
                
            },
            {
                header: '품목명',
                name: 'd2',
                align: "center",
                width: 130,
                whiteSpace: 'normal'
            },
            {
                header: '거래처',
                name: 'd3',
                align: "center",
                width: 120,
                whiteSpace: 'normal',
                className:'border'
            },
            {
                header: '입고단가',
                name: 'd4',
                align: "center",
                width: 140,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className:'border',
                validation: {
                    dataType: 'number'
                }
            },
            {
                header: '재고현황',
                name: 'd5',
                align: "center",
                width: 140,
                whiteSpace: 'normal',
                sortable: true,
                sortingType: 'desc',
                className:'border'
            },
            {
                header: '창고명',
                name: 'd6',
                align: "center",
                width: 135,
                whiteSpace: 'normal',
                editor: 'text',
                sortable: true,
                sortingType: 'desc',
                className:'border'
            }
        ]
    });

    return grid;
}


    // 그리드 설정
    const createdGrid2 = initGrid2();

    // 샘플 데이터
    const sampleData2 = [
        {
            prodCode: 'A0000045',
            prodname: '석봉박1',
            standard: '부천',
            rUnitPrice: '8000',
            fUnitPrice: '12000',
            fQuantity: '5',
            rQuantity: '0',
            sQuantity: '100',
            image: ''
        },
        {
            prodCode: '2022-12-04',
            prodname: '석봉박1',
            standard: '부천',
            rUnitPrice: '10000',
            fUnitPrice: '15000',
            fQuantity: '6',
            rQuantity: '0',
            sQuantity: '100',
            image: ''
        },
        {
            prodCode: '2022-12-04',
            prodname: '석봉박1',
            standard: '부천',
            rUnitPrice: '12000',
            fUnitPrice: '20000',
            fQuantity: '7',
            rQuantity: '0',
            sQuantity: '100',
            image: ''
        }
        
    ];

    // 그리드에 데이터 넣기(출력)
    createdGrid2.resetData(sampleData2);





	/*============================
    	StackInquery 거래처 모달 JS
    ==============================*/
    
    // 모달 관련 JavaScript
        const warehouseModal = document.getElementById('warehouseModal')
        const tableRows = warehouseModal.querySelectorAll('tbody tr')
        let selectedRow = null

        //모달실행 시 grid refresh를 위한 코드
        document.getElementById('openWarehouseModal').addEventListener('click', function() {
            window.setTimeout(function(){
                grid3.refreshLayout();
            }, 200) 
        });

        // 행 선택 이벤트
        tableRows.forEach(row => {
            row.addEventListener('click', function() {
                if (selectedRow) {
                    selectedRow.classList.remove('selected-row')
                }
                this.classList.add('selected-row')
                selectedRow = this
            })
        })

        let grid3;
        class ButtonRenderer {
            constructor(props) {
                this.el = document.createElement('button');
                this.el.innerText = props.value;
                this.el.style.border = '1px solid gray';
                this.el.style.borderRadius ='3px';
                this.el.style.backgroundColor = 'white';
                this.el.onclick = () => {
                alert(`데이터이동 함수 필요`);
                };
            }

            getElement() {
                return this.el;
            }
        }
        const initGrid3 = () => {
            // 그리드 객체
            const Grid = tui.Grid;
            Grid.setLanguage('ko');
            
            Grid.applyTheme('default',  {
                outline:{
                border : '#dee2e6'
            },
            cell: {
                normal: {
                    border: '#dee2e6'
                },
                header: {
                    background: '#f8f9fa',
                    text: 'black'
                },
                focused: {
                    background: '#f8f9fa',
                    border: '#f64a4a'
                },
                evenRow: {
                    background: 'white'
                },
                oddRow: {
                    background: 'white'
                }
            }
        });
    
        grid = new Grid({
            el: document.getElementById('gridDiv3'),
            scrollX: true,
            scrollY: true,
            header: { height: 40 },
            bodyHeight: 500,
            width: 'auto',
            contextMenu: null,
            rowHeaders: [{
                    type: 'rowNum',
                    header: "No.",
                    width: 50,
                    className:'border'
            }],
            columns: [
                {
                    header: '거래처명',
                    name: 'c1',
                    align: "center",
                    width: 183,
                    whiteSpace: 'normal',
                    className:'border',
                    renderer: {
                        type: ButtonRenderer
                    },
                    filter: 'select'
                    
                },
                {
                    header: '대표자명',
                    name: 'c2',
                    align: "center",
                    width: 100,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                },
                {
                    header: '회사 연락처',
                    name: 'c3',
                    align: "center",
                    width: 120,
                    whiteSpace: 'normal',
                    className:'border'
                },
                {
                    header: '담당자명',
                    name: 'c4',
                    align: "center",
                    width: 110,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                },
                {
                    header: '담당자 연락처',
                    name: 'c5',
                    align: "center",
                    width: 120,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                },
                {
                    header: '종목',
                    name: 'c6',
                    align: "center",
                    width: 100,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                }
            ]
        });

        return grid;
    }

    // 그리드 설정
    const createdGrid3 = initGrid3();
    // 샘플 데이터
    const sampleData3 = [
        {
            c1: '태호물산',
            c2: '김태호',
            c3: '02-1234-5678',
            c4: '김영준',
            c5: '010-1234-1234',
            c6: '식기류 제조업',
        }
    ];

    // 그리드에 데이터 넣기(출력)
    createdGrid3.resetData(sampleData3);
    
    /*============================
    	StackInquery 창고 모달 JS
    ==============================*/
    
    
    
    /*============================
    	StackInquery 상품명 모달 JS
    ==============================*/
    
    
    
    /*============================
    	StackInquery 구매내역 모달 JS
    ==============================*/
    
    
    /*============================
    	StackInquery 판매내역 모달 JS
    ==============================*/
    
});