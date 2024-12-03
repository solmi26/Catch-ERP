/**
 * 매입 단가 계약 등록 js
 */

let grid;
document.addEventListener("DOMContentLoaded", function () {  
	
 const Grid = tui.Grid;

  Grid.applyTheme("default", {
    outline: {
      border: "#dee2e6",
    },
    cell: {
      normal: {
        border: "#dee2e6",
      },
      header: {
        background: "#f8f9fa",
        text: "black",
      },
      focused: {
        background: "#f8f9fa",
        border: "#f64a4a",
      },
      evenRow: {
        background: "white",
      },
      oddRow: {
        background: "white",
      },
    },
  });
  
  function loadGrid(){
	// 그리드 초기화
	  grid = new tui.Grid({
	    el: document.querySelector('#grid'),  // 그리드 표시 위치
	    
	    scrollX: true,   // 가로 스크롤 사용
	    scrollY: true,   // 세로 스크롤 사용
	    columns: [
	      {
	        header: '품목',
	        name: 'itemName',
	        editor: 'text',
	        align: 'left',
	      },
	      {
	        header: '단가',
	        name: 'unitPrice',
	        editor: {
	        	type:gridNumber
	        },
	        align: 'right',
	        formatter: 
	        	function (e) { const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
	  							   			  return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
			 },
	      },
	      {
	        header: '공급가액',
	        name: 'supplyAmount',
	        editor: {
	        	type:gridNumber
	        },
	        align: 'right',
	         formatter: 
	        	function (e) { const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
	        								 
	  							   			  return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
			 },
	      },
	      {
	        header: '부가세',
	        name: 'vat',
	        editor: {
	        	type:gridNumber
	        },
	        align: 'right',
			 formatter: 
	        	function (e) { const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
	  							   			  return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
			 },
	
	      },
	    ], 
	    data: [{},{},{}],
	 
	  rowHeaders: [
	        {
	          type: 'checkbox',
	          header: 
	            `<span class="custom-input">
	            <input type="checkbox" id="all-checkbox" class="hidden-input" name="_checked" />
	              <label for="all-checkbox" class="checkbox selectCheck">✔</label>
	            </span>`
	        ,
	          renderer: {
	            type: gridCheckbox
	          }
	        }
	  ],
	  });
	
  }
  
  loadGrid();
  
  // 그리드 다시 작성 버튼
  document.getElementById("resetBtn").addEventListener("click", function(){
	console.log("그리드 리셋 버튼")
	  const initialData = [{}, {}, {}]; 
      grid.resetData(initialData);
  })
  
  // 단가를 입력하면 공급가액, 부가세 자동 계산
  grid.on('editingFinish', (event) => {
    const { rowKey, columnName, value } = event;

    // 단가가 수정된 경우만 동작
    if (columnName === 'unitPrice') {
      const unitPrice = Number(value) || 0;
      const vatRate = 0.1; // 부가세율 10%
      
      const supplyAmount = unitPrice; // 단가 = 공급가액
      const vat = Math.floor(unitPrice * vatRate); // 부가세 계산
      
      grid.setValue(rowKey, 'supplyAmount', supplyAmount);
      grid.setValue(rowKey, 'vat', vat);
    }
  });
	
  // 전체 모달 관련
  class ButtonRenderer {
    constructor(props) {
      this.el = document.createElement("button");
      this.el.innerText = props.value;
      this.el.style.border = "1px solid gray";
      this.el.style.borderRadius = "3px";
      this.el.style.backgroundColor = "white";
      this.el.classList.add("gridBtn");
      /*this.el.onclick = () => {
          console.log(this.el.innerText);             
        };*/
      this.el.setAttribute("data-bs-dismiss", "modal");
    }
    getElement() {
      return this.el;
    }
  }
  
  /*============================
  	거래처 모달 JS
  ==============================*/

  // 모달 관련 JavaScript
  const clientModal = new bootstrap.Modal(document.getElementById('c_clientModal'));

  //모달실행 시 grid refresh를 위한 코드
  document
  	.getElementById("c_openClientModal")
  	.addEventListener("click", function() {
  		clientModal.show();
  		window.setTimeout(function() {
  			c_grid3.refreshLayout();
  		}, 200);
  	});

  //모달에 적용될 그리드라서 refreshLayout() 사용을 위해 전역스코프로 변수를 선언하였음.
  let c_grid3 = new Grid({
    el: document.getElementById("c_clientGrid"),
    scrollX: true,
    scrollY: true,
    header: { height: 40 },
    bodyHeight: 500,
    width: "auto",
    contextMenu: null,
    rowHeaders: [
      {
        type: "rowNum",
        header: "No.",
        width: 50,
        className: "border",
      },
    ],
    columns: [
      {
        header: "거래처코드",
        name: "c7",
        align: "center",
        width: 100,
        whiteSpace: "normal",
        className: "border",
        filter: "select",
        renderer: {
          type: ButtonRenderer,
        },
      },
      {
        header: "거래처명",
        name: "c1",
        align: "center",
        width: 183,
        whiteSpace: "normal",
        className: "border",
        filter: "select",
      },

      {
        header: "대표자명",
        name: "c2",
        align: "center",
        width: 100,
        whiteSpace: "normal",
        className: "border",
        filter: "select",
      },
      {
        header: "회사 연락처",
        name: "c3",
        align: "center",
        width: 120,
        whiteSpace: "normal",
        className: "border",
      },
      {
        header: "담당자명",
        name: "c4",
        align: "center",
        width: 110,
        whiteSpace: "normal",
        className: "border",
        filter: "select",
      },
      {
        header: "담당자 연락처",
        name: "c5",
        align: "center",
        width: 120,
        whiteSpace: "normal",
        className: "border",
        filter: "select",
      },
      {
        header: "종목",
        name: "c6",
        align: "center",
        width: 100,
        whiteSpace: "normal",
        className: "border",
        filter: "select",
      },
    ],
  });

  c_grid3.on("click", function (ev) {
    let rowKeyNum;
    if (ev.columnName == "c7") {
      rowKeyNum = ev.rowKey;
      let inputTag = document.getElementById("c_clientInput");
      let inputTag2 = document.getElementById("c_clientInput2");
      inputTag.value = "";
      inputTag.value = c_grid3.getValue(rowKeyNum, "c1");
      inputTag2.value = c_grid3.getValue(rowKeyNum, "c7"); //거래처코드가 들어갈 hidden input

      console.log(inputTag.value);
	  
	  clientModal.hide();
    }
  });

  // 거래처모달 그리드에 데이터 넣기(출력)
  fetch("/stocks/client")
    .then((result) => result.json())
    .then((result) => {
      let dataArr = [];
      result.forEach((ele) => {
        let dataRow = {};
        dataRow.c1 = ele.clientName;
        dataRow.c2 = ele.ceoName;
        dataRow.c3 = ele.companyTel;
        dataRow.c4 = ele.employeeName;
        dataRow.c5 = ele.employeeTel;
        dataRow.c6 = ele.event;
        dataRow.c7 = ele.clientCode;
        dataArr.push(dataRow);
      });
      c_grid3.resetData(dataArr);
    });
    
    
    //#region 사원조회   
    /*============================
    	사원조회 모달 JS
    ==============================*/
    
	// 모달 관련 JavaScript
	const empModal = new bootstrap.Modal(document.getElementById('c_empModal'));
	
	  //모달실행 시 grid refresh를 위한 코드
	  document
	  	.getElementById("c_openEmpModal")
	  	.addEventListener("click", function() {
	  		empModal.show();
	  		window.setTimeout(function() {
	  			c_grid2.refreshLayout();
	  		}, 200);
	  	});


	let	c_grid2 = new Grid({
            el: document.getElementById('empGrid'),
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

	    
    c_grid2.on('click',function(ev){
		let rowKeyNum;
		if (ev.columnName == 'c1'){
			rowKeyNum = ev.rowKey;		
			let inputTag = document.getElementById('c_empName');
			let inputTag2 = document.getElementById('c_empCode');
			inputTag.value = '';		
			inputTag.value = c_grid2.getValue(rowKeyNum, 'c2');					
			inputTag2.value = c_grid2.getValue(rowKeyNum, 'c1'); //사원코드가 들어갈 hidden input			
		}
	})   
	
	// 그리드에 데이터 넣기(출력) 
	fetch('/employees/emps')
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
		c_grid2.resetData(dataArr);
	})
	//#endregion 사원조회

});