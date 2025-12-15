export interface EventBanner {
  id: string;
  title: string;
  subtitle: string;
  type: 'event' | 'notice' | 'promo' | 'gx-special';
  imageUrl?: string;
  bgGradient: string;
  icon: string;
  link: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  priority: number;
}

export const MOCK_EVENT_BANNERS: EventBanner[] = [
  {
    id: 'event1',
    title: '신규 회원 50% 할인',
    subtitle: '12월 한정 프로모션',
    type: 'promo',
    bgGradient: 'linear-gradient(135deg, #FF6B35, #FF006E)',
    icon: '🎁',
    link: '/payment/checkout',
    startDate: '2025-12-01',
    endDate: '2025-12-31',
    isActive: true,
    priority: 1,
  },
  {
    id: 'event2',
    title: 'GX 특강: 파워 요가',
    subtitle: '박지연 강사 / 12월 20일 오후 7시',
    type: 'gx-special',
    bgGradient: 'linear-gradient(135deg, #7209B7, #00D9FF)',
    icon: '🧘',
    link: '/gx',
    startDate: '2025-12-15',
    endDate: '2025-12-20',
    isActive: true,
    priority: 2,
  },
  {
    id: 'event3',
    title: '연말 챌린지: 100일 운동',
    subtitle: '참여하고 포인트 2배 적립!',
    type: 'event',
    bgGradient: 'linear-gradient(135deg, #39FF14, #00D9FF)',
    icon: '🏆',
    link: '/rewards',
    startDate: '2025-12-01',
    endDate: '2026-03-10',
    isActive: true,
    priority: 3,
  },
  {
    id: 'event4',
    title: '시설 점검 안내',
    subtitle: '12월 25일 오전 6-8시 사우나 점검',
    type: 'notice',
    bgGradient: 'linear-gradient(135deg, #FFD60A, #FF6B35)',
    icon: '📢',
    link: '/notifications/notice1',
    startDate: '2025-12-20',
    endDate: '2025-12-25',
    isActive: true,
    priority: 4,
  },
  {
    id: 'event5',
    title: 'PT 패키지 20% 할인',
    subtitle: '16회 이상 구매 시 적용',
    type: 'promo',
    bgGradient: 'linear-gradient(135deg, #FF006E, #7209B7)',
    icon: '💪',
    link: '/pt/package',
    startDate: '2025-12-01',
    endDate: '2025-12-31',
    isActive: true,
    priority: 5,
  },
];

// 현재 활성화된 이벤트만 필터링
export const getActiveEvents = (): EventBanner[] => {
  const today = new Date();
  return MOCK_EVENT_BANNERS
    .filter(event => {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);
      return event.isActive && today >= start && today <= end;
    })
    .sort((a, b) => a.priority - b.priority);
};
