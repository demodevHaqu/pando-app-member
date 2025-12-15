# PANDO Fitness QA 체크리스트

## 프로젝트 개요
- **프로젝트명**: PANDO Fitness Member App
- **기술 스택**: Next.js 15.5.7 + TypeScript + TailwindCSS
- **디자인 컨셉**: Cyber-Fitness (사이버펑크 + 피트니스)
- **뷰포트**: 425px (모바일 우선)
- **최종 업데이트**: 2025-12-15

---

## advance.md 기능 요구사항

| # | 요구사항 | 상태 | 비고 |
|---|---------|------|------|
| 1 | P-Score에 맞춤운동계획받기 버튼 기능 적용 | ✅ 완료 | `/routine`으로 이동 (`app/report/p-score/page.tsx:347`) |
| 2 | FMS에서 맞춤운동프로그램 루틴시작하기 버튼 기능 적용 | ✅ 완료 | `/routine`으로 이동 (`app/report/fms/page.tsx:274`) |
| 3 | 모든 페이지에 메인 로고 추가 (홈 이동) | ⚠️ 부분완료 | PageHeader 사용 페이지는 OK, Header 사용 페이지 확인 필요 |

---

## 1. 온보딩 (Phase 3)

| # | 기능 | 상세 | 구현 상태 | 파일 |
|---|------|------|----------|------|
| 1.1 | 회원가입 | 전화번호/비밀번호 입력 | ✅ 완료 | `app/onboarding/page.tsx` |
| 1.2 | 운동 목표 설정 | 목표 선택 화면 | ✅ 완료 | `app/onboarding/goals/page.tsx` |
| 1.3 | 체형/통증 정보 | 건강 정보 입력 | ✅ 완료 | `app/onboarding/health/page.tsx` |
| 1.4 | 온보딩 완료 | 완료 화면 | ✅ 완료 | `app/onboarding/complete/page.tsx` |

**테스트 체크리스트:**
- [ ] 회원가입 폼 입력 동작
- [ ] 목표 선택 후 다음 단계 이동
- [ ] 건강 정보 입력 및 저장
- [ ] 온보딩 완료 → 홈 이동

---

## 2. 홈 메인 (Phase 4)

| # | 기능 | 상세 | 구현 상태 | 파일 |
|---|------|------|----------|------|
| 2.1 | 홈 대시보드 | AI 루틴, PT/GX 정보, 리커버리 추천 | ✅ 완료 | `app/page.tsx` |

**테스트 체크리스트:**
- [ ] 사용자 정보 표시
- [ ] AI 루틴 카드 표시 및 클릭
- [ ] QR 스캔 배너 표시 및 클릭 → `/qr-scan` 이동
- [ ] PT/GX 정보 카드 표시
- [ ] 리커버리 추천 섹션 표시
- [ ] 포인트/뱃지 정보 표시

---

## 3. QR 스캔 / 카메라 (Phase 5)

| # | 기능 | 상세 | 구현 상태 | 파일 |
|---|------|------|----------|------|
| 3.1 | QR 스캔 메인 | 기구 스캔 진입점 | ✅ 완료 | `app/qr-scan/page.tsx` |
| 3.2 | 기구 상세 | QR 스캔 후 기구 정보 | ✅ 완료 | `app/qr-scan/equipment/[id]/page.tsx` |
| 3.3 | 스트레칭존 | 스트레칭 영역 정보 | ✅ 완료 | `app/qr-scan/stretching/page.tsx` |
| 3.4 | 사우나 | 사우나 체크인/아웃 | ✅ 완료 | `app/qr-scan/sauna/page.tsx` |
| 3.5 | 리커버리존 | 리커버리 시설 | ✅ 완료 | `app/qr-scan/recovery/page.tsx` |
| 3.6 | 자세 가이드 | 기구별 자세 가이드 + AI 모션 트래킹 | ✅ 완료 | `app/qr-scan/equipment/[id]/form-guide/page.tsx` |

**테스트 체크리스트:**
- [ ] QR 스캔 버튼 클릭 → 카메라 권한 요청
- [ ] 카메라 권한 허용 후 QR 스캔 동작
- [ ] QR 스캔 성공 시 기구 상세 페이지 이동
- [ ] AI 자세 분석 배너 클릭 → form-guide 이동
- [ ] form-guide 가이드 모드 동작
- [ ] form-guide AI 트래킹 모드 → 카메라 권한 요청
- [ ] MediaPipe 모션 트래킹 동작

