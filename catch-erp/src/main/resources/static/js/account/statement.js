/**
 * 전표 관리 페이지 js
 * 조회, 수정, 삭제
 */

let grid = null;
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

  let currentTarget = null; // 현재 클릭된 대상

  // #region
  // 전표 번호 클릭 시 전표 상세보기 및 수정, 삭제하는 로직
  grid.on("click", (ev) => {
    console.log("check!", ev);
    const row = grid.getRow(ev.rowKey); // 클릭된 행의 데이터 가져오기

    let selectData = {
      salesChitNo: row.voucherNumber, // 전표번호
      type: row.transactionType, // 전표유형
    };

    console.log(selectData.salesChitNo);
    console.log(selectData.type);

    // 선택된 전표 정보 서버에서 가져오기
    fetch(
      `/sales/selectSlipInfo?salesChitNo=${selectData.salesChitNo}&type=${selectData.type}`
    )
      .then((response) => response.json())
      .then((result) => {
        let data = result;
        console.log("매입전표::", data);
        // 가져온 데이터 필드에 삽입
        document.getElementById("date").value = result.chitDate || "2024/11/01"; // 전표일자
        document.getElementById("no").value =
          result.salesChitNo || result.purchaseChitNo; // 전표번호
        document.getElementById("joinInput").value =
          result.saleslipNo || result.purcslipNo || ""; // 구매, 판매전표
        document.getElementById("clientInput").value = result.clientCode || "";
        document.getElementById("acctInput").value = result.acctName || "";
        document.getElementById("price").value = result.supplyPrice
          ? Number(result.supplyPrice).toLocaleString()
          : "0";
        document.getElementById("vat").value = result.vat
          ? Number(result.vat).toLocaleString()
          : "0";
        document.getElementById("amount").value = result.totalPrice
          ? Number(result.totalPrice).toLocaleString()
          : "0";
        document.getElementById("summary").value = result.summary || "";
      })
      .catch((err) => {
        console.log("에러 : " + err);
      });

    // 전표번호(열) 클릭 시 모달 표시
    if (ev.columnName === "voucherNumber") {
      currentTarget = ev;
      console.log(grid.getFormattedValue(ev.rowKey, "transactionType"));
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
});
