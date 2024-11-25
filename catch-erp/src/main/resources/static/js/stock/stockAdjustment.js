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
    //구매현황, 출하지시서 모달에 사용되는 버튼 렌더러
    class BtnForOrder {
            constructor(props) {
				
                this.el = document.createElement('button');
                this.el.innerText = props.value;
                this.el.style.border = '1px solid gray';
                this.el.style.borderRadius ='3px';
                this.el.style.backgroundColor = 'white';
                this.el.classList.add('gridBtn')
                
                /*
          		this.el.onclick = () => {
					 				
					const tr = this.el.closest('tr'); 
					tr.classList.add("selected");
					
					if(tr.classList.contains("selected") == false){ 						          	
	                	tr.classList.add("selected")
	                	const tds = tr.children;
	                	const tdsArr = Array.from(tds);
	                	tdsArr.forEach((ele)=>{
							ele.style.backgroundColor = "#e5fad0";	
						})                			
					}					
					if(tr.classList.contains("selected") == true){						
						tr.classList.remove("selected")
	                	const tds = tr.children;
	                	const tdsArr = Array.from(tds);
	                	tdsArr.forEach((ele)=>{
							ele.style.backgroundColor = "white";	
						}) 
					}	
								
                }*/	
                /*this.el.onclick = () => {
                	console.log(this.el.innerText);             
                };*/                        
            }
            getElement() {
                return this.el;
            }
    }
  //숫자타입 인풋 렌더러 (석진제작) => 공통코드파일에 병합
  //숫자있는 체크박스 (석진제작) => 공통코드파일에 병합
  
