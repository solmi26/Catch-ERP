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
    let modalBtn = document.querySelectorAll(".mBtn");
    for(btn of modalBtn){
    	btn.addEventListener("click",()=>{
			//그리드 refresh()
			window.setTimeout(function(){
            	clientGrid.refreshLayout();
            	itemGrid.refreshLayout();
        	}, 200);
		})
	}
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
	
	
	/*!!== 모달정보 초기화 ==!!*/
	modalInfoInitailize();
	
    //#region 재고조회 페이지 조회정보 그리드
    /*========================
		   재고조회 토스트 그리드
	  ========================*/

    let stockInqueryGrid = new Grid({      
        el: document.getElementById('inqueryGrid'),
	        scrollX: true,
	        scrollY: false,
	        pageOptions: {
		      useClient: true,
		      perPage: 12,
		    },
	        header: { height: 40 },
	        bodyHeight: 600,
	        rowHeight: 40,
	        width: '100%',
	        contextMenu: null,
	       rowHeaders: [{
	                type: 'rowNum',
	                header: "No.",
	                width: 50,
	                className:'border'
	        }],
	        columns: [
	            {
	                header: '계약번호',
	                name: 'conNo',
	                align: "center",
	                width: 250,
	                whiteSpace: 'normal',
	                className:'border'
	                
	            },
	            {
	                header: '품목코드',
	                name: 'itemCode',
	                align: "center",
	                width: 200,
	                whiteSpace: 'normal',
	                filter: 'select'
	            },
	            {
	                header: '품목명',
	                name: 'itemName',
	                align: "center",
	                width: 200,
	                whiteSpace: 'normal',
	                className:'border',
	                filter: 'select'
	            },
	            {
	                header: '거래처코드',
	                name: 'clientCode',
	                align: "center",
	                width: 200,
	                whiteSpace: 'normal',
	                className:'border'
	            },{
	                header: '거래처명',
	                name: 'clientName',
	                align: "center",
	                width: 200,
	                whiteSpace: 'normal',
	                className:'border'
	            },
	            {
	                header: '입고단가', //공급가액
	                name: 'price',
	                align: "center",
	                width: 150,
	                whiteSpace: 'normal',
	                sortable: true,
	                sortingType: 'desc',
	                className:'border',
	                formatter: function (e) {
			          const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
			          return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
			        },
	            }
        ]
    	});
		
		//제품 조건 조회
		
		let inqueryBtn = document.getElementById('inqueryBtn');
		inqueryBtn.addEventListener("click", function(){
			let data = $('#searchForm').serialize();
			fetch(`/stocks/itemInfo?${data}`)
			.then(result=> result.json())
			.then(result=> {
				let dataArr = [];
				result.forEach(ele=>{
					let data = {};
					data.conNo = ele.conNo;
					data.itemCode = ele.itemCode;
					data.itemName = ele.itemName;
					data.clientCode = ele.clientCode;
					data.clientName = ele.clientName;
					data.price = ele.price;
					dataArr.push(data);	
				})
				stockInqueryGrid.resetData(dataArr);
			})
			.catch(ele=> `제품조회 실패! + ${ele}`)
		})


	//#region 거래처 모달
	/*============================
    	StackInquery 거래처 모달 JS
    ==============================*/    
    let clientGrid = new Grid({
            el: document.getElementById("clientGrid"),
            scrollX: true,
            scrollY: true,
            pageOptions: {
		      useClient: true,
		      perPage: 12,
		    },
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

    //#region 품목조회 모달
    /*============================
    	StackInquery 품목조회 모달 JS
    ==============================*/
    // 모달 관련 JavaScript
    
    
	let	itemGrid = new Grid({
            el: document.getElementById('itemGrid'),
            scrollX: true,
            scrollY: true,
            pageOptions: {
		      useClient: true,
		      perPage: 12,
		    },
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

	
	/*!== 모달 Data 정보 초기화 ==!*/
	function modalInfoInitailize(){
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
		.catch(err=> `거래처 모달 fetch 실패! ${err}`);
		
		/*!!== 창고 모달 데이터 fetch & restData() ==!!*/
		/*fetch("/whList") //혁태꺼
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
		})*/
		
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
		.catch(err=> `품목 모달 fetch 실패! ${err}`);
    }
}); //End Point