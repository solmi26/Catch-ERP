// 매출전표 등록 페이지 js

// 페이지 로드 완료 시 실행
document.addEventListener("DOMContentLoaded", function () {
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

  // 저장 버튼 클릭 이벤트
  const target = document.getElementById("save-btn").addEventListener("click", function (event) {
    // 필수 입력값
    // name은 alert 창에 띄울 내용, ele는 html 요소
    const requiredFields = [
      { name: "전표일자", element: document.querySelector("input[name='s_date']") },
      { name: "거래처", element: document.querySelector("input[name='s_clientName']") },
      { name: "계정명", element: document.querySelector("input[name='s_acctCode']") },
      { name: "공급가액", element: document.querySelector("input[name='s_price']") },
      { name: "부가세", element: document.querySelector("input[name='s_vat']") },
      { name: "합계", element: document.querySelector("input[name='s_amount']") },
    ];

    let isAllow = true;
    let noValueFields = [];

    // 입력되었는지 확인
    requiredFields.forEach((field) => {
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
      // target = true;
      //alert(`${noValueFields.join(", ")}를 입력해주세요.`);
	  toastr.clear();
	  toastr.warning(`${noValueFields.join(", ")}를 입력해주세요.`);
      return;
    }

    // 저장 로직
    const chitDate = document.querySelector("input[name='s_date']").value; // 전표일자
    const client = document.querySelector("input[name='s_clientCode']").value; // 거래처 코드
    const acct = document.querySelector("input[name='s_acctName']").value; // 계정명
    const price = parseNumber(priceInput.value); // 공급가액 (숫자로 변환)
    const vat = parseNumber(vatInput.value); // 부가세 (숫자로 변환)
    const amount = parseNumber(totalInput.value); // 합계 (숫자로 변환)
    const writer = "김도영"; // 작성자
    const balance = amount; // 채권 잔액
    const summary = document.querySelector("input[name='s_summary']").value; // 적요
    const saleslip = document.querySelector("input[name='s_joinInput']").value; // 판매전표 번호

    const salesData = {
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

    // 디버깅용
    console.log(salesData);

    // AJAX 요청
    fetch("/sales/insertSales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(salesData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        //alert("저장이 완료되었습니다.");
		toastr.clear();
		toastr.success("저장이 완료되었습니다.");
        document.salesForm.reset();
      })
      .catch((error) => {
        console.error("Error: ", error);
		//alert("서버와 연결에 실패했습니다.");
		toastr.clear();
		toastr.error(`저장 중 문제가 발생했습니다.`);
      });
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

  /*============================
  	회계계정 모달 JS
  ==============================*/

  const acctModal = new bootstrap.Modal(document.getElementById("s_acctModal"));

  //모달실행 시 grid refresh를 위한 코드
  document.getElementById("s_openAcctModal").addEventListener("click", function () {
    acctModal.show();
    window.setTimeout(function () {
      grid1.refreshLayout();
    }, 200);
  });

  //모달에 적용될 그리드라서 refreshLayout() 사용을 위해 전역스코프로 변수를 선언하였음.
  let grid1 = new Grid({
    el: document.getElementById("s_acctGrid"),
    scrollX: true,
    scrollY: true,
	pageOptions: {
	  useClient: true,
	  perPage: 12,
	},
    header: { height: 40 },
    bodyHeight: 500,
    width: "auto",
    contextMenu: null,
    rowHeaders: [
      {
        type: "rowNum",
        header: "No.",
        width: 70,
        className: "border",
      },
    ],
    columns: [
      {
        header: "계정코드",
        name: "acctCode",
        align: "center",
        width: 190,
        whiteSpace: "normal",
        className: "border",
        filter: "select",
        renderer: {
          type: ButtonRenderer,
        },
      },
      {
        header: "계정명",
        name: "acctName",
        align: "center",
        width: 230,
        whiteSpace: "normal",
        className: "border",
        filter: "select",
      },
    ],
  });

  grid1.on("click", function (ev) {
    let rowKeyNum;
    if (ev.columnName == "acctCode") {
      rowKeyNum = ev.rowKey;
      let inputTag = document.getElementById("s_acctInput");
      let inputTag2 = document.getElementById("s_acctInput2");
      inputTag.value = "";
      inputTag.value = grid1.getValue(rowKeyNum, "acctName");
      inputTag2.value = grid1.getValue(rowKeyNum, "acctCode"); //거래처코드가 들어갈 hidden input

      console.log(inputTag.value);
    }
  });

  // 모달 그리드에 데이터 넣기(출력)
  fetch("/sales/selectAcct")
    .then((result) => result.json())
    .then((result) => {
      let dataArr = [];
      result.forEach((ele) => {
        let dataRow = {};
        dataRow.acctCode = ele.acctCode;
        dataRow.acctName = ele.acctName;
        console.log(ele);

        dataArr.push(dataRow);
      });
      grid1.resetData(dataArr);
    });

  /*============================
  	거래처 모달 JS
  ==============================*/

  // 모달 관련 JavaScript
  const clientModal = new bootstrap.Modal(document.getElementById("s_clientModal"));

  //모달실행 시 grid refresh를 위한 코드
  document.getElementById("s_openClientModal").addEventListener("click", function () {
    clientModal.show();
    window.setTimeout(function () {
      s_grid3.refreshLayout();
    }, 200);
  });

  // 필터 설정을 위한 옵션
  const columnFilters = ["c7", "c1", "c2", "c3", "c4", "c5", "c6"]; // 필터가 필요한 컬럼의 name 값
  
  //모달에 적용될 그리드라서 refreshLayout() 사용을 위해 전역스코프로 변수를 선언하였음.
  let s_grid3 = new Grid({
    el: document.getElementById("s_clientGrid"),
    scrollX: true,
    scrollY: true,
	pageOptions: {
	  useClient: true,
	  perPage: 12,
	},
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
		filter: "select",
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

  // 클릭 이벤트 처리 - 필터와 별개로 동작하도록 설정
  s_grid3.on("click", function (ev) {
    // 헤더 영역 클릭 시 필터 동작만 허용
    if (columnFilters.includes(ev.columnName) && ev.targetType === "columnHeader") {
      return; // 필터 UI가 동작하도록 클릭 이벤트 중단
    }

    // 데이터 셀 클릭 시 동작
    if (ev.columnName === "c7" && ev.targetType === "cell") {
      const rowKeyNum = ev.rowKey;
      let inputTag = document.getElementById("s_clientInput");
      let inputTag2 = document.getElementById("s_clientInput2");
      inputTag.value = "";
      inputTag.value = s_grid3.getValue(rowKeyNum, "c1");
      inputTag2.value = s_grid3.getValue(rowKeyNum, "c7"); // 거래처코드가 들어갈 hidden input

      console.log(inputTag.value);
      clientModal.hide();
    }
  });

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
      s_grid3.resetData(dataArr);
    });

  /*============================
		판매전표 모달 JS
	==============================*/

  const salesModal = new bootstrap.Modal(document.getElementById("salesModal"));

  //모달실행 시 grid refresh를 위한 코드
  document.getElementById("openSalesModal").addEventListener("click", function () {
    salesModal.show();
    window.setTimeout(function () {
      grid2.refreshLayout();
    }, 200);
  });

  let grid2 = new Grid({
    el: document.getElementById("salesGrid"),
    scrollX: true,
    scrollY: true,
	pageOptions: {
	  useClient: true,
	  perPage: 12,
	},
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
        header: "발행상태",
        name: "c10",
        align: "center",
        width: 100,
        whiteSpace: "normal",
        className: "border",
      },
      {
        header: "판매전표 No.",
        name: "c1",
        align: "center",
        width: 120,
        whiteSpace: "normal",
        className: "border",
        filter: "select",
        renderer: {
          type: ButtonRenderer,
        },
      },
      {
        header: "판매일자",
        name: "c2",
        align: "center",
        width: 120,
        whiteSpace: "normal",
        className: "border",
        filter: {
          type: "date",
          options: {
            format: "yyyy.MM.dd",
            language: "ko",
          },
        },
      },
      {
        header: "거래처 코드",
        name: "c3",
        align: "center",
        width: 100,
        whiteSpace: "normal",
        className: "border",
		filter: "select",
      },
      {
        header: "거래처명",
        name: "c4",
        align: "center",
        width: 200,
        whiteSpace: "normal",
        className: "border",
		filter: "select",
      },
      {
        header: "공급가액",
        name: "c5",
        align: "center",
        width: 100,
        whiteSpace: "normal",
        editor: "text",
        className: "border",
		filter: "select",
        formatter: function (e) {
          const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
          return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
        },
      },
      {
        header: "부가세",
        name: "c6",
        align: "center",
        width: 100,
        whiteSpace: "normal",
        editor: "text",
        className: "border",
		filter: "select",
        formatter: function (e) {
          const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
          return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
        },
      },
      {
        header: "적요",
        name: "c7",
        align: "center",
        width: 200,
        whiteSpace: "normal",
		filter: "select",
        className: "border",
      },
      {
        header: "담당자 코드",
        name: "c8",
        align: "center",
        width: 100,
        whiteSpace: "normal",
        className: "border",
		filter: "select",
      },
      {
        header: "담당자명",
        name: "c9",
        align: "center",
        width: 200,
        whiteSpace: "normal",
        className: "border",
		filter: "select",
      },
    ],
  });

  grid2.on("click", function (ev) {
    let rowKeyNum;
    if (ev.columnName == "c1") {
      rowKeyNum = ev.rowKey;
      let inputTag1 = document.getElementById("s_joinInput");
      let inputTag2 = document.getElementById("s_clientInput");
      let inputTag3 = document.getElementById("s_clientInput2");
      let inputTag4 = document.getElementById("s_price");
      //let inputTag5 = document.getElementById("vat");
      //let inputTag6 = document.getElementById("amount");
      let inputTag7 = document.getElementById("s_summary");

      inputTag1.value = "";
      inputTag1.value = grid2.getValue(rowKeyNum, "c1");

      inputTag2.value = "";
      inputTag2.value = grid2.getValue(rowKeyNum, "c4");

      inputTag3.value = "";
      inputTag3.value = grid2.getValue(rowKeyNum, "c3");

      inputTag4.value = "";
      inputTag4.value = grid2.getValue(rowKeyNum, "c5");

      inputTag4.dispatchEvent(new Event("input"));

      inputTag7.value = "";
      inputTag7.value = grid2.getValue(rowKeyNum, "c7");
    }
  });

  // 그리드에 데이터 넣기(출력)
  fetch("/sales/selectSalesChitState?state=r1")
    .then((result) => result.json())
    .then((result) => {
      let dataArr = [];
      result.forEach((ele) => {
        let dataRow = {};
        dataRow.c1 = ele.saleslipNo;
        dataRow.c2 = ele.insertDate;
        dataRow.c3 = ele.clientCode;
        dataRow.c4 = ele.clientName;
        dataRow.c5 = ele.supplyPrice;
        dataRow.c6 = ele.vat;
        dataRow.c7 = ele.salesSummary;
        dataRow.c8 = ele.employeeCode;
        dataRow.c9 = ele.employeeName;
        dataRow.c10 = ele.slipState;
        dataArr.push(dataRow);
      });
      console.log(result, dataArr);
      grid2.resetData(dataArr);
    });

  // 버튼 클릭 이벤트(미발행 발행)
  document.querySelectorAll(".filter-item").forEach((button) => {
    button.addEventListener("click", function () {
      const state = this.dataset.state; // 버튼의 data-state 속성 값 가져오기
      fetch(`/sales/selectSalesChitState?state=${state}`)
        .then((result) => result.json())
        .then((result) => {
          let dataArr = [];
          result.forEach((ele) => {
            let dataRow = {};
            dataRow.c1 = ele.saleslipNo;
            dataRow.c2 = ele.insertDate;
            dataRow.c3 = ele.clientCode;
            dataRow.c4 = ele.clientName;
            dataRow.c5 = ele.supplyPrice;
            dataRow.c6 = ele.vat;
            dataRow.c7 = ele.salesSummary;
            dataRow.c8 = ele.employeeCode;
            dataRow.c9 = ele.employeeName;
            dataRow.c10 = ele.slipState;
            dataArr.push(dataRow);
          });
          grid2.resetData(dataArr);
        });
    });
  });
});