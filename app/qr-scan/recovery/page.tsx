'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Clock, Target, Play, X, Youtube, CheckCircle, History, ChevronRight } from 'lucide-react';
import { MOCK_RECOVERY_ZONES, MOCK_RECOVERY_RECOMMENDATIONS, MOCK_RECOVERY_PROGRAMS, MOCK_RECOVERY_USAGE_HISTORY, RecoveryProgram } from '@/data/mock/recovery';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  Tag,
  PrimaryButton,
  SecondaryButton,
} from '@/components/ui/ModernUI';

export default function RecoveryPage() {
  const router = useRouter();
  const [selectedProgram, setSelectedProgram] = useState<RecoveryProgram | null>(null);
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [currentYoutubeId, setCurrentYoutubeId] = useState<string | null>(null);
  const [programStarted, setProgramStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const startProgram = (program: RecoveryProgram) => {
    setSelectedProgram(program);
    setShowProgramModal(true);
    setProgramStarted(false);
    setCurrentStep(0);
  };

  const completeProgram = () => {
    // 실제로는 여기서 API 호출하여 이용 기록 저장
    setProgramStarted(false);
    setShowProgramModal(false);
    setSelectedProgram(null);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'stretching': return '#39FF14';
      case 'foam-roller': return '#00D9FF';
      case 'breathing': return '#7209B7';
      case 'meditation': return '#FFD60A';
      default: return '#FF6B35';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'stretching': return '스트레칭';
      case 'foam-roller': return '폼롤러';
      case 'breathing': return '호흡법';
      case 'meditation': return '명상';
      default: return type;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="리커버리 존" />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* AI Recommendation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FeatureCard>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <Sparkles size={28} color="#7209B7" />
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
                  AI 추천 리커버리
                </h2>
                <p style={{ fontSize: '13px', color: '#6B7280' }}>
                  회원님의 운동 패턴을 분석했습니다
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {MOCK_RECOVERY_RECOMMENDATIONS.map((rec, index) => {
                const zone = MOCK_RECOVERY_ZONES.find((z) => z.id === rec.zoneId);
                return (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '14px',
                      padding: '16px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                        <div style={{ fontSize: '28px' }}>{zone?.icon || '✨'}</div>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px', fontSize: '15px' }}>
                            {rec.title}
                          </h3>
                          <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
                            {rec.reason}
                          </p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Clock size={14} color="#39FF14" />
                            <span style={{ fontSize: '12px', color: '#39FF14' }}>
                              {rec.duration}분 권장
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </FeatureCard>
        </motion.section>

        {/* Recovery Zones */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white' }}>리커버리 존 안내</h3>
            <Tag color="green">{MOCK_RECOVERY_ZONES.length}개 존</Tag>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {MOCK_RECOVERY_ZONES.map((zone, index) => (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => {
                  if (zone.id === 'sauna') {
                    router.push('/qr-scan/sauna');
                  }
                }}
                style={{ cursor: zone.id === 'sauna' ? 'pointer' : 'default' }}
              >
                <ModernCard style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      background: 'linear-gradient(135deg, #7209B7, #FF006E)',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '26px',
                      flexShrink: 0,
                    }}>
                      {zone.icon}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <h3 style={{ fontWeight: 'bold', color: 'white', fontSize: '15px' }}>{zone.name}</h3>
                        {zone.temperature && (
                          <Tag color="orange" size="sm">{zone.temperature}°C</Tag>
                        )}
                      </div>

                      <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '10px' }}>
                        {zone.description}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <Clock size={14} color="#6B7280" />
                        <span style={{ fontSize: '12px', color: '#6B7280' }}>
                          권장 {zone.recommendedDuration}분 / 최대 {zone.maxDuration}분
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {zone.benefits.map((benefit, i) => (
                          <span
                            key={i}
                            style={{
                              padding: '4px 10px',
                              background: 'rgba(26, 26, 36, 0.9)',
                              borderRadius: '12px',
                              fontSize: '11px',
                              color: '#9CA3AF',
                            }}
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
            이번 주 리커버리 통계
          </h3>
          <ModernCard style={{ padding: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'center' }}>
              <div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #39FF14, #00D9FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '4px',
                }}>
                  4회
                </div>
                <div style={{ fontSize: '11px', color: '#6B7280' }}>총 이용</div>
              </div>
              <div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '4px',
                }}>
                  68분
                </div>
                <div style={{ fontSize: '11px', color: '#6B7280' }}>총 시간</div>
              </div>
              <div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #7209B7, #FF006E)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '4px',
                }}>
                  +15%
                </div>
                <div style={{ fontSize: '11px', color: '#6B7280' }}>회복 개선</div>
              </div>
            </div>
          </ModernCard>
        </motion.section>

        {/* Recovery Programs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white' }}>리커버리 프로그램</h3>
            <Tag color="blue">{MOCK_RECOVERY_PROGRAMS.length}개</Tag>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {MOCK_RECOVERY_PROGRAMS.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.05 }}
              >
                <ModernCard
                  onClick={() => startProgram(program)}
                  style={{ padding: '16px', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      background: `linear-gradient(135deg, ${getTypeColor(program.type)}40, ${getTypeColor(program.type)}20)`,
                      border: `1px solid ${getTypeColor(program.type)}50`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      flexShrink: 0,
                    }}>
                      {program.icon}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <h4 style={{ fontWeight: 'bold', color: 'white', margin: 0, fontSize: '15px' }}>
                          {program.name}
                        </h4>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '8px',
                          background: `${getTypeColor(program.type)}20`,
                          color: getTypeColor(program.type),
                          fontSize: '10px',
                          fontWeight: '600',
                        }}>
                          {getTypeLabel(program.type)}
                        </span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 6px' }}>
                        {program.description}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={12} color="#9CA3AF" />
                          <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{program.duration}분</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Target size={12} color="#9CA3AF" />
                          <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{program.steps.length}단계</span>
                        </div>
                        {program.youtubeId && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Youtube size={12} color="#FF0000" />
                            <span style={{ fontSize: '11px', color: '#FF0000' }}>영상</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <ChevronRight size={20} color="#6B7280" />
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Usage History */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <History size={18} color="#00D9FF" />
            <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white' }}>최근 이용 기록</h3>
          </div>

          <ModernCard style={{ padding: '16px' }}>
            {MOCK_RECOVERY_USAGE_HISTORY.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {MOCK_RECOVERY_USAGE_HISTORY.slice(0, 3).map((record) => (
                  <div
                    key={record.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.03)',
                    }}
                  >
                    <div>
                      <p style={{ fontWeight: '600', color: 'white', margin: '0 0 4px', fontSize: '14px' }}>
                        {record.programName}
                      </p>
                      <p style={{ fontSize: '11px', color: '#6B7280', margin: 0 }}>
                        {record.zoneName} · {new Date(record.startedAt).toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '13px', color: '#00D9FF', fontWeight: '600', margin: '0 0 2px' }}>
                        {record.duration}분
                      </p>
                      {record.completed && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle size={12} color="#39FF14" />
                          <span style={{ fontSize: '10px', color: '#39FF14' }}>완료</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#6B7280', textAlign: 'center', padding: '20px 0', fontSize: '14px' }}>
                아직 이용 기록이 없습니다
              </p>
            )}
          </ModernCard>
        </motion.section>

        {/* Tips */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <ModernCard style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{ fontSize: '28px' }}>💡</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>회복 팁</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <li style={{ fontSize: '13px', color: '#6B7280', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <TrendingUp size={16} color="#39FF14" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>운동 후 24-48시간 내 리커버리 존을 이용하세요</span>
                  </li>
                  <li style={{ fontSize: '13px', color: '#6B7280', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Target size={16} color="#00D9FF" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>고강도 운동 후에는 사우나와 마사지를 추천합니다</span>
                  </li>
                  <li style={{ fontSize: '13px', color: '#6B7280', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Sparkles size={16} color="#7209B7" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>정기적인 리커버리로 부상을 예방할 수 있습니다</span>
                  </li>
                </ul>
              </div>
            </div>
          </ModernCard>
        </motion.section>
      </div>

      {/* Program Detail Modal */}
      {showProgramModal && selectedProgram && (
        <div
          onClick={() => setShowProgramModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '400px',
              maxHeight: '80vh',
              background: '#0D0D12',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: `linear-gradient(135deg, ${getTypeColor(selectedProgram.type)}40, ${getTypeColor(selectedProgram.type)}20)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                  }}>
                    {selectedProgram.icon}
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 'bold', color: 'white', margin: 0, fontSize: '16px' }}>
                      {selectedProgram.name}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>
                      {selectedProgram.duration}분 · {selectedProgram.steps.length}단계
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowProgramModal(false)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={20} color="white" />
                </button>
              </div>
              <p style={{ fontSize: '13px', color: '#9CA3AF', margin: 0 }}>
                {selectedProgram.description}
              </p>
            </div>

            {/* Steps */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
              <h4 style={{ fontWeight: 'bold', color: 'white', margin: '0 0 16px', fontSize: '14px' }}>
                프로그램 단계
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedProgram.steps.map((step, index) => (
                  <div
                    key={step.step}
                    style={{
                      padding: '14px',
                      borderRadius: '12px',
                      background: programStarted && currentStep === index
                        ? `${getTypeColor(selectedProgram.type)}20`
                        : 'rgba(255, 255, 255, 0.03)',
                      border: programStarted && currentStep === index
                        ? `2px solid ${getTypeColor(selectedProgram.type)}`
                        : '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        background: programStarted && currentStep > index
                          ? '#39FF14'
                          : `${getTypeColor(selectedProgram.type)}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: programStarted && currentStep > index ? '#0D0D12' : getTypeColor(selectedProgram.type),
                        flexShrink: 0,
                      }}>
                        {programStarted && currentStep > index ? '✓' : step.step}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h5 style={{ fontWeight: '600', color: 'white', margin: '0 0 4px', fontSize: '14px' }}>
                          {step.title}
                        </h5>
                        <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px' }}>
                          {step.description}
                        </p>
                        <span style={{ fontSize: '11px', color: getTypeColor(selectedProgram.type) }}>
                          {step.duration}초
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{
              padding: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}>
              {selectedProgram.youtubeId && (
                <SecondaryButton
                  fullWidth
                  size="lg"
                  onClick={() => {
                    setCurrentYoutubeId(selectedProgram.youtubeId!);
                    setShowYoutubeModal(true);
                  }}
                >
                  <Youtube size={18} style={{ marginRight: '8px' }} />
                  영상으로 따라하기
                </SecondaryButton>
              )}
              {!programStarted ? (
                <PrimaryButton
                  fullWidth
                  size="lg"
                  onClick={() => {
                    setProgramStarted(true);
                    setCurrentStep(0);
                  }}
                >
                  <Play size={18} style={{ marginRight: '8px' }} />
                  프로그램 시작
                </PrimaryButton>
              ) : currentStep < selectedProgram.steps.length - 1 ? (
                <PrimaryButton
                  fullWidth
                  size="lg"
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  다음 단계 →
                </PrimaryButton>
              ) : (
                <PrimaryButton
                  fullWidth
                  size="lg"
                  onClick={completeProgram}
                >
                  <CheckCircle size={18} style={{ marginRight: '8px' }} />
                  완료 및 기록 저장
                </PrimaryButton>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* YouTube Modal */}
      {showYoutubeModal && currentYoutubeId && (
        <div
          onClick={() => setShowYoutubeModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 110,
            background: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '600px',
              background: '#0D0D12',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Youtube size={20} color="#FF0000" />
                <span style={{ fontWeight: 'bold', color: 'white' }}>
                  {selectedProgram?.name || '리커버리 영상'}
                </span>
              </div>
              <button
                onClick={() => setShowYoutubeModal(false)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={20} color="white" />
              </button>
            </div>

            <div style={{ aspectRatio: '16/9', width: '100%' }}>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentYoutubeId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 'none' }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
