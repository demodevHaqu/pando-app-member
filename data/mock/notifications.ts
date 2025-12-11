import { Notification } from '@/types';

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'noti1',
    type: 'renewal',
    title: '회원권 만료 7일 전',
    message: '회원권이 2025-01-22에 만료됩니다. 지금 재등록하고 10% 할인 받으세요!',
    isRead: false,
    createdAt: '2025-01-15T09:00:00Z',
    actionUrl: '/payment/renewal',
  },
  {
    id: 'noti2',
    type: 'pt',
    title: 'PT 예약 확정',
    message: '1월 16일 10:00 강동원 트레이너님과의 PT 세션이 예약되었습니다.',
    isRead: false,
    createdAt: '2025-01-15T14:30:00Z',
    actionUrl: '/pt/status',
  },
  {
    id: 'noti3',
    type: 'gx',
    title: 'GX 대기 → 확정',
    message: '오늘 19:00 저녁 필라테스 수업에 자리가 생겼습니다!',
    isRead: true,
    createdAt: '2025-01-15T16:00:00Z',
    actionUrl: '/gx',
  },
];