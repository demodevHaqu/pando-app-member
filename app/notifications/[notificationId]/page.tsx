'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Bell,
  Calendar,
  Clock,
  Gift,
  AlertCircle,
  ArrowRight,
  Trash2,
  BellOff,
  ArrowLeft,
} from 'lucide-react';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  Tag,
} from '@/components/ui/ModernUI';

// Mock 알림 상세 데이터
const MOCK_NOTIFICATIONS: Record<
  string,
  {
    id: string;
    type: 'event' | 'reservation' | 'reward' | 'system' | 'promotion';
    title: string;
    message: string;
    detail: string;
    timestamp: string;
    isRead: boolean;
    actionUrl?: string;
    actionLabel?: string;
    image?: string;
  }
> = {
  notif1: {
    id: 'notif1',
    type: 'reservation',
    title: 'PT 예약 확정',
    message: '강동원 트레이너와의 PT 예약이 확정되었습니다.',
    detail: `안녕하세요, Fit Genie 회원님!

강동원 트레이너와의 PT 예약이 확정되었습니다.

📅 일시: 2025년 1월 16일 (목) 오후 2시
👤 트레이너: 강동원
📍 장소: PT Zone A
⏱️ 소요시간: 60분

준비물:
- 운동화, 운동복
- 개인 수건
- 물

예약 변경 및 취소는 24시간 전까지 가능합니다.
건강한 운동 되세요! 💪`,
    timestamp: '2025-01-15T10:30:00',
    isRead: false,
    actionUrl: '/pt/status',
    actionLabel: '예약 확인하기',
  },
  notif2: {
    id: 'notif2',
    type: 'reward',
    title: '포인트 적립 완료',
    message: '운동 완료로 150P가 적립되었습니다.',
    detail: `🎉 포인트 적립 완료!

오늘 운동을 완료하여 포인트가 적립되었습니다.

적립 내역:
• 루틴 완료: +100P
• 연속 출석 보너스: +50P

현재 보유 포인트: 2,150P

포인트는 PT 결제, 상품 구매 등에 사용하실 수 있습니다.
리워드 센터에서 다양한 혜택을 확인해보세요!`,
    timestamp: '2025-01-15T09:00:00',
    isRead: true,
    actionUrl: '/rewards',
    actionLabel: '리워드 확인',
  },
  notif3: {
    id: 'notif3',
    type: 'event',
    title: 'GX 클래스 시작 30분 전',
    message: '파워 요가 클래스가 곧 시작됩니다.',
    detail: `⏰ 클래스 시작 알림

파워 요가 클래스가 30분 후 시작됩니다.

📅 시간: 오늘 오후 6시 30분
👤 강사: 박지연
📍 장소: GX룸 A
👥 현재 예약: 18/20명

준비사항:
- 요가매트는 센터에서 제공됩니다
- 편한 운동복 착용
- 수분 보충을 위한 물

늦지 않게 도착해주세요! 🧘‍♀️`,
    timestamp: '2025-01-15T18:00:00',
    isRead: false,
    actionUrl: '/gx',
    actionLabel: '클래스 보기',
  },
  notif4: {
    id: 'notif4',
    type: 'promotion',
    title: '회원권 갱신 특별 할인',
    message: '만료 전 갱신 시 20% 할인 혜택!',
    detail: `🎁 회원님만을 위한 특별 혜택!

회원권 만료가 다가오고 있습니다.
지금 갱신하시면 특별 할인을 받으실 수 있어요!

📅 현재 회원권: 2025년 2월 15일 만료

특별 혜택:
• 3개월 이상 갱신 시 20% 할인
• 6개월 이상 갱신 시 PT 1회 무료
• 12개월 갱신 시 추가 1개월 무료

⏰ 할인 기간: 2025년 1월 31일까지

서두르세요! 혜택은 한정 기간 동안만 제공됩니다.`,
    timestamp: '2025-01-14T14:00:00',
    isRead: true,
    actionUrl: '/payment/renewal',
    actionLabel: '갱신하기',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600',
  },
  notif5: {
    id: 'notif5',
    type: 'system',
    title: '앱 업데이트 안내',
    message: '새로운 기능이 추가되었습니다.',
    detail: `📱 Fit Genie 앱 업데이트 안내

버전 2.5.0이 출시되었습니다!

새로운 기능:
✨ AI 자세 교정 기능 개선
✨ 스트레칭 루틴 커스터마이징
✨ 다크모드 지원
✨ 운동 기록 공유 기능

버그 수정:
🔧 일부 기기에서 발생하던 크래시 해결
🔧 알림 설정 오류 수정
🔧 캘린더 동기화 개선

더 나은 서비스를 위해 최신 버전으로 업데이트해주세요!`,
    timestamp: '2025-01-13T11:00:00',
    isRead: true,
  },
};

