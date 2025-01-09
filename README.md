<h2 align=center>네이버 추모게시판 클론 프로젝트📚</h2>

<p align=center> 📆 2024.12.31 ~ 2025.01.07</p>

<div align=center>
    <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
    <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>
    <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"/>
    <img src="https://img.shields.io/badge/7.32.0-Eslint-4B32C3?style=flat&logo=eslint&logoColor=4B32C3"/>
    <img src="https://img.shields.io/badge/2.4.1-Prettier-F7B93E?style=flat&logo=Prettier&logoColor=F7B93E"/>
    <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/>
    <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"/>
    <img src="https://img.shields.io/badge/Velog-20C997?style=flat-square&logo=velog&logoColor=white"/>
</div>
<br>
<p align=center><img src=./src/assets/images/velogClone.gif  width=60% /></p>
<p align=center> 🏠 <a href="https://jpmemorial-project.vercel.app/">웹 페이지</a></p>
<p align=center> 💼 <a href=https://github.com/jangmireu/memorial/wiki/%ED%99%94%EB%A9%B4-%EA%B5%AC%EC%84%B1-%EB%B0%8F-%EC%A3%BC%EC%9A%94%EA%B8%B0%EB%8A%A5-%EC%84%A4%EB%AA%85> 화면 구성 및 주요 기능 설명</a></p>

## 1. 프로젝트 살펴보기 🔎
### 🙎‍♂️ 팀 구성 
|장미르|박진우|
| :---: | :---: |
|Front-End|Front-End|Back-End|Back-End|

- 프론트엔드 개발자 2명

<hr/>

### 🔥 개요


2024년 12월 29일 제주공항 여객기 참사를 추모하며, 리액트와 카카오 API를 처음 공부하면서 깃허브 사용을 익숙하게 하기 위해 적용해본 디지털 추모 게시판 프로젝트입니다.

### 👨‍💻 주요 기능

- 카카오톡 api를 사용해서 로그인 및 로그아웃 기능을 사용할 수 있습니다.
- 카카오톡 공유기능을 이용해 추모의 참여를 유도할 수 있습니다.
- 추모에 참여할 수 있습니다.
- 카카오맵을 사용해 합동 분향소 바로가기 기능을 사용할 수 있습니다.

### 💻 기술 스택

- 'React' : 웹 UI를 구축하기 위한 라이브러리.
- 'Tailwind CSS' : 유틸리티 기반의 CSS 프레임워크로, 효율적인 스타일링을 위해 사용.
- 'TypeScript' : 정적 타입을 제공하여 코드의 안정성을 높이기 위해 사용.
- 'ESLint' : 코드 스타일과 컨벤션 검사를 위해 사용.
- 'Prettier' : 일관된 코드 포맷팅을 유지하기 위해 사용.
- 'Next.js' : 서버 사이드 렌더링(SSR)과 파일 기반 라우팅을 제공하는 React 프레임워크.
- 'Axios' : API 통신 및 데이터 fetch를 위해 사용.
- 'Custom Hooks' : React에서 재사용 가능한 상태 관리와 로직 분리를 위해 사용.
<br>

> #### ⚙ 프로젝트 실행 해보기

```js
git clone https://github.com/jangmireu/memorial.git
npm install
npm start
브라우저 localhost:3000 접속
```

<br>

> #### 📁 프로젝트 구조

```js
├─ .next                // Next.js 빌드 파일 디렉토리
├─ node_modules         // 프로젝트 종속성 모음
├─ public               // 정적 파일(이미지, 폰트 등)
│  └─ images            // 이미지 파일 모음
│     └─ flower.png     // 추모용 이미지 파일
├─ src                  // 소스 코드 디렉토리
│  ├─ app               // Next.js의 앱 라우팅 디렉토리
│  │  ├─ api            // API 라우팅 파일
│  │  │  ├─ auth/kakao  // 카카오 인증 관련 API
│  │  │  └─ TS route.ts // 타입스크립트 라우팅 설정
│  │  ├─ counter        // 카운터 관련 페이지 (추정)
│  │  ├─ login          // 로그인 페이지
│  │  │  └─ page.tsx    // 로그인 페이지 컴포넌트
│  │  ├─ page.tsx       // 루트 페이지 파일
│  │  ├─ globals.css    // 전역 스타일 파일
│  │  └─ layout.tsx     // 공통 레이아웃 파일
│  ├─ components        // 재사용 가능한 컴포넌트 모음
│  │  ├─ TearEffect     // 눈물 효과 관련 컴포넌트
│  │  ├─ TearBackground.tsx // 배경 관련 효과 컴포넌트
│  │  ├─ DarkModeToggle.tsx // 다크 모드 토글 버튼
│  │  ├─ KakaoLoginButton.tsx  // 카카오 로그인 버튼
│  │  ├─ KakaoLogoutButton.tsx // 카카오 로그아웃 버튼
│  │  ├─ KakaoShareButton.tsx  // 카카오 공유 버튼
│  │  ├─ MemorialButton.tsx    // 추모 관련 버튼
│  │  └─ NicknameRoller.tsx    // 닉네임 롤링 컴포넌트
├─ fonts                // 프로젝트에 사용되는 폰트 파일
│  ├─ Danjo.otf         // 특정 폰트 파일
│  ├─ font.ttf          // 추가 폰트 파일
│  └─ font1.ttf         // 추가 폰트 파일
├─ .env                 // 환경 변수 파일
├─ .env.local           // 로컬 환경 변수 파일
├─ .gitignore           // Git에 포함하지 않을 파일 및 폴더
├─ eslint.config.mjs    // ESLint 설정 파일
├─ next-env.d.ts        // Next.js 타입 정의 파일
├─ next.config.js       // Next.js 설정 파일
├─ package-lock.json    // 프로젝트 의존성 잠금 파일
├─ package.json         // 프로젝트 의존성 및 스크립트 설정
├─ postcss.config.mjs   // Tailwind CSS 및 PostCSS 설정 파일
├─ README.md            // 프로젝트 설명 파일


```

<br>
<hr/>

# 2. 협업 👤

### 🪚 협업을 위한 툴

- Discord
  - 개발 진행 상황 공유하기 위해 사용했습니다.
- Git, Github
  - 코드 버전 관리 및 공유하기 위해 사용했습니다.
<hr/>

# 3. 배포 👨‍🔧

#### 배포 환경 그림

<div align="center">
    <img src="./public/images/vercel%20flowchart.png" width="80%" />
</div>


> #### 📜 배포 과정 설명

1. 개발이 완료된 main 브랜치에서 Vercel을 이용해 배포를 진행합니다.
2. Vercel은 GitHub와 연동되어 있어, main 브랜치에 코드가 푸시되면 자동으로 빌드 및 배포가 이루어집니다.
3. 배포가 완료되면 사용자는 Vercel에서 제공하는 도메인을 통해 배포된 사이트([추모 게시판](https://jpmemorial-project.vercel.app/))에 접속할 수 있습니다.
