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
      { header: "계약번호", name: "contractNumber", align: "center", sortable: true,
	  formatter: ({ value }) =>
	           `<a href="#" class="btn-link text-primary">${value}</a>`,
	   }, // 계약번호
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
  
   	//블러걸기
 	document.getElementById("updateBtn").addEventListener("mouseover", function () {
		grid.blur();
	});

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
		document.getElementById("attachment-url-up").value = result.updateUrl;
		document.getElementById("fileName").href = "/fileDownload?file=" + result.updateUrl + `&fileName=${result.url}`;
		
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
  
  // 수정 버튼. 매입 계약 수정.
    document.getElementById("updateBtn").addEventListener("click", function () {
      console.log("수정 버튼 이벤트");

      // 폼 데이터 필수 값 입력 확인(계약일자, 계약명, 거래처)
      const contractDate = document.getElementById("contract-date").value.trim();
      const contractName = document.getElementById("contract-name").value.trim();
      const clientCode = document.getElementById("c_clientInput2").value.trim();

      const missingFields = [];
      if (!contractDate) missingFields.push("계약일자");
      if (!contractName) missingFields.push("계약명");
      if (!clientCode) missingFields.push("거래처");

      if (missingFields.length > 0) {
        alert(`${missingFields.join(", ")}은(는) 필수 입력 값입니다.`);
        return; // 서버로 전송X
      }

      // 그리드 데이터 수집 및 필수 값 입력 확인(품목명, 단가)
      const gridData = grid.getData(); // 전체 그리드 데이터
      const invalidRows = []; // 누락된 데이터 정보를 저장할 배열

      gridData.forEach((row, index) => {
        const missingFields = [];
        if (!row.itemName) missingFields.push("품목명");
        //if (!row.price || row.price <= 0) missingFields.push('단가'); -> 단가는 0원 일 경우가 발생할 수도 있을 것 같아서 제외 함.

        if (missingFields.length > 0) {
          invalidRows.push(`${index + 1}행의 ${missingFields.join(", ")}이 누락되었습니다.`);
        }
      });

      // 누락된 데이터 확인
      if (invalidRows.length > 0) {
        //alert(`※ 품목 데이터를 확인해주세요.\n\n${invalidRows.join('\n')}`);
        alert(`${invalidRows.join("\n")}`);
        return; // 서버로 전송하지 않음
      }

      // 유효한 데이터만 필터링
      //const validGridData = gridData.filter(row => row.itemName && row.price > 0);

      // 데이터 받아오기
      const contractData = {
        conDate: document.getElementById("contract-date").value, // 계약일자
        conNo: document.getElementById("contract-code").value, // 계약번호
        conName: document.getElementById("contract-name").value, // 계약명
        clientCode: document.getElementById("c_clientInput2").value, // 거래처
        conSdate: document.getElementById("billing-start-date").value, // 계약시작일
        conEdate: document.getElementById("billing-end-date").value, // 계약종료일
        status: document.getElementById("status").value, // 계약상태
        emoployeeCode: document.getElementById("c_empCode").value, // 담당자 코드
        emoloyeeName: document.getElementById("c_empName").value, // 담당자 이름
        summary: document.getElementById("description").value, // 적요
        writer: "차은우", // 작성자
        detailContraceVO: grid.getData(), // 그리드 데이터를 detailContraceVO로 추가(디테일 테이블 추가용)
        updateUrl : document.getElementById("attachment-url-up").value || null,
		url: document.getElementById("attachment-url").value || null, // URL 값 사용
		deleted: document.getElementById("attachment-url").dataset.deleted === "true", // 삭제 여부 플래그
      };

      const fileInput = document.getElementById("attachment-file");
      const file = fileInput.files[0]; // 첨부파일
      const formData = new FormData();

      console.log(contractData);
      // Form 데이터에 데이터 추가
      formData.append("contract", new Blob([JSON.stringify(contractData)], { type: "application/json" }));
      if (file) {
        formData.append("file", file); // 첨부파일 추가
      }

      // 서버로 데이터 전송
      fetch("/sales/updateContract", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("수정 실패");
          }
          return response.text();
        })
        .then((result) => {
			alert("수정이 완료되었습니다.");
			conModal.hide();
			document.getElementById("attachment-file").value = ""; // 파일 필드 초기화
			document.getElementById("attachment-url").dataset.deleted = "false"; // 삭제 플래그 초기화
			
			// 수정 시 그리드 다시 로드
			loadGridData();
			
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("수정 실패: " + error.message);
        });
    });
	
	// 삭제 버튼 클릭 이벤트
	document.getElementById("delete-attachment").addEventListener("click", function () {
	    // 첨부파일 관련 필드 초기화
	    document.getElementById("attachment-file").value = "";
	    document.getElementById("attachment-url").value = ""; // URL도 초기화
	    document.getElementById("attachment-url").dataset.deleted = "true"; // 삭제 플래그 설정
	});

	// 모달이 닫힐 때 초기화
	conModalElement.addEventListener("hidden.bs.modal", function () {
	    document.getElementById("attachment-file").value = "";
	    document.getElementById("attachment-url").value = "";
	    document.getElementById("attachment-url").dataset.deleted = "false"; // 삭제 플래그 초기화
	});
});
