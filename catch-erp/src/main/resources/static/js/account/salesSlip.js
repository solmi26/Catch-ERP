// 매출전표 등록 ajax

// 페이지 로드 시 이벤트
document.addEventListener("DOMContentLoaded", function () {
  // 공급가액, 부가세, 합계 필드
  let priceInput = document.querySelector("input[name='price']");
  let vatInput = document.querySelector("input[name='vat']");
  let totalInput = document.querySelector("input[name='amount']");
  let vatTypeSelect = document.querySelector("select[class='form-select']");

  // 부가세 계산 함수
  function cacul() {
    let price = parseInt(priceInput.value) || 0;
    let vatType = vatTypeSelect.value;

    if (vatType === "과세") {
      vatInput.value = price * 0.1;
    } else {
      vatInput.value = 0;
    }

    let vat = parseInt(vatInput.value) || 0;
    totalInput.value = price + vat;
  }

  // 값 입력시 합계 자동 계산
  priceInput.addEventListener("input", cacul);
  vatInput.addEventListener("input", cacul);

  // 저장 버튼 클릭 이벤트
  document.getElementById("save-btn").addEventListener("click", function (event) {
    // 폼에서 입력된 데이터를 가져옴
    let chitDate = document.querySelector("input[name='date']").value; // 전표일자
    let client = document.querySelector("input[name='client']").value; // 거래처 코드
    let acct = document.querySelector("input[name='acct']").value; // 계정명
    let price = document.querySelector("input[name='price']").value; // 공급가액
    let vat = document.querySelector("input[name='vat']").value; // 부가세
    let amount = document.querySelector("input[name='amount']").value; // 합계
    let writer = "김도영"; // 작성자
    let balance = amount; // 해당 매출전표에 대한 채권 잔액
    let summary = document.querySelector("input[name='summary']").value; // 적요
    let saleslip = document.querySelector("input[name='saleslip']").value; // 판매전표 번호

    let salesData = {
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

    for (const key in salesData) {
      console.log(salesData[key]);
    }

    fetch("/insertSales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // JSON 형식임을 알림
      },
      body: JSON.stringify(salesData), // 데이터를 JSON 문자열로 변환
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("Error: ", error);
        alert("서버와 연결에 실패했습니다.");
      });
  });
});
