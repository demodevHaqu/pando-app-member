'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MOCK_MEMBER } from '@/data/mock/members';
import {
  User,
  Settings,
  CreditCard,
  FileText,
  Award,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  TrendingUp,
  Target,
  Calendar,
  Zap,
} from 'lucide-react';
import {
  ModernCard,
  FeatureCard,
  PremiumCard,
  PageHeader,
  SectionTitle,
  SecondaryButton,
  Tag,
  IconBox,
  Avatar,
} from '@/components/ui/ModernUI';

export default function MyPage() {
  const router = useRouter();
  const member = MOCK_MEMBER;

  const stats = [
    { icon: <TrendingUp size={20} color="#FF6B35" />, label: '운동 일수', value: '45', unit: '일', color: 'orange' as const },
    { icon: <Target size={20} color="#39FF14" />, label: '완료 루틴', value: '128', unit: '회', color: 'green' as const },
    { icon: <Calendar size={20} color="#00D9FF" />, label: '연속 출석', value: '7', unit: '일', color: 'blue' as const },
    { icon: <Zap size={20} color="#FF006E" />, label: '소모 칼로리', value: '12.5k', unit: 'kcal', color: 'pink' as const },
  ];

  const menuItems = [
    { icon: <User size={20} />, label: '프로필 수정', path: '/mypage/profile', color: 'blue' as const },
    { icon: <CreditCard size={20} />, label: '결제 내역', path: '/payment/history', color: 'orange' as const },
    { icon: <Award size={20} />, label: '보상 현황', path: '/rewards', color: 'green' as const },
    { icon: <FileText size={20} />, label: '운동 보고서', path: '/report', color: 'pink' as const },
    { icon: <Bell size={20} />, label: '알림 설정', path: '/mypage/settings', color: 'purple' as const },
    { icon: <Settings size={20} />, label: '환경 설정', path: '/mypage/settings', color: 'blue' as const },
    { icon: <HelpCircle size={20} />, label: '고객센터', path: '/support', color: 'orange' as const },
  ];

  const getMembershipInfo = (type: string) => {
    const info: { [key: string]: { color: 'green' | 'orange' | 'pink'; text: string } } = {
      basic: { color: 'green', text: '베이직' },
      premium: { color: 'orange', text: '프리미엄' },
      vip: { color: 'pink', text: 'VIP' },
    };
    return info[type] || { color: 'green', text: type };
  };

  const membershipInfo = getMembershipInfo(member.membershipType);

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="마이페이지" showBack={false} />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Profile Card */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FeatureCard>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ position: 'relative' }}>
                <Avatar name={member.name} size={72} />
                <div style={{
                  position: 'absolute',
                  bottom: '-4px',
                  right: '-4px',
                }}>
                  <Tag color={membershipInfo.color} size="sm">{membershipInfo.text}</Tag>
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: 'white', margin: '0 0 4px' }}>{member.name}</h2>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: '0 0 16px' }}>{member.email}</p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>회원 레벨</span>
                    <div style={{ fontWeight: 'bold', color: 'white', fontSize: '15px' }}>Lv.{member.level}</div>
                  </div>
                  <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.1)' }} />
                  <div>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>포인트</span>
                    <div style={{
                      fontWeight: 'bold',
                      fontSize: '15px',
                      background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      {member.points.toLocaleString()}P
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push('/mypage/profile')}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ChevronRight size={20} color="#6B7280" />
              </button>
            </div>
          </FeatureCard>
        </motion.section>

        {/* Statistics Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <SectionTitle title="나의 운동 통계" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <ModernCard style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <IconBox color={stat.color} size={36}>
                      {stat.icon}
                    </IconBox>
                    <span style={{ fontSize: '13px', color: '#6B7280' }}>{stat.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{stat.value}</span>
                    <span style={{ fontSize: '13px', color: '#6B7280' }}>{stat.unit}</span>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Membership Status */}
        {member.membershipType !== 'basic' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SectionTitle title="회원권 정보" />
            <PremiumCard>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '4px' }}>현재 회원권</div>
                    <div style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      background: 'linear-gradient(135deg, #7209B7, #FF006E)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      {membershipInfo.text} 회원
                    </div>
                  </div>
                  <Tag color="green">활성</Tag>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                marginBottom: '16px',
              }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '4px' }}>등록일</div>
                  <div style={{ fontSize: '14px', color: 'white', fontWeight: '500' }}>2024-11-01</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '4px' }}>만료일</div>
                  <div style={{ fontSize: '14px', color: 'white', fontWeight: '500' }}>2025-10-31</div>
                </div>
              </div>

              <SecondaryButton fullWidth onClick={() => router.push('/payment/checkout')}>
                회원권 연장하기
              </SecondaryButton>
            </PremiumCard>
          </motion.section>
        )}

        {/* Menu Items */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SectionTitle title="메뉴" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <ModernCard onClick={() => router.push(item.path)} style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <IconBox color={item.color} size={40}>
                      {item.icon}
                    </IconBox>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '500', color: 'white', fontSize: '15px' }}>{item.label}</div>
                    </div>
                    <ChevronRight size={20} color="#6B7280" />
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Logout */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <SecondaryButton
            fullWidth
            size="lg"
            icon={<LogOut size={20} />}
            onClick={() => {
              if (confirm('로그아웃 하시겠습니까?')) {
                router.push('/');
              }
            }}
          >
            로그아웃
          </SecondaryButton>
        </motion.section>

        {/* App Version */}
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>PANDO Fitness v1.0.0</p>
          <p style={{ fontSize: '11px', color: '#4B5563', margin: '4px 0 0' }}>© 2025 PANDO. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
