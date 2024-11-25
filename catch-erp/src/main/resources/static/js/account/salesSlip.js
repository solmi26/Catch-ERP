// 매출전표 등록 ajax

// 페이지 로드 시 이벤트
document.addEventListener("DOMContentLoaded", function () {
  // 저장 버튼 클릭 이벤트
  document.getElementById("save-btn").addEventListener("click", function (event) {
    // 폼에서 입력된 데이터를 가져옴
    let chitDate = document.querySelector("input[name='date']").value; // 전표일자
    let client = document.querySelector("input[name='client']").value; // 거래처 코드
    let acct = document.querySelector("input[name='client']").value; // 계정명
    let price = document.querySelector("input[name='client']").value; // 공급가액
    let vat = document.querySelector("input[name='client']").value; // 부가세
    let amount = document.querySelector("input[name='client']").value; // 합계
    let writer = "김도영"; // 작성자
    let balance = price; // 해당 매출전표에 대한 채권 잔액
    let summary = document.querySelector("input[name='summary']").value; // 적요
    let saleslip = document.querySelector("input[name='client']").value; // 판매전표 번호

    let salesData = {
      chitDate: chitDate,
      client: client,
      acct: acct,
      price: price,
      vat: vat,
      amount: amount,
      writer: writer,
      balance: balance,
      summary: summary,
      saleslip: saleslip,
    };

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
