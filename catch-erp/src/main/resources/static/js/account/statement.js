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

  // 데이터 로드 함수
  function loadGridData() {
    fetch("/sales/selectSlip")
      .then((result) => result.json())
      .then((result) => {
        let dataArr = result.map((ele) => ({
          voucherNumber: ele.salesChitNo, // 전표번호
          transactionType: ele.type, // 전표유형
          date: ele.chitDate, // 전표일자
          amount: ele.supplyPrice, // 공급가액
          clientName: ele.clientCode, // 거래처코드
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
});

