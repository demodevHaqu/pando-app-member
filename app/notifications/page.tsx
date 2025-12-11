'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MOCK_NOTIFICATIONS } from '@/data/mock/notifications';
import {
  Bell,
  Calendar,
  Trophy,
  Users,
  CreditCard,
  Dumbbell,
  CheckCheck,
  Trash2,
} from 'lucide-react';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  SecondaryButton,
  Tag,
} from '@/components/ui/ModernUI';

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    const icons: { [key: string]: { icon: React.ReactNode; color: string } } = {
      pt: { icon: <Dumbbell size={20} />, color: '#FF6B35' },
      gx: { icon: <Users size={20} />, color: '#00D9FF' },
      renewal: { icon: <Calendar size={20} />, color: '#FF006E' },
      achievement: { icon: <Trophy size={20} />, color: '#39FF14' },
      payment: { icon: <CreditCard size={20} />, color: '#7209B7' },
      system: { icon: <Bell size={20} />, color: '#6B7280' },
    };
    return icons[type] || { icon: <Bell size={20} />, color: '#6B7280' };
  };

  const getNotificationTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      pt: 'PT',
      gx: 'GX',
      renewal: '회원권',
      achievement: '성과',
      payment: '결제',
      system: '시스템',
    };
    return labels[type] || type;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes}분 전`;
    }
    if (hours < 24) return `${hours}시간 전`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleClearAll = () => {
    if (confirm('모든 알림을 삭제하시겠습니까?')) {
      setNotifications([]);
    }
  };

  const handleNotificationClick = (notification: (typeof MOCK_NOTIFICATIONS)[number]) => {
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }
    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    }
  };

  const filterTypes = ['all', 'pt', 'gx', 'renewal', 'achievement'];

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="알림" />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FeatureCard>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>읽지 않은 알림</div>
                <div style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {unreadCount}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <SecondaryButton
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  disabled={unreadCount === 0}
                  icon={<CheckCheck size={14} />}
                >
                  모두 읽음
                </SecondaryButton>
                <SecondaryButton
                  size="sm"
                  onClick={handleClearAll}
                  disabled={notifications.length === 0}
                  icon={<Trash2 size={14} />}
                >
                  전체 삭제
                </SecondaryButton>
              </div>
            </div>
          </FeatureCard>
        </motion.section>

        {/* Type Filters */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
            {filterTypes.map((type) => (
              <button
                key={type}
                style={{
                  padding: '10px 16px',
                  borderRadius: '10px',
                  fontWeight: '500',
                  whiteSpace: 'nowrap',
                  background: 'rgba(26, 26, 36, 0.9)',
                  color: '#9CA3AF',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  fontSize: '13px',
                }}
              >
                {type === 'all' ? '전체' : getNotificationTypeLabel(type)}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Notifications List */}
        {notifications.length > 0 ? (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            {notifications.map((notification, index) => {
              const notificationIcon = getNotificationIcon(notification.type);
              const typeLabel = getNotificationTypeLabel(notification.type);

              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <ModernCard
                    style={{
                      padding: '16px',
                      cursor: 'pointer',
                      borderLeft: !notification.isRead ? '4px solid #00D9FF' : undefined,
                    }}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div style={{ display: 'flex', gap: '14px' }}>
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          flexShrink: 0,
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: notificationIcon.color,
                        }}
                      >
                        {notificationIcon.icon}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h4 style={{ fontWeight: 'bold', color: 'white', fontSize: '14px' }}>
                              {notification.title}
                            </h4>
                            {!notification.isRead && (
                              <div style={{
                                width: '8px',
                                height: '8px',
                                background: '#00D9FF',
                                borderRadius: '50%',
                              }} />
                            )}
                          </div>
                          <Tag color="green" size="sm">{typeLabel}</Tag>
                        </div>

                        <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {notification.message}
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '12px', color: '#6B7280' }}>
                            {formatDate(notification.createdAt)}
                          </span>

                          {notification.actionUrl && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(notification.actionUrl!);
                              }}
                              style={{
                                fontSize: '12px',
                                color: '#00D9FF',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                            >
                              자세히 보기 →
                            </button>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(notification.id);
                        }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#6B7280',
                          padding: '4px',
                        }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </ModernCard>
                </motion.div>
              );
            })}
          </motion.section>
        ) : (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ModernCard style={{ padding: '48px 20px', textAlign: 'center' }}>
              <Bell size={48} color="#6B7280" style={{ margin: '0 auto 12px', opacity: 0.5 }} />
              <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>알림이 없습니다</h3>
              <p style={{ fontSize: '13px', color: '#6B7280' }}>
                새로운 알림이 도착하면 여기에 표시됩니다
              </p>
            </ModernCard>
          </motion.section>
        )}

        {/* Notification Settings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ModernCard style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px', fontSize: '14px' }}>알림 설정</h4>
                <p style={{ fontSize: '12px', color: '#6B7280' }}>
                  받고 싶은 알림을 설정하세요
                </p>
              </div>
              <SecondaryButton size="sm" onClick={() => router.push('/mypage/settings')}>
                설정
              </SecondaryButton>
            </div>
          </ModernCard>
        </motion.section>
      </div>
    </div>
  );
}
