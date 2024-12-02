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
                this.el.setAttribute("type", "button");
                this.el.setAttribute("data-bs-dismiss", "modal");              
            }
            getElement() {
                return this.el;
            }
    }
    
    class ButtonRenderer2 {
            constructor(props) {
                this.el = document.createElement('button');
                this.el.innerText = props.value;
                this.el.style.border = '1px solid gray';
                this.el.style.borderRadius ='3px';
                this.el.style.backgroundColor = 'white';
                this.el.classList.add('gridBtn')
                this.el.setAttribute("type", "button");                                    
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
	                className:'border',
	                formatter: ({ value }) =>
			          `<div class="btn-link text-primary modalTrigger" data-bs-toggle="modal" data-bs-target="#itemInfoModal">${value}</div>`,
			        filter: 'select'
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
	                className:'border',
	                filter: 'select'
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
		
		/*!== 제품 상세조회 모달 ==!*/
		let totalQuantity; //제품 상세정보띄울때 전체재고를 저장하기 위함, 콤보박스 누를때 전체재고수량 보관하기위함
		stockInqueryGrid.on('click',function(e){	
			if (e.columnName == 'conNo'){		
				let rowKeyNum = e.rowKey;
				let itemCode = stockInqueryGrid.getValue(rowKeyNum, 'itemCode'); //제품코드로 상세정보를 불러올 거에용.
				fetch(`/stocks/itemDetailInfo/${itemCode}`) //받아오는값 ContractItemVO
				.then(result=> result.json())
				.then(result=> {
					let clientValue = result.clientName + '[' + result.clientCode + ']';
					let contractPeriod = result.conSdate + '  ~  ' + result.conEdate;
					document.querySelector('img[name="itemImage"]').src = '/images/' + result.image;
					setValueByName('clientNameAndCode', clientValue)
					setValueByName('conNo', result.conNo)
					setValueByName('itemCode', result.itemCode)
					setValueByName('itemName', result.itemName)
					setValueByName('price', result.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"원")
					setValueByName('contractPeriod', contractPeriod)
					setValueByName('currentQuantity', result.stocksQuantity)
					totalQuantity = result.stocksQuantity;
					
					//창고종류 콤보박스에 창고정보 불러오기 fetch안의 fetch
					fetch("/whList")
					.then(result=> result.json())
					.then(result=> {
						let warehouseTypeBox = document.getElementById('warehouseType');
						let warehouseTypeBox2 = document.getElementById('warehouseType2');
						warehouseTypeBox.replaceChildren();
						warehouseTypeBox2.replaceChildren();
						let option = document.createElement('option'); 
			            option.value = "allStocks"; 
			            option.textContent = "전체재고";
			            let option2 = document.createElement('option');
			            option2.value = "allStocks"; 
			            option2.textContent = "전체"; 
			            warehouseTypeBox.appendChild(option);
			            warehouseTypeBox2.appendChild(option2);
						result.forEach(ele=>{	
							let option = document.createElement('option'); 
				            option.value = ele.whCode; 
				            option.textContent = ele.whName; 
				            warehouseTypeBox.appendChild(option);
				            //DOM에서는 하나의 노드가 동시에 두 곳에 존재할 수 없다.
				            let option2 = document.createElement('option'); 
				            option2.value = ele.whCode; 
				            option2.textContent = ele.whName; 
				            warehouseTypeBox2.appendChild(option2);
						})
						
						//재고조정이력 그리드 그려주기
						//fetch뒤에 조정이력그리드를 그리면 창고정보를 못불러온다.
						getAdjustmentInfo();
						window.setTimeout(function(){
			            	adjustmentDetailGrid.refreshLayout()
			        	}, 200);
			        	
				})
							
				})
				.catch(err=>{`제품상세불러오기 실패! : ${err}`})		
			}
		})
		
		/*콤보박스에서 창고 option 선택시 수량변경*/
		let warehouseTypeBox = document.getElementById('warehouseType');
		warehouseTypeBox.addEventListener("change", function(e){		 
			 let selectedOption = warehouseTypeBox.options[warehouseTypeBox.selectedIndex];			 
		     let whCode = selectedOption.value;
		     let itemCode = document.getElementById('itemCode').value;
		     if(e.target.value != 'allStocks'){
			     fetch(`/stocks/itemQuantity/${itemCode}/${whCode}`)//창고코드와 제품코드로 현재고를 알아오는 API작성해야함.
			     .then(result => result.json())
			     .then(result => {
					let currentQuantity = document.getElementById('currentQuantity');
					if(result.data != null){
						currentQuantity.value = result.data.currentQuantity;
					} else if(result.data == null){
						currentQuantity.value = 0;
					}				
				 })
			     .catch(err=>{`제품의 특정 창고 재고 알아오기 실패! ${err}`})
		     } else if(e.target.value == 'allStocks'){
					currentQuantity.value = totalQuantity; //상세정보모달 열 때 보관되는 값을 가져온다.
			 }
		})
		
		/*수정버튼 클릭시 제품사진 변경*/ 
		let updateBtn = document.getElementById('updateBtn');
		updateBtn.addEventListener('click',function(){
			let newImgTag2 = document.getElementById('newImage');
			if(newImgTag2.value == ''){
				alert("변경하실 이미지 파일를 선택해주세요.");
				return;
			}
			
			let response = confirm("제품의 사진을 변경하시겠습니까?")
			if(response){
				let newImgTag = document.getElementById('newImage');				
				let itemCode = document.getElementById('itemCode'); //name으로 변수에 담으니까 .value 값이 안나온다..
				let formData = new FormData();
				formData.append('imageFile', newImgTag.files[0]);
				formData.append('itemCode', itemCode.value); 
				/* formData 내용 콘솔에서 확인
				for (const data of formData.entries()) {
					console.log(data);
				};*/
				
				fetch("/stocks/itemImage",{
					method: 'post',
					body: formData
				})
				.then(result => {
					newImgTag.value = '';		
					let itemCodeForImageChange = itemCode.value;
					fetch(`/stocks/itemDetailInfo/${itemCodeForImageChange}`)
					.then(result=> result.json())
					.then(result=>{
						document.querySelector('img[name="itemImage"]').src = '/images/' + result.image;
					})
					
					alert('제품 이미지가 정상적으로 변경되었습니다.')
				})
				.catch(err=>{console.log(`제품사진변경 실패! ${err}`)
						alert("제품 이미지 변경 중 에러가 발생했습니다.")
				})
			}
		})
		
		//엑셀버튼 테스트중
/*		let btnTest = document.getElementById("testBtn");
		btnTest.addEventListener("click",function(){
			adjustmentDetailGrid.export(".xls", { 
				includeHeader: true, 
				fileName : 'test'
				});
		})*/
		
		//작업해야함 아직 안했음. 모달내 탭이동 시 refresh하는거 
	   	let modalTrigger = document.querySelectorAll(".modalTrigger")
	    for(btn of modalTrigger){
	    	btn.addEventListener("click",()=>{
				//그리드 refresh()-> 모달내 탭이동이 있을 수 있으니 별도로 refresh() 하겠음
				window.setTimeout(function(){
	            	adjustmentDetailGrid.refreshLayout();
	        	}, 200);
	        	console.log(e.target.value);
			})
		}
		
		
		
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
                    header: '거래처코드',
                    name: 'clientCode',
                    align: "center",
                    width: 183,
                    whiteSpace: 'normal',
                    className:'border',
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
			let inputTag2 = document.getElementById('clientHiddenInput');
			inputTag.value = '';
			inputTag2.value = '';				
			inputTag.value = clientGrid.getValue(rowKeyNum, 'clientName');
			inputTag2.value = clientGrid.getValue(rowKeyNum, 'clientCode');			
			console.log(inputTag2)										
		}
	})
	
	//#endregion 거래처 모달

    //#region 제품조회 모달
    /*============================
    	StackInquery 제품조회 모달 JS
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
    
    //모달에서 버튼 클릭시 페이지 input으로 value 이동
    itemGrid.on('click',function(ev){
		let rowKeyNum;
		if (ev.columnName == 'itemCode'){
			rowKeyNum = ev.rowKey;		
			let inputTag = document.getElementById('itemInput');
			let inputTag2 = document.getElementById('itemInput');
			inputTag.value = '';
			inputTag2.value = '';			
			inputTag.value = itemGrid.getValue(rowKeyNum, 'itemName');	
			inputTag2.value = itemGrid.getValue(rowKeyNum, 'itemCode');						
		
		}
	})        
    //#endregion 제품조회 모달
    
    //#region 제품상세모달_조정내역 그리드 & 상세정보 & 제품추이(예정)
    /*============================
    	StackInquery 제품상세 모달 JS
    ==============================*/
    let	adjustmentDetailGrid = new Grid({
            el: document.getElementById('adjustmentDetail'),
            scrollX: true,
            scrollY: true,
            pageOptions: {
		      useClient: true,
		      perPage: 17,
		    },
            header: { height: 34 },
            bodyHeight: 703,
            width: 'auto',
            contextMenu: null,
            rowHeaders: [{
                    type: 'rowNum',
                    header: "No.",
                    width: 50,
                    className:'border'
            }],
		    columnOptions: {
			    frozenCount: 1, 
			    frozenBorderWidth: 1 
			},
            columns: [
                {
                    header: '조정번호',
                    name: 'stocksAdjustNo',
                    align: "center",
                    width: 100,
                    whiteSpace: 'normal',
                    className:'border',
                    renderer: {
                        type: ButtonRenderer2
                    },
                    formatter: ({ value }) =>
			          `<div class="btn-link text-primary adjustModalTrigger"  >${value}</div>`,
                    
                },
                {
                    header: '전표번호',
                    name: 'slipNo',
                    align: "center",
                    width: 100,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                },
                {
                    header: '사원명',
                    name: 'employeeName',
                    align: "center",
                    width: 70,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                },
                {
                    header: '변동수량',
                    name: 'stocksStocks',
                    align: "center",
                    width: 50,
                    whiteSpace: 'normal',
                    className:'border',
                },
                                {
                    header: '등록날짜',
                    name: 'date',
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
                    header: '증감 여부',
                    name: 'stocksStocksCheck',
                    align: "center",
                    width: 85,
                    whiteSpace: 'normal',
                    className:'border',                  
                    formatter: ({ value }) => {
		          // 값에 따라 다른 색상 스타일 적용
			          let colorClass = "";
			          if (value === "재고증가") {
			            colorClass = "r1";
			          } else if (value === "재고감소") {
			            colorClass = "r2";
			 		  }
			          return `<span class="${colorClass}">${value}</span>`;
			        },
                },
                {
                    header: '변동사유',
                    name: 'updateReason',
                    align: "center",
                    width: 85,
                    whiteSpace: 'normal',
                    className:'border',
                    filter: 'select'
                },
            ]
    });
      
      //재고 증가,감소 색상 다르게
	function sortColor(){	  
      adjustmentDetailGrid.getData().forEach((row) => {
		  let check = row.stocksStocksCheck === "재고증가";
		  if (check) {
		      adjustmentDetailGrid.addRowClassName(row.rowKey, "increase");
	      } else {
	          adjustmentDetailGrid.addRowClassName(row.rowKey, "decrease");
	      }
	  });
	  }
    
    //조정내역 불러오는 함수, 모달창띄우는 fetch안에서 사용
	function getAdjustmentInfo(){
		let warehouseTypeBox2 = document.getElementById('warehouseType2'); 			
		let selectedOption = warehouseTypeBox2.options[warehouseTypeBox2.selectedIndex];
		let dateBox = document.getElementById('inqueryYear');
		
		let whCode = selectedOption.value; 	
		let date = dateBox.options[dateBox.selectedIndex].value;
		let itemCode = document.getElementById('itemCode').value;	
		let formData = new FormData();
		formData.append('whCode', whCode);
		formData.append('date', date); 
		formData.append('itemCode', itemCode);
		
		fetch(`/stocks/itemAdjust`,{
				method: 'post',
				body: formData
		})
		.then(result=>result.json())
		.then(result=>{
			let dataArr = [];
			result.forEach(ele=>{
				let data = {};
				data.stocksAdjustNo = ele.stocksAdjustNo;
				data.stocksStocks = ele.stocksStocks;
				data.slipNo = ele.slipNo;
				data.employeeName = ele.employeeName;
				data.date = ele.regDate;
				data.stocksStocksCheck = ele.stocksStocksCheck;
				data.updateReason = ele.updateReason;
				dataArr.push(data);
			})
			adjustmentDetailGrid.resetData(dataArr);
			sortColor(); //Row 색감 넣기!
		})
		.catch(err=>{`재고조정내역 불러오기 실패! ${err}`})
		
	}
	//제품상세 모달 - > 콤보박스(창고타입) 변경시 조정내역 reload
	let warehouseTypeBox2 = document.getElementById('warehouseType2');
		warehouseTypeBox2.addEventListener("change", function(){
			getAdjustmentInfo();		
	})
	//제품상세 모달 - > 콤보박스(년도) 변경시 조정내역 reload
	let dateBox = document.getElementById('inqueryYear');
	dateBox.addEventListener("change", function(){
		getAdjustmentInfo();
	})
	
	adjustmentDetailGrid.on("click", function(e){
		let rowKeyNum;
		if (e.columnName == 'stocksAdjustNo'){
			rowKeyNum = e.rowKey;		
			let val = adjustmentDetailGrid.getValue(rowKeyNum, 'stocksAdjustNo');
			let formData = new FormData();
			formData.append("stocksAdjustNo", val);
			fetch("/stocks/itemAdjustDetail",{
					method: 'post',
					body: formData
			})
			.then(result=> result.json())
			.then(result=> {
				let dataArr = [];
				result.forEach(ele=>{
					let data = {};
					//일련번호 자재식별번호 품명 현재수량 증감수량 창고명 재고조정사유
					data.logNo = ele.logNo;
					data.itemCode = ele.itemCode;
					data.itemName = ele.itemName;
					data.stocksQuantity = ele.stocksQuantity;
					data.stocksStocks = ele.stocksStocks;
					data.whName = ele.whName;
					data.updateReason = ele.updateReason;
					dataArr.push(data);
				})
				//작성자,조정번호 값넣기
				let reporter = document.querySelectorAll("reporter");
				let adjustNo = document.getElementById("adjustNo");
				reporter.forEach(ele=>{
					ele.innerHTML = ele.employeeName;
				})
				adjustNo.innerHTML = result[0].stocksAdjustNo;
				//일자에 값넣기
				let inputDate = document.querySelectorAll('.inputDate');
				inputDate.forEach(ele=>{
					if(ele.tagName == "DIV"){
						ele.innerHTML = `일자: ${result[0].regDate}`;
					} else{
						ele.innerHTML = result[0].regDate;
					}
				})
				
				//보고서 cell에 값 넣기
				dataArr.forEach((ele,index)=>{
					let tr = document.querySelector(`#adjustTbody tr:nth-child(${index+1})`)
					for(let i=1; i<8; i++){
						tr.querySelector(`td:nth-child(${i})`).innerHTML = ele[Object.keys(ele)[i-1]];			
					}
				})
			})
			.catch(err => {`재고조정내역 불러오기 실패! +${err}`})
			const reportModal = new bootstrap.Modal(document.getElementById('reportModal'));			
			reportModal.show();
		}
	})
	
    //#endregion 제품상세모달_조정내역 그리드
    
    //#region 기타 함수 및 초기화
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
				dataRow.clientCode = ele.clientCode;
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
    
   /*!== 수동입력시 hidden값 없애기 ==! */  
   //수동입력시 hidden input.value 초기화 => 거래처, 품목 Input
	let clientInputTag = document.getElementById('clientInput')
	clientInputTag.addEventListener('change', function(){
		inputTag2 = document.getElementById('clientHiddenInput');
		inputTag2.value = '';
	})
	
	let itemInputTag = document.getElementById('itemInput')
	itemInputTag.addEventListener('change', function(){
		inputTag2 = document.getElementById('clientHiddenInput');
		inputTag2.value = '';
	})
	
	
	// name을 기준으로 값 넣기!
	function setValueByName(name, value) {
    	document.querySelector(`[name="${name}"]`).value = value;
	}
	
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
            //재고조정번호를 파일명뒤에 넣어준다.
            let adjustNo = "_" + document.getElementById("adjustNo").innerHTML;
            pdf.save(`재고조정보고서${adjustNo}.pdf`);
            
        });
    });
	//#endregion
	
	//#region 두번째 탭 작업
		//차트
	  const el = document.getElementById('statisticsChart');
      const data = {
        categories: ['1월', '2월', '3월', '3월', '4월', '5월', '6월', '7월', '8월', '9월' ,'10월' ,'11월' ,'12월'],
        series: [
          {
            name: '입고수량',
            data: [5000, 3000, 5000, 7000, 6000, 4000, 1000],
          },
          {
            name: '출고수량',
            data: [8000, 4000, 7000, 2000, 6000, 3000, 5000],
          },
          {
            name: '재고수량',
            data: [4000, 4000, 6000, 3000, 4000, 5000, 7000],
          },
          {
            name: '총 매입',
            data: [3000, 4000, 3000, 1000, 2000, 4000, 3000],
          },
          {
            name: '총 매출',
            data: [3000, 4000, 3000, 1000, 2000, 4000, 3000],
          },
        ],
      };
      const options = {
        chart: { title: '월간 분석', width: 900, height: 400 },
        xAxis: { pointOnColumn: false, title: { text: '월' } },
        yAxis: [
          {
            title: 'Temperature (Celsius)',
          },
          {
            title: 'Percent (%)',
            scale: {
              min: 0,
              max: 100,
            },
          },
        ],
       
      };

      const chart = toastui.Chart.areaChart({ el, data, options });
      
      //그리드
      
	//#endregion 두번째 탭 작업
}); //End Point