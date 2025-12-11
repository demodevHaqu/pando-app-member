🎯 PHASE 3: 온보딩 플로우Task 3.1: 회원가입 화면파일: app/onboarding/page.tsxtypescript'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Phone, Lock, MapPin } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'verify' | 'password' | 'branch'>('phone');
  const [phone, setPhone] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [timer, setTimer] = useState(180); // 3분
  const [isTimerActive, setIsTimerActive] = useState(false);

  const branches = [
    { id: '1', name: '강남점', address: '서울 강남구' },
    { id: '2', name: '홍대점', address: '서울 마포구' },
    { id: '3', name: '분당점', address: '경기 성남시' },
  ];

  const formatPhone = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleSendCode = () => {
    setIsTimerActive(true);
    setTimer(180);
    setStep('verify');
    // TODO: 실제 API 호출
  };

  const handleVerify = () => {
    setStep('password');
    // TODO: 인증 확인 API
  };

  const handlePasswordSet = () => {
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    setStep('branch');
  };

  const handleComplete = () => {
    // TODO: 회원가입 완료 API
    router.push('/onboarding/goals');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  React.useEffect(() => {
    if (isTimerActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isTimerActive, timer]);

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="회원가입" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 진행 단계 표시 */}
        <div className="flex items-center justify-between mb-8">
          {['1', '2', '3', '4'].map((num, idx) => (
            <React.Fragment key={num}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  idx <= ['phone', 'verify', 'password', 'branch'].indexOf(step)
                    ? 'bg-gradient-energy text-white'
                    : 'bg-cyber-mid text-gray-500'
                }`}
              >
                {num}
              </div>
              {idx < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-all ${
                    idx < ['phone', 'verify', 'password', 'branch'].indexOf(step)
                      ? 'bg-gradient-energy'
                      : 'bg-cyber-mid'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* 전화번호 입력 */}
        {step === 'phone' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-energy rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Phone size={40} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  전화번호를 입력해주세요
                </h2>
                <p className="text-gray-400">인증번호를 발송해드립니다</p>
              </div>

              <Input
                type="tel"
                placeholder="010-0000-0000"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                maxLength={13}
                className="text-center text-lg"
              />

              <Button
                variant="energy"
                size="lg"
                className="w-full mt-4"
                onClick={handleSendCode}
                disabled={phone.length < 13}
                glow
                shine
              >
                인증번호 발송
              </Button>
            </Card>
          </motion.div>
        )}

        {/* 인증번호 확인 */}
        {step === 'verify' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  인증번호 입력
                </h2>
                <p className="text-gray-400 mb-2">{phone}로 발송되었습니다</p>
                <p className="text-power-pink font-bold text-lg">
                  {formatTime(timer)}
                </p>
              </div>

              <Input
                type="text"
                placeholder="인증번호 6자리"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value.replace(/[^\d]/g, ''))}
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />

              <div className="flex gap-2 mt-4">
                <Button
                  variant="ghost"
                  className="flex-1"
                  onClick={handleSendCode}
                >
                  재발송
                </Button>
                <Button
                  variant="energy"
                  className="flex-1"
                  onClick={handleVerify}
                  disabled={verifyCode.length < 6}
                  glow
                  shine
                >
                  확인
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* 비밀번호 설정 */}
        {step === 'password' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-growth rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Lock size={40} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  비밀번호 설정
                </h2>
                <p className="text-gray-400">8자 이상 입력해주세요</p>
              </div>

              <div className="space-y-4">
                <Input
                  type="password"
                  label="비밀번호"
                  placeholder="비밀번호 입력"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Input
                  type="password"
                  label="비밀번호 확인"
                  placeholder="비밀번호 재입력"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  error={
                    passwordConfirm && password !== passwordConfirm
                      ? '비밀번호가 일치하지 않습니다'
                      : ''
                  }
                />
              </div>

              <Button
                variant="energy"
                size="lg"
                className="w-full mt-6"
                onClick={handlePasswordSet}
                disabled={password.length < 8 || password !== passwordConfirm}
                glow
                shine
              >
                다음
              </Button>
            </Card>
          </motion.div>
        )}

        {/* 지점 선택 */}
        {step === 'branch' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-premium rounded-full mx-auto mb-4 flex items-center justify-center">
                  <MapPin size={40} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  이용 지점 선택
                </h2>
                <p className="text-gray-400">주로 이용하실 지점을 선택해주세요</p>
              </div>

              <div className="space-y-3">
                {branches.map((branch) => (
                  <button
                    key={branch.id}
                    onClick={() => setSelectedBranch(branch.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedBranch === branch.id
                        ? 'border-electric-blue bg-electric-blue/10'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="font-bold text-white mb-1">{branch.name}</div>
                    <div className="text-sm text-gray-400">{branch.address}</div>
                  </button>
                ))}
              </div>

              <Button
                variant="energy"
                size="lg"
                className="w-full mt-6"
                onClick={handleComplete}
                disabled={!selectedBranch}
                glow
                shine
              >
                다음
              </Button>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}Task 3.2: 운동 목적 설문파일: app/onboarding/goals/page.tsxtypescript'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Target, Zap, Flame, Heart, TrendingUp, Users, Volume2, Volume } from 'lucide-react';

export default function GoalsPage() {
  const router = useRouter();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedPreferences, setSelectedPreferences] = useState<{
    coaching: string;
    atmosphere: string;
  }>({
    coaching: '',
    atmosphere: '',
  });

  const goals = [
    { id: 'weight-loss', label: '체중 감량', icon: Flame, color: 'energy' },
    { id: 'muscle-gain', label: '근비대', icon: Zap, color: 'growth' },
    { id: 'posture', label: '체형 교정', icon: Target, color: 'premium' },
    { id: 'pain', label: '통증 개선', icon: Heart, color: 'energy' },
    { id: 'fitness', label: '체력 향상', icon: TrendingUp, color: 'growth' },
  ];

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((id) => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleNext = () => {
    if (selectedGoals.length > 0 && selectedPreferences.coaching && selectedPreferences.atmosphere) {
      // TODO: Save to store
      router.push('/onboarding/health');
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="온보딩 1/3" showBack={true} showNotification={false} />

      <div className="p-4 space-y-8">
        {/* 운동 목적 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            운동 목적을 선택해주세요
          </h2>
          <p className="text-gray-400 mb-6">복수 선택 가능합니다</p>

          <div className="grid grid-cols-2 gap-3">
            {goals.map((goal, idx) => {
              const Icon = goal.icon;
              const isSelected = selectedGoals.includes(goal.id);

              return (
                <motion.button
                  key={goal.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => toggleGoal(goal.id)}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-electric-blue bg-electric-blue/10 shadow-glow-blue'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <Icon
                    size={32}
                    className={`mx-auto mb-3 ${
                      isSelected ? 'text-electric-blue icon-glow' : 'text-gray-400'
                    }`}
                  />
                  <div className={`font-bold ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                    {goal.label}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* 운동 성향 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            운동 성향을 알려주세요
          </h2>

          <Card className="mb-4">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Users size={20} className="text-electric-blue" />
                <span className="font-bold text-white">코칭 선호도</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    setSelectedPreferences({ ...selectedPreferences, coaching: 'prefer' })
                  }
                  className={`p-4 rounded-lg border transition-all ${
                    selectedPreferences.coaching === 'prefer'
                      ? 'border-electric-blue bg-electric-blue/10 text-white'
                      : 'border-white/10 text-gray-400 hover:border-white/30'
                  }`}
                >
                  코칭 선호
                </button>
                <button
                  onClick={() =>
                    setSelectedPreferences({ ...selectedPreferences, coaching: 'independent' })
                  }
                  className={`p-4 rounded-lg border transition-all ${
                    selectedPreferences.coaching === 'independent'
                      ? 'border-electric-blue bg-electric-blue/10 text-white'
                      : 'border-white/10 text-gray-400 hover:border-white/30'
                  }`}
                >
                  독립 운동
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Volume2 size={20} className="text-electric-blue" />
                <span className="font-bold text-white">분위기 선호</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    setSelectedPreferences({ ...selectedPreferences, atmosphere: 'energetic' })
                  }
                  className={`p-4 rounded-lg border transition-all ${
                    selectedPreferences.atmosphere === 'energetic'
                      ? 'border-electric-blue bg-electric-blue/10 text-white'
                      : 'border-white/10 text-gray-400 hover:border-white/30'
                  }`}
                >
                  활기찬 분위기
                </button>
                <button
                  onClick={() =>
                    setSelectedPreferences({ ...selectedPreferences, atmosphere: 'quiet' })
                  }
                  className={`p-4 rounded-lg border transition-all ${
                    selectedPreferences.atmosphere === 'quiet'
                      ? 'border-electric-blue bg-electric-blue/10 text-white'
                      : 'border-white/10 text-gray-400 hover:border-white/30'
                  }`}
                >
                  조용한 분위기
                </button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 다음 버튼 */}
        <Button
          variant="energy"
          size="lg"
          className="w-full"
          onClick={handleNext}
          disabled={
            selectedGoals.length === 0 ||
            !selectedPreferences.coaching ||
            !selectedPreferences.atmosphere
          }
          glow
          shine
        >
          다음
        </Button>
      </div>
    </div>
  );
}Task 3.3: 통증/체형 정보파일: app/onboarding/health/page.tsxtypescript'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { AlertCircle } from 'lucide-react';

