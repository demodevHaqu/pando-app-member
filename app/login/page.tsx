'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ModernCard,
  PrimaryButton,
  SecondaryButton,
} from '@/components/ui/ModernUI';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Dumbbell,
  AlertCircle,
} from 'lucide-react';

// 지정된 아이디/비밀번호
const PRESET_CREDENTIALS = {
  id: 'pando',
  password: '1234',
};

export default function LoginPage() {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setIsLoading(true);

    // 간단한 지연 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 500));

    const trimmedId = userId.trim();
    const trimmedPassword = password.trim();

    if (trimmedId === PRESET_CREDENTIALS.id && trimmedPassword === PRESET_CREDENTIALS.password) {
      // 로그인 성공 - localStorage에 저장
      localStorage.setItem('pando-auth', JSON.stringify({
        isLoggedIn: true,
        userId: trimmedId,
        loginTime: new Date().toISOString(),
      }));
      router.push('/');
    } else {
      setError('아이디 또는 비밀번호가 일치하지 않습니다.');
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userId && password) {
      handleLogin();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0D0D12',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '24px 20px',
    }}>
      {/* Logo & Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '48px' }}
      >
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #FF6B35, #00D9FF)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          boxShadow: '0 0 40px rgba(255, 107, 53, 0.3)',
        }}>
          <Dumbbell size={40} color="white" />
        </div>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #FF6B35, #00D9FF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px',
        }}>
          PANDO
        </h1>
        <p style={{ color: '#9CA3AF', fontSize: '14px' }}>
          스마트 피트니스 멤버 앱
        </p>
      </motion.div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ModernCard>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* User ID Input */}
            <div>
              <label style={{ display: 'block', color: '#9CA3AF', fontSize: '14px', marginBottom: '8px' }}>
                아이디
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                background: '#0D0D12',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
                <User size={20} style={{ color: '#6B7280', flexShrink: 0 }} />
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="아이디를 입력하세요"
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'white',
                    fontSize: '16px',
                  }}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label style={{ display: 'block', color: '#9CA3AF', fontSize: '14px', marginBottom: '8px' }}>
                비밀번호
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                background: '#0D0D12',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
                <Lock size={20} style={{ color: '#6B7280', flexShrink: 0 }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="비밀번호를 입력하세요"
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'white',
                    fontSize: '16px',
                  }}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    padding: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                  }}
                >
                  {showPassword ? (
                    <EyeOff size={20} style={{ color: '#6B7280' }} />
                  ) : (
                    <Eye size={20} style={{ color: '#6B7280' }} />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px',
                  background: 'rgba(255, 0, 110, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 0, 110, 0.3)',
                }}
              >
                <AlertCircle size={18} style={{ color: '#FF006E', flexShrink: 0 }} />
                <span style={{ color: '#FF006E', fontSize: '14px' }}>{error}</span>
              </motion.div>
            )}

            {/* Login Button */}
            <PrimaryButton
              fullWidth
              size="lg"
              onClick={handleLogin}
              disabled={!userId || !password || isLoading}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </PrimaryButton>
          </div>
        </ModernCard>
      </motion.div>

      {/* Demo Credentials Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          marginTop: '24px',
          padding: '16px',
          background: 'rgba(0, 217, 255, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(0, 217, 255, 0.2)',
        }}
      >
        <p style={{ color: '#00D9FF', fontSize: '13px', textAlign: 'center', marginBottom: '8px' }}>
          데모 계정 정보
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          fontSize: '14px',
        }}>
          <span style={{ color: '#9CA3AF' }}>
            ID: <span style={{ color: 'white', fontWeight: 'bold' }}>pando</span>
          </span>
          <span style={{ color: '#9CA3AF' }}>
            PW: <span style={{ color: 'white', fontWeight: 'bold' }}>1234</span>
          </span>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          marginTop: '48px',
          textAlign: 'center',
        }}
      >
        <p style={{ color: '#6B7280', fontSize: '12px' }}>
          © 2025 PANDO Fitness. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
