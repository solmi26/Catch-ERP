# 웹 기반 ERP 프로젝트 : Catch ERP
<img src=https://github.com/user-attachments/assets/7989a35b-cd3e-493f-bf39-097d9d55e378 width="700" height="300"/> <br>
<strong>개발기간 : 24-10-30 ~ 24-12-10 (6주간 진행)</strong> <br><br>
수료하고나서도 1조 빠이팅
<br>

<strong>Site URL : https://www.catcherp.store / 사이트 오픈기간 ~25.02.31(변경가능성 있음)</strong> <br><br>

> ## _Table of Contents_ <br>
> ${\textsf{\textsf{\color{black}프로젝트 개요}}}$  <br>
> ${\textsf{\color{black}팀 소개}}$  <br>
> ${\textsf{\color{black}기술 스택}}$  <br>
> ${\textsf{\color{black}프로젝트 상세}}$ <br>
> ${\textsf{\color{black}회고}}$ <br>
> ${\textsf{\color{black}Etc.}}$ <br>

<br>
<br>

## _Project Summary_
<strong>*개요</strong> <br>
- <p>중소기업들은 기존의 복잡하고 고가의 ERP 솔루션을 활용하기 어려운 상황입니다. 따라서 사용법이 간단하고 합리적인 가격의 ERP 솔루션의 필요성을 느끼게 되었고 프로젝트로 주제로 선정하였습니다.  
</p>
<br>

<strong>*특징</strong>
- 기업의 확장에 따른 유연한 솔루션 확장성 제공.
- 중소기업의 경영 효율성의 극대화.
- 다양한 사용자 층을 고려한 UX 설계.
<br>

```
ERP란?
ERP의 풀네임은 Enterprise Resource Planning이고 전사적 자원 관리 시스템을 의미합니다.
기업의 핵심 업무 프로세스를 하나의 통합된 시스템을 관리하는 소프트웨어입니다.
```

<br>



## _Team Introduction_
<br>

| <img src="https://github.com/user-attachments/assets/79dd6f22-90bc-4459-a9c0-aecc4b92c15a" width="120" height="120"> | <img src="https://github.com/user-attachments/assets/e3046ab1-f0b2-490c-8f9a-6af52fda38b6" width="120" height="120"> | <img src="https://github.com/user-attachments/assets/c88897fb-4a7f-4b4b-9e4a-4f08137e81c8" width="120" height="120"> | <img src="https://github.com/user-attachments/assets/a95816c3-69ae-4f9f-88c4-623b945d21e5" width="120" height="120" > | <img src="https://github.com/user-attachments/assets/8ede5c25-0504-42ef-9ff1-5d03c2f7ba91" width="120" height="120"> |
| :-: | :-: | :-: | :-: | :-: |
| <strong><a href="https://github.com/sz5656">서권우</a></strong> | <strong><a href="https://github.com/superverygoodman">유석진</a></strong> | <strong><a href="https://github.com/solmi26">진솔미</a></strong> | <strong><a href="https://github.com/KunWooNam">남건우</a></strong> | <strong><a href="https://github.com/h0203t">권혁태</a></strong> |



<br>
<strong>*역할 분담 및 구현한 부분</strong>
<br>
<br>
<img src="https://github.com/user-attachments/assets/1f15debf-6925-43bd-b636-e012e523c7f0" width="600" height="190"/>

<br>
<br>

## _Tech Stack_

<strong>*백엔드 & 프론트엔드</strong> <br>
  
| <ins>Tool</ins> | <ins>Version</ins> | <ins>Tool</ins> | <ins>Version</ins> |
| :-- | :-- | :-- | :-- |
| Eclipse | 23-12 | Thymeleaf | 3.1.2 | 
| Java | 21 | VisualStudio Code | 1.95.3 | 
| Spring Boot | 23-12 | Toast UI Grid | 4 |
| Gradle | 3.2.11 | BootStrap | 5 |
| Oracle SQL Developer | 11 |  |  | 
| Oracl PL/SQL | - |  |  |
| erwin | - |  |  |
| MyBatis | - |  |  | 
| Eclipse | 23-12 |  |  | 

