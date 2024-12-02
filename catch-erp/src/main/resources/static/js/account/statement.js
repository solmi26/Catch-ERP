/**
 * 전표 관리 페이지 js
 * 조회, 수정, 삭제
 */

let grid = null;
let selectData = {
	salesChitNo: null, // 전표번호
	type: null, // 전표유형
};
let allSlipList;
let isSlipDetailReadOnly = false;
let clientCode = "";

document.addEventListener("DOMContentLoaded", function () {
  // Modal 요소를 가져와 Modal 인스턴스를 생성
  // 매입전표 모달
  const purchaseModalElement = document.getElementById("pModal");
  // 매출전표 모달
  const salesModalElement = document.getElementById("sModal");

  let purchaseModal, salesModal;

  // purchaseModal이 존재하는 경우 Modal 인스턴스 생성
  if (purchaseModalElement) {
    purchaseModal = new bootstrap.Modal(purchaseModalElement);
  } else {
    console.error("purchaseModal 요소가 없습니다.");
  }

  // salesModal이 존재하는 경우 Modal 인스턴스 생성
  if (salesModalElement) {
    salesModal = new bootstrap.Modal(salesModalElement);
  } else {
    console.error("salesModal 요소가 없습니다.");
  }

  // 그리드 초기화
  grid = new tui.Grid({
    el: document.querySelector("#grid"),
    scrollX: true,
    scrollY: true,
    pageOptions: {
      useClient: true, // 페이징 사용
      perPage: 15, // 페이지당 표시 데이터 개수
    },
    columns: [
      {
        header: "전표번호", // 전표번호
        name: "voucherNumber",
        align: "center",
        formatter: ({ value }) =>
          `<a href="#" class="btn-link text-primary">${value}</a>`,
      },
      {
        header: "거래유형", // 거래유형
        name: "transactionType",
        align: "center",
      },
      {
        header: "전표발행일자",
        name: "date",
        align: "center",
      },
      {
        header: "금액(vat 별도)", // 금액
        name: "amount",
        align: "right",
        formatter: function (e) {
          const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
          return Number(value).toLocaleString() + "원"; // 숫자를 쉼표 포함 형식으로 포맷팅
        },
      },
      {
        header: "거래처", // 거래처명
        name: "clientName",
        align: "center",
      },
      {
        header: "적요", // 적요
        name: "description",
        align: "left",
      },
      {
        header: "전자세금계산서 전송 상태", // 전자세금계산서
        name: "eTaxInvoice",
        align: "center",
        formatter: ({ value }) => {
          // 값에 따라 다른 색상 스타일 적용
          let colorClass = "";
          if (value === "미전송") {
            colorClass = "r1";
          } else if (value === "국세청 전송 완료") {
            colorClass = "r3";
          } else {
            colorClass = "r2";
          }
          return `<span class="${colorClass}">${value}</span>`;
        },
      },
    ],
    rowHeaders: [
      {
        type: "checkbox",
        header: `<span class="custom-input">
	                <input type="checkbox" id="all-checkbox" class="hidden-input" name="_checked" />
	                  <label for="all-checkbox" class="checkbox selectCheck">✔</label>
	                </span>`,
        renderer: {
          type: gridCheckbox,
        },
      },
    ],
  });

  let currentTarget = null; // 현재 클릭된 대상

  // #region
  // 전표 번호 클릭 시 전표 상세보기 및 수정, 삭제하는 로직
  grid.on("click", (ev) => {
    console.log("check!", ev);
    const row = grid.getRow(ev.rowKey); // 클릭된 행의 데이터 가져오기

    selectData = {
      salesChitNo: row.voucherNumber, // 전표번호
      type: row.transactionType, // 전표유형
    };

    // console.log(selectData.salesChitNo);
    // console.log(selectData.type);

    // 선택된 전표 정보 서버에서 가져오기
    fetch(
      `/sales/selectSlipInfo?salesChitNo=${selectData.salesChitNo}&type=${selectData.type}`
    )
      .then((response) => response.json())
      .then((result) => {
        let data = result;
		
		// 선택된 전표 전송 상태에 따라 
		
        console.log("데이터 : ", result);
        // 가져온 데이터 필드에 삽입
		
		
		// 현재 선택한 전표가 매입인지 매출인지 구분
		if(selectData.type === "매출전표") {
			result.invoiceStatus = allSlipList.find(slipData => slipData.salesChitNo === result.salesChitNo).invoiceStatus || null;
			// 매출전표 관련 데이터 매핑		
			document.getElementById("s_date").value = result.chitDate || "2024/11/01"; // 전표일자
	      	document.getElementById("s_no").value =
	         result.salesChitNo || result.purchaseChitNo; // 전표번호
	        document.getElementById("s_joinInput").value =
	         result.saleslipNo || result.purcslipNo || ""; // 구매, 판매전표
	        document.getElementById("s_clientInput").value = result.clientCode || "";
			clientCode = result.clientNo;
			console.log("code" + clientCode)
	        document.getElementById("s_acctInput").value = result.acctName || "";
	        document.getElementById("s_price").value = result.supplyPrice
	         ? Number(result.supplyPrice).toLocaleString()
	         : "0";
	        document.getElementById("s_vat").value = result.vat
	         ? Number(result.vat).toLocaleString()
	         : "0";
	        document.getElementById("s_amount").value = result.totalPrice
	         ? Number(result.totalPrice).toLocaleString()
	         : "0";
	        document.getElementById("s_summary").value = result.summary || "";
			
		} else if(selectData.type === "매입전표") {
			result.invoiceStatus = allSlipList.find(slipData => slipData.salesChitNo === result.purchaseChitNo).invoiceStatus || null;
			// 매입전표 관련 데이터 매핑
			document.getElementById("p_date").value = result.chitDate || "2024/11/01"; // 전표일자
			document.getElementById("p_no").value =
			 result.salesChitNo || result.purchaseChitNo; // 전표번호
			document.getElementById("p_joinInput").value =
			 result.saleslipNo || result.purcslipNo || ""; // 구매, 판매전표
			document.getElementById("p_clientInput").value = result.clientCode || "";
			document.getElementById("p_acctInput").value = result.acctName || "";
			document.getElementById("p_price").value = result.supplyPrice
			 ? Number(result.supplyPrice).toLocaleString()
			 : "0";
			document.getElementById("p_vat").value = result.vat
			 ? Number(result.vat).toLocaleString()
			 : "0";
			document.getElementById("p_amount").value = result.totalPrice
			 ? Number(result.totalPrice).toLocaleString()
			 : "0";
			document.getElementById("p_summary").value = result.summary || "";

		} else {
			throw new Error("전표 유형이 존재하지 않습니다.");
		}
		
		if(result.invoiceStatus) {
			console.log(result.invoiceStatus); 
			isSlipDetailReadOnly = result.invoiceStatus !== "미전송";
		}
		updateSlipDetailInputs(isSlipDetailReadOnly);		
       
      })
      .catch((err) => {
        console.log("에러 : " + err);
      });

    // 전표번호(열) 클릭 시 모달 표시
    if (ev.columnName === "voucherNumber") {
      currentTarget = ev;
      //console.log(grid.getFormattedValue(ev.rowKey, "transactionType"));
      const type = grid.getFormattedValue(ev.rowKey, "transactionType");
      if (type === "매출전표") {
        salesModal.show(); // 유형이 매출전표이면 매출전표 모달
      } else {
        purchaseModal.show(); // 유형이 매입전표이면 매입전표 모달
      }
    }
  });
  //#endregion

  // 데이터 로드 함수
  function loadGridData() {
    fetch("/sales/selectSlip")
      .then((result) => result.json())
      .then((result) => {
		allSlipList = result;
        let dataArr = result.map((ele) => ({
          voucherNumber: ele.salesChitNo, // 전표번호
          transactionType: ele.type, // 전표유형
          date: ele.chitDate, // 전표일자
          amount: ele.supplyPrice, // 공급가액
          clientName: ele.clientName, // 거래처코드
          description: ele.summary, // 적요
          eTaxInvoice: ele.invoiceStatus, // 세금계산서 발행 상태
        }));

        grid.resetData(dataArr);

        // 데이터 로드 후 스타일 적용
        // 클래스 이름을 지정해서 CSS 스타일 적용
        grid.getData().forEach((row) => {
          let check = row.transactionType === "매출전표";
          if (check) {
            grid.addRowClassName(row.rowKey, "sales");
          } else {
            grid.addRowClassName(row.rowKey, "purchase");
          }
        });
      })
      .catch((error) => {
        console.error("데이터 로드 중 오류 발생:", error);
      });
  }

  // 초기 데이터 로드
  loadGridData();

  // 선택 삭제 버튼
  document
    .querySelector("#deleteButton")
    .addEventListener("click", function () {
      console.log("삭제 버튼 클릭됨");
      let selectedRows = grid.getCheckedRows(); // 체크된 데이터
      console.log("선택된 데이터:", selectedRows);

      if (selectedRows.length === 0) {
        alert("삭제할 전표를 선택하세요.");
        return;
      }

      // "미전송 상태의 전표만 전송"
      const deletableRows = selectedRows.filter(
        (row) => row.eTaxInvoice === "미전송"
      );
      const undeletableRows = selectedRows.filter(
        (row) => row.eTaxInvoice !== "미전송"
      );

      // 삭제 불가능한 전표가 있을 경우 alert 창
      if (undeletableRows.length > 0) {
        alert("미전송 상태의 전표만 삭제할 수 있습니다.");
        return;
      }

      // 전송할 데이터
      let deleteData = deletableRows.map((row) => ({
        salesChitNo: row.voucherNumber,
        type: row.transactionType,
        
      }));

      // 서버로 삭제 요청
      fetch("/sales/deleteSlip", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("삭제 요청에 실패했습니다.");
          }
          return response.text();
        })
        .then((result) => {
          console.log("삭제 결과:", result);
          alert("선택한 전표가 삭제되었습니다.");

          // 삭제 시 그리드 다시 로드
          loadGridData();
        })
        .catch((error) => {
          console.error("삭제 요청 중 오류 발생:", error);
          alert("전표 삭제 중 오류가 발생했습니다.");
        });
    });
	
	// 모달 창에서(상세보기) 삭제 버튼
	for(let deleteBtn of document.querySelectorAll(".deleteBtn")){
		deleteBtn.addEventListener("click", function (){
			const {salesChitNo, type} = selectData;
			console.log(salesChitNo, type);
			
			// 전송할 데이터
			let deleteData = [{
				salesChitNo: salesChitNo,
				type: type,
			}];
			
			// 서버로 삭제 요청
			fetch("/sales/deleteSlip", {
			  method: "DELETE",
			  headers: {
			    "Content-Type": "application/json",
			  },
			  body: JSON.stringify(deleteData),
			})
			  .then((response) => {
			    if (!response.ok) {
			      throw new Error("삭제 요청에 실패했습니다.");
			    }
			    return response.text();
			  })
			  .then((result) => {
			    console.log("삭제 결과:", result);
			    alert("선택한 전표가 삭제되었습니다.");
				salesModal.hide();

			    // 삭제 시 그리드 다시 로드
			    loadGridData();
			  })
			  .catch((error) => {
			    console.error("삭제 요청 중 오류 발생:", error);
			    alert("전표 삭제 중 오류가 발생했습니다.");
			  });
		});
	}
	
	// 수정 버튼 클릭 시 수정(삭제 후 재삽입)
	for (let updateBtn of document.querySelectorAll(".updateBtn")) {
	  updateBtn.addEventListener("click", function (event) {
	    const { salesChitNo, type } = selectData;
	    console.log(salesChitNo, type);
	
	    // name은 alert 창에 띄울 내용, ele는 html 요소
	    const requiredFields = [
	      { name: "전표일자", element: document.querySelector("input[name='s_date']") },
	      { name: "거래처", element: document.querySelector("input[name='s_clientName']") },
	      { name: "계정명", element: document.querySelector("input[name='s_acctName']") },
	      { name: "공급가액", element: document.querySelector("input[name='s_price']") },
	      { name: "부가세", element: document.querySelector("input[name='s_vat']") },
	      { name: "합계", element: document.querySelector("input[name='s_amount']") },
	    ];
	
	    let isAllow = true;
	    let noValueFields = [];
	
	    // 입력되었는지 확인
	    requiredFields.forEach((field) => {
	      console.log(field.element.value);
	      if (!field.element.value.trim()) {
	        isAllow = false;
	        noValueFields.push(field.name);
	      }
	    });
	
	    // 경고창 표시
	    if (!isAllow) {
	      // 버튼 기본 동작 중단
	      event.preventDefault();
	      // 비활성화
	      alert(`${noValueFields.join(", ")}를 입력해주세요.`);
	      return;
	    }
	
	    // 저장 로직
	    const chitDate = document.querySelector("input[name='s_date']").value; // 전표일자
	    const client = document.querySelector("input[name='s_clientCode']").value; // 거래처 코드
	    const acct = document.querySelector("input[name='s_acctName']").value; // 계정명
	    const price = parseNumber(priceInput.value); // 공급가액 (숫자로 변환)
	    const vat = parseNumber(vatInput.value); // 부가세 (숫자로 변환)
	    const amount = parseNumber(totalInput.value); // 합계 (숫자로 변환)
	    const writer = "오세훈"; // 작성자
	    const balance = amount; // 채권 잔액
	    const summary = document.querySelector("input[name='s_summary']").value; // 적요
	    const saleslip = document.querySelector("input[name='s_joinInput']").value; // 판매전표 번호
	
		// 전송할 데이터	
	    const updateData = [{
	      salesChitNo: salesChitNo,
	      type: type,
	      chitDate: chitDate,
	      clientCode: client,
	      acctName: acct,
	      supplyPrice: price,
	      vat: vat,
	      totalPrice: amount,
	      writer: writer,
	      recBalance: balance,
	      summary: summary,
	      saleslipNo: saleslip,
	    }];
	    
	    	   // AJAX 요청
		fetch("/sales/updateSalesDI", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updateData),
		})
			.then((response) => response.text())
			.then((data) => {
				console.log(data);
				alert("수정이 완료되었습니다.");
				salesModal.hide();
				
			// 수정 시 그리드 다시 로드
			loadGridData();
			})
			.catch((error) => {
				console.error("Error: ", error);
				alert("서버와 연결에 실패했습니다.");
			});
	  });
	  
	}

	
	
	// 수정 버튼 클릭 시 수정
	/** 
	for(let updateBtn of document.querySelectorAll(".updateBtn")){
			updateBtn.addEventListener("click", function (event){
				const {salesChitNo, type} = selectData;
				console.log(salesChitNo, type);
				
		   // name은 alert 창에 띄울 내용, ele는 html 요소
		    const requiredFields = [
		      { name: "전표일자", element: document.querySelector("input[name='s_date']") },
		      { name: "거래처", element: document.querySelector("input[name='s_clientName']") },
		      { name: "계정명", element: document.querySelector("input[name='s_acctName']") },
		      { name: "공급가액", element: document.querySelector("input[name='s_price']") },
		      { name: "부가세", element: document.querySelector("input[name='s_vat']") },
		      { name: "합계", element: document.querySelector("input[name='s_amount']") },
		    ];

		    let isAllow = true;
		    let noValueFields = [];

		    // 입력되었는지 확인
		    requiredFields.forEach((field) => {
				console.log(field.element.value);
		      if (!field.element.value.trim()) {
		        isAllow = false;
		        noValueFields.push(field.name);
		      }
		    });

		    // 경고창 표시
		    if (!isAllow) {
		      // 버튼 기본 동작 중단
		      event.preventDefault()
		      // 비활성화
		      // target = true;
		      alert(`${noValueFields.join(", ")}를 입력해주세요.`);
		      return;
		    }


		    // 저장 로직
		    const chitDate = document.querySelector("input[name='s_date']").value; // 전표일자
		    const client = document.querySelector("input[name='s_clientCode']").value; // 거래처 코드
		    const acct = document.querySelector("input[name='s_acctName']").value; // 계정명
		    const price = parseNumber(priceInput.value); // 공급가액 (숫자로 변환)
		    const vat = parseNumber(vatInput.value); // 부가세 (숫자로 변환)
		    const amount = parseNumber(totalInput.value); // 합계 (숫자로 변환)
		    const writer = "오세훈"; // 작성자
		    const balance = amount; // 채권 잔액
		    const summary = document.querySelector("input[name='s_summary']").value; // 적요
		    const saleslip = document.querySelector("input[name='s_joinInput']").value; // 판매전표 번호

		    const salesData = {
			  salesChitNo: salesChitNo,
		      chitDate: chitDate,
		      clientCode: client,
		      acctName: acct,
		      supplyPrice: price,
		      vat: vat,
		      totalPrice: amount,
		      writer: writer,
		      recBalance: balance,
		      summary: summary,
		      saleslipNo: saleslip,
		    };

				// AJAX 요청
				fetch("/sales/updateSales", {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(salesData),
				})
					.then((response) => response.text())
					.then((data) => {
						console.log(data);
						alert("수정이 완료되었습니다.");
						salesModal.hide();
						
					// 수정 시 그리드 다시 로드
					loadGridData();
					})
					.catch((error) => {
						console.error("Error: ", error);
						alert("서버와 연결에 실패했습니다.");
					});
			});
		}
		*/


  // "신규 등록" 버튼 클릭 시 드롭다운 메뉴 표시/숨기기
  document.getElementById("new").addEventListener("click", function () {
    const dropdownMenu = document.getElementById("dropdownMenu");
    // 보이는 상태(block) 숨겨진 상태(none)
    dropdownMenu.style.display =
      dropdownMenu.style.display === "block" ? "none" : "block";
  });

  // 드롭다운 항목 클릭 이벤트
  document.querySelector(".sales-item").addEventListener("click", function () {
    //alert('매출전표 등록 선택됨');
    document.getElementById("dropdownMenu").style.display = "none";
  });

  document
    .querySelector(".purchase-item")
    .addEventListener("click", function () {
      //alert('매입전표 등록 선택됨');
      document.getElementById("dropdownMenu").style.display = "none";
    });

  // 메뉴 외부 클릭 시 드롭다운 메뉴 숨기기
  document.addEventListener("click", function (event) {
    const dropdownMenu = document.getElementById("dropdownMenu");
    const newButton = document.getElementById("new");

    if (
      !newButton.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.style.display = "none";
    }
  });
  
  // 전자세금계산서 전송 상태에 따라 필드값 활성/비활성 상태 업데이트
  function updateSlipDetailInputs(isSlipDetailReadOnly) {
	const slipDetailInputs = Array.from(document.querySelectorAll(".form-control")).filter(input => {
		const inputName = input.getAttribute('name');
		if(
			inputName !== 's_no' && inputName !== 'p_no' &&
			inputName !== 's_clientName' && inputName !== 'p_clientName' &&
			inputName !== 's_acctName' && inputName !== 'p_acctName'
		){
			return true;
		} else {
			return false;
		}
	});
	
	if(isSlipDetailReadOnly) {
		for(let inputEle of slipDetailInputs) {
			inputEle.setAttribute("readonly", true);
		}
		for(let deleteBtn of document.querySelectorAll(".deleteBtn")){
			deleteBtn.disabled = true;
		}
		for(let updateBtn of document.querySelectorAll(".updateBtn")){
			updateBtn.disabled = true;
		}
		for(let mgBtn of document.querySelectorAll(".mgBtn")) {
			mgBtn.disabled = true;
		}
	} else {
		for(let inputEle of slipDetailInputs) {
			inputEle.removeAttribute("readonly");
		}
		for(let deleteBtn of document.querySelectorAll(".deleteBtn")){
			deleteBtn.disabled = false;
		}
		for(let updateBtn of document.querySelectorAll(".updateBtn")){
			updateBtn.disabled = false;
		}
		for(let mgBtn of document.querySelectorAll(".mgBtn")) {
			mgBtn.disabled = false;
		}
	}
  }
  
  // 공급가액, 부가세, 합계, 부가세 유형 필드
  const priceInput = document.querySelector("input[name='s_price']");
  const vatInput = document.querySelector("input[name='s_vat']");
  const totalInput = document.querySelector("input[name='s_amount']");
  const vatTypeSelect = document.querySelector("select[class~='form-select']");

  // 콤마 추가
  function formatNumber(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // 콤마 제거 및 음수 기호 처리
  function parseNumber(value) {
    // 값이 "-" 또는 "-" 뒤에 숫자만 있는 경우 처리
    if (/^-?$/.test(value)) return 0; // "-"만 입력 시 임시로 0 반환
    return parseInt(value.replace(/,/g, ""), 10) || 0;
  }

  // 부가세 계산 함수
  function calculateVat() {
    const price = parseNumber(priceInput.value); // 공급가액
    const vatType = vatTypeSelect.value; // 부가세 유형

    let vat = 0;

    if (isNaN(price)) {
      // 유효하지 않은 입력 시 부가세 초기화
      vatInput.value = "";
      totalInput.value = "";
      return;
    }

    // 과세인 경우 공급가액의 10%를 부가세로 설정
    if (vatType === "과세") {
      vat = Math.floor(price * 0.1);
    } else {
      vat = 0; // 면세 또는 영세일 경우 부가세는 0
    }

    vatInput.value = formatNumber(vat); // 부가세 계산
    calculateTotal(); // 합계 계산
  }

  // 합계 계산 함수
  function calculateTotal() {
    const price = parseNumber(priceInput.value); // 공급가액
    const vat = parseNumber(vatInput.value); // 부가세

    if (isNaN(price) || isNaN(vat)) {
      // 유효하지 않은 입력 시 합계 초기화
      totalInput.value = "";
      return;
    }

    const total = price + vat; // 합계 = 공급가액 + 부가세
    totalInput.value = formatNumber(total); // 합계에 콤마 추가
  }

  // 공급가액 입력 시 부가세 및 합계 자동 계산
  priceInput.addEventListener("input", function () {
    const rawValue = priceInput.value;

    if (/^-?$/.test(rawValue)) {
      // 유효하지 않은 상태: '-' 또는 빈 입력만 존재
      priceInput.value = rawValue; // 그대로 유지
      vatInput.value = "";
      totalInput.value = "";
      return;
    }

    const parsedValue = parseNumber(rawValue); // 콤마 제거 후 숫자로 변환
    priceInput.value = formatNumber(parsedValue); // 실시간으로 콤마 추가
    calculateVat(); // 부가세 및 합계 계산
  });

  // 부가세 수정 시 합계 자동 계산
  vatInput.addEventListener("input", function () {
    const rawVat = vatInput.value.replace(/,/g, ""); // 콤마 제거

    // "-"만 입력한 경우에는 바로 업데이트하지 않고 유효성을 유지
    if (/^-?$/.test(rawVat)) {
      vatInput.value = rawVat; // "-" 또는 "" 그대로 유지
      return; // 나머지 계산 스킵
    }

    const formattedVat = formatNumber(parseNumber(rawVat)); // 콤마 추가
    vatInput.value = formattedVat;
    calculateTotal(); // 합계 계산
  });

  // 부가세 유형 변경 시 부가세 및 합계 자동 계산
  vatTypeSelect.addEventListener("change", calculateVat);
});