---

## 4. 루틴 (Phase 6)

| # | 기능 | 상세 | 구현 상태 | 파일 |
|---|------|------|----------|------|
| 4.1 | 루틴 리스트 | AI 생성 루틴 목록 | ✅ 완료 | `app/routine/page.tsx` |
| 4.2 | 루틴 상세 | 운동 목록, 예상 시간 | ✅ 완료 | `app/routine/[routineId]/page.tsx` |
| 4.3 | 운동 수행 | 세트/렙 카운터, 휴식 타이머 | ✅ 완료 | `app/routine/[routineId]/exercise/[exerciseId]/page.tsx` |
| 4.4 | 루틴 완료 | 운동 완료 요약 | ✅ 완료 | `app/routine/complete/page.tsx` |

**테스트 체크리스트:**
- [ ] 루틴 목록 표시
- [ ] 루틴 카드 클릭 → 상세 이동
- [ ] 운동 시작 버튼 동작
- [ ] 세트 카운터 동작
- [ ] 휴식 타이머 동작
- [ ] 운동 완료 처리

---

## 5. AI 리포트 (Phase 7)

| # | 기능 | 상세 | 구현 상태 | 파일 |
|---|------|------|----------|------|
| 5.1 | 리포트 메인 | 리포트 목록 | ✅ 완료 | `app/report/page.tsx` |
| 5.2 | InBody 상세 | 체성분 분석 차트 | ✅ 완료 | `app/report/inbody/page.tsx` |
| 5.3 | FMS 상세 | 움직임 패턴 레이더 차트 | ✅ 완료 | `app/report/fms/page.tsx` |
| 5.4 | P-Score | 종합 점수 게이지 | ✅ 완료 | `app/report/p-score/page.tsx` |

**테스트 체크리스트:**
- [ ] 리포트 카드 표시 및 클릭
- [ ] InBody 차트 렌더링
- [ ] FMS 레이더 차트 렌더링
- [ ] FMS "루틴 시작하기" 버튼 → `/routine` 이동 ✅
- [ ] P-Score 게이지 렌더링
- [ ] P-Score "맞춤 운동 계획 받기" 버튼 → `/routine` 이동 ✅

---

## 6. GX 스케줄 (Phase 8)

| # | 기능 | 상세 | 구현 상태 | 파일 |
|---|------|------|----------|------|
| 6.1 | GX 메인 | 클래스 스케줄 | ✅ 완료 | `app/gx/page.tsx` |
| 6.2 | 클래스 상세 | 예약/대기 | ✅ 완료 | `app/gx/[classId]/page.tsx` |
| 6.3 | 내 GX 기록 | 출석 통계 | ✅ 완료 | `app/gx/history/page.tsx` |
| 6.4 | 클래스 종료 | 완료 화면 | ✅ 완료 | `app/gx/complete/page.tsx` |

**테스트 체크리스트:**
- [ ] GX 클래스 목록 표시
- [ ] 클래스 예약 버튼 동작
- [ ] 클래스 상세 정보 표시
- [ ] 내 GX 기록 표시

---

## 7. PT/OT (Phase 9)

| # | 기능 | 상세 | 구현 상태 | 파일 |
|---|------|------|----------|------|
| 7.1 | 트레이너 추천 | 트레이너 목록 | ✅ 완료 | `app/pt/page.tsx` |
| 7.2 | 트레이너 상세 | 프로필, 리뷰 | ✅ 완료 | `app/pt/trainer/[id]/page.tsx` |
| 7.3 | PT 예약 (캘린더) | 일정 예약 | ✅ 완료 | `app/pt/booking/page.tsx` |
| 7.4 | 패키지 선택 | PT 패키지 | ✅ 완료 | `app/pt/package/page.tsx` |
| 7.5 | 예약 현황 | 현재 예약 | ✅ 완료 | `app/pt/status/page.tsx` |

**테스트 체크리스트:**
- [ ] 트레이너 목록 표시
- [ ] 트레이너 상세 정보 표시
- [ ] PT 예약 캘린더 동작
- [ ] 패키지 선택 동작

---

## 8. 스트레칭 홈 (Phase 10)

| # | 기능 | 상세 | 구현 상태 | 파일 |
|---|------|------|----------|------|
| 8.1 | 스트레칭 메인 | 카테고리, 영상 목록 | ✅ 완료 | `app/stretching/page.tsx` |
| 8.2 | 영상 상세 | 단계별 가이드 | ✅ 완료 | `app/stretching/video/[id]/page.tsx` |
| 8.3 | 루틴 생성 | 나만의 루틴 만들기 | ✅ 완료 | `app/stretching/create-routine/page.tsx` |
| 8.4 | 루틴 상세 | 스트레칭 루틴 | ✅ 완료 | `app/stretching/routine/[id]/page.tsx` |