export default function HealthInfoPage() {
  const router = useRouter();
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [painLevels, setPainLevels] = useState<{ [key: string]: number }>({});

  const bodyParts = [
    { id: 'neck', label: '목', x: 50, y: 15 },
    { id: 'shoulder-left', label: '왼쪽 어깨', x: 30, y: 25 },
    { id: 'shoulder-right', label: '오른쪽 어깨', x: 70, y: 25 },
    { id: 'back', label: '등/허리', x: 50, y: 40 },
    { id: 'hip', label: '골반', x: 50, y: 55 },
    { id: 'knee-left', label: '왼쪽 무릎', x: 40, y: 75 },
    { id: 'knee-right', label: '오른쪽 무릎', x: 60, y: 75 },
    { id: 'ankle', label: '발목', x: 50, y: 90 },
  ];

  const toggleBodyPart = (partId: string) => {
    setSelectedParts((prev) =>
      prev.includes(partId)
        ? prev.filter((id) => id !== partId)
        : [...prev, partId]
    );
    if (!painLevels[partId]) {
      setPainLevels({ ...painLevels, [partId]: 5 });
    }
  };

  const handleNext = () => {
    // TODO: Save to store
    router.push('/onboarding/complete');
  };

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="온보딩 2/3" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            통증 부위를 선택해주세요
          </h2>
          <p className="text-gray-400 mb-6">복수 선택 가능합니다</p>

          {/* Body Map */}
          <Card variant="hologram">
            <div className="relative w-full h-96 bg-cyber-mid/30 rounded-lg">
              {/* 간단한 Body SVG */}
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Head */}
                <circle cx="50" cy="10" r="8" fill="#252533" stroke="#00D9FF" strokeWidth="0.5" />
                
                {/* Torso */}
                <rect x="40" y="20" width="20" height="30" rx="3" fill="#252533" stroke="#00D9FF" strokeWidth="0.5" />
                
                {/* Arms */}
                <line x1="40" y1="25" x2="25" y2="40" stroke="#00D9FF" strokeWidth="3" />
                <line x1="60" y1="25" x2="75" y2="40" stroke="#00D9FF" strokeWidth="3" />
                
                {/* Legs */}
                <line x1="45" y1="50" x2="40" y2="85" stroke="#00D9FF" strokeWidth="3" />
                <line x1="55" y1="50" x2="60" y2="85" stroke="#00D9FF" strokeWidth="3" />

                {/* Body Parts Markers */}
                {bodyParts.map((part) => (
                  <g key={part.id}>
                    <circle
                      cx={part.x}
                      cy={part.y}
                      r="4"
                      fill={selectedParts.includes(part.id) ? '#FF006E' : '#1A1A24'}
                      stroke={selectedParts.includes(part.id) ? '#FF006E' : '#00D9FF'}
                      strokeWidth="1"
                      className="cursor-pointer transition-all hover:r-5"
                      onClick={() => toggleBodyPart(part.id)}
                    />
                    {selectedParts.includes(part.id) && (
                      <circle
                        cx={part.x}
                        cy={part.y}
                        r="6"
                        fill="none"
                        stroke="#FF006E"
                        strokeWidth="0.5"
                        opacity="0.5"
                        className="animate-energy-pulse"
                      />
                    )}
                  </g>
                ))}
              </svg>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {bodyParts.map((part) => (
                <button
                  key={part.id}
                  onClick={() => toggleBodyPart(part.id)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    selectedParts.includes(part.id)
                      ? 'bg-power-pink text-white'
                      : 'bg-cyber-mid text-gray-400 hover:text-white'
                  }`}
                >
                  {part.label}
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Pain Levels */}
        {selectedParts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-lg font-bold text-white mb-4">통증 강도</h3>
            {selectedParts.map((partId) => {
              const part = bodyParts.find((p) => p.id === partId);
              return (
                <Card key={partId} className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{part?.label}</span>
                    <span className="text-electric-blue font-bold">
                      {painLevels[partId] || 5}/10
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={painLevels[partId] || 5}
                    onChange={(e) =>
                      setPainLevels({ ...painLevels, [partId]: Number(e.target.value) })
                    }
                    className="w-full h-2 bg-cyber-mid rounded-lg appearance-none cursor-pointer accent-electric-blue"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>약함</span>
                    <span>중간</span>
                    <span>심함</span>
                  </div>
                </Card>
              );
            })}
          </motion.div>
        )}

        {/* 주의사항 */}
        <Card variant="glass">
          <div className="flex gap-3">
            <AlertCircle size={24} className="text-cyber-yellow flex-shrink-0" />
            <div>
              <div className="font-bold text-white mb-1">안전한 운동을 위해</div>
              <p className="text-sm text-gray-400">
                통증이 심한 경우 전문의 상담 후 운동을 시작하시는 것을 권장드립니다.
              </p>
            </div>
          </div>
        </Card>

        {/* 다음 버튼 */}
        <Button
          variant="energy"
          size="lg"
          className="w-full"
          onClick={handleNext}
          glow
          shine
        >
          다음
        </Button>
      </div>
    </div>
  );
}Task 3.4: 온보딩 완료파일: app/onboarding/complete/page.tsxtypescript'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { CheckCircle, Zap, Calendar } from 'lucide-react';

export default function CompletePage() {
  const router = useRouter();

  const suggestedRoutine = [
    { name: '스쿼트', sets: 3, reps: 12 },
    { name: '데드리프트', sets: 3, reps: 10 },
    { name: '벤치프레스', sets: 3, reps: 10 },
    { name: '플랭크', sets: 3, reps: '60초' },
    { name: '버피', sets: 3, reps: 15 },
  ];

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="온보딩 완료" showBack={false} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 완료 애니메이션 */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="text-center py-8"
        >
          <div className="w-32 h-32 bg-gradient-growth rounded-full mx-auto mb-6 flex items-center justify-center animate-scale-pop">
            <CheckCircle size={80} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gradient-growth mb-2">
            환영합니다! 🎉
          </h1>
          <p className="text-gray-400">
            AI가 회원님만의 맞춤 루틴을 준비했어요
          </p>
        </motion.div>

        {/* 입력 정보 요약 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card variant="hologram">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Zap size={20} className="text-electric-blue" />
              회원님의 목표
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge type="energy">체중 감량</Badge>
              <Badge type="growth">근비대</Badge>
              <Badge type="premium">체형 교정</Badge>
            </div>
          </Card>
        </motion.div>

        {/* 첫 30일 루틴 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">
            당신의 첫 30일 루틴 💪
          </h3>
          <Card className="space-y-3">
            {suggestedRoutine.map((exercise, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="flex items-center justify-between p-3 glass-dark rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-electric-blue/20 rounded-full flex items-center justify-center text-electric-blue font-bold text-sm">
                    {idx + 1}
                  </div>
                  <span className="text-white font-medium">{exercise.name}</span>
                </div>
                <span className="text-sm text-gray-400">
                  {exercise.sets}세트 × {exercise.reps}회
                </span>
              </motion.div>
            ))}
          </Card>
        </motion.div>

        {/* OT 예약 제안 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card variant="glass" className="gradient-border">
            <div className="flex items-start gap-3">
              <Calendar size={24} className="text-tech-purple flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-bold text-white mb-2">
                  OT1/OT2 예약하시겠어요?
                </h4>
                <p className="text-sm text-gray-400 mb-4">
                  전문 트레이너의 1:1 오리엔테이션으로 안전하고 효과적인 운동을 시작하세요
                </p>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="flex-1">
                    나중에
                  </Button>
                  <Button
                    variant="premium"
                    size="sm"
                    className="flex-1"
                    onClick={() => router.push('/pt/booking')}
                  >
                    예약하기
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 시작하기 버튼 */}
        <Button
          variant="energy"
          size="lg"
          className="w-full"
          onClick={() => router.push('/')}
          glow
          shine
        >
          시작하기 🔥
        </Button>
      </div>
    </div>
  );
}✅ PHASE 3 완료 체크리스트:

 회원가입 (전화번호, 인증, 비밀번호, 지점)
 운동 목적/성향 설문
 통증/체형 정보 입력 (바디맵)
 온보딩 완료 및 루틴 제안
