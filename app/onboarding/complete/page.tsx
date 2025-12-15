'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, Gift, ArrowRight, Calendar, User, Target, Clock, ChevronRight, Sparkles, Heart } from 'lucide-react';
import {
  ModernCard,
  FeatureCard,
  PrimaryButton,
  SecondaryButton,
  Tag,
  ProgressBar,
} from '@/components/ui/ModernUI';

export default function OnboardingCompletePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showOTModal, setShowOTModal] = useState(false);
  const [selectedOT, setSelectedOT] = useState<string | null>(null);

  // Load saved onboarding data
  const [onboardingData, setOnboardingData] = useState({
    goals: [] as string[],
    prefs: [] as string[],
    frequency: 'freq-4',
    painAreas: [] as string[],
    bodyType: '',
    injuries: '',
  });

  const goalLabels: Record<string, string> = {
    'weight-loss': '체중 감량',
    'muscle-gain': '근비대',
    'body-correction': '체형교정',
    'pain-relief': '통증 완화',
    'strength': '근력 증강',
    'endurance': '체력 향상',
    'flexibility': '유연성 증대',
    'wellness': '전반적 건강',
  };

  const frequencyLabels: Record<string, string> = {
    'freq-2': '주 1-2회',
    'freq-4': '주 3-4회',
    'freq-6': '주 5-6회',
    'freq-7': '매일',
  };

  const bodyTypeLabels: Record<string, string> = {
    'ectomorph': '마른 체형',
    'mesomorph': '근육형',
    'endomorph': '통통한 체형',
    'mixed': '혼합형',
  };

  const painAreaLabels: Record<string, string> = {
    'neck': '목',
    'shoulder': '어깨',
    'back': '등',
    'lower-back': '허리',
    'hip': '골반/엉덩이',
    'knee': '무릎',
    'wrist': '손목',
    'ankle': '발목',
  };

  useEffect(() => {
    // Load data from localStorage
    try {
      const goals = JSON.parse(localStorage.getItem('onboarding_goals') || '[]');
      const prefs = JSON.parse(localStorage.getItem('onboarding_prefs') || '[]');
      const frequency = localStorage.getItem('onboarding_frequency') || 'freq-4';
      const painAreas = JSON.parse(localStorage.getItem('onboarding_painAreas') || '[]');
      const bodyType = localStorage.getItem('onboarding_bodyType') || '';
      const injuries = localStorage.getItem('onboarding_injuries') || '';

      setOnboardingData({ goals, prefs, frequency, painAreas, bodyType, injuries });
    } catch (e) {
      // Use defaults if parsing fails
    }
  }, []);

  const handleStartHome = async () => {
    setLoading(true);
    // Clear onboarding data
    localStorage.removeItem('onboarding_goals');
    localStorage.removeItem('onboarding_prefs');
    localStorage.removeItem('onboarding_frequency');
    localStorage.removeItem('onboarding_painAreas');
    localStorage.removeItem('onboarding_painLevels');
    localStorage.removeItem('onboarding_bodyType');
    localStorage.removeItem('onboarding_injuries');
    localStorage.removeItem('onboarding_movements');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push('/');
  };

  const handleOTBooking = (otType: string) => {
    setSelectedOT(otType);
    // In real app, this would navigate to booking page
    setTimeout(() => {
      setShowOTModal(false);
      router.push('/pt/booking');
    }, 500);
  };

  // Generate AI recommendation text based on goals
  const getRoutineRecommendation = () => {
    const recommendations = [];
    if (onboardingData.goals.includes('weight-loss')) {
      recommendations.push('유산소 + 근력 병행 루틴');
    }
    if (onboardingData.goals.includes('muscle-gain')) {
      recommendations.push('부위별 분할 근비대 루틴');
    }
    if (onboardingData.goals.includes('body-correction')) {
      recommendations.push('자세교정 스트레칭 포함');
    }
    if (onboardingData.goals.includes('pain-relief')) {
      recommendations.push('통증 부위 회피 및 강화 운동');
    }
    if (recommendations.length === 0) {
      recommendations.push('균형 잡힌 전신 운동 루틴');
    }
    return recommendations;
  };

  // 30-day onboarding routine schedule
  const routineSchedule = [
    { week: '1주차', focus: '기초 동작 학습', description: '올바른 자세와 기본 운동 패턴 익히기' },
    { week: '2주차', focus: '강도 적응', description: '점진적 부하 증가 및 체력 기반 구축' },
    { week: '3주차', focus: '본격 훈련', description: '목표에 맞는 맞춤 프로그램 진행' },
    { week: '4주차', focus: '평가 및 조정', description: '진행 상황 체크 및 루틴 최적화' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '40px', overflow: 'hidden' }}>
      {/* Custom Header */}
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>회원가입 완료</h1>
          <p style={{ fontSize: '12px', color: '#39FF14' }}>온보딩이 완료되었습니다</p>
        </div>
      </div>

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Onboarding Flow Indicator - All Complete */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px',
            background: 'rgba(57, 255, 20, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(57, 255, 20, 0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle size={16} color="#39FF14" />
            <span style={{ fontSize: '11px', color: '#39FF14' }}>계정 생성</span>
          </div>
          <div style={{ width: '20px', height: '1px', background: 'rgba(57, 255, 20, 0.3)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle size={16} color="#39FF14" />
            <span style={{ fontSize: '11px', color: '#39FF14' }}>운동 목표</span>
          </div>
          <div style={{ width: '20px', height: '1px', background: 'rgba(57, 255, 20, 0.3)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle size={16} color="#39FF14" />
            <span style={{ fontSize: '11px', color: '#39FF14' }}>건강 정보</span>
          </div>
          <div style={{ width: '20px', height: '1px', background: 'rgba(57, 255, 20, 0.3)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', background: 'rgba(57, 255, 20, 0.2)', borderRadius: '8px' }}>
            <Sparkles size={16} color="#39FF14" />
            <span style={{ fontSize: '11px', color: '#39FF14', fontWeight: 'bold' }}>완료!</span>
          </div>
        </motion.div>

        {/* Progress Complete */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#39FF14', marginBottom: '8px' }}>
            <span>온보딩 Step 4/4</span>
            <span>100% 완료!</span>
          </div>
          <ProgressBar percentage={100} color="green" height={4} />
        </motion.div>

        {/* Success animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div style={{
            position: 'relative',
            width: '100px',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: 0,
                border: '2px solid transparent',
                borderTopColor: '#00D9FF',
                borderRightColor: '#39FF14',
                borderRadius: '50%',
              }}
            />
            <CheckCircle size={48} color="#39FF14" />
          </div>
        </motion.div>

        {/* Welcome message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ textAlign: 'center' }}
        >
          <h1 style={{
            fontSize: '26px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #39FF14, #00D9FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px',
          }}>
            환영합니다!
          </h1>
          <p style={{ fontSize: '14px', color: '#9CA3AF' }}>Fit Genie 온보딩이 완료되었습니다</p>
        </motion.div>

        {/* Onboarding Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <FeatureCard>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(0, 217, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <User size={20} color="#00D9FF" />
              </div>
              <h2 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white' }}>입력 정보 요약</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Goals */}
              <div style={{
                padding: '14px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}>
                <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>운동 목표</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {onboardingData.goals.length > 0 ? (
                    onboardingData.goals.map((goal) => (
                      <span key={goal} style={{
                        padding: '4px 10px',
                        borderRadius: '8px',
                        background: 'rgba(0, 217, 255, 0.15)',
                        color: '#00D9FF',
                        fontSize: '12px',
                        fontWeight: 500,
                      }}>
                        {goalLabels[goal] || goal}
                      </span>
                    ))
                  ) : (
                    <span style={{ fontSize: '13px', color: '#9CA3AF' }}>선택 안 함</span>
                  )}
                </div>
              </div>

              {/* Frequency & Body Type */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>운동 빈도</div>
                  <div style={{ fontSize: '15px', color: 'white', fontWeight: 600 }}>
                    {frequencyLabels[onboardingData.frequency] || '주 3-4회'}
                  </div>
                </div>
                <div style={{
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>체형</div>
                  <div style={{ fontSize: '15px', color: 'white', fontWeight: 600 }}>
                    {bodyTypeLabels[onboardingData.bodyType] || '미입력'}
                  </div>
                </div>
              </div>

              {/* Pain areas */}
              {onboardingData.painAreas.length > 0 && (
                <div style={{
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'rgba(255, 0, 110, 0.08)',
                  border: '1px solid rgba(255, 0, 110, 0.2)',
                }}>
                  <div style={{ fontSize: '12px', color: '#FF006E', marginBottom: '8px' }}>통증 부위 (주의 필요)</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {onboardingData.painAreas.map((area) => (
                      <span key={area} style={{
                        padding: '4px 10px',
                        borderRadius: '8px',
                        background: 'rgba(255, 0, 110, 0.2)',
                        color: '#FF006E',
                        fontSize: '12px',
                      }}>
                        {painAreaLabels[area] || area}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </FeatureCard>
        </motion.section>

        {/* 30-Day Onboarding Routine */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div style={{
            position: 'relative',
            borderRadius: '20px',
            padding: '2px',
            background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
            overflow: 'hidden',
          }}>
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                zIndex: 10,
              }}
            />
            <div style={{
              background: 'linear-gradient(145deg, rgba(255, 107, 53, 0.1), #0D0D12)',
              borderRadius: '18px',
              padding: '20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Sparkles size={24} color="white" />
                </div>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white' }}>첫 30일 온보딩 루틴</h3>
                  <p style={{ fontSize: '12px', color: '#9CA3AF' }}>AI가 생성한 맞춤 프로그램</p>
                </div>
              </div>

              {/* AI Recommendations */}
              <div style={{
                padding: '14px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                marginBottom: '16px',
              }}>
                <div style={{ fontSize: '12px', color: '#FF6B35', marginBottom: '8px', fontWeight: 600 }}>
                  <Zap size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  AI 추천 루틴 구성
                </div>
                {getRoutineRecommendation().map((rec, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: i < getRoutineRecommendation().length - 1 ? '6px' : 0 }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF6B35' }} />
                    <span style={{ fontSize: '13px', color: '#E5E7EB' }}>{rec}</span>
                  </div>
                ))}
              </div>

              {/* Weekly Schedule */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {routineSchedule.map((week, idx) => (
                  <motion.div
                    key={week.week}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.03)',
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: `rgba(255, 107, 53, ${0.15 + idx * 0.1})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#FF6B35',
                    }}>
                      {idx + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>{week.focus}</span>
                        <span style={{ fontSize: '11px', color: '#6B7280' }}>{week.week}</span>
                      </div>
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{week.description}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* OT Reservation Suggestion */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div style={{
            borderRadius: '20px',
            padding: '2px',
            background: 'linear-gradient(135deg, #7209B7, #00D9FF)',
          }}>
            <div style={{
              background: 'linear-gradient(145deg, rgba(114, 9, 183, 0.1), #0D0D12)',
              borderRadius: '18px',
              padding: '20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #7209B7, #00D9FF)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Calendar size={24} color="white" />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white' }}>OT 예약 추천</h3>
                  <p style={{ fontSize: '12px', color: '#9CA3AF' }}>전문 트레이너와 함께 시작하세요</p>
                </div>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '8px',
                  background: 'rgba(57, 255, 20, 0.2)',
                  color: '#39FF14',
                  fontSize: '11px',
                  fontWeight: 'bold',
                }}>
                  무료
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* OT1 */}
                <button
                  onClick={() => setShowOTModal(true)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '14px',
                    border: '1px solid rgba(114, 9, 183, 0.3)',
                    background: 'rgba(114, 9, 183, 0.1)',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 'bold', color: 'white', fontSize: '15px' }}>OT 1회차</span>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: 'rgba(0, 217, 255, 0.2)',
                          color: '#00D9FF',
                          fontSize: '11px',
                        }}>
                          시설 안내
                        </span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#9CA3AF' }}>
                        헬스장 시설 투어 및 기구 사용법 안내
                      </p>
                    </div>
                    <ChevronRight size={20} color="#7209B7" />
                  </div>
                </button>

                {/* OT2 */}
                <button
                  onClick={() => setShowOTModal(true)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '14px',
                    border: '1px solid rgba(114, 9, 183, 0.3)',
                    background: 'rgba(114, 9, 183, 0.1)',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 'bold', color: 'white', fontSize: '15px' }}>OT 2회차</span>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: 'rgba(255, 107, 53, 0.2)',
                          color: '#FF6B35',
                          fontSize: '11px',
                        }}>
                          체형 분석
                        </span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#9CA3AF' }}>
                        InBody 측정 및 맞춤 운동 프로그램 설계
                      </p>
                    </div>
                    <ChevronRight size={20} color="#7209B7" />
                  </div>
                </button>
              </div>

              <p style={{ fontSize: '11px', color: '#6B7280', marginTop: '12px', textAlign: 'center' }}>
                신규 회원 대상 OT 2회 무료 제공
              </p>
            </div>
          </div>
        </motion.section>

        {/* Welcome gifts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <ModernCard style={{
            padding: '20px',
            border: '2px solid rgba(255, 214, 10, 0.3)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <Gift size={24} color="#FFD60A" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '16px', fontSize: '16px' }}>가입 축하 혜택</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#9CA3AF' }}>신규 회원 보너스 포인트</span>
                    <Tag color="orange">+5,000P</Tag>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#9CA3AF' }}>첫 PT 패키지 할인</span>
                    <Tag color="green">20%</Tag>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#9CA3AF' }}>프리미엄 1개월 체험</span>
                    <Tag color="pink">무료</Tag>
                  </div>
                </div>
              </div>
            </div>
          </ModernCard>
        </motion.section>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          <PrimaryButton
            fullWidth
            size="lg"
            onClick={handleStartHome}
            disabled={loading}
            icon={!loading && <ArrowRight size={20} />}
          >
            {loading ? '처리 중...' : '홈으로 가기'}
          </PrimaryButton>
          <SecondaryButton fullWidth size="lg" onClick={() => router.push('/pt/booking')}>
            OT 예약하러 가기
          </SecondaryButton>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{ textAlign: 'center', fontSize: '12px', color: '#6B7280' }}
        >
          모든 정보는 마이페이지에서 수정할 수 있습니다
        </motion.p>
      </div>

      {/* OT Booking Modal */}
      {showOTModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setShowOTModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              width: '100%',
              maxWidth: '360px',
              background: 'linear-gradient(145deg, #1A1A24, #0D0D12)',
              borderRadius: '24px',
              padding: '24px',
              border: '1px solid rgba(114, 9, 183, 0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '16px', textAlign: 'center' }}>
              OT 예약
            </h3>
            <p style={{ fontSize: '14px', color: '#9CA3AF', textAlign: 'center', marginBottom: '20px' }}>
              어떤 OT를 예약하시겠어요?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => handleOTBooking('ot1')}
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  border: selectedOT === 'ot1' ? '2px solid #00D9FF' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: selectedOT === 'ot1' ? 'rgba(0, 217, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>OT 1회차 - 시설 안내</div>
                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>약 30분 소요</div>
              </button>

              <button
                onClick={() => handleOTBooking('ot2')}
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  border: selectedOT === 'ot2' ? '2px solid #FF6B35' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: selectedOT === 'ot2' ? 'rgba(255, 107, 53, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>OT 2회차 - 체형 분석</div>
                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>약 60분 소요</div>
              </button>

              <button
                onClick={() => handleOTBooking('both')}
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  border: '2px solid #7209B7',
                  background: 'linear-gradient(135deg, rgba(114, 9, 183, 0.2), rgba(0, 217, 255, 0.1))',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>OT 1 + 2 모두 예약</div>
                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>추천! 연속 예약으로 효율적인 시작</div>
              </button>
            </div>

            <button
              onClick={() => setShowOTModal(false)}
              style={{
                width: '100%',
                padding: '14px',
                marginTop: '16px',
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: '#9CA3AF',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              나중에 할게요
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
