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
 
document.addEventListener("DOMContentLoaded", function () {
        
    /*!== TOAST UI GRID refresh & 공통 설정 ==!*/
    let container = document.querySelector(".container");
    container.addEventListener("click", (e)=>{
		//그리드 refresh()
		if(e.target.classList.contains('mBtn')){
			window.setTimeout(function(){
            	clientGrid.refreshLayout();
        	}, 150)
        	window.setTimeout(function(){
            	warehouseGrid.refreshLayout();
        	}, 150)
        	window.setTimeout(function(){
            	itemGrid.refreshLayout();
        	}, 150)
		}
		
	})
	/*!!==모든 그리드 객체에서 사용될 const Grid, 테마 혹은 헤더변경 없으면 같은 것 사용. ==!!*/
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
	
	/*!== 모달 Data 정보 초기화 ==!*/
    /*!!== 거래처 모달 데이터 fetch & resetData() ==!!*/
	fetch("/stocks/client")
	.then(result=>result.json())
	.then(result=>{
		gridDataArr = [];
		result.forEach(ele=>{
			let dataRow = {};
			dataRow.clientName = ele.clientName;
			dataRow.ceoName = ele.ceoName;
			dataRow.companyTel = ele.companyTel;
			dataRow.employeeName = ele.employeeName;
			dataRow.employeeTel = ele.employeeTel;
			dataRow.event = ele.event;
			gridDataArr.push(dataRow);
		})
		clientGrid.resetData(gridDataArr);
	})
	
	/*!!== 창고 모달 데이터 fetch & restData() ==!!*/
	fetch("/whList") //혁태꺼
	.then(result => result.json())
	.then(result => {
		gridDataArr = [];
		result.forEach(ele=>{
			let dataRow = {};
			dataRow.whName = ele.whName;
			dataRow.whCode = ele.whCode;
			dataRow.whPlace = ele.whPlace;
			dataRow.whType = ele.whType;
			gridDataArr.push(dataRow);
		})          
		warehouseGrid.resetData(gridDataArr);
	})
	
	/*!!== 품목 모달 데이터 fetch & restData() ==!!*/
	fetch("/stocks/item")
	.then(result => result.json())
	.then(result => {
		
		gridDataArr = [];
		result.forEach(ele=>{
			let dataRow = {}
			dataRow.itemCode = ele.itemCode;
			dataRow.itemName = ele.itemName;
			gridDataArr.push(dataRow);
		})
		itemGrid.resetData(gridDataArr)
	})
    
    //#region 재고조회 페이지 조회정보 그리드
    /*========================
		   재고조회 토스트 그리드
	  ========================*/
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

	//#region 거래처 모달
	/*============================
    	StackInquery 거래처 모달 JS
    ==============================*/
    
    // 모달 관련 JavaScript
        
    let clientGrid = new Grid({
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
                    name: 'clientName',
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
                    name: 'ceoName',
                    align: "center",
                    width: 100,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                },
                {
                    header: '회사 연락처',
                    name: 'companyTel',
                    align: "center",
                    width: 120,
                    whiteSpace: 'normal',
                    className:'border'
                },
                {
                    header: '담당자명',
                    name: 'employeeName',
                    align: "center",
                    width: 110,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                },
                {
                    header: '담당자 연락처',
                    name: 'employeeTel',
                    align: "center",
                    width: 120,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                },
                {
                    header: '종목',
                    name: 'event',
                    align: "center",
                    width: 100,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                }
            ]
        });
 	//데이터 이동 이벤트함수
    clientGrid.on('click',function(ev){
		let rowKeyNum;
		if (ev.columnName == 'clientName'){
			rowKeyNum = ev.rowKey;	
			let inputTag = document.getElementById('clientInput');
			inputTag.value = '';		
			inputTag.value = clientGrid.getValue(rowKeyNum, 'clientName');													
		}
	})
	
	//#endregion 거래처 모달
    
    //#region 창고 모달
    /*============================
    	StackInquery 창고 모달 JS
    ==============================*/
	let warehouseGrid = new Grid({
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
                    name: 'whName',
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
                    name: 'whCode',
                    align: "center",
                    width: 183,
                    whiteSpace: 'normal',
                    className:'border'
                },
                {
                    header: '위치',
                    name: 'whPlace',
                    align: "center",
                    width: 184,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                },
                {
                    header: '구분',
                    name: 'whType',
                    align: "center",
                    width: 184,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                }
            ]
        });
    
    //데이터이동 이벤트 함수
    warehouseGrid.on('click',function(ev){
		let rowKeyNum;
		if (ev.columnName == 'whName'){
			rowKeyNum = ev.rowKey;	
			let inputTag = document.getElementById('whInput');
			inputTag.value = '';		
			inputTag.value = warehouseGrid.getValue(rowKeyNum, 'whName');										
		}
	})
    //#endregion 창고모달
    
    //#region 품목조회 모달
    /*============================
    	StackInquery 품목조회 모달 JS
    ==============================*/
    // 모달 관련 JavaScript
    
    
	let	itemGrid = new Grid({
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
                    name: 'itemCode',
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
                    name: 'itemName',
                    align: "center",
                    width: 203,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                }
            ]
        });
    
    itemGrid.on('click',function(ev){
		let rowKeyNum;
		if (ev.columnName == 'itemCode'){
			rowKeyNum = ev.rowKey;		
			let inputTag = document.getElementById('itemInput');
			inputTag.value = '';			
			inputTag.value = itemGrid.getValue(rowKeyNum, 'itemName');							
		
		}
	})        
    //#endregion 품목조회 모달
       
}); //End Point