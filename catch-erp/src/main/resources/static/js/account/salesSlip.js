// 매출전표 등록 ajax
document.addEventListener("DOMContentLoaded", function () {
  // 공급가액, 부가세, 합계 필드
  const priceInput = document.querySelector("input[name='price']");
  const vatInput = document.querySelector("input[name='vat']");
  const totalInput = document.querySelector("input[name='amount']");
  const vatTypeSelect = document.querySelector("select[class='form-select']");

  // 부가세 계산 함수
  function calculateVat() {
    const price = parseInt(priceInput.value) || 0; // 공급가액
    const vatType = vatTypeSelect.value;

    if (vatType === "과세") {
      vatInput.value = Math.floor(price * 0.1); // 부가세는 공급가액의 10%
    } else {
      vatInput.value = 0; // 면세 또는 영세일 경우 부가세는 0
    }

    calculateTotal(); // 합계 계산
  }

  // 합계 계산 함수
  function calculateTotal() {
    const price = parseInt(priceInput.value) || 0;
    const vat = parseInt(vatInput.value) || 0;

    totalInput.value = price + vat; // 합계 = 공급가액 + 부가세
  }

  // 공급가액 입력 시 부가세 및 합계 자동 계산
  priceInput.addEventListener("input", calculateVat);
  // 부가세 유형 변경 시 부가세 및 합계 자동 계산
  vatTypeSelect.addEventListener("change", calculateVat);

  // 저장 버튼 클릭 이벤트
  document.getElementById("save-btn").addEventListener("click", function (event) {
    const chitDate = document.querySelector("input[name='date']").value; // 전표일자
    const client = document.querySelector("input[name='client']").value; // 거래처 코드
    const acct = document.querySelector("input[name='acct']").value; // 계정명
    const price = priceInput.value; // 공급가액
    const vat = vatInput.value; // 부가세
    const amount = totalInput.value; // 합계
    const writer = "김도영"; // 작성자
    const balance = amount; // 채권 잔액
    const summary = document.querySelector("input[name='summary']").value; // 적요
    const saleslip = document.querySelector("input[name='saleslip']").value; // 판매전표 번호

    const salesData = {
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

    // 확인용 콘솔 출력
    console.log(salesData);

    // AJAX 요청
    fetch("/insertSales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(salesData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        alert("저장이 완료되었습니다.");
      })
      .catch((error) => {
        console.error("Error: ", error);
        alert("서버와 연결에 실패했습니다.");
      });
  });
});