**테스트 체크리스트:**
- [ ] 스트레칭 영상 목록 표시
- [ ] 영상 재생 동작
- [ ] 나만의 루틴 만들기 동작
- [ ] 스트레칭 루틴 실행

---

## 9. UGC/피드 (Phase 11)

| # | 기능 | 상세 | 구현 상태 | 파일 |
|---|------|------|----------|------|
| 9.1 | 피드 메인 | 포스트 목록 | ✅ 완료 | `app/feed/page.tsx` |
| 9.2 | 포스트 상세 | 댓글 기능 | ✅ 완료 | `app/feed/post/[id]/page.tsx` |
| 9.3 | 챌린지 목록 | 진행중/예정 | ✅ 완료 | `app/feed/challenges/page.tsx` |
| 9.4 | 게시글 작성 | 운동 인증 업로드 | ✅ 완료 | `app/feed/create/page.tsx` |
| 9.5 | 내 영상 업로드 | UGC 영상 업로드 | ✅ 완료 | `app/ugc/upload/page.tsx` |
| 9.6 | 피드백 보기 | 영상 피드백 | ✅ 완료 | `app/ugc/[videoId]/page.tsx` |

**테스트 체크리스트:**
- [ ] 피드 목록 표시
- [ ] 게시글 작성 동작
- [ ] 댓글 기능 동작
- [ ] 챌린지 목록 표시
- [ ] UGC 영상 업로드 동작

---

## 10. 리워드 (Phase 12)

| # | 기능 | 상세 | 구현 상태 | 파일 |
|---|------|------|----------|------|
| 10.1 | 리워드 메인 | 포인트/뱃지/쿠폰 탭 | ✅ 완료 | `app/rewards/page.tsx` |
| 10.2 | 뱃지 컬렉션 | 획득/미획득 뱃지 | ✅ 완료 | 탭 내 구현됨 |
| 10.3 | 리워드 센터 | 쿠폰 사용 | ✅ 완료 | `app/rewards/use/page.tsx` |
| 10.4 | 배지 상세 | 배지 별도 페이지 | ✅ 완료 | `app/rewards/badges/page.tsx` |

**테스트 체크리스트:**
- [ ] 포인트 잔액 표시
- [ ] 뱃지 컬렉션 표시
- [ ] 쿠폰 목록 표시
- [ ] 리워드 사용 동작

---

## 11. 결제 (Phase 13)

| # | 기능 | 상세 | 구현 상태 | 파일 |
|---|------|------|----------|------|
| 11.1 | 결제 화면 | 결제 수단, 쿠폰 | ✅ 완료 | `app/payment/checkout/page.tsx` |
| 11.2 | 결제 내역 | 결제 히스토리 | ✅ 완료 | `app/payment/history/page.tsx` |
| 11.3 | 영수증 | 결제 완료 영수증 | ✅ 완료 | `app/payment/success/page.tsx` |
| 11.4 | 재등록 추천 | 회원권 갱신 안내 | ✅ 완료 | `app/payment/renewal/page.tsx` |

**테스트 체크리스트:**
- [ ] 결제 수단 선택 동작
- [ ] 쿠폰 적용 동작
- [ ] 결제 완료 화면 표시
- [ ] 결제 내역 목록 표시

---

## 12. 마이페이지 (Phase 14)

| # | 기능 | 상세 | 구현 상태 | 파일 |
|---|------|------|----------|------|
| 12.1 | 프로필 | 회원 정보 | ✅ 완료 | `app/mypage/page.tsx` |
| 12.2 | 프로필 수정 | 정보 편집 | ✅ 완료 | `app/mypage/profile/page.tsx` |
| 12.3 | 설정 | 알림/앱 설정 | ✅ 완료 | `app/mypage/settings/page.tsx` |
| 12.4 | 회원권 정보 | 회원권 상태 | ✅ 완료 | `app/membership/page.tsx` |
| 12.5 | 방문 기록 | 출석 기록 | ✅ 완료 | `app/mypage/visit-history/page.tsx` |
| 12.6 | 이용 내역 | 서비스 이용 | ✅ 완료 | `app/mypage/usage-history/page.tsx` |

