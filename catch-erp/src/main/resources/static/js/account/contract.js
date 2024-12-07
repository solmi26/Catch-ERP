/**
 * 계약 조회, 상세조회, 수정 페이지
 */

let c_grid = null;
document.addEventListener("DOMContentLoaded", function () {
	
	// 계약 수정 모달
	const conModalElement = document.getElementById("conModal");
	
	// conModal이 존재하는 경우 Modal 인스턴스 생성
	if (conModalElement) {
	  conModal = new bootstrap.Modal(conModalElement);
	} else {
	  console.error("conModal 요소가 없습니다.");
	}
	
  // 그리드 초기화
  c_grid = new tui.Grid({
    el: document.querySelector("#c_grid"),
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
        //console.log(result);

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

        c_grid.resetData(dataArr);
      });
  }

  loadGridData();

  let currentTarget = null; // 현재 클릭된 대상

  c_grid.on("click", (ev) => {
    const row = c_grid.getRow(ev.rowKey);
	console.log(row);
    // 선택된 계약 정보 서버에서 가져오기
    fetch(`/sales/infoContract?conNo=${row.contractNumber}`)
	.then((response) => response.json())
	.then((result) => {
		console.log("result::",result)
		
		document.getElementById("contract-date").value = result.conDate;
		document.getElementById("contract-code").value = result.conNo; 	
		document.getElementById("contract-name").value = result.conName;
		document.getElementById("c_clientInput").value = result.clientName;
		document.getElementById("c_clientInput2").value = result.clientCode;
		document.getElementById("billing-start-date").value = result.conSdate;
		document.getElementById("billing-end-date").value = result.conEdate;
		document.getElementById("status").value = getStatusValue(result.status);
		document.getElementById("c_empName").value = result.emoloyeeName;
		document.getElementById("c_empCode").value = result.emoployeeCode;
		document.getElementById("description").value = result.summary;
		document.getElementById("attachment-url").value = result.url;
		// 하단 grid 요소에 resetData메서드를 사용해서 항목 추가
		// resetData 사용법 참조: https://github.com/nhn/tui.grid/blob/master/packages/toast-ui.grid/docs/ko/getting-started.md#데이터-입력하기
		grid.resetData(result.detailContraceVO);
	});
	
	if (ev.columnName === "contractNumber") {
	    currentTarget = ev;
	    conModal.show();
		window.setTimeout(function () {
		 grid.refreshLayout();
		}, 200);
	}
	  
  });
  
  function getStatusValue(status) {
	let value = '';
	
	switch(status) {
		case "진행":
			value = "g1";
			break;
		case "종료":
			value = "g2";
			break;
		case "보류":
			value = "g3";
		case "해지":
			value = "g4";
			break;
		default:
			value = "";
			console.warn(`해당하는 계약 상태가 없습니다. status: ${status}`);
			break;
	}
	
	return value;
  }
});
