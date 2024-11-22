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
	
	//구매현황, 출하지시서 모달 외의 모달에서 사용되는 버튼 렌더러
	class ButtonRenderer {
            constructor(props) {
                this.el = document.createElement('button');
                this.el.innerText = props.value;
                this.el.style.border = '1px solid gray';
                this.el.style.borderRadius ='3px';
                this.el.style.backgroundColor = 'white';
                this.el.classList.add('gridBtn')
                /*this.el.onclick = () => {
                	console.log(this.el.innerText);             
                };*/
                this.el.setAttribute("data-bs-dismiss", "modal");              
            }
            getElement() {
                return this.el;
            }
    }
    
    //숫자타입 인풋 렌더러 (석진제작)   -> 템플릿 공통코드로 병합 
  	//숫자있는 체크박스 (석진제작)	    -> 템플릿 공통코드로 병합
  
/*==========================================
		재고조정과 관련된 토스트 그리드 객체와 함수 (첫번째 그리드)
============================================*/
document.addEventListener("DOMContentLoaded", function () {
    
    //모든 그리드 객체에서 사용될 const Grid, 테마 혹은 헤더변경 없으면 같은 것 사용.
	const Grid = tui.Grid;
	/*const filterOptions = {
	  type: 'text', // 필터 타입 (text, number, date 등)
	  operatorLabel: {
	    // 조건 한글화
	    Select All: '같음',
	    notEquals: '같지 않음',
	    contains: '포함',
	    startsWith: '시작 문자',
	    endsWith: '끝 문자',
	    lessThan: '보다 작음',
	    greaterThan: '보다 큼',
	  }
	};
	const filterOptions = {
		type: "text",
		operatorLabel: {
			 contains: '포함됨',
                     eq: '같음',
                     neq: '같지 않음',
                     startsWith: '시작함',
                     endsWith: '끝남',
                     greaterThan: '이후',
                     greaterThanOrEqualTo: '이후(포함)',
                     lessThan: '이전',
                     lessThanOrEqualTo: '이전(포함)'
		}
	}*/
    
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
        
        el: document.getElementById('inqueryGrid'),
	        scrollX: true,
	        scrollY: true,
	        header: { height: 40 },
	        bodyHeight: 450,
	        rowHeight: 40,
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
	                width: 200,
	                whiteSpace: 'normal',
	                className:'border'
	                
	            },
	            {
	                header: '품목명',
	                name: 'd2',
	                align: "center",
	                width: 240,
	                whiteSpace: 'normal',
	                filter: 'select'
	            },
	            {
	                header: '거래처',
	                name: 'd3',
	                align: "center",
	                width: 200,
	                whiteSpace: 'normal',
	                className:'border',
	                filter: 'select'
	            },
	            {
	                header: '입고단가',
	                name: 'd4',
	                align: "center",
	                width: 100,
	                whiteSpace: 'normal',
	                sortable: true,
	                sortingType: 'desc',
	                className:'border'
	            },
	            {
	                header: '출고단가',
	                name: 'd5',
	                align: "center",
	                width: 100,
	                whiteSpace: 'normal',
	                sortable: true,
	                sortingType: 'desc',
	                className:'border'
	            },
	            {
	                header: '재고현황',
	                name: 'd6',
	                align: "center",
	                width: 200,
	                whiteSpace: 'normal',
	                className:'border'
	            },
	            {
	                header: '창고명',
	                name: 'd7',
	                align: "center",
	                width: 200,
	                whiteSpace: 'normal',
	                className:'border',
	                filter: 'select'
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
			d1: 'A0000045',
            d2: '컵홀더',
            d3: '태호물산',
            d4: '100',
            d5: '120',
            d6: '10000',
            d7: '천안아산'
        }
        
    ];

    // 그리드에 데이터 넣기(출력)
    createdGrid.resetData(sampleData);


	/*============================
    	StackInquery 거래처 모달 JS
    ==============================*/
    
    // 모달 관련 JavaScript
        //const clientModal = document.getElementById('clientModal');

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
    
    grid3.on('click',function(ev){
		let rowKeyNum;
		if (ev.columnName == 'c1'){
			rowKeyNum = ev.rowKey;	
			let inputTag = document.getElementById('clientInput');
			inputTag.value = '';		
			inputTag.value = grid3.getValue(rowKeyNum, 'c1');											
			
		}
	})
    
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
    
    grid4.on('click',function(ev){
		let rowKeyNum;
		if (ev.columnName == 'c1'){
			rowKeyNum = ev.rowKey;	
			let inputTag = document.getElementById('whInput');
			inputTag.value = '';		
			inputTag.value = grid4.getValue(rowKeyNum, 'c1');									
			
		}
	})
    
    
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
    
    grid5.on('click',function(ev){
		let rowKeyNum;
		if (ev.columnName == 'c1'){
			rowKeyNum = ev.rowKey;		
			let inputTag = document.getElementById('itemInput');
			inputTag.value = '';			
			inputTag.value = grid5.getValue(rowKeyNum, 'c2');							
		
		}
	})        
    
       
}); //End Point