**테스트 체크리스트:**
- [ ] 프로필 정보 표시
- [ ] 프로필 수정 동작
- [ ] 설정 변경 동작
- [ ] 회원권 정보 표시
- [ ] 방문 기록 표시
- [ ] 이용 내역 표시

---

## 13. 알림 (Phase 15)

| # | 기능 | 상세 | 구현 상태 | 파일 |
|---|------|------|----------|------|
| 13.1 | 알림 리스트 | 알림 목록 | ✅ 완료 | `app/notifications/page.tsx` |
| 13.2 | 알림 상세 | 개별 알림 상세 | ✅ 완료 | `app/notifications/[notificationId]/page.tsx` |

**테스트 체크리스트:**
- [ ] 알림 목록 표시
- [ ] 알림 클릭 → 상세 이동
- [ ] 알림 읽음 처리

---

## 14. 인프라/최적화 (Phase 16-18)

| # | 기능 | 상세 | 구현 상태 | 파일 |
|---|------|------|----------|------|
| 14.1 | Zustand 상태관리 | Auth/Workout/UI Store | ✅ 완료 | `store/*.ts` |
| 14.2 | 성능 최적화 | LazyImage, memo | ✅ 완료 | `components/optimized/` |
| 14.3 | PWA 설정 | Manifest, SW | ✅ 완료 | `public/manifest.json`, `sw.js` |
| 14.4 | 오프라인 페이지 | 오프라인 대응 | ✅ 완료 | `app/offline/page.tsx` |

---

## 15. 추가 페이지

| # | 기능 | 상세 | 구현 상태 | 파일 |
|---|------|------|----------|------|
| 15.1 | 로그인 | 로그인 페이지 | ✅ 완료 | `app/login/page.tsx` |
| 15.2 | 운동 상세 | 개별 운동 정보 | ✅ 완료 | `app/exercise/[exerciseId]/page.tsx` |

---

## 헤더 네비게이션 현황

### PageHeader (ModernUI) 사용 - 로고 클릭 시 홈 이동 ✅
> `showLogo=true`가 기본값으로 설정되어 있음

| 페이지 | 경로 |
|--------|------|
| 회원권 정보 | `/membership` |
| 온보딩 | `/onboarding`, `/onboarding/goals`, `/onboarding/health`, `/onboarding/complete` |
| 운동 상세 | `/exercise/[exerciseId]` |
| 알림 | `/notifications`, `/notifications/[notificationId]` |
| 마이페이지 | `/mypage`, `/mypage/profile`, `/mypage/settings` |
| 리워드 | `/rewards`, `/rewards/use` |
| 리포트 | `/report`, `/report/inbody`, `/report/fms`, `/report/p-score` |
| 루틴 | `/routine`, `/routine/[routineId]`, `/routine/[routineId]/exercise/[exerciseId]` |
| GX | `/gx`, `/gx/[classId]`, `/gx/history` |
| QR 스캔 | `/qr-scan/equipment/[id]`, `/qr-scan/stretching`, `/qr-scan/recovery`, `/qr-scan/sauna` |
| PT 패키지 | `/pt/package` |

### Header (Layout) 사용 - 로고 옵션 확인 필요 ⚠️
> `showLogo` 또는 `showHome` 옵션 추가 필요

| 페이지 | 경로 | 수정 필요 |
|--------|------|----------|
| 피드 | `/feed`, `/feed/post/[id]`, `/feed/create`, `/feed/challenges` | showLogo 추가 |
| 스트레칭 | `/stretching`, `/stretching/video/[id]`, `/stretching/create-routine`, `/stretching/routine/[id]` | showLogo 추가 |
| 마이페이지 | `/mypage/visit-history`, `/mypage/usage-history` | showLogo 추가 |
| 리워드 | `/rewards/badges` | showLogo 추가 |
| 결제 | `/payment/success`, `/payment/history` | showLogo 추가 |
| GX 완료 | `/gx/complete` | showLogo 추가 |
| 자세 가이드 | `/qr-scan/equipment/[id]/form-guide` | showLogo 추가 |

### 커스텀 헤더 또는 헤더 없음 - 확인 필요 ⚠️

