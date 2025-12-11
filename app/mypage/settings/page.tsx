'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bell, Lock, Eye, Moon, Volume2, Vibrate, Shield, Globe, ChevronRight } from 'lucide-react';
import {
  ModernCard,
  PageHeader,
  SecondaryButton,
} from '@/components/ui/ModernUI';

export default function SettingsPage() {
  const router = useRouter();

  const [notifications, setNotifications] = useState({
    workout: true,
    pt: true,
    gx: true,
    achievement: true,
    marketing: false,
  });

  const [appSettings, setAppSettings] = useState({
    darkMode: true,
    sound: true,
    vibration: true,
    autoPlay: false,
  });

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    workoutPublic: true,
    achievementPublic: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAppSetting = (key: keyof typeof appSettings) => {
    setAppSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePrivacy = (key: keyof typeof privacy) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      style={{
        width: '44px',
        height: '24px',
        borderRadius: '12px',
        background: checked ? 'linear-gradient(135deg, #FF6B35, #FF006E)' : '#374151',
        position: 'relative',
        border: 'none',
        cursor: 'pointer',
        transition: 'background 0.2s',
      }}
    >
      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'white',
          position: 'absolute',
          top: '2px',
          left: checked ? '22px' : '2px',
          transition: 'left 0.2s',
        }}
      />
    </button>
  );

  const SettingItem = ({
    icon,
    iconColor,
    label,
    description,
    checked,
    onChange,
  }: {
    icon?: React.ReactNode;
    iconColor?: string;
    label: string;
    description?: string;
    checked: boolean;
    onChange: () => void;
  }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {icon && <span style={{ color: iconColor }}>{icon}</span>}
        <div>
          <div style={{ fontWeight: '500', color: 'white', fontSize: '14px' }}>{label}</div>
          {description && <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>{description}</div>}
        </div>
      </div>
      <ToggleSwitch checked={checked} onChange={onChange} />
    </div>
  );

  const LinkItem = ({
    icon,
    iconColor,
    label,
    description,
    onClick,
  }: {
    icon?: React.ReactNode;
    iconColor?: string;
    label: string;
    description?: string;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '4px 0',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {icon && <span style={{ color: iconColor }}>{icon}</span>}
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontWeight: '500', color: 'white', fontSize: '14px' }}>{label}</div>
          {description && <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>{description}</div>}
        </div>
      </div>
      <ChevronRight size={18} color="#6B7280" />
    </button>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="설정" />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Notification Settings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 style={{ fontWeight: 'bold', color: 'white', fontSize: '17px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={20} color="#00D9FF" />
            알림 설정
          </h3>

          <ModernCard style={{ padding: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <SettingItem label="운동 알림" description="오늘의 루틴, 운동 시간" checked={notifications.workout} onChange={() => toggleNotification('workout')} />
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <SettingItem label="PT 알림" description="예약, 취소, 일정 변경" checked={notifications.pt} onChange={() => toggleNotification('pt')} />
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <SettingItem label="GX 알림" description="클래스 시작, 대기 순서" checked={notifications.gx} onChange={() => toggleNotification('gx')} />
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <SettingItem label="성과 알림" description="배지 획득, 레벨업" checked={notifications.achievement} onChange={() => toggleNotification('achievement')} />
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <SettingItem label="마케팅 알림" description="이벤트, 프로모션" checked={notifications.marketing} onChange={() => toggleNotification('marketing')} />
            </div>
          </ModernCard>
        </motion.section>

        {/* App Settings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 style={{ fontWeight: 'bold', color: 'white', fontSize: '17px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Moon size={20} color="#39FF14" />
            앱 설정
          </h3>

          <ModernCard style={{ padding: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <SettingItem label="다크 모드" description="어두운 테마 사용" checked={appSettings.darkMode} onChange={() => toggleAppSetting('darkMode')} />
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <SettingItem icon={<Volume2 size={20} />} iconColor="#FF6B35" label="사운드" description="효과음 및 음성 안내" checked={appSettings.sound} onChange={() => toggleAppSetting('sound')} />
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <SettingItem icon={<Vibrate size={20} />} iconColor="#FF006E" label="진동" description="알림 진동 피드백" checked={appSettings.vibration} onChange={() => toggleAppSetting('vibration')} />
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <SettingItem label="동영상 자동재생" description="WiFi 연결 시" checked={appSettings.autoPlay} onChange={() => toggleAppSetting('autoPlay')} />
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <LinkItem icon={<Globe size={20} />} iconColor="#00D9FF" label="언어" description="한국어" onClick={() => alert('언어 설정')} />
            </div>
          </ModernCard>
        </motion.section>

        {/* Privacy Settings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 style={{ fontWeight: 'bold', color: 'white', fontSize: '17px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={20} color="#FF006E" />
            개인정보 설정
          </h3>

          <ModernCard style={{ padding: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <SettingItem label="프로필 공개" description="다른 회원에게 프로필 표시" checked={privacy.profilePublic} onChange={() => togglePrivacy('profilePublic')} />
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <SettingItem label="운동 기록 공개" description="운동 통계 및 루틴 공개" checked={privacy.workoutPublic} onChange={() => togglePrivacy('workoutPublic')} />
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <SettingItem label="성과 공개" description="배지 및 레벨 공개" checked={privacy.achievementPublic} onChange={() => togglePrivacy('achievementPublic')} />
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <LinkItem icon={<Lock size={20} />} iconColor="#7209B7" label="개인정보 처리방침" onClick={() => alert('개인정보 처리방침')} />
              <LinkItem icon={<Eye size={20} />} iconColor="#39FF14" label="내 데이터 관리" description="데이터 다운로드 및 삭제" onClick={() => alert('데이터 관리')} />
            </div>
          </ModernCard>
        </motion.section>

        {/* About */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 style={{ fontWeight: 'bold', color: 'white', fontSize: '17px', marginBottom: '14px' }}>앱 정보</h3>

          <ModernCard style={{ padding: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <LinkItem label="버전 정보" description="v1.0.0" onClick={() => alert('버전 정보')} />
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <LinkItem label="서비스 이용약관" onClick={() => alert('서비스 이용약관')} />
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }} />
              <LinkItem label="오픈소스 라이선스" onClick={() => alert('오픈소스 라이선스')} />
            </div>
          </ModernCard>
        </motion.section>

        {/* Cache Clear */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SecondaryButton
            fullWidth
            size="lg"
            onClick={() => {
              if (confirm('캐시를 삭제하시겠습니까?')) {
                alert('캐시가 삭제되었습니다');
              }
            }}
          >
            캐시 삭제
          </SecondaryButton>
        </motion.section>
      </div>
    </div>
  );
}
