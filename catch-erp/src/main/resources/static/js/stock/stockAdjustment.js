/**
 * (stackInquery.html) - 재고조회조정 페이지에 적용되는 JS
 */
 //#region 토스트 렌더러
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
    
    
   
  //숫자타입 인풋 렌더러 (석진제작) => 공통코드파일에 병합
  //숫자있는 체크박스 (석진제작) => 공통코드파일에 병합
  
//#endregion  
let grid6 = null; 
  
/*================================================================
		재고조정과 관련된 토스트 그리드 객체와 함수 (첫번째 그리드)
==================================================================*/
document.addEventListener("DOMContentLoaded", function () {
    
    //#region 재고조정페이지
    //모든 그리드 객체에서 사용될 const Grid, 테마 혹은 헤더변경 없으면 같은 것 사용.
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
            }
        }
    });
    
    // 조정 페이지 그리드 객체     	
    let grid = new Grid({
        el: document.getElementById('adjustmentGrid'),
        scrollX: false,
        scrollY: true,
         row: {
		    even: {
		      background: '#f3ffe3'
		    },
		    hover: {
		      background: '#ccc'
		    }
		  },
        rowHeaders: [
	          {
	            type: 'checkbox',
	            header: `
	              <span class="custom-input">
	              <input type="checkbox" id="all-checkbox" class="hidden-input" name="_checked" />
	            	<label for="all-checkbox" class="checkbox selectCheck">✔</label>
	          	</span>
	          `,
	            renderer: {
	              type: gridCheckbox
	            }
	          }
	    ],
        header: { height: 40 },
        bodyHeight: 500,
        rowHeight: 40,
        //width: 'auto',
        contextMenu: null,
        columns: [
            {
                header: '구매/판매내역 No.',
                name: 'c1',
                align: "center",
                //width: 170,
                whiteSpace: 'normal',
                className:'border'               
            },
            {
                header: '품목코드',
                name: 'c2',
                align: "center",
                //width: 150,
                whiteSpace: 'normal',
                className:'border'              
            },
            {
                header: '품목명',
                name: 'c3',
                align: "center",
                //width: 170,
                whiteSpace: 'normal'
            },
            {
                header: '재고조정사유',
                name: 'c4',
                align: "center",
                //width: 150,
                whiteSpace: 'normal',
                className:'border',
                formatter: ({ value }) => {
		          // 값에 따라 다른 색상 스타일 적용
		          let colorClass = "";
		          if (value === "상품 입고") {
		            colorClass = "r1";
		          } else if (value === "상품 출고") {
		            colorClass = "r2";
		 		  }
                      return `<span class="${colorClass}">${value}</span>`;
		        },              
            },           
            {
                header: '지시수량',
                name: 'c5',
                align: "center",
                //width: 100,
                whiteSpace: 'normal',                
                className:'border'
            },
            {
                header:  " ",
                name: 'c6',
                align: "center",
                //width: 85,
                whiteSpace: 'normal',
                editor: 'text',
                validation: {
                    dataType: 'number',
                    min: 1,
                   	max: 99999999
                },                         
                className:'border',
            },
            {
                header: '입고수량',
                name: 'c7',
                align: "center",
                //width: 85,
                whiteSpace: 'normal',
                editor: 'text',
                validation: {
                    dataType: 'number',
                    min: 1,
                    max: 99999999
                },
                className:'border'
            },
            {
                header: '재고수량',
                name: 'c8',
                align: "center",
                //width: 150,
                whiteSpace: 'normal',
                className:'border'
            }
            ,
            {
	             header: '창고명',
	             name: 'c11',
	             align: "center",
	             //width: 150,
	             whiteSpace: 'normal',
	             className:'border'
             },
	           {
	            header: '사원명',
	            name: 'c9',
	            align: "center",
	            //width: 135,
	            whiteSpace: 'normal',
	            className:'border'
            },
            {
                header: '사원 코드',
                name: 'c10',
                align: "center",
                //width: 135,
                whiteSpace: 'normal',
                className:'border'
            }       
        ]
    });
    
    
	let stocksStatusColumn = document.querySelector("#adjustmentGrid > div > div.tui-grid-content-area > div.tui-grid-rside-area > div.tui-grid-header-area > table > tbody > tr > th:nth-child(6)")
	stocksStatusColumn.setAttribute("title","동일 제품의 출하 총수량이 전체재고를 초과할 수 없습니다.");	
	
	grid.on('onGridMounted',function(){
		let redStar = document.querySelector("#adjustmentGrid > div > div.tui-grid-content-area > div.tui-grid-rside-area > div.tui-grid-header-area > table > tbody > tr > th:nth-child(6)")
		redStar.innerHTML = `<span>출하수량</span><span style="color:red"> *</span>`
	})
	
	
		
	
	
   
    
    //#endregion 사원조회모달

	//#region 거래처조회모달
	/*============================
    	StackAdjust 거래처 모달 JS
    ==============================*/
    
    // 모달 관련 JavaScript

        //모달실행 시 grid refresh를 위한 코드
        document.getElementById('openClientModal').addEventListener('click', function() {
            window.setTimeout(function(){
                grid3.refreshLayout();
            }, 200) 
        });

        //모달에 적용될 그리드라서 refreshLayout() 사용을 위해 전역스코프로 변수를 선언하였음.    
        let grid3 = new Grid({
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
		    columnOptions: {
			    frozenCount: 2, 
			    frozenBorderWidth: 1
			},
            columns: [
				{
                    header: '거래처명',
                    name: 'c1',
                    align: "center",
                    width: 183,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select',
                    renderer: {
                        type: ButtonRenderer
                    }
                },
				{
                    header: '거래처코드',
                    name: 'c7',
                    align: "center",
                    width: 100,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select',
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
       
    grid3.on('click',function(ev){
		let rowKeyNum;
		if (ev.columnName == 'c1'){
			rowKeyNum = ev.rowKey;		
			let inputTag = document.getElementById('clientInput');
			let inputTag2 = document.getElementById('clientInput2')
			inputTag.value = '';		
			inputTag.value = grid3.getValue(rowKeyNum, 'c1');
			inputTag2.value = grid3.getValue(rowKeyNum, 'c7'); //거래처코드가 들어갈 hidden input									
			
		}
	})   	
	
	// 거래처모달 그리드에 데이터 넣기(출력)
	fetch("/stocks/client")
	.then(result => result.json())
	.then(result => {
		let dataArr = [];
		result.forEach(ele=>{
			let dataRow ={};
			dataRow.c1 = ele.clientName;
			dataRow.c2 = ele.ceoName;
			dataRow.c3 = ele.companyTel;
			dataRow.c4 = ele.employeeName;
			dataRow.c5 = ele.employeeTel;
			dataRow.c6 = ele.event;
			dataRow.c7 = ele.clientCode;
			dataArr.push(dataRow)
		})
		grid3.resetData(dataArr);
		
	})
	//#endregion 거래처조회모달
	
	//#region 품목조회모달
    /*============================
    	StackAdjust 품목조회 모달 JS
    ==============================*/
    // 모달 관련 JavaScript
    var purchaseOrderModal = document.getElementById('purchaseOrderModal')
    purchaseOrderModal.addEventListener('show.bs.modal', function () {
        // 모달이 표시되기 전에 실행할 코드
        window.setTimeout(function(){
            grid5.refreshLayout();
        }, 200) 
    })

    purchaseOrderModal.addEventListener('hidden.bs.modal', function () {
        // 모달이 완전히 숨겨진 후 실행할 코드
        // 현재는없음
    })

	let	grid5 = new Grid({
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
                    name: 'c1',
                    align: "center",
                    width: 136,
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
                    width: 134,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                },
                {
                    header: '거래처',
                    name: 'c3',
                    align: "center",
                    width: 134,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                }
            ]
        });

    
    grid5.on('click',function(ev){
		let rowKeyNum;
		if (ev.columnName == 'c1'){
			rowKeyNum = ev.rowKey;		
			let inputTag = document.getElementById('itemInput');
			let inputTag2 = document.getElementById('itemInput2');
			inputTag.value = '';			
			inputTag.value = grid5.getValue(rowKeyNum, 'c2');
			inputTag2.value = grid5.getValue(rowKeyNum, 'c1'); //품목코드가 들어갈 hidden input									
		}
	})   
	
	// 품목조회 그리드에 데이터 넣기(출력)
	fetch("/stocks/item")
	.then(result=> result.json())
	.then(result=>{
		let dataArr = [];
		result.forEach(ele=>{
			let dataRow ={};
			dataRow.c1 = ele.itemCode;
			dataRow.c2 = ele.itemName;
			dataRow.c3 = ele.clientName;
			dataArr.push(dataRow)
		})
		grid5.resetData(dataArr);
	})
	
	//#endregion 품목조회모달
	
	//#region 구매내역모달 
    /*============================
    	StackAdjust 구매내역 모달 JS
    ==============================*/
    var purchaseOrderModal = document.getElementById('purchaseOrderModal2')
	
	purchaseOrderModal.addEventListener('show.bs.modal', function () {
	    // 모달이 표시되기 전에 실행할 코드
	    window.setTimeout(function(){
	        grid6.refreshLayout();
	    }, 200) 
	})
    
    
			 grid6 = new Grid({
		    el: document.getElementById('purchaseGrid'),
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
		     rowHeaders: [
		          {
		            type: 'checkbox',
		            header: `
		              <span class="custom-input">
		              <input type="checkbox" id="all-checkbox2" class="hidden-input" name="_checked" />
		            	<label for="all-checkbox2" class="checkbox selectCheck">✔</label>
		          	</span>
		          `,
		            renderer: {
		              type: gridCheckbox
		            }
		          }
		    ],
		    columnOptions: {
			    frozenCount: 2, 
			    frozenBorderWidth: 1 
			},
		    columns: [
		        {
		            header: '구매전표 No.',
		            name: 'c1',
		            align: "center",
		            width: 120,
		            whiteSpace: 'normal',
		            className:'border',	
		            filter: 'select',	            
		            
		        },
		        {
		            header: '구매내역 No.',
		            name: 'c2',
		            align: "center",
		            width: 120,
		            whiteSpace: 'normal',
		            filter: 'select',		            
		        },
		        {
		            header: '일자',
		            name: 'c3',
		            align: "center",
		            width: 90,
		            whiteSpace: 'normal',
		            className:'border',
		            filter: {
		                type: 'date',
		                options: {
		                    format: 'yyyy-MM-dd',
		                    language: 'ko'
		                },
		                showClearBtn: true
		            }
		        },
		        {
		            header: '사원명',
		            name: 'c11',
		            align: "center",
		            width: 150,
		            whiteSpace: 'normal',
		            className:'border',
		            filter: 'select',
		        },
		        {
		            header: '사원 코드',
		            name: 'c12',
		            align: "center",
		            width: 100,
		            whiteSpace: 'normal',
		            className:'border',
		            filter: 'select',
		        },
		        {
		            header: '품목코드',
		            name: 'c4',
		            align: "center",
		            width: 100,
		            whiteSpace: 'normal',
		            className:'border',
		            filter: 'select',
		        }
		        ,
		        {
		            header: '품목명',
		            name: 'c5',
		            align: "center",
		            width: 100,
		            whiteSpace: 'normal',
		            className:'border',
		            filter: 'select',
		        },
		        {
		            header: '거래처명',
		            name: 'c6',
		            align: "center",
		            width: 140,
		            whiteSpace: 'normal',
		            className:'border',
		            filter: 'select',
		        },
		        {
		            header: '거래처 코드',
		            name: 'c9',
		            align: "center",
		            width: 140,
		            whiteSpace: 'normal',
		            className:'border'
		        },
		        {
		            header: '미완료수량',
		            name: 'c7',
		            align: "right",
		            width: 100,
		            whiteSpace: 'normal',
		            className:'border'
		        },
		        {
		            header: '입고단가',
		            name: 'c8',
		            align: "right",
		            width: 100,
		            whiteSpace: 'normal',
		            className:'border',
			        formatter: function (e) {
			          const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
			          return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
			        },
		        },
		        {
		            header: '재고',
		            name: 'c10',
		            align: "right",
		            width: 70,
		            whiteSpace: 'normal',
		            className:'border',		            
		        },
		        {
		            header: '창고명',
		            name: 'c13',
		            align: "center",
		            width: 70,
		            whiteSpace: 'normal',
		            className:'border',		            
		        },	         
		    ]
		});
	
	//조회조건에 맞는 전표No. 불러오기 & 수동입력시 hidden input.value 초기화 => 구매내역,판매내역 공통
	let clientInputTag = document.getElementById('clientInput')
	clientInputTag.addEventListener('change', function(){
		inputTag2 = document.getElementById('clientInput2');
		inputTag2.value = '';
	})
	
	let humanInputTag = document.getElementById('humanInput')
	humanInputTag.addEventListener('change', function(){
		inputTag2 = document.getElementById('humanInput2');
		inputTag2.value = '';
	})
	
	let itemInputTag = document.getElementById('itemInput')
	itemInputTag.addEventListener('change', function(){
		inputTag2 = document.getElementById('itemInput2');
		inputTag2.value = '';
	})
	
	//구매내역조회 버튼 클릭시 검색조건에 맞는 데이터 구매내역 그리드에 출력
	let purchaseOrderBtn = document.getElementById('purchaseOrderBtn');
	purchaseOrderBtn.addEventListener("click", function(){
		let clientCode = document.getElementById("clientInput2").value;
		let clientName = document.getElementById("clientInput").value;
		let employeeCode = document.getElementById("humanInput2").value;
		let employeeName = document.getElementById("humanInput").value;	 
		let itemCode = document.getElementById("itemInput2").value;
		let itemName = document.getElementById("itemInput").value;
		let startDate = document.getElementById("startDate").value;
		let endDate = document.getElementById("endDate").value;
		let client; 
		let employee;
		let item;
		let type1;
		let type2; 
		let type3;
		if(clientCode != "") {
			client = clientCode;
			type1 = 'code';
		} else {
			client = clientName == "" ? 'all' : clientName;			
			type1 = 'name';
		}
		
		if(employeeCode != ""){
			employee = employeeCode;
			type2 = 'code';
		} else {
			employee = employeeName == "" ? 'all' : employeeName;			
			type2 = 'name';
		}
		
		if(itemCode != ""){
			item = itemCode;
			type3 = 'code';
		} else {
			item = itemName == "" ? 'all' : itemName;			
			type3 = 'name';
		}
		startDate = startDate == "" ? 'noDate' : startDate;
		endDate = endDate == "" ? 'noDate' : endDate;
		
		//거래처, 사원, 입고예정일자, 품목을 조건으로 전표번호 리스트 불러옴
		fetch(`/stocks/purchaseChitNo/${type1}/${type2}/${type3}/${client}/${employee}/${item}/${startDate}/${endDate}`)
		.then(result => {			
			return result.json()		
		})
		.then(result => {
			let arr = [];
			result.forEach(ele=>{
				let data = {};
				data.c1 = ele.purcslipNo;
				data.c2 = String(ele.purNo);
				data.c3 = ele.restockingDate;
				data.c4 = ele.itemCode;
				data.c5 = ele.itemName;
				data.c6 = ele.clientName;
				data.c7 = String(ele.incompleteQuantity);
				data.c8 = String(ele.restockingPrice);
				data.c9 = ele.clientCode;
				data.c10 = String(ele.currentQuantity);
				data.c11 = ele.employeeName;
				data.c12 = ele.employeeCode;
				data.c13 = ele.whName;
				arr.push(data);			
			})
			// 그리드에 데이터 넣기(출력)
					
			let purchaseFilteredData = exceptExitingRows(arr);
			grid6.resetData(purchaseFilteredData);	
		})
		.catch(error=> {console.log("구매내역 조회결과없습니다." + error)})
				
				
	})
	
	//엑셀다운버튼 이벤트추가
	let purcExcelBtn = document.getElementById("purcExcelBtn");
	purcExcelBtn.addEventListener("click",function(){
		saveExcel(grid6);
	})
	
	
	
	//#endregion 구매내역모달
	
	
	//#region 출하지시내역 모달
    /*============================
    	StackAdjust 출하지시내역 모달 JS
    ==============================*/
    
    var salesOrderModal = document.getElementById('salesOrderModal')

	salesOrderModal.addEventListener('show.bs.modal', function (event) {
	    // 모달이 표시되기 전에 실행할 코드
	    window.setTimeout(function(){
	        grid7.refreshLayout();
	    }, 200) 
	})
    
	let grid7 = new Grid({
		    el: document.getElementById('salesGrid'),
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
		    rowHeaders: [
		          {
		            type: 'checkbox',
		            header: `
		              <span class="custom-input">
		              <input type="checkbox" id="all-checkbox3" class="hidden-input" name="_checked" />
		            	<label for="all-checkbox3" class="checkbox selectCheck">✔</label>
		          	</span>
		          `,
		            renderer: {
		              type: gridCheckbox
		            }
		          }
		    ],
		    columnOptions: {
			    frozenCount: 2, 
			    frozenBorderWidth: 1 
			},
		    columns: [
		        {
		            header: '판매전표 No.',
		            name: 'c1',
		            align: "center",
		            width: 120,
		            whiteSpace: 'normal',
		            className:'border',
		            filter: 'select',	            
		        },
		        {
		            header: '판매내역 No.',
		            name: 'c2',
		            align: "center",
		            width: 120,
		            whiteSpace: 'normal',
		            filter: 'select',	            
		        },
		        {
		            header: '일자',
		            name: 'c3',
		            align: "center",
		            width: 90,
		            whiteSpace: 'normal',
		            className:'border',
		            filter: {
		                type: 'date',
		                options: {
		                    format: 'yyyy-MM-dd',
		                    language: 'ko'
		                },
		                showClearBtn: true
		            }
		        },	        
		        {
		            header: '사원명',
		            name: 'c11',
		            align: "center",
		            width: 150,
		            whiteSpace: 'normal',
		            className:'border',
		            filter: 'select',
		        },
		        {
		            header: '사원 코드',
		            name: 'c12',
		            align: "center",
		            width: 100,
		            whiteSpace: 'normal',
		            className:'border',
		            filter: 'select',
		        },
		        {
		            header: '품목코드',
		            name: 'c4',
		            align: "center",
		            width: 100,
		            whiteSpace: 'normal',
		            className:'border',
		            filter: 'select',
		        }
		        ,
		        {
		            header: '품목명',
		            name: 'c5',
		            align: "center",
		            width: 100,
		            whiteSpace: 'normal',
		            className:'border',
		            filter: 'select',
		        },
		        {
		            header: '거래처명',
		            name: 'c6',
		            align: "center",
		            width: 140,
		            whiteSpace: 'normal',
		            className:'border',
		            filter: 'select',
		        },
		        {
		            header: '거래처 코드',
		            name: 'c9',
		            align: "center",
		            width: 140,
		            whiteSpace: 'normal',
		            className:'border'
		        },
		        {
		            header: '미완료수량',
		            name: 'c7',
		            align: "right",
		            width: 100,
		            whiteSpace: 'normal',
		            className:'border'
		        },
		        {
		            header: '출고단가',
		            name: 'c8',
		            align: "right",
		            width: 100,
		            whiteSpace: 'normal',
		            className:'border',
		            formatter: function (e) {
			          const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
			          return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
			        },
		        },
		        {
		            header: '재고',
		            name: 'c10',
		            align: "right",
		            width: 70,
		            whiteSpace: 'normal',
		            className:'border',
		        },
		        {
		            header: '창고명',
		            name: 'c13',
		            align: "center",
		            width: 70,
		            whiteSpace: 'normal',
		            className:'border',
		        }
		    ]
		});
	
	
	// 그리드에 데이터 넣기(출력)
	//거래처, 사원, 입고예정일자, 품목을 조건으로 전표번호 리스트 불러옴
    let salesOrderBtn = document.getElementById('salesOrderBtn');
	salesOrderBtn.addEventListener("click", function(){
		let data = $('#searchForm').serialize();
		fetch(`/stocks/salesChitNo?${data}`)
		.then(result=> result.json())
		.then(result=> {
			let dataArr = [];
			result.forEach(ele=>{
				let data = {};
				data.c1 = ele.saleslipNo;
				data.c2 = String(ele.salesNo);
				data.c3 = ele.deliveryDate;
				data.c4 = ele.itemCode;
				data.c5 = ele.itemName;
				data.c6 = ele.clientName;
				data.c7 = String(ele.incompleteQuantity);
				data.c8 = String(ele.deliveryPrice);
				data.c9 = ele.clientCode;
				data.c10 = String(ele.currentQuantity);
				data.c11 = ele.employeeName;
				data.c12 = ele.employeeCode;
				data.c13 = ele.whName;
				dataArr.push(data);
			})					
			let salesFilteredData = exceptExitingRows(dataArr);
			grid7.resetData(salesFilteredData);
		})
		
	})
    //#endregion 출하지시모달
    
    //엑셀다운버튼 이벤트추가
	let salesExcelBtn = document.getElementById("salesExcelBtn");
	salesExcelBtn.addEventListener("click",function(){
		saveExcel(grid7);
	})
    
    //#region 재고조정보고서
    /*================================
    	StackAdjust 재고조정보고서 모달 JS
    ==================================*/
    
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[title]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });  

    document.getElementById('pdfButton').addEventListener('click', function() {
        const element = document.getElementById('reportContent');
        html2canvas(element).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jspdf.jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            let adjustNo = "_" + document.getElementById("adjustNo").innerHTML;
            pdf.save(`재고조정보고서${adjustNo}.pdf`);
        });
    });
          
    //재고조정 버튼 마우스오버
    let overHandleCheck = false; // 출고수량의 재고초과 체크
    let reportBtn = document.getElementById("reportBtn");
    reportBtn.addEventListener("mouseover",function(){
		grid.blur(); //조정버튼에 마우스 올라가면 자동으로 페이지내 그리드 blur() 처리
		if(grid.getRowCount()<1){		
			reportBtn.removeAttribute("data-bs-toggle");	
		}
		if(grid.getRowCount()>0){
			reportBtn.setAttribute("data-bs-toggle","modal")
		}
		let pageGrid = grid.getData();	
				
		let itemCodeArr = []; //페이지 그리드에 존재하는 행들의 itemCode모음
		pageGrid.forEach(ele=>{
						 
			if(ele.c4 == '상품 출고'){ //1. 출하수량이 숫자가 아니거나 수량이 1보다작은경우 2. 출하수량이 재고수량보다 많은경우 3. 출하수량이 지시수량보다 많은경우 
				if(isNaN(Number(ele.c6)) || Number(ele.c6) < 1 || Number(ele.c6) > Number(ele.c8) 
				|| Number(ele.c6) > Number(ele.c5) ){
					reportBtn.removeAttribute("data-bs-toggle"); //출고수량을 숫자가 아니거나 1미만인 상태에서 재고조정을 누르는 경우 모달띄우는 부트스트랩 클래스제거
				}
				itemCodeArr.push(ele.c2); //페이지에 있는 출고 row들의 품목코드 모으기!
			}
			if(ele.c4 == '상품 입고'){// 1. 입고수량이 숫자가 아니거나 수량이 1보다작은경우 2. 입고수량이 지시수량보다 많은경우
				if(isNaN(Number(ele.c7)) || Number(ele.c7) < 1 || Number(ele.c7) > Number(ele.c5)){ //입고수량을 숫자가 아니거나 1미만인 상태에서 재고조정을 누르는 경우 모달띄우는 부트스트랩 클래스제거
					reportBtn.removeAttribute("data-bs-toggle");					
				}
			}
			
		})	
		
		//페이지 그리드의 항목별 출하수량과 재고수량의 유효성검사를 위한부분 	
		overHandleCheck = false;
			//상품 출고 행들 중 중복제거
		let filteredItemCodeArr = itemCodeArr.filter((ele, index)=>{
			return itemCodeArr.indexOf(ele) === index;
		})
		//출고하는 품목들 중에서 같은 품목에 대해 출고수량의 합이 재고수량보다 많은경우 모달호출 클래스제거
		filteredItemCodeArr.forEach(ele =>{
			let total = 0;
			let stock = 0;
			pageGrid.forEach(ele2=>{
				let checking = ele2.c2 = ele ? parseInt(ele2.c6) : 0;
				total += checking;
				stock = ele2.c2 = ele ? parseInt(ele2.c8) : 0;
			})
			overHandleCheck = stock < total ? true : false; 
		})
		if(overHandleCheck){
			reportBtn.removeAttribute("data-bs-toggle");;
		}
	})   
	
    let adjustTargetList = []; //이정보는 재고조정에 사용될 StocksAdjustVO객체(DB에 등록한거) 형태의 배열
    reportBtn.addEventListener("click", function(){		
		if(grid.getRowCount()<1){						
				alert('재고조정을 실시할 작업 건을 추가하세요.');						
		}
		if(overHandleCheck){
			alert('동일 품목에 대한 출하수량이 재고수량을 초과합니다.');
			throw new Error("(출하수량 오버)재고조정 중지시키기!")
		}
		let pageGrid = grid.getData();
		pageGrid.forEach(ele=>{
			if(ele.c4 == '상품 출고'){	
				if(isNaN(Number(ele.c6)) || Number(ele.c6) < 1 || Number(ele.c6) > Number(ele.c8) || Number(ele.c6) > Number(ele.c5)){ //c.5 지시수량 / c.6 실출하수량
					alert('유효한 작업수량을 입력하세요.') //출고수량을 숫자가 아니거나 1미만인 상태에서 재고조정을 누르는 경우 모달띄우는 부트스트랩 클래스제거
					throw new Error("(출고)재고조정 중지시키기!");
				}
			}
			
			if(ele.c4 == '상품 입고'){
				if(isNaN(Number(ele.c7)) || Number(ele.c7) < 1 || Number(ele.c7) > Number(ele.c5)){ //입고수량을 숫자가 아니거나 1미만인 상태에서 재고조정을 누르는 경우 모달띄우는 부트스트랩 클래스제거
					alert('유효한 작업수량을 입력하세요.')				
					throw new Error("(입고)재고조정 중지시키기!");
				}
			}
			
		})
		
		let today = new Date();   	
		let dateString = today.toLocaleDateString(); //작성일자	yyyy. MM. dd	
		let gridData = grid.getData(); 
		let dataArr = [];	
		adjustTargetList = [];
		gridData.forEach(ele=>{
			
			let data = {};
			data.a1 = ele.c1;
			data.a2 = ele.c2;
			data.a3 = ele.c3;
			data.a4 = ele.c8;
			let filteredC6 = ele.c6.replace(/^0+/, '');
			let filteredC7 = ele.c7.replace(/^0+/, '');
			
			if(ele.c4 == '상품 출고'){
				data.a5 = "-" + filteredC6; //입고c7 / 출하 c6
			} else {
				data.a5 = filteredC7
			}
			data.a6 = ele.c11; //창고명
			data.a7 = ele.c4; //조정사유
			data.a8 = ele.c10; //hidden으로 넘길 사원코드
			dataArr.push(data) 
			
			//프로시저 인자에 들어갈 데이터배열 ->페이지그리드에서 정보 긁어옴., 이거 수정할거면 DB에 등록한 객체랑 자바 VO객체클래스랑 싹다 수정해야함. 반대도 마찬가지
			let adjustTarget = {};
			if(ele.c4 == '상품 출고'){
				adjustTarget.salesNo = ele.c1; //입고c7 / 출하 c6
				adjustTarget.purNo = null;   
				adjustTarget.stocksStocks = ele.c6;		
			} else {
				adjustTarget.purNo = ele.c1
				adjustTarget.salesNo = null;
				adjustTarget.stocksStocks = ele.c7;
			}
			adjustTarget.employeeCode = ele.c10;
			adjustTarget.itemCode = ele.c2;
			adjustTarget.updateReason = ele.c4;
			adjustTargetList.push(adjustTarget);
		})
		
		//보고서의 기존 cell값 제거
		let cellArr = document.querySelector('.report-table').querySelectorAll('td');
		cellArr.forEach(ele=>{
			ele.innerHTML = "";
		})
		
		//보고서 cell에 값 넣기
		dataArr.forEach((ele,index)=>{
			let tr = document.querySelector(`#adjustTbody tr:nth-child(${index+1})`)
			for(let i=1; i<9; i++){ //마지막 td는 hidden
				tr.querySelector(`td:nth-child(${i})`).innerHTML = ele[Object.keys(ele)[i-1]];			
			}
			
		})
		
		
		let reporter = document.querySelector('.reporter');
		let reporter2 = document.querySelector('.reporter2');
		let userName = document.querySelector('#employeeName');			
		let user = document.getElementById("user");
		
		user.innerHTML = userName.value + "님 환영합니다.";
		reporter.innerText = userName.value;
		reporter2.innerText = "성명: " + userName.value;	
		
		//일자에 값넣기
		let inputDate = document.querySelectorAll('.inputDate');
		inputDate.forEach(ele=>{
			if(ele.tagName == "DIV"){
				ele.innerHTML = `일자: ${dateString}`;
			} else{
				ele.innerHTML = dateString;
			}
		})
		
		
		
		//재고조정번호 출력은 fetch처리, 실제 DB INSERT는 프로시저에서 처리됨. ,담당자에 들어갈 값은 로그인 중인 회원의 session에서 읽어올 예정
		fetch("/stocks/stocksAdjustNo")
		.then(result=> result.json())
		.then(result=>{
			document.querySelector("#adjustNo").innerHTML = result;
		})
	})       
        
		window.setTimeout(function(){
            grid8.refreshLayout();
        }, 200)
		
		
       
       let reportSubmit = document.getElementById('reportSubmit');
       reportSubmit.addEventListener("click", function(){			
			let flag = confirm("재고조정을 완료하시겠습니까?");
			if(flag == false){
				return;
			} else {			
				fetch("/stocks/stocksAdjustment"
				,{
					method:'post',
					headers:{"Content-Type":"application/json"},
					body: JSON.stringify(adjustTargetList)
				})
				.then(result=>{
					console.log("성공할 거 같음?" + result)
					})
				.catch(err=>{
					console.log("실패함" + err)
				})			
				
				alert('재고조정처리되었습니다.')
				let data = [];
				grid.resetData(data);
			}
       })
    //#endregion
    
    
    //#region 사원조회   
       
    /*============================
    	StackAdjust 사원조회 모달 JS
    ==============================*/
    // 모달 관련 JavaScript
    let humanModalBtn = document.getElementById('humanModal')
    humanModalBtn.addEventListener('show.bs.modal', function () {
        // 모달이 표시되기 전에 실행할 코드
        window.setTimeout(function(){
            grid8.refreshLayout();
        }, 200) 
    })

    humanModalBtn.addEventListener('hidden.bs.modal', function () {
        // 모달이 완전히 숨겨진 후 실행할 코드
        // 현재없음
    })
	let	grid8 = new Grid({
            el: document.getElementById('humanGrid'),
            scrollX: true,
            scrollY: true,
            pageOptions: {
		      useClient: true,
		      perPage: 15,
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
                    header: '사원 코드',
                    name: 'c1',
                    align: "center",
                    width: 135,
                    whiteSpace: 'normal',
                    className:'border',
                    renderer: {
                        type: ButtonRenderer
                    },
                    filter: 'select'
                    
                },
                {
                    header: '성명',
                    name: 'c2',
                    align: "center",
                    width: 135,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                },
                {
                    header: '부서명',
                    name: 'c3',
                    align: "center",
                    width: 135,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                }
            ]
        });

	    
    grid8.on('click',function(ev){
		let rowKeyNum;
		if (ev.columnName == 'c1'){
			rowKeyNum = ev.rowKey;		
			let inputTag = document.getElementById('humanInput');
			let inputTag2 = document.getElementById('humanInput2');
			inputTag.value = '';		
			inputTag.value = grid8.getValue(rowKeyNum, 'c2');					
			inputTag2.value = grid8.getValue(rowKeyNum, 'c1'); //사원코드가 들어갈 hidden input			
		}
	})   
	
	// 그리드에 데이터 넣기(출력) 담당자
	fetch('/employees/emps')
	.then(result => result.json())
	.then(result => {
		let filteredResult = result.filter(ele=>{
			return ele.departmentName == "영업팀" || ele.departmentName == "믈류팀"; 
		})
		let dataArr = [];
		filteredResult.forEach(ele=>{
			let data = {};
			data.c1 = ele.employeeCode;
			data.c2 = ele.name;
			data.c3 = ele.departmentName;
			dataArr.push(data);
		})
		grid8.resetData(dataArr);
	})
	//#endregion 사원조회
	
	//#region 체크박스 및 기타 기능함수
	
    /*===================================
    	StackAdjust 선택취소, 입력초기화 JS
    =====================================*/ 
    
    //입력값 초기화버튼 이벤트
    let initBtn = document.getElementById("inputInitial");
    initBtn.addEventListener('click',function(){
		let blank = [];
		grid.resetData(blank)
	})
	
	//체크된 항목 row 삭제	
	let deleteBtn = document.getElementById("rowDelete")
	
	deleteBtn.addEventListener('click',  function () {
		 grid.removeCheckedRows();
		 
		 refreshRowNum2(grid.el.id);		
		
	})
	
	//열을 추가후 체크박스에 다시 숫자부여하는 코드
	function refreshRowNum2 (id) {
		 window.setTimeout(function () {
		let checkList = document.querySelectorAll('.countCheck-'+id)
		let num = 1;
		checkList.forEach(items => {
			items.innerText = num;
			num += 1;
		})
			
		 }, 50)
	}
    
    /*===================================
    	StackAdjust 그 외 JS
    =====================================*/   
   
    //구매내역모달에서 선택버튼 클릭시 페이지그리드로 데이터이동      
    let purchaseOrderInputBtn = document.getElementById('purchaseOrderInputBtn');
    purchaseOrderInputBtn.addEventListener("click",function(){
		let arr = grid6.getCheckedRows();		
		let dataArr = [];
		arr.forEach(ele=>{
			let data = {};
			data.c1 = ele.c2;
			data.c2 = ele.c4;
			data.c3 = ele.c5;
			data.c4 = '상품 입고'
			data.c5 = ele.c7;
			data.c6 = '-'
			data.c7 = '1';
			data.c8 = ele.c10
			data.c9 = ele.c11
			data.c10 = ele.c12
			data.c11 = ele.c13 //창고명		
			dataArr.push(data)
		})
		
		let selectedCtn = arr.length;
		let exitedRowsInPage = grid.getRowCount()
		let checkingMaxRows = selectedCtn + exitedRowsInPage;
		window.setTimeout(function(){
			if(checkingMaxRows < 16){
				grid.appendRows(dataArr);
				disabledCell();
			} else {
				alert('한 번에 15건만을 처리할 수 있습니다.')
				return;
			}
			},200)	
	})
	
	//출하지시내역 모달에서 선택버튼 클릭시 페이지그리드로 데이터이동
	let salesOrderInputBtn = document.getElementById('salesOrderInputBtn');
    salesOrderInputBtn.addEventListener("click",function(){
		let arr = grid7.getCheckedRows();
		let dataArr = [];
				
		arr.forEach(ele=>{
			let data = {};
			data.c1 = ele.c2;
			data.c2 = ele.c4;
			data.c3 = ele.c5;
			data.c4 = '상품 출고'
			data.c5 = ele.c7;
			data.c6 = '1'
			data.c7 = '-';
			data.c8 = ele.c10
			data.c9 = ele.c11
			data.c10 = ele.c12
			data.c11 = ele.c13 //창고명
			dataArr.push(data)
		})
		let selectedCtn = arr.length;
		let exitedRowsInPage = grid.getRowCount()
		let checkingMaxRows = selectedCtn + exitedRowsInPage;
		if(checkingMaxRows < 16){
					grid.appendRows(dataArr);
					disabledCell();
		} else {
			alert('한 번에 15건을 처리할 수 있습니다.')
		}
	})		
			
	//내역,출하모달 띄울 때 조정페이지 grid에 이미 있는 rows들을 거르고 data 배열을 반환시킬 함수
	function exceptExitingRows(data){
		//페이지 grid에 존재하는 내역No.
		let gridData = grid.getData(); 
		let exitedNo = [];
		gridData.forEach(ele=>{
			exitedNo.push(ele.c1);
		})
		let exitedNoSet = new Set(exitedNo); //페이지그리드에 존재하는 그리드의 내역No. Set
		
		//제외 된 후 최종적으로 출력될 row의 c2컬럼 값
		let dataSet = new Set();
		data.forEach((ele)=>{  //DB조회 구매/판매내역의 값을 조회하며 최종적으로 출력될 모달그리드에 들어간 행의 내역번호를 값을 dataSet에 넣는다.
			dataSet.add(ele.c2)		
			exitedNoSet.forEach(ele2=>{
				if(ele.c2 == ele2){
					dataSet.delete(ele2)	// 페이지 그리드에 있는거면 빼버린다.
				}
			})	
		})
		let noArr = Array.from(dataSet); // Set -> 배열로바꿔주고
		let resultObj = [];
		data.forEach(ele=>{   //넘겨받은 그리드 data객체배열에서 필터링된 noArr배열에 해당하는 전표No을 가진 행만 최종 배열인 resultObj에 push한다
			noArr.forEach(ele2 =>{
				if(ele.c2 == ele2){
					resultObj.push(ele);
				}	
			})
		})
		let resultArr = [];
		let resultObjArr = Array.from(resultObj)
		resultObjArr.forEach(ele=>{
			let row ={}; 
			row.c1 = ele.c1;
			row.c2 = ele.c2;
			row.c3 = ele.c3;
			row.c4 = ele.c4;
			row.c5 = ele.c5;
			row.c6 = ele.c6;
			row.c7 = ele.c7;
			row.c8 = ele.c8;
			row.c9 = ele.c9;
			row.c10 = ele.c10;	
			row.c11 = ele.c11;
			row.c12 = ele.c12;
			row.c13 = ele.c13; //창고명
			resultArr.push(row);
		})		
		return resultArr
	}
	
	/*입,출고 여부에 따라 수량입력 cell disable 처리*/
	function disabledCell (){
		let gridData = grid.getData();
		let purcRow = [];
		let saleRow = [];
		gridData.forEach(ele=>{
			if(ele.c4 == '상품 출고'){
				saleRow.push(ele.rowKey)
			} else if(ele.c4 == '상품 입고'){
				purcRow.push(ele.rowKey)
			}
		})
		purcRow.forEach(ele=>{
			grid.disableCell(ele, 'c6');
		})
		saleRow.forEach(ele=>{
			grid.disableCell(ele, 'c7');
		})
	}
	
	//#endregion 체크박스관련 & 그 외
}); //End Point