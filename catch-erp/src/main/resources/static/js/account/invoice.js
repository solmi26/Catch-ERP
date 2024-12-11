/**
 * 전자세금계산서 페이지 js
 * 조회, 국세청 전송, 발송 취소
 */

let grid = null;
document.addEventListener("DOMContentLoaded", function () {
  // 매출전표 모달
  const salesModalElement = document.getElementById("sModal");
  // 세금계산서 모달
  const invoiceModalElement = document.getElementById("iModal");
  let salesModal, invoiceModal;

  // salesModal이 존재하는 경우 Modal 인스턴스 생성
  if (salesModalElement) {
    salesModal = new bootstrap.Modal(salesModalElement);
  } else {
    console.error("salesModal 요소가 없습니다.");
  }

  // invoiceModal이 존재하는 경우 Modal 인스턴스 생성
  if (invoiceModalElement) {
    invoiceModal = new bootstrap.Modal(invoiceModalElement);
  } else {
    console.error("invoiceModal 요소가 없습니다.");
  }

  // 그리드 초기화
  grid = new tui.Grid({
    el: document.querySelector("#grid"), // 그리드를 표시할 DOM 요소의 id 지정
    scrollX: true,
    scrollY: true,
    pageOptions: {
      useClient: true,
      perPage: 15,
    },
    columns: [
      // 각 열의 헤더 이름, 데이터 키, 정렬 가능 여부, 정렬 방향 등을 정의
      {
        header: "전자세금계산서 전송 상태",
        name: "taxProgress",
        sortable: true,
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
      {
        header: "작성일자",
        name: "date",
        sortable: true,
        align: "center",
        formatter: ({ value }) =>
          `<a href="#" class="btn-link text-primary">${value}</a>`,
      },
      {
        header: "국세청 전송 일자",
        name: "taxDate",
        sortable: true,
        align: "center",
      },
      {
        header: "거래처명",
        name: "clientName",
        sortable: true,
        align: "center",
      },
      {
        header: "공급가액",
        name: "supplyAmount",
        sortable: true,
        align: "right",
        formatter: function (e) {
          const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
          return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
        },
      },
      {
        header: "부가세",
        name: "vat",
        sortable: true,
        align: "right",
        formatter: function (e) {
          const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
          return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
        },
      },
      {
        header: "합계금액",
        name: "amount",
        sortable: true,
        align: "right",
        formatter: function (e) {
          const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
          return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
        },
      },

      {
        header: "전표번호",
        name: "voucherNumber",
        align: "center",
        formatter: ({ value }) =>
          `<a href="#" class="btn-link text-primary">${value}</a>`,
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

  grid.on("click", (ev) => {
    console.log("check!", ev);
    const row = grid.getRow(ev.rowKey);
    console.log(row);

    selectData = {
      salesChitNo: row.voucherNumber, // 전표번호
      type: "매출전표", // 전표유형
    };

    // 선택된 전표 정보 서버에서 가져오기
    fetch(
      `/sales/selectSlipInfo?salesChitNo=${selectData.salesChitNo}&type=${selectData.type}`
    )
      .then((response) => response.json())
      .then((result) => {
        let data = result;

        console.log("데이터 : ", result);

        // 매출전표 관련 데이터 매핑
        document.getElementById("s_date").value =
          result.chitDate || "2024/11/01"; // 전표일자
        document.getElementById("s_no").value =
          result.salesChitNo || result.purchaseChitNo; // 전표번호
        document.getElementById("s_joinInput").value =
          result.saleslipNo || result.purcslipNo || ""; // 구매, 판매전표
        document.getElementById("s_clientInput").value =
          result.clientCode || "";
        clientCode = result.clientNo;
        console.log("code" + clientCode);
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

        // 세금계산서 모달 데이터 매핑
        document.getElementById("title1").innerHTML =
          row.taxProgress === "국세청 전송 완료"
            ? "전자세금계산서 (공급자용)"
            : "미전송전자세금계산서 (공급자용)";
        document.getElementById("title2").innerHTML =
          row.taxProgress === "국세청 전송 완료"
            ? "전자세금계산서 (공급받는자용)"
            : "미전송전자세금계산서 (공급받는자용)";
        document.getElementById("allow1").innerHTML =
          row.taxProgress === "국세청 전송 완료"
            ? `승인번호 ${result.invoiceNo}`
            : "승인번호";
        document.getElementById("allow2").innerHTML =
          row.taxProgress === "국세청 전송 완료"
            ? `승인번호 ${result.invoiceNo}`
            : "승인번호";
        document.getElementById("k_date").innerHTML = result.chitDate;
        document.getElementById("j_date").innerHTML = result.chitDate;
        document.getElementById("k_price").innerHTML = result.supplyPrice
          ? Number(result.supplyPrice).toLocaleString() + "원"
          : "0";
        document.getElementById("j_price").innerHTML = result.supplyPrice
          ? Number(result.supplyPrice).toLocaleString() + "원"
          : "0";
        document.getElementById("k_vat").innerHTML = result.vat
          ? Number(result.vat).toLocaleString() + "원"
          : "0";
        document.getElementById("j_vat").innerHTML = result.vat
          ? Number(result.vat).toLocaleString() + "원"
          : "0";
        document.getElementById("k_summary").innerHTML = result.summary;
        document.getElementById("j_summary").innerHTML = result.summary;
        document.getElementById("k_sum").innerHTML = result.totalPrice
          ? Number(result.totalPrice).toLocaleString() + "원"
          : "0";
        document.getElementById("j_sum").innerHTML = result.totalPrice
          ? Number(result.totalPrice).toLocaleString() + "원"
          : "0";
        document.getElementById("k_acc").innerHTML = result.totalPrice
          ? Number(result.totalPrice).toLocaleString() + "원"
          : "0";
        document.getElementById("j_acc").innerHTML = result.totalPrice
          ? Number(result.totalPrice).toLocaleString() + "원"
          : "0";
        document.getElementById("k_com").innerHTML =
          result.clientCode || "무한상사";
        document.getElementById("j_com").innerHTML =
          result.clientCode || "무한상사";
        document.getElementById("k_name").innerHTML =
          result.cecName || "유재석";
        document.getElementById("j_name").innerHTML =
          result.cecName || "유재석";
        document.getElementById("k_add").innerHTML =
          (result.address1 || "대구광역시 북구 중앙대로 123") +
          " " +
          (result.address2 || "100호");
        document.getElementById("j_add").innerHTML =
          (result.address1 || "대구광역시 북구 중앙대로 123") +
          " " +
          (result.address2 || "100호");
        document.getElementById("k_job").innerHTML =
          result.event || "도소매, 판매업";
        document.getElementById("j_job").innerHTML =
          result.event || "도소매, 판매업";
        document.getElementById("k_email").innerHTML =
          result.email || "def@gmail.com";
        document.getElementById("j_email").innerHTML =
          result.email || "def@gmail.com";
      })
      .catch((err) => {
        console.log("에러 : " + err);
      });

    if (ev.columnName === "voucherNumber") {
      currentTarget = ev;
      salesModal.show();
    }

    if (ev.columnName === "date") {
      currentTarget = ev;
      invoiceModal.show();
    }
  });

  // 데이터 로드 함수
  function loadGridData() {
    fetch("/sales/invoiceList")
      .then((result) => result.json())
      .then((result) => {
        let dataArr = result.map((ele) => ({
          invoiceNo: ele.invoiceNo,
          voucherNumber: ele.saleslipNo, // 전표번호
          date: ele.invoiceDate,
          taxDate: ele.ntsInvoiceDate || "-",
          clientName: ele.clientName,
          supplyAmount: ele.supplyPrice,
          taxProgress: ele.invoiceStatus,
          vat: ele.vat,
          amount: ele.totalPrice,
        }));

        grid.resetData(dataArr);

        updateStatus(result);
      });
  }

  loadGridData();

  //#region 세금계산서 상태별 개수 체크 로직
  // 미전송, 전송중, 전송완료 개수 체크
  function updateStatus(data) {
    let status = {
      // 초기화
      미전송: 0,
      전송중: 0,
      "국세청 전송 완료": 0,
    };

    // 개수 체크
    for (let item of data) {
      //console.log(item);
      const value = item.invoiceStatus;
      if (value === "미전송") {
        status[value]++;
      } else if (value === "전송중") {
        status[value]++;
      } else {
        status["국세청 전송 완료"]++;
      }
      //console.log(status)
    }
    document.querySelector(".status-count").innerHTML = `
      <div class="col status-box">
        <div class="status-number">${status["미전송"]}</div>
        <div class="status-label">미전송</div>
      </div>
      <div class="col status-box">
        <div class="status-number">${status["전송중"]}</div>
        <div class="status-label">전송중</div>
      </div>
      <div class="col status-box">
        <div class="status-number">${status["국세청 전송 완료"]}</div>
        <div class="status-label">전송완료</div>
      </div>
    `;
  }

  //#endregion

  // 국세청 즉시 전송 선택
  document.querySelector(".now-save").addEventListener("click", function () {
    console.log("즉시 전송 버튼 선택");

    let selectedRows = grid.getCheckedRows(); // 체크된 데이터
    console.log("선택된 데이터 : ", selectedRows);

    if (selectedRows.length === 0) {
      //alert("전송할 데이터를 선택하세요.");
	  toastr.clear();
      toastr.warning("전송할 데이터를 선택하세요.");
      return;
    }

    const today = new Date();
    const invalidRows = selectedRows.filter((row) => {
      const date = new Date(row.date); // 작성일자
      return date > today; // 미래 날짜인지 확인
    });

    if (invalidRows.length > 0) {
      //alert("작성일자가 오늘 이후인 세금계산서는 전송할 수 없습니다.");
	  toastr.clear();
	  toastr.warning("작성일자가 오늘 이후인 세금계산서는 전송할 수 없습니다.");
      return;
    }

    // 국세청 전송 완료인 건은 이미 국세청 전송 완료된 건이 포함되어있습니다. 표시
    const noSendRows = selectedRows.filter(
      (row) => row.taxProgress === "미전송" || row.taxProgress === "전송중"
    );

    const sendRows = selectedRows.filter(
      (row) => row.taxProgress === "국세청 전송 완료"
    );

    if (sendRows.length > 0) {
      //alert("이미 국세청 전송이 완료된 건이 포함되어 있습니다.");
	  toastr.clear();
	  toastr.warning("이미 국세청 전송이 완료된 건이 포함되어 있습니다.");
      return;
    }

    // 국세청 즉시 전송할 데이터
    let nowSendData = noSendRows.map((row) => ({
      invoiceNo: row.invoiceNo,
      saleslipNo: row.voucherNumber,
      type: "now",
    }));

    // 서버로 업데이트 요청
    fetch("/sales/updateInvoice", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nowSendData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Errow("업데이트 요청에 실패했습니다.");
        }
        return response.text();
      })
      .then((result) => {
        console.log("업데이트 결과 : ", result);
        //alert("국세청 전송이 완료되었습니다.");
		toastr.clear();
		toastr.success(`국세청 전송이 완료되었습니다.`);

        // 전송시 그리드 재로드
        loadGridData();
      })
      .catch((error) => {
        console.log("업데이트 요청 중 오류 발생 : ", error);
        //alert("국세청 전송 중 오류가 발생했습니다.");
		toastr.clear();
		toastr.error("국세청 전송 중 오류가 발생했습니다.");
      });
  });

  // 일반 전송 버튼 선택
  document.querySelector(".save").addEventListener("click", function () {
    console.log("일반 전송 버튼 선택");

    let selectedRows = grid.getCheckedRows(); // 체크된 데이터
    console.log("선택된 데이터 : ", selectedRows);

    if (selectedRows.length === 0) {
      //alert("전송할 데이터를 선택하세요.");
	  toastr.clear();
	  toastr.warning("전송할 데이터를 선택하세요.");
      return;
    }

    const today = new Date();
    const invalidRows = selectedRows.filter((row) => {
      const date = new Date(row.date); // 작성일자
      return date > today; // 미래 날짜인지 확인
    });

    if (invalidRows.length > 0) {
      //alert("작성일자가 오늘 이후인 세금계산서는 전송할 수 없습니다.");
	  toastr.clear();
	  toastr.warning("작성일자가 오늘 이후인 세금계산서는 전송할 수 없습니다.");
      return;
    }

    // 국세청 전송 완료인 건은 이미 국세청 전송 완료된 건이 포함되어있습니다. 표시
    const noSendRows = selectedRows.filter(
      (row) => row.taxProgress === "미전송"
    );

    const sendRows = selectedRows.filter(
      (row) =>
        row.taxProgress === "국세청 전송 완료" || row.taxProgress === "전송중"
    );

    if (sendRows.length > 0) {
      //alert("이미 전송중이거나 국세청 전송이 완료된 건이 포함되어 있습니다.");
	  toastr.clear();
	  toastr.warning("이미 전송중이거나 국세청 전송이 완료된 건이 포함되어 있습니다.");
      return;
    }

    // 일반 전송할 데이터
    let nowSendData = noSendRows.map((row) => ({
      invoiceNo: row.invoiceNo,
      saleslipNo: row.voucherNumber,
      type: "yet",
    }));

    // 서버로 업데이트 요청
    fetch("/sales/updateInvoice", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nowSendData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Errow("업데이트 요청에 실패했습니다.");
        }
        return response.text();
      })
      .then((result) => {
        console.log("업데이트 결과 : ", result);
        //alert("전송이 완료되었습니다. 익일 0시에 국세청으로 자동 전송됩니다.");
		toastr.clear();
		toastr.success(`전송이 완료되었습니다. 익일 0시에 국세청으로 자동 전송됩니다.`);
		
        // 전송시 그리드 재로드
        loadGridData();
      })
      .catch((error) => {
        console.log("업데이트 요청 중 오류 발생 : ", error);
        //alert("전송 중 오류가 발생했습니다.");
		toastr.clear();
		toastr.error(`전송 중 오류가 발생했습니다.`);
      });
  });

  // 발송 취소 버튼 선택
  document.querySelector(".resetBtn").addEventListener("click", function () {
    console.log("발송 취소 버튼 선택");

    let selectedRows = grid.getCheckedRows(); // 체크된 데이터
    console.log("선택된 데이터 : ", selectedRows);

    if (selectedRows.length === 0) {
      //alert("전송할 데이터를 선택하세요.");
	  toastr.clear();
	  toastr.warning("전송할 데이터를 선택하세요.");
      return;
    }

    // 국세청 전송 완료인 건은 이미 국세청 전송 완료된 건이 포함되어있습니다. 표시
    const noSendRows = selectedRows.filter(
      (row) =>
        row.taxProgress === "미전송" || row.taxProgress === "국세청 전송 완료"
    );

    const sendRows = selectedRows.filter((row) => row.taxProgress === "전송중");

    if (noSendRows.length > 0) {
      //alert("이미 미전송 상태이거나 국세청 전송 완료된 건이 포함되어있습니다.");
	  toastr.clear();
	  toastr.warning("이미 미전송 상태이거나 국세청 전송 완료된 건이 포함되어있습니다.");
      return;
    }

    // 발송 취소할 데이터
    let nowSendData = sendRows.map((row) => ({
      invoiceNo: row.invoiceNo,
      saleslipNo: row.voucherNumber,
      type: "reset",
    }));

    // 서버로 업데이트 요청
    fetch("/sales/updateInvoice", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nowSendData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Errow("발송 취소 요청에 실패했습니다.");
        }
        return response.text();
      })
      .then((result) => {
        console.log("발송 취소 결과 : ", result);
        //alert("발송취소가 완료되었습니다.");
		toastr.clear();
		toastr.success("발송취소가 완료되었습니다.");

        // 전송시 그리드 재로드
        loadGridData();
      })
      .catch((error) => {
        console.log("발송 취소 요청 중 오류 발생 : ", error);
        //alert("발송 취소 중 오류가 발생했습니다.");
		toastr.clear();
		toastr.error("발송 취소 중 오류가 발생했습니다.");
      });
  });

  // 그리드 내 클릭이벤트 -> 추후 내가 필요할 때 수정해서 사용
  grid.on("click", (event) => {
    if (event.columnName === "debentureNo" && event.rowKey >= 0) {
      console.log("클릭이벤트 발생");
      console.log(event.rowKey);
    }
  });

  // 전체, 미전송, 전송완료 클릭하면 해당 정보 표시 기능 (추후 수정해서 사용)
  const statusBoxes = document.querySelectorAll(".status-box");
  statusBoxes.forEach((box) => {
    box.addEventListener("click", function () {
      const status = box.querySelector(".status-label").textContent;
      filterByStatus(status);
    });
  });
});
