# searchm-official 개선 작업 리스트

---

## 현재 상태 (Before)

### 서버 환경
| 항목 | 내용 |
|------|------|
| 호스팅 | 카페24 (계약 만료: 2028-02-02) |
| 파일 관리 | FileZilla (FTP, 포트 21) |
| 기술 스택 | PHP 기반 |
| 메인 도메인 | https://searchm.co.kr |
| DNS 관리 | Cloudflare (계정 확인 중 — 팀장님) |
| 임시 React 경로 | https://searchm.co.kr/dev/ |

### 완료된 것
- [x] React 개발 환경 준비 완료 (Vite + TailwindCSS)
- [x] GitHub 레포지토리 준비 완료 (searchm-tech/searchm-official)
- [x] PHP 전체 백업 → 로컬 + 구글 드라이브 보관 (15,019개 파일 / 1.1GB)
- [x] `/dev` 폴더에 React 수동 배포 확인

### FTP 접속 정보
> ⚠️ AWS 전환 완료 후 비밀번호 변경 필요
> ⚠️ 카페24 FTP 접속 설정: 국내 IP만 허용 (GitHub Actions 해외 IP 차단됨)

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
| 배포 방식 | GitHub Actions CI/CD |
| 기술 스택 | React (Vite + TailwindCSS) |
| 레포지토리 | https://github.com/searchm-tech/searchm-official |

---

## 현재 블로커

| 항목 | 상태 |
|------|------|
| Cloudflare 계정 | 팀장님 확인 중 |
| GitHub Actions FTP 배포 | 카페24 해외 IP 차단으로 불가 → AWS 이전 후 해결 |

---

## 단계별 작업 항목

### Phase 1 — 롤백 준비 ✅ 완료
- [x] `/www` 전체 FTP 백업 → 로컬 (`~/Desktop/searchM/searchm-rollback/`)
- [x] 구글 드라이브 업로드 (1.1GB)
- [ ] 롤백 시나리오 문서화
  - **방안 A** (카페24 유지 시): 구글 드라이브에서 다운 후 FTP 재업로드
  - **방안 B** (AWS 전환 후): Amplify 콘솔에서 이전 버전으로 즉시 롤백
- [ ] AWS 세팅 후 S3 버킷으로 백업 이전

---

### Phase 2 — UI 개선 🔄 현재 진행
> Cloudflare 확인 전까지 UI 작업 먼저 진행

- [ ] Header 스크롤 감지 — 스크롤 시 shadow 강화, active nav 하이라이트
- [ ] 모바일 Header 메뉴 슬라이드 애니메이션
- [ ] Portfolio 모달 ESC 키 닫기 (키보드 접근성)
- [ ] Clients 마퀴 CSS infinite 방식으로 교체 (현재 고정 px 이동 방식)
- [ ] 전화번호 통일 (Contact `02-2051-5620` vs Footer `02-3446-7260` 불일치 확인)
- [ ] News 이미지 — Unsplash 스톡 → 실제 기사 썸네일로 교체
- [ ] Company 카드 연수 표현 통일 ("17년" vs "18년")

**로컬 배포 방법** (UI 확인용):
```bash
./deploy-dev.sh
# 빌드 후 FTP로 /dev 자동 업로드
# → https://searchm.co.kr/dev/ 에서 확인
```

---

### Phase 3 — AWS Amplify + S3 인프라 세팅
> Cloudflare 계정 확인 후 진행

- [ ] S3 버킷 생성 및 정적 웹 호스팅 설정
- [ ] Amplify 앱 생성 + GitHub 레포 연결
- [ ] GitHub Actions 워크플로우 S3 배포로 변경
- [ ] GitHub Secrets에 AWS 접속 정보 등록
  - [ ] `AWS_ACCESS_KEY_ID`
  - [ ] `AWS_SECRET_ACCESS_KEY`
  - [ ] `AWS_S3_BUCKET`
  - [ ] `AWS_REGION`

---

### Phase 4 — 도메인 전환
> Cloudflare 계정 확인 후 진행

- [ ] Cloudflare DNS에서 `searchm.co.kr` A레코드 → AWS Amplify로 변경
- [ ] HTTPS 인증서 적용 (ACM)
- [ ] 전환 후 기존 PHP 페이지 제거 (카페24 `/www` 정리)
- [ ] 모니터링 (1~2일)

---

## 전체 진행 순서

```
Phase 1  PHP 백업 + 롤백 준비       ✅ 완료
   ↓
Phase 2  UI 개선                   🔄 진행 중
   ↓
Phase 3  AWS 인프라 세팅            ⏳ Cloudflare 확인 후
   ↓
Phase 4  도메인 전환 → 운영 배포    ⏳ Cloudflare 확인 후
```

---

## 메모

- 카페24 FTP는 국내 IP만 허용 → GitHub Actions(해외 IP) 배포 불가
- 로컬 배포는 `./deploy-dev.sh` 스크립트로 가능
- EmailJS 키는 `VITE_` prefix로 클라이언트 노출 → 장기적으로 서버사이드 처리 고려
- `searchm.cafe24.com` 도메인도 카페24에 연결되어 있음
