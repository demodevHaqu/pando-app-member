'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Phone, Lock, MapPin, ChevronRight, Eye, EyeOff, ArrowLeft, Target, Heart, Sparkles, CheckCircle } from 'lucide-react';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  ProgressBar,
  IconBox,
} from '@/components/ui/ModernUI';

type OnboardingStep = 'phone' | 'verify' | 'password' | 'facility';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<OnboardingStep>('phone');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const facilities = [
    { id: 'seoul-gangnam', name: '서울 강남점', location: '서울시 강남구' },
    { id: 'seoul-gangbuk', name: '서울 강북점', location: '서울시 강북구' },
    { id: 'incheon', name: '인천점', location: '인천시 남동구' },
  ];

  const validatePhone = (phone: string) => {
    const phoneRegex = /^01[0-9]-?\d{3,4}-?\d{4}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
  };

  const handlePhoneSubmit = () => {
    const newErrors: Record<string, string> = {};
    if (!phone) newErrors.phone = '전화번호를 입력해주세요';
    else if (!validatePhone(phone)) newErrors.phone = '올바른 전화번호 형식이 아닙니다';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep('verify');
  };

  const handleVerifySubmit = () => {
    if (!verificationCode) {
      setErrors({ code: '인증코드를 입력해주세요' });
      return;
    }
    setErrors({});
    setStep('password');
  };

  const handlePasswordSubmit = () => {
    const newErrors: Record<string, string> = {};
    if (!password) newErrors.password = '비밀번호를 입력해주세요';
    else if (!validatePassword(password))
      newErrors.password = '영문, 숫자 포함 8자 이상 필요';

    if (!passwordConfirm) newErrors.confirm = '비밀번호 확인을 입력해주세요';
    else if (password !== passwordConfirm) newErrors.confirm = '비밀번호가 일치하지 않습니다';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep('facility');
  };

  const handleFacilitySubmit = async () => {
    if (!selectedFacility) {
      setErrors({ facility: '지점을 선택해주세요' });
      return;
    }

    setErrors({});
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push('/onboarding/goals');
  };

  const progressSteps = { phone: 1, verify: 2, password: 3, facility: 4 };
  const progress = progressSteps[step];

  const inputStyle = (hasError?: boolean) => ({
    width: '100%',
    padding: '16px 20px',
    borderRadius: '14px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: `1px solid ${hasError ? '#FF006E' : 'rgba(255, 255, 255, 0.1)'}`,
    color: 'white',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.2s',
  });

  // Overall progress: signup (4 steps) + goals + health + complete = 7 total steps
  const overallProgress = progress; // 1-4 for signup steps (out of 7 total)

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '40px' }}>
      {/* Custom Header with Back to Login */}
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}>
        <button
          onClick={() => router.push('/login')}
          style={{
            background: 'none',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowLeft size={24} color="#9CA3AF" />
        </button>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>회원가입</h1>
          <p style={{ fontSize: '12px', color: '#6B7280' }}>가입과 함께 맞춤 온보딩을 진행합니다</p>
        </div>
      </div>

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Onboarding Flow Indicator */}
        {step === 'phone' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '16px',
              background: 'linear-gradient(135deg, rgba(114, 9, 183, 0.15), rgba(0, 217, 255, 0.15))',
              borderRadius: '14px',
              border: '1px solid rgba(114, 9, 183, 0.3)',
            }}
          >
            <p style={{ fontSize: '13px', color: '#00D9FF', fontWeight: 'bold', marginBottom: '12px' }}>
              회원가입 후 진행되는 온보딩 과정
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: 'rgba(0, 217, 255, 0.2)',
                borderRadius: '20px',
              }}>
                <CheckCircle size={14} color="#00D9FF" />
                <span style={{ fontSize: '12px', color: '#00D9FF' }}>계정 생성</span>
              </div>
              <ChevronRight size={14} style={{ color: '#6B7280' }} />
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '20px',
              }}>
                <Target size={14} color="#9CA3AF" />
                <span style={{ fontSize: '12px', color: '#9CA3AF' }}>운동 목표</span>
              </div>
              <ChevronRight size={14} style={{ color: '#6B7280' }} />
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '20px',
              }}>
                <Heart size={14} color="#9CA3AF" />
                <span style={{ fontSize: '12px', color: '#9CA3AF' }}>건강 정보</span>
              </div>
              <ChevronRight size={14} style={{ color: '#6B7280' }} />
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '20px',
              }}>
                <Sparkles size={14} color="#9CA3AF" />
                <span style={{ fontSize: '12px', color: '#9CA3AF' }}>맞춤 루틴</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Progress bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
            <span>회원가입 Step {progress}/4</span>
            <span>{Math.round((progress / 4) * 100)}%</span>
          </div>
          <ProgressBar percentage={(progress / 4) * 100} color="blue" height={4} />
        </div>

        {/* Phone step */}
        {step === 'phone' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <ModernCard style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '20px' }}>전화번호 입력</h2>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#9CA3AF', marginBottom: '8px' }}>전화번호</label>
                <input
                  type="tel"
                  placeholder="010-1234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={inputStyle(!!errors.phone)}
                />
                {errors.phone && (
                  <p style={{ fontSize: '12px', color: '#FF006E', marginTop: '8px' }}>{errors.phone}</p>
                )}
                <p style={{ fontSize: '11px', color: '#6B7280', marginTop: '8px' }}>하이픈(-)을 포함하여 입력해주세요</p>
              </div>
            </ModernCard>
            <PrimaryButton onClick={handlePhoneSubmit} fullWidth size="lg" icon={<ChevronRight size={20} />}>
              인증코드 받기
            </PrimaryButton>
          </motion.div>
        )}

        {/* Verification step */}
        {step === 'verify' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <ModernCard style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>인증 코드 확인</h2>
              <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '20px' }}>{phone}으로 전송된 인증 코드를 입력해주세요</p>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#9CA3AF', marginBottom: '8px' }}>인증 코드 (6자리)</label>
                <input
                  type="text"
                  placeholder="000000"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.slice(0, 6))}
                  maxLength={6}
                  style={{
                    ...inputStyle(!!errors.code),
                    textAlign: 'center',
                    letterSpacing: '8px',
                    fontSize: '24px',
                  }}
                />
                {errors.code && (
                  <p style={{ fontSize: '12px', color: '#FF006E', marginTop: '8px' }}>{errors.code}</p>
                )}
              </div>
            </ModernCard>
            <div style={{ display: 'flex', gap: '12px' }}>
              <SecondaryButton onClick={() => setStep('phone')} fullWidth size="lg">뒤로</SecondaryButton>
              <PrimaryButton onClick={handleVerifySubmit} fullWidth size="lg">다음</PrimaryButton>
            </div>
          </motion.div>
        )}

        {/* Password step */}
        {step === 'password' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <ModernCard style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '20px' }}>비밀번호 설정</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#9CA3AF', marginBottom: '8px' }}>비밀번호</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="영문, 숫자 포함 8자 이상"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ ...inputStyle(!!errors.password), paddingRight: '50px' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    >
                      {showPassword ? <EyeOff size={20} color="#6B7280" /> : <Eye size={20} color="#6B7280" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p style={{ fontSize: '12px', color: '#FF006E', marginTop: '8px' }}>{errors.password}</p>
                  )}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#9CA3AF', marginBottom: '8px' }}>비밀번호 확인</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPasswordConfirm ? 'text' : 'password'}
                      placeholder="비밀번호를 다시 입력해주세요"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      style={{ ...inputStyle(!!errors.confirm), paddingRight: '50px' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                      style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    >
                      {showPasswordConfirm ? <EyeOff size={20} color="#6B7280" /> : <Eye size={20} color="#6B7280" />}
                    </button>
                  </div>
                  {errors.confirm && (
                    <p style={{ fontSize: '12px', color: '#FF006E', marginTop: '8px' }}>{errors.confirm}</p>
                  )}
                </div>
              </div>
            </ModernCard>
            <div style={{ display: 'flex', gap: '12px' }}>
              <SecondaryButton onClick={() => setStep('verify')} fullWidth size="lg">뒤로</SecondaryButton>
              <PrimaryButton onClick={handlePasswordSubmit} fullWidth size="lg">다음</PrimaryButton>
            </div>
          </motion.div>
        )}

        {/* Facility selection step */}
        {step === 'facility' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <FeatureCard>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>이용할 지점 선택</h2>
              <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '20px' }}>홈 지점을 선택해주세요</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {facilities.map((facility, index) => (
                  <motion.button
                    key={facility.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedFacility(facility.id)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      borderRadius: '14px',
                      border: selectedFacility === facility.id
                        ? '2px solid #00D9FF'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      background: selectedFacility === facility.id
                        ? 'rgba(0, 217, 255, 0.1)'
                        : 'rgba(26, 26, 36, 0.8)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: selectedFacility === facility.id
                        ? '0 0 20px rgba(0, 217, 255, 0.3)'
                        : 'none',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <IconBox
                        color={selectedFacility === facility.id ? 'blue' : 'purple'}
                        size={40}
                      >
                        <MapPin size={20} color={selectedFacility === facility.id ? '#00D9FF' : '#6B7280'} />
                      </IconBox>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontWeight: '600',
                          color: 'white',
                          fontSize: '15px',
                          marginBottom: '4px',
                        }}>
                          {facility.name}
                        </div>
                        <div style={{ fontSize: '13px', color: '#6B7280' }}>{facility.location}</div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
              {errors.facility && (
                <p style={{ fontSize: '12px', color: '#FF006E', marginTop: '12px' }}>{errors.facility}</p>
              )}
            </FeatureCard>
            <div style={{ display: 'flex', gap: '12px' }}>
              <SecondaryButton onClick={() => setStep('password')} fullWidth size="lg">뒤로</SecondaryButton>
              <PrimaryButton
                onClick={handleFacilitySubmit}
                fullWidth
                size="lg"
                disabled={loading}
              >
                {loading ? '처리 중...' : '다음'}
              </PrimaryButton>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
