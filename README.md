# searchm-official

써치엠 공식 홈페이지 — React 기반 리뉴얼 버전

- **운영 사이트**: https://searchm.co.kr (현재 PHP 버전)
- **스테이징**: https://searchm.co.kr/dev/ (React 버전 확인)
- **레포지토리**: https://github.com/searchm-tech/searchm-official

---

## 기술 스택

| 항목 | 내용 |
|------|------|
| 프레임워크 | React 19 + TypeScript |
| 빌드 도구 | Vite 6 |
| 스타일 | TailwindCSS 4 |
| 애니메이션 | Motion (Framer Motion) |
| 아이콘 | Lucide React |
| 메일 발송 | EmailJS |
| 패키지 매니저 | npm |

---

## 개발 환경 설정

### 필수 요구사항

- Node.js 20 이상
- npm 10 이상

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview

# 타입 체크
npm run lint
```

### 환경변수 설정

프로젝트 루트에 `.env.local` 파일 생성 후 아래 값 입력:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> EmailJS 키는 https://www.emailjs.com 대시보드에서 확인

---

## 프로젝트 구조

```
searchm-official/
├── public/
│   └── logos/              # 로고 및 이미지 파일
├── src/
│   ├── components/
│   │   ├── Header.tsx      # 상단 네비게이션
│   │   ├── Hero.tsx        # 메인 영상 섹션
│   │   ├── Slogan.tsx      # 슬로건 섹션
│   │   ├── Company.tsx     # 회사 소개 + 대행사/파트너 로고
│   │   ├── Portfolio.tsx   # 포트폴리오 그리드 + 모달
│   │   ├── Clients.tsx     # 클라이언트 마퀴
│   │   ├── Service.tsx     # 서비스 소개
│   │   ├── News.tsx        # 뉴스/블로그/유튜브
│   │   ├── Contact.tsx     # 문의 폼 (EmailJS)
│   │   ├── Footer.tsx      # 푸터
│   │   └── FloatingBanners.tsx  # 우측 플로팅 버튼
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions (AWS 전환 후 사용)
├── deploy-dev.sh           # 로컬 배포 스크립트
├── WORK_LIST.md            # 작업 진행 현황
├── vite.config.ts
└── package.json
```

---

## 배포

### 로컬 배포 (현재 방식)

> 카페24 FTP는 국내 IP만 허용 → 로컬에서 직접 배포

```bash
# lftp 설치 필요 (최초 1회)
brew install lftp

# 빌드 + FTP 배포 (비밀번호 입력 필요)
./deploy-dev.sh
```

배포 완료 후 https://searchm.co.kr/dev/ 에서 확인

### GitHub Actions (AWS 전환 후 사용 예정)

`.github/workflows/deploy.yml` 설정 완료.
AWS S3 버킷 연결 후 자동 배포 활성화 예정.

**필요한 GitHub Secrets:**

| Secret | 설명 |
|--------|------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS Service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS Template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS Public Key |
| `AWS_ACCESS_KEY_ID` | AWS 액세스 키 (추후 등록) |
| `AWS_SECRET_ACCESS_KEY` | AWS 시크릿 키 (추후 등록) |
| `AWS_S3_BUCKET` | S3 버킷명 (추후 등록) |
| `AWS_REGION` | AWS 리전 (추후 등록) |

---

## 서버 환경

| 항목 | 내용 |
|------|------|
| 현재 호스팅 | 카페24 (계약 만료: 2028-02-02) |
| 목표 호스팅 | AWS Amplify + S3 |
| DNS 관리 | Cloudflare |
| FTP 접속 | 국내 IP만 허용 (포트 21) |

---

## Vite base 경로 안내

현재 `vite.config.ts`의 `base`가 `/dev/`로 설정되어 있음.

- **스테이징 배포 시**: `base: '/dev/'` 유지
- **운영 배포 시**: `base: '/'` 로 변경 필요

```ts
// vite.config.ts
export default defineConfig({
  base: '/',  // 운영 배포 시 변경
  ...
})
```