/*================================================================
		재고조정과 관련된 토스트 그리드 객체와 함수 (첫번째 그리드)
==================================================================*/
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
	}
	
    });*/
    
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
    let grid
    const initGrid = () => {
        // 그리드 객체
	
     	grid = new Grid({
        el: document.getElementById('adjustmentGrid'),
        scrollX: true,
        scrollY: true,
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
        width: 'auto',
        contextMenu: null,
        /*rowHeaders: [{
                type: 'checkbox',
                header: "No.",
                width: 50,
                className:'border'
        }],*/
        columns: [
            {
                header: '구매/판매내역 No.',
                name: 'c1',
                align: "center",
                width: 220,
                whiteSpace: 'normal',
                className:'border'               
            },
            {
                header: '품목코드',
                name: 'c2',
                align: "center",
                width: 220,
                whiteSpace: 'normal',
                className:'border'              
            },
            {
                header: '품목명',
                name: 'c3',
                align: "center",
                width: 200,
                whiteSpace: 'normal'
            },
            {
                header: '재고조정사유',
                name: 'c4',
                align: "center",
                width: 200,
                whiteSpace: 'normal',
                className:'border'              
            },           
            {
                header: '지시수량',
                name: 'c5',
                align: "center",
                width: 100,
                whiteSpace: 'normal',                
                className:'border'
            },
            {
                header: '출하수량',
                name: 'c6',
                align: "center",
                width: 100,
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
                width: 100,
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
                width: 100,
                whiteSpace: 'normal',
                className:'border'
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
			c1: 'A0000045-1',
            c2: 'A2024',
            c3: '컵홀더',
            c4: '상품 출하',
            c5: '1400',
            c6: '5',
            c7: '0',
            c8: '1000',
            c8: '1200',
        },
        {
			c1: 'A0000045-2',
            c2: 'A2024',
            c3: '컵홀더',
            c4: '상품 출하',
            c5: '1400',
            c6: '5',
            c7: '0',
            c8: '1000',
            c8: '1200',
        },
        {
			c1: 'A0000045-4',
            c2: 'A2024',
            c3: '컵홀더',
            c4: '상품 출하',
            c5: '1400',
            c6: '5',
            c7: '0',
            c8: '1000',
            c8: '1200',
        },
        
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
        });

        //모달에 적용될 그리드라서 refreshLayout() 사용을 위해 전역스코프로 변수를 선언하였음.    
        let grid3 = new Grid({
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
                    header: '거래처코드',
                    name: 'c7',
                    align: "center",
                    width: 100,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select',
                    renderer: {
                        type: ButtonRenderer
                    },
                },
                {
                    header: '거래처명',
                    name: 'c1',
                    align: "center",
                    width: 183,
                    whiteSpace: 'normal',
                    className:'border',
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
       
    grid3.on('click',function(ev){
		let rowKeyNum;
		if (ev.columnName == 'c7'){
			rowKeyNum = ev.rowKey;		
			let inputTag = document.getElementById('clientInput');
			let inputTag2 = document.getElementById('clientInput2')
			inputTag.value = '';		
			inputTag.value = grid3.getValue(rowKeyNum, 'c1');
			inputTag2.value = grid3.getValue(rowKeyNum, 'c7'); //거래처코드가 들어갈 hidden input
									
			console.log(inputTag.value);
			
		}
	})   
	
	//거래처입력창에 수동으로 입력시 해당 거래처명과 동일한 거래처코드를 hidden input창에 자동입력, 없을 시 공백 => !보류 ->구현이 곤란
	/*let inputTag = document.getElementById('clientInput');
	inputTag.addEventListener('change', function(){
		let inputVal = inputTag.value;
		fetch(`/stocks/clientSearchList/${inputVal}`)
		.then(result=> result.json())
		.then(result=>{ 
			if(result.length == 0){
				return;
			} else {
			let inputTag2 = document.getElementById('clientInput2')
			inputTag2.value = 
		})
	})*/
	
	// 거래처모달 그리드에 데이터 넣기(출력)
	fetch("/stocks/clientList")
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
	
	
	
    /*============================
    	StackInquery 품목조회 모달 JS
    ==============================*/
    // 모달 관련 JavaScript
    var purchaseOrderModal = document.getElementById('purchaseOrderModal')
    purchaseOrderModal.addEventListener('show.bs.modal', function (event) {
        // 모달이 표시되기 전에 실행할 코드
        window.setTimeout(function(){
            grid5.refreshLayout();
        }, 200) 
    })

    purchaseOrderModal.addEventListener('hidden.bs.modal', function (event) {
        // 모달이 완전히 숨겨진 후 실행할 코드
        // 현재는없음
    })

	let	grid5 = new Grid({
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
	fetch("/stocks/itemList")
	.then(result=> result.json())
	.then(result=>{
		let dataArr = [];
		result.forEach(ele=>{
			let dataRow ={};
			dataRow.c1 = ele.itemCode;
			dataRow.c2 = ele.item;
			dataArr.push(dataRow)
		})
		grid5.resetData(dataArr);
	})
    
    /*============================
    	StackInquery 구매내역 모달 JS
    ==============================*/
    var purchaseOrderModal = document.getElementById('purchaseOrderModal2')
	
	purchaseOrderModal.addEventListener('show.bs.modal', function () {
	    // 모달이 표시되기 전에 실행할 코드
	    window.setTimeout(function(){
	        grid6.refreshLayout();
	    }, 200) 
	})
    
    let grid6;
    const initGrid6 = () => {
		    grid6 = new Grid({
		    el: document.getElementById('purchaseGrid'),
		    scrollX: true,
		    scrollY: true,
		    header: { height: 40 },
		    bodyHeight: 500,
		    width: 'auto',
		    contextMenu: null,
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
		    columns: [
		        {
		            header: '구매전표 No.',
		            name: 'c1',
		            align: "center",
		            width: 120,
		            whiteSpace: 'normal',
		            className:'border',		            
		            
		        },
		        {
		            header: '구매내역 No.',
		            name: 'c2',
		            align: "center",
		            width: 120,
		            whiteSpace: 'normal',		            
		        },
		        {
		            header: '일자',
		            name: 'c3',
		            align: "center",
		            width: 120,
		            whiteSpace: 'normal',
		            className:'border',
		            filter: {
		                type: 'date',
		                options: {
		                    format: 'yyyy.MM.dd',
		                    language: 'ko'
		                }
		            }
		        },
		        {
		            header: '품목코드',
		            name: 'c4',
		            align: "center",
		            width: 100,
		            whiteSpace: 'normal',
		            className:'border'
		        }
		        ,
		        {
		            header: '품목명',
		            name: 'c5',
		            align: "center",
		            width: 100,
		            whiteSpace: 'normal',
		            className:'border'
		        },
		        {
		            header: '거래처명',
		            name: 'c6',
		            align: "center",
		            width: 140,
		            whiteSpace: 'normal',
		            className:'border'
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
		            header: '수량',
		            name: 'c7',
		            align: "center",
		            width: 100,
		            whiteSpace: 'normal',
		            className:'border'
		        },
		        {
		            header: '입고단가',
		            name: 'c8',
		            align: "center",
		            width: 200,
		            whiteSpace: 'normal',
		            editor: 'text',
		            className:'border',
		            formatter: function(e){
		                return e.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		            },
		        }
		    ]
		});
		
		return grid6;
    }
    
    const createdGrid6 = initGrid6();

	// 샘플 데이터
	const sampleData6 = [
	    {
	        c1: 'A0000045',
	        c2: 'A0000045-1',
	        c3: '2023.01.01',
	        c4: 'z0001',
	        c5: '컵홀더',
	        c6: '태호물산',
	        c7: '0',
	        c8: '100'
	    },
	    {
		    c1: 'A0000045',
		    c2: 'A0000045-2',
		    c3: '2023.01.01',
		    c4: 'z0001',
		    c5: '컵홀더',
		    c6: '태호물산',
		    c7: '0',
		    c8: '200'
	    },
	    {
		    c1: 'A0000045',
		    c2: 'A0000045-3',
		    c3: '2023.01.01',
		    c4: 'z0001',
		    c5: '컵홀더',
		    c6: '태호물산',
		    c7: '0',
		    c8: '1000000'
	    },
	    {
		    c1: 'A0000045',
		    c2: 'A0000045-4',
		    c3: '2023.01.01',
		    c4: 'z0001',
		    c5: '컵홀더',
		    c6: '태호물산',
		    c7: '0',
		    c8: '10000'
	    },
	    {
		    c1: 'A0000045',
		    c2: 'A0000045-5',
		    c3: '2023.01.01',
		    c4: 'z0001',
		    c5: '컵홀더',
		    c6: '태호물산',
		    c7: '0',
		    c8: '100000'
	    },
	    {
		    c1: 'A0000046',
		    c2: 'A0000046-1',
		    c3: '2023.01.01',
		    c4: 'z0001',
		    c5: '컵홀더',
		    c6: '태호물산',
		    c7: '0',
		    c8: '100000'
	    },
	    {
		    c1: 'A0000046',
		    c2: 'A0000046-2',
		    c3: '2023.01.01',
		    c4: 'z0001',
		    c5: '컵홀더',
		    c6: '태호물산',
		    c7: '0',
		    c8: '100000'
	    }
	];
	
	// 그리드에 데이터 넣기(출력)		
	let purchaseOrderBtn = document.getElementById('purchaseOrderBtn');
	purchaseOrderBtn.addEventListener("click", function(){
		
		let purchaseFilteredData = exceptExitingRows(sampleData6);
		createdGrid6.resetData(purchaseFilteredData);	
	})
	
	//조회조건에 맞는 전표No. 불러오기 & 수동입력시 hidden input.value 초기화
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
	
	//구매내역 조건 조회
	searchPurchaseChitNo()
	function searchPurchaseChitNo(){
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
		//거래처, 사원을 조건으로 전표번호 리스트 불러옴
		fetch(`/stocks/chitNoList/${type1}/${type2}/${type3}/${client}/${employee}/${item}/${startDate}/${endDate}`)
		.then(result => result.json())
		.then(result => {
			console.log(result);
			let arr = [];
			result.forEach(ele=>{
				let data = {};
				data.c1 = result.purcslipNo;
				data.c2;
			})
		})
		
		
		//불러온 전표번호에 해당하는 구매내역을 불러오는데 품목을 조건으로 구매내역 리스트 불러옴
				
	}
	
	
	
    /*============================
    	StackInquery 출하지시내역 모달 JS
    ==============================*/
    
    var salesOrderModal = document.getElementById('salesOrderModal')

	salesOrderModal.addEventListener('show.bs.modal', function (event) {
	    // 모달이 표시되기 전에 실행할 코드
	    window.setTimeout(function(){
	        grid7.refreshLayout();
	    }, 200) 
	})
    
    let grid7;
    const initGrid7 = () => {
		    grid7 = new Grid({
		    el: document.getElementById('salesGrid'),
		    scrollX: true,
		    scrollY: true,
		    header: { height: 40 },
		    bodyHeight: 500,
		    width: 'auto',
		    contextMenu: null,
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
		    columns: [
		        {
		            header: '판매전표 No.',
		            name: 'c1',
		            align: "center",
		            width: 120,
		            whiteSpace: 'normal',
		            className:'border'		            
		        },
		        {
		            header: '판매내역 No.',
		            name: 'c2',
		            align: "center",
		            width: 120,
		            whiteSpace: 'normal',		            
		        },
		        {
		            header: '일자',
		            name: 'c3',
		            align: "center",
		            width: 120,
		            whiteSpace: 'normal',
		            className:'border',
		            filter: {
		                type: 'date',
		                options: {
		                    format: 'yyyy.MM.dd',
		                    language: 'ko'
		                }
		            }
		        },
		        {
		            header: '품목코드',
		            name: 'c4',
		            align: "center",
		            width: 100,
		            whiteSpace: 'normal',
		            className:'border'
		        }
		        ,
		        {
		            header: '품목명',
		            name: 'c5',
		            align: "center",
		            width: 100,
		            whiteSpace: 'normal',
		            className:'border'
		        },
		        {
		            header: '거래처명',
		            name: 'c6',
		            align: "center",
		            width: 140,
		            whiteSpace: 'normal',
		            className:'border'
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
		            header: '수량',
		            name: 'c7',
		            align: "center",
		            width: 100,
		            whiteSpace: 'normal',
		            className:'border'
		        },
		        {
		            header: '출고단가',
		            name: 'c8',
		            align: "center",
		            width: 200,
		            whiteSpace: 'normal',
		            editor: 'text',
		            className:'border',
		            formatter: function(e){
		                return e.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		            },
		        }
		    ]
		});
		
		return grid7;
    }
    
    const createdGrid7 = initGrid7();

	// 샘플 데이터
	const sampleData7 = [
	    {
	        c1: 'A0000045',
	        c2: 'A0000045-1',
	        c3: '2023.01.01',
	        c4: '컵홀더',
	        c5: '12000',
	        c6: '5',
	        c7: '0',
	        c8: '0'       
	    },
	    {
	        c1: 'A0000045',
	        c2: 'A0000045-1',
	        c3: '2023.01.01',
	        c4: '컵홀더',
	        c5: '12000',
	        c6: '5',
	        c7: '0',
	        c8: '0'       
	    },
	    {
	        c1: 'A0000045',
	        c2: 'A0000045-1',
	        c3: '2023.01.01',
	        c4: '컵홀더',
	        c5: '12000',
	        c6: '5',
	        c7: '0',
	        c8: '0',
	        c9: '0',
	        c10: '상품 입고'     
	    }
	];
	
	
	// 그리드에 데이터 넣기(출력)	 
	
    let salesOrderBtn = document.getElementById('salesOrderBtn');
	salesOrderBtn.addEventListener("click", function(){
		let salesFilteredData = exceptExitingRows(sampleData7);
		createdGrid7.resetData(salesFilteredData);
	})
    
    
    
    /*================================
    	StackInquery 재고조정보고서 모달 JS
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
            pdf.save('재고조정보고서.pdf');
        });
    });
       
       
    //재고조정 버튼 이벤트함수
    let reportBtn = document.getElementById("reportBtn");
    reportBtn.addEventListener("mouseover",function(){
		if(grid.getRowCount()<1){		
			reportBtn.removeAttribute("data-bs-toggle");	
		}
		if(grid.getRowCount()>0){
			reportBtn.setAttribute("data-bs-toggle","modal")
		}	
	})   
    
    reportBtn.addEventListener("click", function(){		
		if(grid.getRowCount()<1){						
				alert('재고조정을 실시할 작업 건을 추가하세요.');						
		}
		
		let today = new Date();   	
		let dateString = today.toLocaleDateString(); //작성일자	yyyy. MM. dd	
		let gridData = grid.getData(); 
		let dataArr = [];
		gridData.forEach(ele=>{
			let data = {};
			data.a1 = ele.c1;
			data.a2 = ele.c2;
			data.a3 = ele.c3;
			data.a4 = ele.c8;
			if(ele.c4 == '상품 출고'){
				data.a5 = ele.c6; //입고c7 / 출하 c6
			} else {
				data.a5 = ele.c7
			}
			data.a6 = ele.c4;
			dataArr.push(data) 
		})
		
		//보고서의 기존 cell값 제거
		let cellArr = document.querySelector('.report-table').querySelectorAll('td');
		cellArr.forEach(ele=>{
			ele.innerHTML = "";
		})
		
		//보고서 cell에 값 넣기
		dataArr.forEach((ele,index)=>{
			let tr = document.querySelector(`#adjustTbody tr:nth-child(${index+1})`)
			for(let i=1; i<7; i++){
				tr.querySelector(`td:nth-child(${i})`).innerHTML = ele[Object.keys(ele)[i-1]];
			}
		})
		
		let inputDate = document.querySelectorAll('.inputDate');
		inputDate.forEach(ele=>{
			if(ele.tagName == "DIV"){
				ele.innerHTML = `일자: ${dateString}`;
			} else{
				ele.innerHTML = dateString;
			}
		})
		
		//재고조정번호,담당자에 들어갈 값은 DB에서 조회해서 가져와야함.
	}) 
       
       let reportSubmit = document.getElementById('reportSubmit');
       reportSubmit.addEventListener("click", function(){			
			let flag = confirm("재고조정을 완료하시겠습니까?");
			if(flag == false){
				return;
			} else {
				//함수필요
				alert('재고조정처리되었습니다.')
				let data = [];
				grid.resetData(data);
			}
       })
       
    /*============================
    	StackInquery 사원조회 모달 JS
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
			console.log(inputTag.value);
		}
	})   
	
	// 그리드에 데이터 넣기(출력) 
	fetch('/emps')
	.then(result => result.json())
	.then(result => {
		let dataArr = [];
		result.forEach(ele=>{
			let data = {};
			data.c1 = ele.employeeCode;
			data.c2 = ele.name;
			data.c3 = ele.departmentName;
			dataArr.push(data);
		})
		grid8.resetData(dataArr);
	})
	
    /*===================================
    	StackInquery 선택취소, 입력초기화 JS
    =====================================*/ 
    
    //입력값 초기화버튼 이벤트
    let initBtn = document.getElementById("inputInitial");
    initBtn.addEventListener('click',function(){
		let blank = [];
		createdGrid.resetData(blank)
	})
	
	//체크된 항목 row 삭제	
	let deleteBtn = document.getElementById("rowDelete")
	
	deleteBtn.addEventListener('click',  function () {
		 grid.removeCheckedRows();
		 
		 refreshRowNum();		
		
	})
				
	
	//열을 추가후 체크박스에 다시 숫자부여하는 코드
	function refreshRowNum () {
		 window.setTimeout(function () {
			 let checkList = document.querySelectorAll('.countCheck')
			 let num = 1;
			 checkList.forEach(items => {
				items.innerText = num;
				num += 1;
			 })
		
	     }, 50)
	}
    
    /*===================================
    	StackInquery 그 외 JS
    =====================================*/   
   
    //구매내역모달에서 선택버튼 클릭시 페이지그리드로 데이터이동
          
    let purchaseOrderInputBtn = document.getElementById('purchaseOrderInputBtn');
    purchaseOrderInputBtn.addEventListener("click",function(){
		let arr = grid6.getCheckedRows();		
		let dataArr = [];
		
		//c8에 넣을 데이터를 위한 fetch함수 필요
		arr.forEach(ele=>{
			let data = {};
			data.c1 = ele.c2;
			data.c2 = ele.c4;
			data.c3 = ele.c5;
			data.c4 = '상품 입고'
			data.c5 = ele.c7;
			data.c6 = 'X'
			data.c7 = '1';
			data.c8 = 'fetch필요'
			dataArr.push(data)
		})		
		let selectedCtn = arr.length;
		let exitedRowsInPage = grid.getRowCount()
		let checkingMaxRows = selectedCtn + exitedRowsInPage;
		if(checkingMaxRows < 16){
			grid.appendRows(dataArr);
		} else {
			alert('한 번에 15건만을 처리할 수 있습니다.')
		}
		
		
	})
	
	//출하지시내역 모달에서 선택버튼 클릭시 페이지그리드로 데이터이동
	let salesOrderInputBtn = document.getElementById('salesOrderInputBtn');
    salesOrderInputBtn.addEventListener("click",function(){
		let arr = grid7.getCheckedRows();
		let dataArr = [];
		
		//c8에 넣을 데이터를 위한 fetch함수 필요
		arr.forEach(ele=>{
			let data = {};
			data.c1 = ele.c2;
			data.c2 = ele.c4;
			data.c3 = ele.c5;
			data.c4 = '상품 출고'
			data.c5 = ele.c7;
			data.c6 = '1'
			data.c7 = 'X';
			data.c8 = 'fetch필요(출하)'
			dataArr.push(data)
		})
		let selectedCtn = arr.length;
		let exitedRowsInPage = grid.getRowCount()
		let checkingMaxRows = selectedCtn + exitedRowsInPage;
		if(checkingMaxRows < 16){
					grid.appendRows(dataArr);
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
		let exitedNoSet = new Set(exitedNo);
		
		//제외 된 후 최종적으로 출력될 row의 c2컬럼 값
		let dataSet = new Set();
		data.forEach((ele)=>{
			dataSet.add(ele.c2)		
			exitedNoSet.forEach(ele2=>{
				if(ele.c2 == ele2){
					dataSet.delete(ele2)				
				}
			})	
		})
		let noArr = Array.from(dataSet);
		let resultObj = [];
		data.forEach(ele=>{
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
			resultArr.push(row);
		})		
		return resultArr
	}
}); //End Point