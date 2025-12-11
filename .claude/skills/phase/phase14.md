🎯 PHASE 14: 마이페이지
Task 14.1: 마이페이지 메인
파일: app/mypage/page.tsx
typescript'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import {
  User,
  Settings,
  CreditCard,
  FileText,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Award,
  TrendingUp,
} from 'lucide-react';
import { MOCK_MEMBER } from '@/data/mock/members';

export default function MyPage() {
  const router = useRouter();

  const menuItems = [
    {
      icon: User,
      label: '프로필 수정',
      path: '/mypage/profile',
      color: 'electric-blue',
    },
    {
      icon: CreditCard,
      label: '결제 수단 관리',
      path: '/mypage/payment-methods',
      color: 'neon-green',
    },
    {
      icon: FileText,
      label: '결제 내역',
      path: '/payment/history',
      color: 'energy-orange',
    },
    {
      icon: Bell,
      label: '알림 설정',
      path: '/mypage/notifications',
      color: 'cyber-yellow',
    },
    {
      icon: Settings,
      label: '설정',
      path: '/mypage/settings',
      color: 'tech-purple',
    },
    {
      icon: HelpCircle,
      label: '고객센터',
      path: '/mypage/support',
      color: 'electric-blue',
    },
  ];

  return (
    <div className="min-h-screen bg-cyber-dark pb-20">
      <Header title="마이페이지" showBack={false} showNotification={true} />

      <div className="p-4 space-y-6">
        {/* 프로필 카드 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="hologram" onClick={() => router.push('/mypage/profile')}>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                <div className="w-full h-full bg-gradient-premium flex items-center justify-center text-white text-3xl font-bold">
                  {MOCK_MEMBER.name[0]}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-white">{MOCK_MEMBER.name}</h2>
                  <Badge type="premium">{MOCK_MEMBER.tier}</Badge>
                </div>
                <div className="text-sm text-gray-400">{MOCK_MEMBER.email}</div>
              </div>
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/10">
              <div className="text-center p-3 glass-dark rounded-lg">
                <TrendingUp size={20} className="text-energy-orange mx-auto mb-1" />
                <div className="text-xl font-bold text-white mb-1">
                  {MOCK_MEMBER.points.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400">포인트</div>
              </div>
              <div className="text-center p-3 glass-dark rounded-lg">
                <Award size={20} className="text-cyber-yellow mx-auto mb-1" />
                <div className="text-xl font-bold text-white mb-1">
                  {MOCK_MEMBER.badges.length}
                </div>
                <div className="text-xs text-gray-400">뱃지</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 회원권 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card onClick={() => router.push('/membership')}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-sm text-gray-400 mb-1">회원권</div>
                <div className="text-xl font-bold text-white mb-2">프리미엄 회원</div>
                <div className="text-sm text-gray-400">
                  만료일: {new Date(MOCK_MEMBER.membershipExpiry).toLocaleDateString('ko-KR')}
                </div>
              </div>
              <Badge type="premium">활성</Badge>
            </div>
          </Card>
        </motion.div>

        {/* 메뉴 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <div className="space-y-1">
              {menuItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => router.push(item.path)}
                    className="w-full flex items-center gap-3 p-4 hover:bg-white/5 rounded-lg transition-all"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${item.color}/10`}
                    >
                      <Icon size={20} className={`text-${item.color}`} />
                    </div>
                    <span className="flex-1 text-left text-white">{item.label}</span>
                    <ChevronRight size={20} className="text-gray-500" />
                  </button>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* 앱 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <div className="text-center text-sm text-gray-400">
              <div className="mb-2">PANDO Fitness v1.0.0</div>
              <div className="flex justify-center gap-4">
                <button className="hover:text-white transition-colors">이용약관</button>
                <span>|</span>
                <button className="hover:text-white transition-colors">개인정보처리방침</button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 로그아웃 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => {
              if (confirm('로그아웃 하시겠습니까?')) {
                router.push('/login');
              }
            }}
            className="w-full flex items-center justify-center gap-2 p-4 glass rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span>로그아웃</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

Task 14.2: 프로필 수정
파일: app/mypage/profile/page.tsx
typescript'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Camera, Save } from 'lucide-react';
import { MOCK_MEMBER } from '@/data/mock/members';

export default function ProfileEditPage() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: MOCK_MEMBER.name,
    email: MOCK_MEMBER.email,
    phone: MOCK_MEMBER.phone,
    birth: '1990-01-01',
    gender: 'male',
  });

  const handleSave = () => {
    alert('프로필이 저장되었습니다!');
    router.back();
  };

  return (
    <div className="min-h-screen bg-cyber-dark pb-24">
      <Header title="프로필 수정" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 프로필 사진 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-premium flex items-center justify-center text-white text-4xl font-bold">
                    {profile.name[0]}
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-electric-blue rounded-full flex items-center justify-center shadow-glow-blue">
                  <Camera size={16} className="text-white" />
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-3">프로필 사진 변경</p>
            </div>
          </Card>
        </motion.div>

        {/* 기본 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <h3 className="font-bold text-white mb-4">기본 정보</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">이름</label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="이름을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">이메일</label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="이메일을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">전화번호</label>
                <Input
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="010-0000-0000"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">생년월일</label>
                <Input
                  type="date"
                  value={profile.birth}
                  onChange={(e) => setProfile({ ...profile, birth: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">성별</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setProfile({ ...profile, gender: 'male' })}
                    className={`p-3 rounded-lg font-bold transition-all ${
                      profile.gender === 'male'
                        ? 'bg-gradient-energy text-white'
                        : 'bg-cyber-mid text-gray-400'
                    }`}
                  >
                    남성
                  </button>
                  <button
                    onClick={() => setProfile({ ...profile, gender: 'female' })}
                    className={`p-3 rounded-lg font-bold transition-all ${
                      profile.gender === 'female'
                        ? 'bg-gradient-energy text-white'
                        : 'bg-cyber-mid text-gray-400'
                    }`}
                  >
                    여성
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 비밀번호 변경 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <h3 className="font-bold text-white mb-4">보안</h3>
            <Button
              variant="ghost"
              size="lg"
              className="w-full"
              onClick={() => router.push('/mypage/change-password')}
            >
              비밀번호 변경
            </Button>
          </Card>
        </motion.div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[425px] mx-auto p-4 bg-gradient-to-t from-cyber-dark via-cyber-dark to-transparent">
        <Button variant="energy" size="lg" className="w-full" onClick={handleSave} glow shine>
          <Save size={20} className="mr-2" />
          저장하기
        </Button>
      </div>
    </div>
  );
}

Task 14.3: 설정
파일: app/mypage/settings/page.tsx
typescript'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import { Bell, Moon, Globe, Lock, Trash2 } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    darkMode: true,
    language: 'ko',
  });

  const toggleSetting = (key: string) => {
    setSettings({ ...settings, [key]: !settings[key as keyof typeof settings] });
  };

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="설정" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 알림 설정 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Bell size={20} className="text-electric-blue" />
              알림 설정
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">푸시 알림</span>
                <button
                  onClick={() => toggleSetting('pushNotifications')}
                  className={`w-12 h-6 rounded-full transition-all ${
                    settings.pushNotifications ? 'bg-electric-blue' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">이메일 알림</span>
                <button
                  onClick={() => toggleSetting('emailNotifications')}
                  className={`w-12 h-6 rounded-full transition-all ${
                    settings.emailNotifications ? 'bg-electric-blue' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 앱 설정 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Moon size={20} className="text-tech-purple" />
              앱 설정
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">다크 모드</span>
                <button
                  onClick={() => toggleSetting('darkMode')}
                  className={`w-12 h-6 rounded-full transition-all ${
                    settings.darkMode ? 'bg-electric-blue' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <button className="w-full flex items-center justify-between p-3 glass-dark rounded-lg">
                <div className="flex items-center gap-2">
                  <Globe size={20} className="text-neon-green" />
                  <span className="text-gray-300">언어</span>
                </div>
                <span className="text-white">한국어</span>
              </button>
            </div>
          </Card>
        </motion.div>

        {/* 개인정보 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Lock size={20} className="text-cyber-yellow" />
              개인정보
            </h3>
            <div className="space-y-2">
              <button className="w-full p-3 glass-dark rounded-lg text-left text-gray-300 hover:text-white transition-colors">
                개인정보 다운로드
              </button>
              <button className="w-full p-3 glass-dark rounded-lg text-left text-gray-300 hover:text-white transition-colors">
                데이터 삭제 요청
              </button>
            </div>
          </Card>
        </motion.div>

        {/* 계정 관리 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Trash2 size={20} className="text-power-pink" />
              계정 관리
            </h3>
            <button
              onClick={() => {
                if (confirm('정말 회원 탈퇴하시겠습니까?')) {
                  alert('회원 탈퇴가 완료되었습니다.');
                }
              }}
              className="w-full p-3 glass-dark rounded-lg text-power-pink hover:bg-power-pink/10 transition-colors"
            >
              회원 탈퇴
            </button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}