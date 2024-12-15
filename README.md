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
> ${\textsf{\color{black}Docs}}$ <br>

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
<table>
<tr> <td>이미지</td> <td>이미지</td> <td>이미지</td> <td>이미지</td> <td>이미지</td> </tr>
<tr> <td>서권우</td> <td>유석진</td> <td>진솔미</td> <td>남건우</td> <td>권혁태</td> </tr>
</table>
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
<strong>*개발 기간</strong>
![image](https://github.com/user-attachments/assets/440fdad2-75f6-489f-ada5-5d1f971273c8)
<br><br>
<strong>*스토리 설계</strong>
![image](https://github.com/user-attachments/assets/2b6eb6a2-6210-4064-8765-efaa43d2d481)
![image](https://github.com/user-attachments/assets/6355c279-bc70-41d1-ba29-20ec0b58b673)


<br>
<br>

<strong> *패키지 구조 </strong>
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

<br>
<br>

<strong>*ERD 설계</strong>
![image](https://github.com/user-attachments/assets/49171d6b-3863-472c-b5ff-8ba97a20f6cf)

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
    <ul>
      <li><strong>로그인 페이지</strong>
      <img src="https://github.com/user-attachments/assets/04220209-1408-430f-9cd7-ca03304511f8" >
      </li>
      <li> <strong>Index 페이지</strong>
       <img src="https://github.com/user-attachments/assets/170f1ceb-652d-4969-919f-44a1d5abced9" >
      </li>
      <li> <strong>마이페이지 - 나의 정보 조회</strong>
       <img src="https://github.com/user-attachments/assets/fc8df316-35b1-48cc-b9c9-f9ab5b8a54ef" >
      </li>
      <li> <strong>마이페이지 - 근태 조회</strong>
        <img src="https://github.com/user-attachments/assets/cfbd2c42-c78f-490f-8f2c-d7f8c5c037dd" >
      </li>
    </ul>
  </div>
</details>

<details>
  <summary>재고 파트</summary>
  <div markdown="1">
    <ul>
      <li><strong>입출고 처리</strong>
        <img src="https://github.com/user-attachments/assets/28317317-70fa-4254-b0fb-7f022d9f6b07">
      </li>
      <li><strong>제품 조회 </strong>
        <img src="https://github.com/user-attachments/assets/46f4e7f8-c176-4cec-8d7f-6fb3980b5359">
      </li>
      <li><strong>제품 상세 조회 </strong>
        <img src="https://github.com/user-attachments/assets/c9614c6d-2146-49c6-8b53-527d81d42c28">
      </li>
    </ul>
  </div>
</details>

<details>
  <summary>영업 파트</summary>
  <div markdown="1">
    <ul>
      <li><strong>거래처 관리 - 거래처 신규등록, 수정, 거래처별 계약상태&매입계약품목 조회가능</strong>
       <img src="https://github.com/user-attachments/assets/e9b4b553-53b1-4823-9712-6e24048ee486">
      </li>
      <li><strong>구매입력</strong>
       <img src="https://github.com/user-attachments/assets/e9444c85-6074-4495-aa3a-81855ea0e9c8">
      </li>
      <li><strong>구매조회</strong>
      <img src="https://github.com/user-attachments/assets/e6ee4aa2-37b1-42f7-ba5f-b433c06c53c7">
      </li>
    </ul>
  </div>
</details>

<details>
  <summary>회계 파트</summary>
  <div markdown="1">
    <ul>
      <li>거래처 신규등</li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</details>

<details>
  <summary>인사 파트</summary>
  <div markdown="1">
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</details>

<strong>*시연 영상</strong>


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

* 아쉬웠던 점/고쳐갈 점

* 팀원들에게 하고 싶은 말

```

```
권혁태
* 각자 진행하면서 좋았던점/배웠던점

* 아쉬웠던 점/고쳐갈 점

* 팀원들에게 하고 싶은 말

```

<br>
<br>

## _Docs_



