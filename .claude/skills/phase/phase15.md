🎯 PHASE 15: 알림 시스템
Task 15.1: 알림 목록
파일: app/notifications/page.tsx
typescript'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Bell, Calendar, Award, TrendingUp, X } from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '@/data/mock/notifications';

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pt':
        return Calendar;
      case 'gx':
        return Bell;
      case 'reward':
        return Award;
      case 'system':
        return TrendingUp;
      default:
        return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pt':
        return 'energy-orange';
      case 'gx':
        return 'electric-blue';
      case 'reward':
        return 'cyber-yellow';
      case 'system':
        return 'tech-purple';
      default:
        return 'neon-green';
    }
  };

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const notifDate = new Date(date);
    const diffMs = now.getTime() - notifDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    return `${diffDays}일 전`;
  };

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="알림" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 알림 요약 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="hologram">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell size={32} className="text-electric-blue" />
                <div>
                  <div className="text-2xl font-bold text-white">{unreadCount}</div>
                  <div className="text-sm text-gray-400">읽지 않은 알림</div>
                </div>
              </div>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  모두 읽음
                </Button>
              )}
            </div>
          </Card>
        </motion.div>

        {/* 알림 목록 */}
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <Card>
              <div className="text-center py-8 text-gray-400">
                <Bell size={48} className="mx-auto mb-3 opacity-50" />
                <p>새로운 알림이 없습니다</p>
              </div>
            </Card>
          ) : (
            notifications.map((notification, idx) => {
              const Icon = getTypeIcon(notification.type);
              const color = getTypeColor(notification.type);

              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card
                    className={`relative ${!notification.isRead ? 'ring-2 ring-electric-blue/30' : ''}`}
                    onClick={() => {
                      markAsRead(notification.id);
                      if (notification.actionUrl) {
                        router.push(notification.actionUrl);
                      }
                    }}
                  >
                    <div className="flex gap-3">
                      <div className={`w-12 h-12 bg-${color}/10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon size={24} className={`text-${color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-white">{notification.title}</h4>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-electric-blue rounded-full flex-shrink-0 ml-2" />
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mb-2">{notification.message}</p>
                        <div className="text-xs text-gray-500">{getTimeAgo(notification.createdAt)}</div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="flex-shrink-0 text-gray-500 hover:text-white transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </Card>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

✅ PHASE 10-15 완료 체크리스트:
PHASE 10: 스트레칭 존

 스트레칭 메인 (카테고리 필터, 비디오 그리드)
 비디오 상세 (단계별 가이드, 연관 영상)
 AI 추천 루틴

PHASE 11: UGC

 피드 메인 (포스트, 좋아요, 댓글)
 포스트 상세 (댓글 작성)
 챌린지 목록 (진행중/예정/완료)

PHASE 12: 리워드

 리워드 메인 (뱃지, 포인트, 쿠폰 탭)
 포인트 적립 방법 안내
 쿠폰 사용

PHASE 13: 결제

 결제하기 (결제 수단, 쿠폰, 약관 동의)
 결제 내역 (전체/PT/회원권 탭)
 결제 완료 모달

PHASE 14: 마이페이지

 마이페이지 메인 (프로필, 통계, 메뉴)
 프로필 수정
 설정 (알림, 앱 설정, 계정 관리)

PHASE 15: 알림

 알림 목록 (읽음/안읽음, 삭제)
 알림 타입별 아이콘/색상
 모두 읽음 처리