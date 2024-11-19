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
/*==========================================
		재고조정과 관련된 토스트 그리드 객체와 함수 (첫번째 그리드)
============================================*/
document.addEventListener("DOMContentLoaded", function () {
    
    //모든 그리드 객체에서 사용될 const Grid, 테마 혹은 헤더변경 없으면 같은 것 사용.
	const Grid = tui.Grid;
	Grid.setLanguage('ko', {
                 Filter: {
                     contains: '포함됨',
                     eq: '같음',
                     neq: '같지 않음',
                     startsWith: '시작함',
                     endsWith: '끝남',
                     greaterThan: '이후',
                     greaterThanOrEqualTo: '이후(포함)',
                     lessThan: '이전',
                     lessThanOrEqualTo: '이전(포함)'
                 },
                 DatePicker: {
                     titles: {
                         today: '오늘',
                         clear: '지우기'
                     },
                     monthsLong: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                     monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                     dayNames: ['일', '월', '화', '수', '목', '금', '토'],
                     dayNamesShort: ['일', '월', '화', '수', '목', '금', '토']
                 }
    });
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
    
    const initGrid = () => {
        // 그리드 객체

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
        const clientModal = document.getElementById('clientModal');

        //모달실행 시 grid refresh를 위한 코드
        document.getElementById('openClientModal').addEventListener('click', function() {
            window.setTimeout(function(){
                grid3.refreshLayout();
            }, 200) 
            window.setTimeout(function(){
                grid4.refreshLayout();
            }, 200)
        });

        let grid3; //모달에 적용될 그리드라서 refreshLayout() 사용을 위해 전역스코프로 변수를 선언하였음.
        
        const initGrid3 = () => {
            // 그리드 객체
    
        grid3 = new Grid({
            el: document.getElementById("clientGrid"),
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
        return grid3;
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
    // 모달 관련 JavaScript
    const warehouseModal = document.getElementById('warehouseModal')

    //모달실행 시 grid refresh를 위한 코드
    document.getElementById('openWarehouseModal').addEventListener('click', function() {
        window.setTimeout(function(){
            grid4.refreshLayout();
        }, 200) 
    });
    
    let grid4;
    const initGrid4 = () => {
		grid4 = new Grid({
            el: document.getElementById('warehouseGrid'),
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
                    header: '창고명',
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
                    header: '창고코드',
                    name: 'c2',
                    align: "center",
                    width: 183,
                    whiteSpace: 'normal',
                    className:'border'
                },
                {
                    header: '위치',
                    name: 'c3',
                    align: "center",
                    width: 184,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                },
                {
                    header: '구분',
                    name: 'c4',
                    align: "center",
                    width: 184,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                }
            ]
        });

        return grid4;
		
	}
    
    const createdGrid4 = initGrid4();

	// 샘플 데이터
	const sampleData4 = [
	    {
	        c1: '물류창고',
	        c2: 'A0000045',
	        c3: '천안아산',
	        c4: '소요량높음'
	    }
	];
	
	// 그리드에 데이터 넣기(출력)
	createdGrid4.resetData(sampleData4);
    
    /*============================
    	StackInquery 품목조회 모달 JS
    ==============================*/
    // 모달 관련 JavaScript
    var purchaseOrderModal = document.getElementById('purchaseOrderModal')
    purchaseOrderModal.addEventListener('show.bs.modal', function (event) {
        // 모달이 표시되기 전에 실행할 코드
        console.log('모달이 열립니다');
        window.setTimeout(function(){
            grid5.refreshLayout();
        }, 200) 
    })

    purchaseOrderModal.addEventListener('hidden.bs.modal', function (event) {
        // 모달이 완전히 숨겨진 후 실행할 코드
        console.log('모달이 닫혔습니다');
    })
    let grid5;
    const initGrid5 = () => {
		grid5 = new Grid({
            el: document.getElementById('itemGrid'),
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
                    header: '품목 코드',
                    name: 'c1',
                    align: "center",
                    width: 203,
                    whiteSpace: 'normal',
                    className:'border',
                    renderer: {
                        type: ButtonRenderer
                    },
                    filter: 'select'
                    
                },
                {
                    header: '품목명',
                    name: 'c2',
                    align: "center",
                    width: 203,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                }
            ]
        });

        return grid5;
		
	}
    
    const createdGrid5 = initGrid5();

	// 샘플 데이터
	const sampleData5 = [
	    {
	        c1: 'A0000045',
	        c2: '컵홀더'
	    }
	];
	
	// 그리드에 데이터 넣기(출력)
	createdGrid5.resetData(sampleData5);
    
    
    /*============================
    	StackInquery 구매내역 모달 JS
    ==============================*/
    
    
    /*============================
    	StackInquery 판매내역 모달 JS
    ==============================*/
    
});