/**
 * 계약 조회, 상세조회, 수정 페이지
 */

document.addEventListener("DOMContentLoaded", function () {
  // 그리드 기초 데이터
  const gridData = [
    {
      contractNumber: "CN-2024-001",
      contractName: "Web Development Project",
      client: "Acme Corp.",
      contractDate: "2024-01-10",
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      totalAmount: 50000000,
      status: "Active",
    },
    {
      contractNumber: "CN-2024-002",
      contractName: "Mobile App Development",
      client: "Tech Solutions",
      contractDate: "2024-02-01",
      startDate: "2024-02-05",
      endDate: "2024-10-15",
      totalAmount: 75000000,
      status: "Pending",
    },
  ];

  // 그리드 초기화
  const grid = new tui.Grid({
    el: document.querySelector("#grid"),
    data: gridData,
    scrollX: true,
    scrollY: true,
    pageOptions: {
      useClient: true,
      perPage: 5,
    },
    columns: [
      { header: "계약번호", name: "contractNumber", align: "center" }, // 계약번호
      { header: "계약명", name: "contractName", align: "center" }, // 계약명
      { header: "거래처", name: "client", align: "center" }, // 거래처
      { header: "계약일", name: "contractDate", align: "center" }, // 계약일
      { header: "계약시작일", name: "startDate", align: "center" }, // 계약시작일
      { header: "계약종료일", name: "endDate", align: "center" }, // 계약종료일
      { header: "총 계약 금액", name: "totalAmount", align: "right" }, // 총 계약 금액
      { header: "계약상태", name: "status", align: "center" }, // 계약상태
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

  // 그리드 클릭 이벤트 -> 추후 수정
  grid.on("click", (event) => {
    if (event.columnName === "debentureNo" && event.rowKey >= 0) {
      console.log("클릭이벤트 발생");
      console.log(event.rowKey);
    }
  });
});