<br>

<strong>*CI & CD</strong> <br>
> Local IDE 개발 (Spring Boot)
>> GitHub
>>> Jenkins / docker
>>>> docker hub
>>>>> amazon EC2

<br>

<strong>*그외 기타 Library 및 API</strong>
<br>
| <ins>Tool</ins> | <ins>용도</ins> |
| :-- | :-- | 
| Lombok | 보일러플레이트 코드 감소 및 생산성향상 | 
| Log4j2 | 효율적인 로그 기록 및 관리 |
| springSecurity6 Module | 인증과 권한부여 |


<br>

<strong>*협업 도구</strong> <br>

| <ins>Tool</ins> | <ins>용도</ins> |
| :-- | :-- | 
| GitHub | VCS 및 소스코드 공유 협업 | 
| Discord | 기타 다양한 이슈 및 소통 |
| Google Docs | 프로젝트 설계 및 문서작성 |
| Figma | 화면설계 |

<br>

```
 Github를 통해 VCS 및 각자의 Branch에서 작업 후 Main Branch로 Merge하는 GitHub Flow 전략을 채택하여 진행했습니다. 
 또한 Discord 채널을 개설하여 DB, 환경설정, 디자인 등에 대한 적극적인 소통을 하며 개발하였습니다. 
 Google Docs에서는 프로젝트 설계 및 기획부터 시작하여 도메인 정의, 전반적인 흐름을 정리하였고 개발 구현이 끝난 후
 통합테스트를 진행하며 결함 대장또한 Google Docs에 작성하였습니다^^ 
```


<img src="https://github.com/user-attachments/assets/9eadf7bb-1687-44b7-86fb-9dad765cb8fb" width="600" height="300"/>
<br>

<strong>* 사용된 시트가 20개 이상! </strong>
  
