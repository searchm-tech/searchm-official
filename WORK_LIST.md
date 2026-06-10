# searchm-official 개선 작업 리스트

---

## 현재 상태 (Before)

### 서버 환경
| 항목 | 내용 |
|------|------|
| 호스팅 | 카페24 |
| 파일 관리 | FileZilla (FTP, 포트 21) |
| 기술 스택 | PHP 기반 |
| 메인 도메인 | https://searchm.co.kr |
| 임시 React 경로 | https://searchm.co.kr/dev/ |

### 서버 디렉토리 구조 (`/www`)
```
/www/
├── index.html          ← 현재 운영 메인 페이지
├── header.php
├── footer.php
├── floating.php
├── dev/                ← React 빌드 수동 배포 중 (임시 스테이징)
├── blog/
├── clients/
├── company/
├── contact/
├── css/
└── ... (기타 PHP 페이지들)
```

### 현재 완료된 것
- [x] React 개발 환경 준비 완료 (Vite + TailwindCSS)
- [x] GitHub 레포지토리 준비 완료 (searchm-tech/searchm-official)
- [x] `/dev` 폴더에 React 빌드 수동 배포 → https://searchm.co.kr/dev/ 에서 확인 가능

### FTP 접속 정보
> ⚠️ AWS 전환 완료 후 FTP 비밀번호 변경 필요

| 항목 | 값 |
|------|-----|
| 호스트 | searchm.co.kr |
| 사용자명 | searchm |
| 포트 | 21 |

---

## 목표 상태 (After)

| 항목 | 내용 |
|------|------|
| 호스팅 | AWS Amplify + S3 |
| 배포 방식 | GitHub Actions CI/CD (push → 자동 빌드 → 배포) |
| 기술 스택 | React (Vite + TailwindCSS) |
| 레포지토리 | https://github.com/searchm-tech/searchm-official |

---

## 단계별 작업 항목

### Phase 1 — 롤백 준비 (선행 필수)
> DNS 전환 전에 반드시 완료해야 함

- [x] 현재 `/www` 전체 FTP 백업 (로컬 저장) — `/Users/seodongchan/Desktop/searchM/searchm-rollback/`
- [x] 백업본 확인 — index.html, header.php, footer.php 등 주요 파일
  - ⚠️ `@` 특수문자 포함 파일 2개 (`jinsun.lee@...jpg`, `eunsoo.lee@...jpg`) 는 서버 제한으로 미수신 — 메일 서명 이미지로 운영 롤백에 무관
- [x] 롤백 파일 보관 방법 결정 — 구글 드라이브 업로드
- [x] 구글 드라이브에 백업 폴더 업로드 (15,019개 파일 / 1.1GB)
- [ ] 롤백 시나리오 문서화
  - **방안 A** (카페24 유지 시): 구글 드라이브에서 파일 다운 후 FTP로 재업로드
  - **방안 B** (AWS 전환 후): Amplify 콘솔에서 이전 배포 버전으로 즉시 롤백
- [ ] AWS 세팅 완료 후 S3 버킷으로 백업 이전 (구글 드라이브 → S3)

**현재 상태**: ✅ 완료

---

### Phase 2 — GitHub Actions CI/CD 구축
> 현재 수동 FTP 배포 → 자동화로 전환

**목표**: `main` 브랜치에 push하면 자동으로 빌드 + 배포

- [ ] GitHub Actions 워크플로우 파일 작성 (`.github/workflows/deploy.yml`)
  - [ ] `npm run build` 실행
  - [ ] 빌드 결과물(`dist/`) FTP 업로드 또는 S3 업로드
- [ ] GitHub Secrets 등록
  - [ ] `VITE_EMAILJS_SERVICE_ID`
  - [ ] `VITE_EMAILJS_TEMPLATE_ID`
  - [ ] `VITE_EMAILJS_PUBLIC_KEY`
  - [ ] FTP 또는 AWS 접속 정보

**현재 상태**: 🔄 진행 중

> **단기 전략**: AWS 세팅 전까지는 GitHub Actions → FTP 배포로 `/dev` 자동화 먼저 적용 가능

---

### Phase 3 — AWS Amplify + S3 인프라 세팅
- [ ] S3 버킷 생성 및 정적 웹 호스팅 설정
- [ ] Amplify 앱 생성 + GitHub 레포 연결
- [ ] 커스텀 도메인 연결 (`searchm.co.kr`, `www.searchm.co.kr`)
- [ ] HTTPS 인증서 적용 (ACM)
- [ ] `www` → apex 또는 apex → `www` 리다이렉트 처리
- [ ] SPA 라우팅을 위한 404 → index.html 리다이렉트 설정

**현재 상태**: ⬜ 미시작

---

### Phase 4 — 스테이징 검증 (`/dev` → 운영 전환 전)
- [ ] https://searchm.co.kr/dev/ 에서 전체 기능 점검
  - [ ] 각 섹션 렌더링 (Hero 영상, Portfolio, Clients 마퀴 등)
  - [ ] Contact 폼 실제 이메일 전송 테스트
  - [ ] 모바일 반응형 확인
  - [ ] 주요 브라우저 확인 (Chrome, Safari, Edge)
- [ ] SEO / OG 태그 확인
- [ ] GA / 픽셀 등 트래킹 스크립트 동작 확인

**현재 상태**: ⬜ 미시작

---

### Phase 5 — DNS 전환 (운영 배포)
- [ ] AWS에서 발급된 도메인 설정값 확인 (CNAME 또는 A 레코드)
- [ ] 카페24 DNS 관리 패널에서 레코드 변경
- [ ] TTL 낮추기 (전환 전 미리 300초 이하로)
- [ ] 전환 후 기존 PHP 페이지 정상 접근 불가 확인
- [ ] 모니터링 (1~2일)

**현재 상태**: ⬜ 미시작

---

### Phase 6 — UI 개선 (운영 이후 지속 작업)
- [ ] Header 스크롤 감지 — 스크롤 시 shadow 강화, active nav 하이라이트
- [ ] 모바일 Header 메뉴 슬라이드 애니메이션
- [ ] Portfolio 모달 ESC 키 닫기 (키보드 접근성)
- [ ] Clients 마퀴 CSS infinite 방식으로 교체 (현재 고정 px 이동 방식)
- [ ] 전화번호 통일 (Contact `02-2051-5620` vs Footer `02-3446-7260` 불일치 확인)
- [ ] News 이미지 — Unsplash 스톡 → 실제 기사 썸네일로 교체
- [ ] Company 카드 연수 표현 통일 ("17년" vs "18년")

**현재 상태**: ⬜ 미시작

---

## 전체 진행 순서

```
Phase 1  롤백 준비 (PHP 백업)          ← 선행 필수
   ↓
Phase 2  GitHub Actions CI/CD         ← 진행 중
   ↓
Phase 3  AWS Amplify + S3 세팅
   ↓
Phase 4  /dev/ 스테이징 검증
   ↓
Phase 5  DNS 전환 → 운영 배포
   ↓
Phase 6  UI 개선 (지속)
```

---

## 메모

- `/dev` 폴더는 현재 수동 FTP 배포 중 → Phase 2에서 자동화 대상
- EmailJS 키는 `VITE_` prefix로 클라이언트에 노출되는 구조 → 장기적으로 서버사이드 처리 고려
- 카페24는 TLS를 통한 FTP를 지원하지 않음 (FileZilla 로그 확인됨) → SFTP 전환 또는 AWS 이전 후 FTP 불필요
