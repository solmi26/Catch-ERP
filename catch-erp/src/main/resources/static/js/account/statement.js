/**
 * 전표 관리 페이지 js
 * 조회, 수정, 삭제
 */

let grid = null;
document.addEventListener("DOMContentLoaded", function () {
  // 그리드 초기화
  grid = new tui.Grid({
    el: document.querySelector("#grid"),
    scrollX: true,
    scrollY: true,
    pageOptions: {
      useClient: true,
      perPage: 15,
    },
    columns: [
      {
        header: "전표번호", // 전표번호
        name: "voucherNumber",
        align: "center",
        formatter: ({ value }) => `<a href="#" class="btn-link text-primary">${value}</a>`,
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
      },
      {
        header: "거래처", // 거래처명
        name: "clientName",
        align: "left",
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

  /**grid.getData().forEach((row) => {
    console.log(row.transactionType === "매출전표");
    let check = row.transactionType === "매출전표";
    if (check) {
      grid.addRowClassName(row.rowKey, "sales");
    } else {
      grid.addRowClassName(row.rowKey, "purchase");
    }
  });
**/

  // 그리드 클릭 이벤트 -> 추후 수정
  grid.on("click", (event) => {
    if (event.columnName === "debentureNo" && event.rowKey >= 0) {
      console.log("클릭이벤트 발생");
      console.log(event.rowKey);
    }
  });

  // 데이터 로드
  fetch("/sales/selectSlip")
    .then((result) => result.json())
    .then((result) => {
      let dataArr = result.map((ele) => ({
        voucherNumber: ele.salesChitNo,
        transactionType: ele.type,
        date: ele.chitDate,
        amount: ele.supplyPrice,
        clientName: ele.clientCode,
        description: ele.summary,
        eTaxInvoice: ele.invoiceStatus,
      }));

      grid.resetData(dataArr);

      // 데이터 로드 후 스타일 적용
      grid.getData().forEach((row) => {
        console.log(row.transactionType === "매출전표");
        let check = row.transactionType === "매출전표";
        if (check) {
          grid.addRowClassName(row.rowKey, "sales");
        } else {
          grid.addRowClassName(row.rowKey, "purchase");
        }
      });
    });

  // 선택 삭제 버튼
  document.querySelector("#deleteButton").addEventListener("click", function () {
    console.log("삭제 버튼 클릭됨");
    let selectedRows = grid.getCheckedRows(); // 체크된 데이터
    console.log("선택된 데이터:", selectedRows);

    if (selectedRows.length === 0) {
      alert("삭제할 전표를 선택하세요.");
      return;
    }

    // "미전송 상태의 전표만 전송"
    const deletableRows = selectedRows.filter((row) => row.eTaxInvoice === "미전송");
    const undeletableRows = selectedRows.filter((row) => row.eTaxInvoice !== "미전송");

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
      .then((response) => response.text())
      .then((result) => {
        console.log("데이터 : ", result);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
