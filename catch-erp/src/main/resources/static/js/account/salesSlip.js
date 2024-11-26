// 매출전표 등록 페이지 js

// 페이지 로드 완료 시 실행
document.addEventListener("DOMContentLoaded", function () {
  // 공급가액, 부가세, 합계, 부가세 유형 필드
  const priceInput = document.querySelector("input[name='price']");
  const vatInput = document.querySelector("input[name='vat']");
  const totalInput = document.querySelector("input[name='amount']");
  const vatTypeSelect = document.querySelector("select[class='form-select']");

  // 콤마 추가
  function formatNumber(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // 콤마 제거
  function parseNumber(value) {
    return parseInt(value.replace(/,/g, ""), 10) || 0;
  }

  // 부가세 계산 함수
  function calculateVat() {
    const price = parseNumber(priceInput.value); // 공급가액
    const vatType = vatTypeSelect.value; // 부가세 유형

    let vat = 0;

    // 과세인 경우 공급가액의 10%를 부가세로 설정
    if (vatType === "과세") {
      vat = Math.floor(price * 0.1);
    } else {
      vat = 0; // 면세 또는 영세일 경우 부가세는 0
    }

    vatInput.value = formatNumber(vat);
    calculateTotal(); // 합계 계산
  }

  // 합계 계산 함수
  function calculateTotal() {
    const price = parseNumber(priceInput.value); // 공급가액
    const vat = parseNumber(vatInput.value); // 부가세

    const total = price + vat; // 합계 = 공급가액 + 부가세
    totalInput.value = formatNumber(total); // 합계에 콤마 추가
  }

  // 공급가액 입력 시 부가세 및 합계 자동 계산
  priceInput.addEventListener("input", function () {
    const rawValue = parseNumber(priceInput.value); // 콤마 제거
    priceInput.value = formatNumber(rawValue); // 실시간으로 콤마 추가
    calculateVat(); // 부가세 및 합계 계산
  });

  // 부가세 수정 시 합계 자동 계산
  vatInput.addEventListener("input", function () {
    const rawVat = parseNumber(vatInput.value); // 콤마 제거
    vatInput.value = formatNumber(rawVat); // 실시간으로 콤마 추가
    calculateTotal(); // 합계 계산
  });

  // 부가세 유형 변경 시 부가세 및 합계 자동 계산
  vatTypeSelect.addEventListener("change", calculateVat);

  // 저장 버튼 클릭 이벤트
  document
    .getElementById("save-btn")
    .addEventListener("click", function (event) {
      const chitDate = document.querySelector("input[name='date']").value; // 전표일자
      const client = document.querySelector("input[name='clientCode']").value; // 거래처 코드
      const acct = document.querySelector("input[name='acctCode']").value; // 계정명
      const price = parseNumber(priceInput.value); // 공급가액 (숫자로 변환)
      const vat = parseNumber(vatInput.value); // 부가세 (숫자로 변환)
      const amount = parseNumber(totalInput.value); // 합계 (숫자로 변환)
      const writer = "김도영"; // 작성자
      const balance = amount; // 채권 잔액
      const summary = document.querySelector("input[name='summary']").value; // 적요
      const saleslip = document.querySelector("input[name='saleslip']").value; // 판매전표 번호

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
      fetch("/insertSales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salesData),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
          alert("저장이 완료되었습니다.");
        })
        .catch((error) => {
          console.error("Error: ", error);
          alert("서버와 연결에 실패했습니다.");
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

  //모달실행 시 grid refresh를 위한 코드
  document
    .getElementById("openAcctModal")
    .addEventListener("click", function () {
      window.setTimeout(function () {
        grid1.refreshLayout();
      }, 200);
    });

  //모달에 적용될 그리드라서 refreshLayout() 사용을 위해 전역스코프로 변수를 선언하였음.
  let grid1 = new Grid({
    el: document.getElementById("acctGrid"),
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
      let inputTag = document.getElementById("acctInput");
      let inputTag2 = document.getElementById("acctInput2");
      inputTag.value = "";
      inputTag.value = grid1.getValue(rowKeyNum, "acctName");
      inputTag2.value = grid1.getValue(rowKeyNum, "acctCode"); //거래처코드가 들어갈 hidden input

      console.log(inputTag.value);
    }
  });

  // 거래처모달 그리드에 데이터 넣기(출력)
  fetch("/selectAcct")
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
  //const clientModal = document.getElementById('clientModal');

  //모달실행 시 grid refresh를 위한 코드
  document
    .getElementById("openClientModal")
    .addEventListener("click", function () {
      window.setTimeout(function () {
        grid3.refreshLayout();
      }, 200);
    });

  //모달에 적용될 그리드라서 refreshLayout() 사용을 위해 전역스코프로 변수를 선언하였음.
  let grid3 = new Grid({
    el: document.getElementById("clientGrid"),
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

  grid3.on("click", function (ev) {
    let rowKeyNum;
    if (ev.columnName == "c7") {
      rowKeyNum = ev.rowKey;
      let inputTag = document.getElementById("clientInput");
      let inputTag2 = document.getElementById("clientInput2");
      inputTag.value = "";
      inputTag.value = grid3.getValue(rowKeyNum, "c1");
      inputTag2.value = grid3.getValue(rowKeyNum, "c7"); //거래처코드가 들어갈 hidden input

      console.log(inputTag.value);
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
  fetch("/stocks/clientList")
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
      grid3.resetData(dataArr);
    });
});