![image](https://github.com/user-attachments/assets/51a3f3eb-2f2c-4769-8c31-fcb28e39cebf)

<br>
<br>

## _Project Details_
<strong>*개발 기간</strong> <br>
 <img src="https://github.com/user-attachments/assets/440fdad2-75f6-489f-ada5-5d1f971273c8" width="600" height="300"/>
<br><br>

<details>
  <summary><strong>*스토리 설계</strong></summary>
  <div markdown="1">
    <img src="https://github.com/user-attachments/assets/ade41c50-8255-48f1-a73e-bb29d11a97af">
    <img src="https://github.com/user-attachments/assets/d2d03359-8557-44ba-ad7a-704d9bc8cd6e">
  </div>
</details>

<details>
  <summary><strong>*패키지 구조</strong></summary>
  <div markdown="1">
    
> <strong> src/main/java </strong>
> > com.cherp.app
> > > acct (회계) / buss (영업)  / empl (인사) / stck (재고) / test (테스트용) / common (공통) / security (시큐리티)

```
* 파트별 패키지의 경우 mapper / service (인터페이스,구현체) / vo / web (컨트롤러) 총 4개의 패키지로 세분류되어 있습니다.

* common 패키지의 경우 myPage, upload(WebMvcConfig), exception, CommonCode를 위한 vo, 사원검색을 위한 dto 패키지로 구성되어있습니다.

* security 패키지의 경우 security 설정을 위한 config, controller, mapper, service(인터페이스, 구현체) 패키지로 구성되어있습니다.
```
<br>

> <strong> src/main/resources </strong>
> > mapper / templates / static 

```
* mapper 패키지는 account / buss / empl/ login /stock/ test 패키지로 세분류

* templates 패키지는 부서별 세분류 및 common, index, error(에러처리페이지), test 패키지로 세분류
  common 패키지는 Thymeleaf Layout 사용을 위한 패키지로 configs, fragments, layouts 패키지로 구성되어 있습니다. 

* static 패키지는 css, img, js 패키지로 세분류 되어있고 각 파트별 패키지와 공통함수, CSS를
  적용할 common 패키지로 세분류되어 있습니다.
```
  </div>
</details>


<details>
  <summary><strong>*ERD 설계</strong></summary>
  <div markdown="1">
    <img src="https://github.com/user-attachments/assets/49171d6b-3863-472c-b5ff-8ba97a20f6cf">
  </div>
</details>


<br>
<br>

<strong>*API설계</strong>
https://learned-hero-128.notion.site/Catch-ERP-API-15cafb8b8b3880399443e4ad515e543a?pvs=4

<br>
<br>

<strong>*파트별 이미지</strong>
<details>
  <summary>로그인페이지 & Index & 마이페이지</summary>
  <div markdown="1">

  | 로그인 페이지 | Index 페이지 |
  | :-: | :-:| 
  | <img src="https://github.com/user-attachments/assets/04220209-1408-430f-9cd7-ca03304511f8" width="390" height="220"/> | <img src="https://github.com/user-attachments/assets/170f1ceb-652d-4969-919f-44a1d5abced9" width="390" height="220"/> | 
  
  | 마이페이지 - 나의 정보 조회 | 마이페이지 - 나의 근태태 조회 |
  | :-: | :-:| 
  | <img src="https://github.com/user-attachments/assets/fc8df316-35b1-48cc-b9c9-f9ab5b8a54ef" width="390" height="220"/> | <img src="https://github.com/user-attachments/assets/cfbd2c42-c78f-490f-8f2c-d7f8c5c037dd" width="390" height="220"/> | 
    
  </div>
</details>

<details>
  <summary>재고 파트</summary>
  <div markdown="1">

  | 입출고 처리 | 제품 조회 |
  | :-: | :-:| 
  | <img src="https://github.com/user-attachments/assets/28317317-70fa-4254-b0fb-7f022d9f6b07" width="390" height="220"/> | <img src="https://github.com/user-attachments/assets/46f4e7f8-c176-4cec-8d7f-6fb3980b5359" width="390" height="220"/> | 
    
  | 제품 상세 조회 |
  | :-: | 
  | <img src="https://github.com/user-attachments/assets/28317317-70fa-4254-b0fb-7f022d9f6b07" width="390" height="220"/> | 
  
  </div>
</details>

<details>
  <summary>영업 파트</summary>
  
  <div markdown="1">

  | 거래처 관리 1 | 거래처 관리 2 - 거래처 신규등록, 수정, 계약상태&매입계약품목 조회 |
  | :-: | :-:| 
  | <img src="https://github.com/user-attachments/assets/e9b4b553-53b1-4823-9712-6e24048ee486" width="390" height="220"/> | <img src="https://github.com/user-attachments/assets/6c92b2dc-f295-4e5d-b9b4-dbd3f6c0c92e" width="390" height="220"/> |

  | 구매입력 | 구매조회 |
  | :-: | :-:| 
  | <img src="https://github.com/user-attachments/assets/e9444c85-6074-4495-aa3a-81855ea0e9c8" width="390" height="220"/> | <img src="https://github.com/user-attachments/assets/e6ee4aa2-37b1-42f7-ba5f-b433c06c53c7" width="390" height="220"/> | 
  
  </div>
</details>

<details>
  <summary>회계 파트</summary>
  <div markdown="1">

  | 계좌등록 | 매입단가 계약등록 |
  | :-: | :-:| 
  | <img src="https://github.com/user-attachments/assets/8c5420a2-3c0d-46b9-8f08-475e36cf78d1" width="390" height="220"/> | <img src="https://github.com/user-attachments/assets/a94fc628-e42b-4e47-b9fc-87676fb43c8c" width="390" height="220"/> | 

  | 매입단가 계약관리 | 전자 세금계산서 조회 |
  | :-: | :-:| 
  | <img src="https://github.com/user-attachments/assets/dd9b7f81-1ccf-410a-8733-fa9e43413299" width="390" height="220"/> | <img src="https://github.com/user-attachments/assets/86e7feb6-b1a9-4b3b-be73-3c0fba3c45aa" width="390" height="220"/>

  | 전자 세금계산서 조회2 | 매입전표 |
  | :-: | :-:| 
  | <img src="https://github.com/user-attachments/assets/796b99b8-9bcf-45ef-b801-c181f337f73a" width="390" height="220"/> | <img src="https://github.com/user-attachments/assets/0fa3567f-20e1-4a9a-a780-012a12afd019" width="390" height="220"/>

  | 전표관리 | 채권감소등록 |
  | :-: | :-:| 
  | <img src="https://github.com/user-attachments/assets/874da8b3-d491-4261-8c30-2104b505d277" width="390" height="220"/> | <img src="https://github.com/user-attachments/assets/b6f4b3dc-acfd-48c2-809b-8c7972ea5b93" width="390" height="220"/>

  </div>
</details>

<details>
  <summary>인사 파트</summary>
  <div markdown="1">

  | 인사관리1-사원정보등록 | 인사관리2-급여정보등록 |
  | :-: | :-:| 
  | <img src="https://github.com/user-attachments/assets/4ebc1717-dbe3-4684-aac2-cb1690b685b5" width="390" height="220"/> | <img src="https://github.com/user-attachments/assets/b9642b25-e982-47c0-a1ab-3a717c5d2c87" width="390" height="220"/>

  | 근태관리-근태입력&근태조회 | 기초등록-부서등록&공제항목등록 |
  | :-: | :-:| 
  | <img src="https://github.com/user-attachments/assets/f6896f48-bc95-4649-b3ed-e8a3000326b1" width="390" height="220"/> | <img src="https://github.com/user-attachments/assets/787b2cb0-ab1a-4506-bc79-3f75e4cd0ac4" width="390" height="220"/>

  | 기초등록-수당항목등록&근태항목등록 |
  |:-: | 
  | <img src="https://github.com/user-attachments/assets/64983b14-2a6a-498c-8b8e-5a64f92a3288" width="390" height="220"/> | 
  
  
  </div>
</details>
<br>
<strong>*시연 영상</strong> <br>
영상의 시연순서는 [ 권혁태 - 진솔미 - 남건우 - 서권우 - 유석진 ] 순서입니다. <br>
영상 URL : 

<br>
<br>

## _Retrospect_

<br>

```
서권우
* 각자 진행하면서 좋았던점/배웠던점

* 아쉬웠던 점/고쳐갈 점

* 팀원들에게 하고 싶은 말

```

```
유석진 
* 각자 진행하면서 좋았던점/배웠던점

* 아쉬웠던 점/고쳐갈 점

* 팀원들에게 하고 싶은 말

```
```
진솔미
* 각자 진행하면서 좋았던점/배웠던점

* 아쉬웠던 점/고쳐갈 점

* 팀원들에게 하고 싶은 말

```

```
남건우
* 각자 진행하면서 좋았던점/배웠던점
  ERP라는 다소 복잡한 프로그램을 구현하면서 각자가 맡은 파트의 유기적 관계를 파악하는데 많은 시간을 할애했다.
  생소한 용어와 프로세스들 때문에 서로 이해하는 바가 달랐고, 본인의 파트가 팀원의 파트와 어떻게 연결되고 어떤 영향을 주는지
  파악하는 것이 굉장히 중요했다. 이 과정이 소홀하면 이후의 개발단계에서 엄청난 후폭풍이 찾아올 것이 눈에 훤했기 때문이다.
   때문에 하루에 3시간이상 회의를 하기도 했는데, 이번 프로젝트로 팀단위의 개발에 있어
  소통과 회의기록 작성이 매우 중요함을 몸소 배웠다.

* 아쉬웠던 점/고쳐갈 점
  SQL 지식부족으로 상당 시간을 고전해서 SQL 공부의 필요성을 많이 느꼈다

* 팀원들에게 하고 싶은 말
  솔미, 석진, 권우형, 혁태 모두 고생많았고 어떻게 딱 열심히 하는 사람들끼리 팀이 되서 좋았다^^
  수료하고 나서 나보면 텐텐줄께 잘살아
```

```
권혁태
* 각자 진행하면서 좋았던점/배웠던점

* 아쉬웠던 점/고쳐갈 점

* 팀원들에게 하고 싶은 말

```

<br>
<br>

## _Etc._

PPT 작업 : canva
DB 데이터 : 건우가 백업받아놓음.



