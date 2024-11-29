/**
 * 전자세금계산서 페이지 js
 * 조회, 국세청 전송, 발송 취소
 */

let grid = null;
document.addEventListener("DOMContentLoaded", function () {
  
  // 그리드 초기화
  grid = new tui.Grid({
    el: document.querySelector('#grid'), // 그리드를 표시할 DOM 요소의 id 지정
    //data: gridData, // gridData를 불러와서 그리드로 렌더링
    scrollX: true,
    scrollY: true,
    pageOptions: {
      useClient: true,
      perPage: 15,
    },
    columns: [ // 각 열의 헤더 이름, 데이터 키, 정렬 가능 여부, 정렬 방향 등을 정의
      {
        header: "세금계산서 번호", 
        name: "invoiceNo",
        align: "center",
        formatter: ({ value }) => `<a href="#" class="btn-link text-primary">${value}</a>`,
      },    
      {
        header: '작성일자',
        name: 'date',
        sortable: true,
        align: 'center',
      },
      {
        header: '국세청 전송 일자',
        name: 'taxDate',
        sortable: true,
        align: 'center',
      },
      {
        header: '거래처명',
        name: 'clientName',
        sortable: true,
        align: 'center'
      },
      {
        header: '공급가액',
        name: 'supplyAmount',
        sortable: true,
        align: 'right',
        formatter: function (e) {
          const value = e.value !== undefined && e.value !== null ? e.value : 0; // 기본값 0
          return Number(value).toLocaleString() + "원"; // 숫자로 변환 후 포맷팅
        },
      },
      {
        header: '전자세금계산서 전송 상태',
        name: 'taxProgress',
        sortable: true,
        align: 'center',
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
        type: 'checkbox',
        header: 
          `<span class="custom-input">
          <input type="checkbox" id="all-checkbox" class="hidden-input" name="_checked" />
            <label for="all-checkbox" class="checkbox selectCheck">✔</label>
          </span>`,
        renderer: {
          type: gridCheckbox
        }
      }
    ],
  });

  // 데이터 로드 함수
  function loadGridData() {
    fetch("/sales/invoiceList")
      .then((result) => result.json())
      .then((result) => {
        let dataArr = result.map((ele) => ({
          invoiceNo: ele.invoiceNo,
          date: ele.invoiceDate,
          taxDate: ele.ntsInvoiceDate || '-',
          clientName: ele.clientName,
          supplyAmount: ele.supplyPrice,
          taxProgress: ele.invoiceStatus
        }));
        
        grid.resetData(dataArr);
      });
  }
  
  loadGridData();

  // 그리드 내 클릭이벤트 -> 추후 내가 필요할 때 수정해서 사용
  grid.on('click', (event) => {
    if (event.columnName === 'debentureNo' && event.rowKey >= 0) {
      console.log('클릭이벤트 발생');
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