| 페이지 | 경로 | 상태 |
|--------|------|------|
| 홈 | `/` | 커스텀 헤더 (로고 있음) ✅ |
| QR 스캔 | `/qr-scan` | 커스텀 헤더 (로고 추가 필요) |
| 로그인 | `/login` | 확인 필요 |
| PT | `/pt`, `/pt/trainer/[id]`, `/pt/booking`, `/pt/status` | 확인 필요 |
| UGC | `/ugc/[videoId]`, `/ugc/upload` | 확인 필요 |
| 결제 | `/payment/renewal`, `/payment/checkout` | 확인 필요 |
| 루틴 완료 | `/routine/complete` | 확인 필요 |
| 오프라인 | `/offline` | 확인 필요 |

---

## 카메라 기능 테스트

### QR 스캔
- [ ] "카메라로 스캔하기" 버튼 클릭
- [ ] 카메라 권한 요청 팝업 표시
- [ ] 권한 허용 후 카메라 화면 표시
- [ ] QR 코드 스캔 성공 시 기구 상세 페이지 이동
- [ ] 스캔 취소 버튼 동작
- [ ] 데모 체험 버튼 동작

### AI 자세 분석 (MediaPipe)
- [ ] "AI 트래킹" 탭 선택
- [ ] "카메라 켜기" 버튼 클릭
- [ ] 카메라 권한 요청 팝업 표시
- [ ] 권한 허용 후 카메라 화면 표시
- [ ] MediaPipe 모델 로딩 표시
- [ ] 실시간 스켈레톤 오버레이 표시
- [ ] FPS 표시
- [ ] 카메라 끄기 버튼 동작
- [ ] 풀스크린 모드 동작

---

## 구현 현황 요약

### 전체 현황
- **총 페이지 수**: 56개
- **총 기능 수**: 56개
- **구현 완료**: 56개 (100%)
- **미구현**: 0개 (0%)

### advance.md 요구사항
- **완료**: 2개 (P-Score 버튼, FMS 버튼)
- **부분완료**: 1개 (모든 페이지 로고 추가)

### 영역별 완료율

| 영역 | 완료 | 전체 | 완료율 |
|------|------|------|--------|
| 온보딩 | 4 | 4 | 100% |
| 홈 | 1 | 1 | 100% |
| QR 스캔 | 6 | 6 | 100% |
| 루틴 | 4 | 4 | 100% |
| AI 리포트 | 4 | 4 | 100% |
| GX | 4 | 4 | 100% |
| PT/OT | 5 | 5 | 100% |
| 스트레칭 | 4 | 4 | 100% |
| UGC/피드 | 6 | 6 | 100% |
| 리워드 | 4 | 4 | 100% |
| 결제 | 4 | 4 | 100% |
| 마이페이지 | 6 | 6 | 100% |
| 알림 | 2 | 2 | 100% |
| 인프라 | 4 | 4 | 100% |
| 추가 | 2 | 2 | 100% |

---

## 우선순위 수정 필요 항목

### 높음 (High)
1. [ ] Header 사용 페이지에 `showLogo={true}` 추가
   - `/feed`, `/feed/post/[id]`, `/feed/create`, `/feed/challenges`
   - `/stretching`, `/stretching/video/[id]`, `/stretching/create-routine`, `/stretching/routine/[id]`
   - `/mypage/visit-history`, `/mypage/usage-history`
   - `/rewards/badges`
   - `/payment/success`, `/payment/history`
   - `/gx/complete`
   - `/qr-scan/equipment/[id]/form-guide`

2. [ ] 커스텀/헤더 없는 페이지에 홈 이동 방법 추가
   - `/qr-scan` - 로고 추가
   - `/pt/*` 페이지들
   - `/ugc/*` 페이지들
   - `/payment/renewal`, `/payment/checkout`
   - `/routine/complete`

### 중간 (Medium)
1. [ ] 모든 이미지에 alt 속성 추가 (접근성)
2. [ ] `<img>` 태그를 `<Image>` 컴포넌트로 교체
3. [ ] 사용하지 않는 import 정리 (lint 경고)

### 낮음 (Low)
1. [ ] 타입 안정성 개선
2. [ ] 테스트 코드 추가
3. [ ] Lighthouse 점수 최적화

---

## 변경 이력

| 날짜 | 변경 내용 |
|------|----------|
| 2025-12-11 | 초기 체크리스트 작성 |
| 2025-12-11 | 전체 기능 구현 완료 (100%) |
| 2025-12-15 | advance.md 요구사항 체크 추가 |
| 2025-12-15 | 헤더 네비게이션 현황 상세 분석 추가 |
| 2025-12-15 | 카메라 기능 테스트 체크리스트 추가 |
| 2025-12-15 | 우선순위 수정 필요 항목 정리 |