const getNotificationIcon = (type: string) => {
  const iconStyle = { flexShrink: 0 };
  switch (type) {
    case 'reservation':
      return <Calendar size={24} color="#00D9FF" style={iconStyle} />;
    case 'reward':
      return <Gift size={24} color="#FFD60A" style={iconStyle} />;
    case 'event':
      return <Clock size={24} color="#FF6B35" style={iconStyle} />;
    case 'promotion':
      return <Bell size={24} color="#FF006E" style={iconStyle} />;
    case 'system':
      return <AlertCircle size={24} color="#7209B7" style={iconStyle} />;
    default:
      return <Bell size={24} color="#6B7280" style={iconStyle} />;
  }
};

const getNotificationTagColor = (type: string): 'green' | 'orange' | 'pink' | 'blue' | 'purple' => {
  switch (type) {
    case 'reservation':
      return 'blue';
    case 'reward':
      return 'orange';
    case 'event':
      return 'green';
    case 'promotion':
      return 'pink';
    case 'system':
      return 'purple';
    default:
      return 'blue';
  }
};

const getNotificationTypeLabel = (type: string) => {
  switch (type) {
    case 'reservation':
      return '예약';
    case 'reward':
      return '리워드';
    case 'event':
      return '이벤트';
    case 'promotion':
      return '프로모션';
    case 'system':
      return '시스템';
    default:
      return '알림';
  }
};

export default function NotificationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const notificationId = params.notificationId as string;

  const notification = MOCK_NOTIFICATIONS[notificationId];

  if (!notification) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0D0D12',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '60px', marginBottom: '16px' }}>🔔</div>
          <p style={{ color: 'white', marginBottom: '16px' }}>알림을 찾을 수 없습니다</p>
          <SecondaryButton onClick={() => router.push('/notifications')}>
            알림 목록으로
          </SecondaryButton>
        </div>
      </div>
    );
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDelete = () => {
    if (confirm('이 알림을 삭제하시겠습니까?')) {
      router.push('/notifications');
    }
  };

  const handleMute = () => {
    alert('이 유형의 알림이 음소거되었습니다');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '140px' }}>
      <PageHeader title="알림 상세" />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* 알림 헤더 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <FeatureCard>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {getNotificationIcon(notification.type)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Tag color={getNotificationTagColor(notification.type)}>
                    {getNotificationTypeLabel(notification.type)}
                  </Tag>
                  {!notification.isRead && (
                    <span style={{
                      width: '8px',
                      height: '8px',
                      background: '#FF006E',
                      borderRadius: '50%',
                    }} />
                  )}
                </div>
                <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
                  {notification.title}
                </h1>
                <p style={{ color: '#9CA3AF', fontSize: '14px' }}>
                  {notification.message}
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '13px',
              color: '#6B7280',
            }}>
              <Clock size={14} />
              <span>{formatTimestamp(notification.timestamp)}</span>
            </div>
          </FeatureCard>
        </motion.div>

        {/* 이미지 (있는 경우) */}
        {notification.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
            }}>
              <img
                src={notification.image}
                alt={notification.title}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                }}
              />
            </div>
          </motion.div>
        )}

        {/* 상세 내용 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ModernCard style={{ padding: '20px' }}>
            <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>상세 내용</h3>
            <div style={{
              color: '#D1D5DB',
              fontSize: '14px',
              whiteSpace: 'pre-wrap',
              lineHeight: 1.7,
            }}>
              {notification.detail}
            </div>
          </ModernCard>
        </motion.div>

        {/* 액션 버튼들 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}
        >
          <SecondaryButton size="lg" onClick={handleDelete} fullWidth>
            <Trash2 size={18} style={{ marginRight: '8px' }} />
            삭제
          </SecondaryButton>
          <SecondaryButton size="lg" onClick={handleMute} fullWidth>
            <BellOff size={18} style={{ marginRight: '8px' }} />
            음소거
          </SecondaryButton>
        </motion.div>
      </div>

      {/* 하단 고정 버튼 */}
      {notification.actionUrl && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          left: 0,
          right: 0,
          maxWidth: '425px',
          margin: '0 auto',
          padding: '16px 20px',
          background: 'linear-gradient(to top, #0D0D12 60%, transparent)',
        }}>
          <PrimaryButton
            fullWidth
            size="lg"
            onClick={() => router.push(notification.actionUrl!)}
            icon={<ArrowRight size={20} />}
          >
            {notification.actionLabel || '바로가기'}
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}
