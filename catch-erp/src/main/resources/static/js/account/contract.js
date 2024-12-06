/**
 * 계약 조회, 상세조회, 수정 페이지
 */

let grid = null;
document.addEventListener("DOMContentLoaded", function () {
  // 그리드 초기화
  const grid = new tui.Grid({
    el: document.querySelector("#grid"),
    scrollX: true,
    scrollY: true,
    pageOptions: {
      useClient: true,
      perPage: 15,
    },
    columns: [
      { header: "계약번호", name: "contractNumber", align: "center", sortable: true }, // 계약번호
      { header: "계약명", name: "contractName", align: "center", sortable: true }, // 계약명
      { header: "거래처", name: "client", align: "center", sortable: true }, // 거래처
      { header: "계약일자", name: "contractDate", align: "center", sortable: true }, // 계약일
      { header: "계약시작일", name: "startDate", align: "center", sortable: true }, // 계약시작일
      { header: "계약종료일", name: "endDate", align: "center", sortable: true }, // 계약종료일
      { header: "계약 담당자", name: "emp", align: "center", sortable: true }, // 계약담당자
      {
        header: "계약상태",
        name: "status",
        align: "center",
        sortable: true,
        formatter: ({ value }) => {
          // 값에 따라 다른 색상 스타일 적용
          let colorClass = "";
          if (value === "진행") {
            colorClass = "g1";
          } else if (value === "종료") {
            colorClass = "g2";
          } else if (value === "보류") {
            colorClass = "g3";
          } else {
            colorClass = "g4";
          }
          return `<span class="${colorClass}">${value}</span>`;
        },
      }, // 계약상태
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
    fetch("/sales/selectContract")
      .then((result) => result.json())
      .then((result) => {
        console.log(result);

        let dataArr = result.map((ele) => ({
          contractNumber: ele.conNo,
          contractDate: ele.conDate,
          contractName: ele.conName,
          client: ele.clientName,
          startDate: ele.conSdate,
          endDate: ele.conEdate,
          status: ele.status,
          emp: ele.emoloyeeName,
        }));

        grid.resetData(dataArr);
      });
  }

  loadGridData();

  let currentTarget = null; // 현재 클릭된 대상

  grid.on("click", (ev) => {
    const row = grid.getRow(ev.rowKey);

    // 선택된 계약 정보 서버에서 가져오기
    fetch("").then().then();
  });
});
