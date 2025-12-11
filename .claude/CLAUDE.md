Primary Colors:
- Energy Orange: #FF6B35 (주요 CTA, 운동 시작)
- Electric Blue: #00D9FF (정보, 진행 상태)
- Neon Green: #39FF14 (성공, 완료)

Secondary Colors:
- Power Pink: #FF006E (강조, 알림)
- Tech Purple: #7209B7 (프리미엄 기능)
- Cyber Yellow: #FFD60A (경고, 주의)

Background:
- Dark: #0D0D12 (메인 배경)
- Mid: #1A1A24 (카드 배경)
- Light: #252533 (호버 상태)
```

### 주요 효과
- **Hologram Grid**: 사이버 그리드 패턴
- **Glass Morphism**: 반투명 유리 효과
- **Neon Glow**: 네온 발광 효과
- **Energy Pulse**: 맥박 애니메이션
- **Gradient Borders**: 그라디언트 테두리

---

## 📁 최종 프로젝트 구조
```
pando/
├── app/
│   ├── layout.tsx                      # Root Layout
│   ├── page.tsx                        # 홈
│   ├── globals.css
│   │
│   ├── onboarding/                     # 📍 PHASE 3
│   │   ├── page.tsx                    # 회원가입
│   │   ├── goals/page.tsx              # 운동 목적
│   │   ├── health/page.tsx             # 통증/체형
│   │   └── complete/page.tsx           # 완료
│   │
│   ├── routine/                        # 📍 PHASE 6
│   │   ├── page.tsx                    # 루틴 리스트
│   │   ├── [routineId]/
│   │   │   ├── page.tsx                # 루틴 상세
│   │   │   └── exercise/
│   │   │       └── [exerciseId]/
│   │   │           └── page.tsx        # 운동 수행
│   │   └── complete/page.tsx           # 루틴 완료
│   │
│   ├── qr-scan/                        # 📍 PHASE 5
│   │   ├── page.tsx                    # QR 스캔 메인
│   │   ├── equipment/
│   │   │   └── [id]/
│   │   │       ├── page.tsx            # 기구 상세
│   │   │       └── form-guide/page.tsx # 자세 가이드
│   │   ├── stretching/page.tsx
│   │   ├── sauna/page.tsx
│   │   └── recovery/page.tsx
│   │
│   ├── report/                         # 📍 PHASE 7
│   │   ├── page.tsx                    # 리포트 메인
│   │   ├── inbody/page.tsx
│   │   ├── fms/page.tsx
│   │   └── p-score/page.tsx
│   │
│   ├── gx/                             # 📍 PHASE 8
│   │   ├── page.tsx                    # GX 스케줄
│   │   ├── [classId]/page.tsx
│   │   └── history/page.tsx
│   │
│   ├── pt/                             # 📍 PHASE 9
│   │   ├── page.tsx                    # 트레이너 추천
│   │   ├── trainer/[id]/page.tsx
│   │   ├── booking/page.tsx
│   │   ├── package/page.tsx
│   │   └── status/page.tsx
│   │
│   ├── stretching/                     # 📍 PHASE 10
│   │   ├── page.tsx
│   │   └── video/[id]/page.tsx
│   │
│   ├── ugc/                            # 📍 PHASE 11
│   │   ├── page.tsx
│   │   ├── upload/page.tsx
│   │   └── [videoId]/page.tsx
│   │
│   ├── rewards/                        # 📍 PHASE 12
│   │   ├── page.tsx
│   │   ├── use/page.tsx
│   │   └── badges/page.tsx
│   │
│   ├── payment/                        # 📍 PHASE 13
│   │   ├── renewal/page.tsx
│   │   ├── checkout/page.tsx
│   │   └── success/page.tsx
│   │
│   ├── mypage/                         # 📍 PHASE 14
│   │   ├── page.tsx
│   │   ├── edit/page.tsx
│   │   ├── visit-history/page.tsx
│   │   ├── usage-history/page.tsx
│   │   └── settings/page.tsx
│   │
│   └── notifications/                  # 📍 PHASE 15
│       ├── page.tsx
│       └── [notificationId]/page.tsx
│
├── components/
│   ├── ui/                             # 📍 PHASE 1
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── Modal.tsx
│   │   ├── Input.tsx
│   │   ├── Tabs.tsx
│   │   └── Skeleton.tsx
│   │
│   ├── layout/                         # 📍 PHASE 2
│   │   ├── BottomNav.tsx
│   │   └── Header.tsx
│   │
│   ├── motion-tracking/                # 모션 트래킹
│   │   ├── PoseCanvas.tsx
│   │   ├── FormFeedback.tsx
│   │   └── ExerciseGuide.tsx
│   │
│   ├── routine/
│   │   ├── RoutineCard.tsx
│   │   ├── ExerciseCard.tsx
│   │   └── SetCounter.tsx
│   │
│   ├── qr/
│   │   ├── QRScanner.tsx
│   │   └── ScanHistory.tsx
│   │
│   ├── gx/
│   │   ├── GXClassCard.tsx
│   │   └── InstructorProfile.tsx
│   │
│   └── charts/                         # 리포트용 차트
│       ├── LineChart.tsx
│       ├── BarChart.tsx
│       └── RadarChart.tsx
│
├── hooks/
│   ├── usePoseTracking.ts
│   ├── useRepCounter.ts
│   ├── useQRScanner.ts
│   └── useTimer.ts
│
├── store/                              # 📍 PHASE 16
│   ├── authStore.ts
│   ├── routineStore.ts
│   ├── gxStore.ts
│   ├── ptStore.ts
│   ├── rewardsStore.ts
│   └── notificationStore.ts
│
├── types/
│   ├── index.ts
│   ├── routine.ts
│   ├── gx.ts
│   ├── pt.ts
│   └── pose-tracking.ts
│
├── data/mock/                          # 📍 PHASE 16
│   ├── members.ts
│   ├── routines.ts
│   ├── exercises.ts
│   ├── gxClasses.ts
│   ├── trainers.ts
│   ├── reports.ts
│   └── notifications.ts
│
├── lib/
│   └── utils.ts
│
├── public/
│   └── assets/
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── vercel.json


프로젝트명: PANDO Fitness Member App
기술 스택: Next.js 15.5.7 + TypeScript + TailwindCSS
디자인 컨셉: Cyber-Fitness (사이버펑크 + 피트니스)
뷰포트: 425px (모바일 우선)
배포: Vercel


📱 완성된 기능 전체 목록
핵심 기능

온보딩 - 회원가입, 목표 설정, 체형 정보
홈 대시보드 - AI 루틴, PT/GX 정보, 리커버리 추천
QR 스캔 - 기구 스캔, 스트레칭존, 사우나
루틴 시스템 - 운동 루틴 조회, 실행, 완료
AI 리포트 - InBody, FMS, P-Score
GX 스케줄 - 클래스 예약, 출석 관리
PT/OT - 트레이너 매칭, 예약, 현황 관리
스트레칭 - 영상 라이브러리, 루틴 생성
피드/UGC - 게시글, 댓글, 챌린지
리워드 - 포인트, 뱃지, 쿠폰
결제 - 패키지 구매, 결제 내역
마이페이지 - 프로필, 설정, 알림
상태 관리 - Zustand 전역 상태
최적화 - React.memo, LazyLoad, PWA

기술 스택

Framework: Next.js 15.5.7 (App Router)
언어: TypeScript
스타일: TailwindCSS
애니메이션: Framer Motion
상태 관리: Zustand
아이콘: Lucide React
차트: Recharts
PWA: Service Worker, Web Manifest