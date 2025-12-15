'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  CheckCircle,
  AlertTriangle,
  Target,
  TrendingUp,
  Clock,
  Share2,
  Download,
  MessageSquare,
  ThumbsUp,
  RotateCcw,
  ArrowLeft,
  User,
  Award,
  Eye,
  Heart,
  Send,
} from 'lucide-react';

// Mock feedback data
const MOCK_VIDEO_FEEDBACK = {
  id: 'video123',
  title: '스쿼트 자세 체크 부탁드려요',
  description: '처음 스쿼트를 시작했는데 자세가 맞는지 봐주세요',
  correctionRequest: '무릎이 앞으로 나가는 것 같은데 괜찮은지 봐주세요. 허리가 말리는 느낌도 있어요.',
  category: 'squat',
  uploadedAt: '2025-01-15T10:00:00',
  videoUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600',
  duration: 25,
  status: 'analyzed',
  views: 156,
  likes: 23,
  overallScore: 78,
  taggedTrainer: {
    id: 't1',
    name: '김태훈',
    specialty: '웨이트',
    image: '👨‍🦱',
  },
  trainerFeedback: {
    status: 'completed',
    respondedAt: '2025-01-15T14:30:00',
    comment: '전반적으로 좋은 자세입니다! 무릎 방향에 대한 걱정을 하셨는데, 사실 현재 발끝 방향과 무릎 방향이 잘 맞고 있어요. 다만 내려갈 때 허리가 살짝 말리는 경향이 있으니 복압을 더 단단히 잡고 내려가세요. 거울을 보면서 연습하시면 더 빨리 교정됩니다!',
    recommendations: [
      '복압 잡는 연습 (매 세트 전)',
      '가벼운 무게로 폼 체크 (주 2회)',
      '힙 힌지 드릴 추가 권장',
    ],
    precautions: [
      '무거운 무게는 아직 자제',
      '통증 시 즉시 중단',
    ],
  },
  aiFeedback: {
    good: [
      { title: '발 위치', description: '어깨 너비로 잘 벌리고 계십니다.', timestamp: '0:05' },
      { title: '시선 방향', description: '정면을 잘 응시하고 있습니다.', timestamp: '0:12' },
      { title: '상체 각도', description: '상체를 적절히 세우고 있습니다.', timestamp: '0:20' },
    ],
    improve: [
      { title: '무릎 방향', description: '무릎이 발끝 안쪽으로 들어가는 경향이 있습니다.', timestamp: '0:08', priority: 'high' },
      { title: '깊이', description: '허벅지가 지면과 평행할 때까지 더 내려가면 좋겠습니다.', timestamp: '0:15', priority: 'medium' },
      { title: '호흡', description: '내려갈 때 숨을 들이쉬고, 올라올 때 내쉬어 주세요.', timestamp: '0:25', priority: 'low' },
    ],
    tips: [
      '거울을 보며 연습하면 자세 교정에 도움이 됩니다.',
      '맨몸으로 자세를 충분히 익힌 후 중량을 추가하세요.',
      '발뒤꿈치가 들리지 않도록 주의하세요.',
    ],
  },
  aiComment: '전반적으로 좋은 자세입니다! 무릎 방향만 신경 써주시면 더 안전하고 효과적인 스쿼트가 될 것 같습니다. 꾸준히 연습하세요! 💪',
  rewards: {
    uploadPoints: 50,
    viewPoints: 15,
    likePoints: 23 * 5,
    totalPoints: 50 + 15 + (23 * 5),
  },
};

export default function UGCFeedbackPage() {
  const router = useRouter();
  const params = useParams();

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'trainer' | 'ai'>('trainer');
  const [aiFeedbackTab, setAiFeedbackTab] = useState<'improve' | 'good'>('improve');
  const [liked, setLiked] = useState(false);

  const feedback = MOCK_VIDEO_FEEDBACK;

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#39FF14';
    if (score >= 60) return '#FFD60A';
    return '#FF6B35';
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return '중요';
      case 'medium': return '보통';
      default: return '참고';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#FF006E';
      case 'medium': return '#FFD60A';
      default: return '#00D9FF';
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '120px' }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}>
        <button
          onClick={() => router.back()}
          style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer' }}
        >
          <ArrowLeft size={24} color="#9CA3AF" />
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>피드백 확인</h1>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Video Player */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{
            position: 'relative',
            aspectRatio: '16/9',
            borderRadius: '16px',
            overflow: 'hidden',
            background: '#1A1A24',
          }}>
            <img
              src={feedback.videoUrl}
              alt={feedback.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* Play Control */}
            <div
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 0, 0, 0.4)',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {isPlaying ? (
                  <Pause size={28} color="white" />
                ) : (
                  <Play size={28} color="white" style={{ marginLeft: '4px' }} />
                )}
              </div>
            </div>

            {/* Status Badge */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              padding: '6px 12px',
              borderRadius: '20px',
              background: 'rgba(57, 255, 20, 0.2)',
              border: '1px solid rgba(57, 255, 20, 0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <CheckCircle size={14} color="#39FF14" />
              <span style={{ fontSize: '12px', color: '#39FF14', fontWeight: 'bold' }}>분석 완료</span>
            </div>

            {/* Duration */}
            <div style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              padding: '4px 10px',
              borderRadius: '8px',
              background: 'rgba(0, 0, 0, 0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}>
              <Clock size={14} color="white" />
              <span style={{ fontSize: '12px', color: 'white' }}>{feedback.duration}초</span>
            </div>
          </div>

          {/* Video Info */}
          <div style={{ marginTop: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
              {feedback.title}
            </h2>
            <p style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '12px' }}>
              {feedback.description}
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Eye size={16} color="#6B7280" />
                <span style={{ fontSize: '13px', color: '#6B7280' }}>{feedback.views}</span>
              </div>
              <button
                onClick={() => setLiked(!liked)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <Heart size={16} color={liked ? '#FF006E' : '#6B7280'} fill={liked ? '#FF006E' : 'none'} />
                <span style={{ fontSize: '13px', color: liked ? '#FF006E' : '#6B7280' }}>
                  {feedback.likes + (liked ? 1 : 0)}
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Correction Request */}
        {feedback.correctionRequest && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              padding: '16px',
              borderRadius: '14px',
              background: 'rgba(255, 0, 110, 0.08)',
              border: '1px solid rgba(255, 0, 110, 0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <MessageSquare size={16} color="#FF006E" />
              <span style={{ fontSize: '13px', color: '#FF006E', fontWeight: 'bold' }}>교정 요청 사항</span>
            </div>
            <p style={{ fontSize: '14px', color: '#E5E7EB', lineHeight: 1.5 }}>
              "{feedback.correctionRequest}"
            </p>
          </motion.div>
        )}

        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            padding: '20px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(57, 255, 20, 0.1))',
            border: '1px solid rgba(0, 217, 255, 0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '4px' }}>종합 점수</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '40px', fontWeight: 'bold', color: getScoreColor(feedback.overallScore) }}>
                  {feedback.overallScore}
                </span>
                <span style={{ fontSize: '16px', color: '#6B7280' }}>/100</span>
              </div>
            </div>
            <div style={{ position: 'relative', width: '80px', height: '80px' }}>
              <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                <circle cx="40" cy="40" r="32" fill="none" stroke="#1A1A24" strokeWidth="8" />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  fill="none"
                  stroke={getScoreColor(feedback.overallScore)}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(feedback.overallScore / 100) * 201} 201`}
                />
              </svg>
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Target size={24} color={getScoreColor(feedback.overallScore)} />
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '16px',
            padding: '12px',
            borderRadius: '10px',
            background: 'rgba(0, 0, 0, 0.2)',
          }}>
            <p style={{ fontSize: '14px', color: '#E5E7EB', lineHeight: 1.5 }}>{feedback.aiComment}</p>
          </div>
        </motion.div>

        {/* Feedback Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <button
              onClick={() => setActiveTab('trainer')}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === 'trainer'
                  ? 'linear-gradient(135deg, #7209B7, #FF006E)'
                  : 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <User size={18} />
              트레이너 피드백
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === 'ai'
                  ? 'linear-gradient(135deg, #00D9FF, #39FF14)'
                  : 'rgba(255, 255, 255, 0.05)',
                color: activeTab === 'ai' ? '#0D0D12' : 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              🤖 AI 피드백
            </button>
          </div>

          {/* Trainer Feedback Content */}
          {activeTab === 'trainer' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                padding: '20px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(114, 9, 183, 0.2)',
              }}
            >
              {/* Trainer Info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '16px',
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: '#1A1A24',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                }}>
                  {feedback.taggedTrainer.image}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
                    {feedback.taggedTrainer.name} 트레이너
                  </div>
                  <div style={{ fontSize: '13px', color: '#9CA3AF' }}>
                    {feedback.taggedTrainer.specialty} 전문
                  </div>
                </div>
                <div style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  background: 'rgba(57, 255, 20, 0.15)',
                  border: '1px solid rgba(57, 255, 20, 0.3)',
                }}>
                  <span style={{ fontSize: '12px', color: '#39FF14', fontWeight: 'bold' }}>답변 완료</span>
                </div>
              </div>

              {/* Trainer Comment */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <MessageSquare size={18} color="#7209B7" />
                  <span style={{ fontWeight: 'bold', color: 'white' }}>트레이너 코멘트</span>
                </div>
                <p style={{
                  fontSize: '14px',
                  color: '#E5E7EB',
                  lineHeight: 1.6,
                  padding: '16px',
                  borderRadius: '12px',
                  background: 'rgba(114, 9, 183, 0.1)',
                  border: '1px solid rgba(114, 9, 183, 0.2)',
                }}>
                  {feedback.trainerFeedback.comment}
                </p>
              </div>

              {/* Recommendations */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <TrendingUp size={18} color="#39FF14" />
                  <span style={{ fontWeight: 'bold', color: 'white' }}>추천 운동</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {feedback.trainerFeedback.recommendations.map((rec, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      background: 'rgba(57, 255, 20, 0.08)',
                      border: '1px solid rgba(57, 255, 20, 0.2)',
                    }}>
                      <CheckCircle size={16} color="#39FF14" />
                      <span style={{ fontSize: '14px', color: '#E5E7EB' }}>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Precautions */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <AlertTriangle size={18} color="#FFD60A" />
                  <span style={{ fontWeight: 'bold', color: 'white' }}>주의사항</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {feedback.trainerFeedback.precautions.map((prec, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      background: 'rgba(255, 214, 10, 0.08)',
                      border: '1px solid rgba(255, 214, 10, 0.2)',
                    }}>
                      <AlertTriangle size={16} color="#FFD60A" />
                      <span style={{ fontSize: '14px', color: '#E5E7EB' }}>{prec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* AI Feedback Content */}
          {activeTab === 'ai' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* AI Feedback Sub-tabs */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <button
                  onClick={() => setAiFeedbackTab('improve')}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '10px',
                    border: 'none',
                    background: aiFeedbackTab === 'improve'
                      ? 'linear-gradient(135deg, #FF6B35, #FF006E)'
                      : 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  개선점 ({feedback.aiFeedback.improve.length})
                </button>
                <button
                  onClick={() => setAiFeedbackTab('good')}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '10px',
                    border: 'none',
                    background: aiFeedbackTab === 'good'
                      ? 'linear-gradient(135deg, #39FF14, #00D9FF)'
                      : 'rgba(255, 255, 255, 0.05)',
                    color: aiFeedbackTab === 'good' ? '#0D0D12' : 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  잘한 점 ({feedback.aiFeedback.good.length})
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(aiFeedbackTab === 'improve' ? feedback.aiFeedback.improve : feedback.aiFeedback.good).map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    style={{
                      padding: '16px',
                      borderRadius: '14px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: aiFeedbackTab === 'improve'
                          ? 'rgba(255, 107, 53, 0.2)'
                          : 'rgba(57, 255, 20, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        {aiFeedbackTab === 'improve' ? (
                          <AlertTriangle size={18} color="#FF6B35" />
                        ) : (
                          <CheckCircle size={18} color="#39FF14" />
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span style={{ fontWeight: 'bold', color: 'white' }}>{item.title}</span>
                          {'priority' in item && (
                            <span style={{
                              padding: '2px 8px',
                              borderRadius: '6px',
                              background: `${getPriorityColor(item.priority)}20`,
                              color: getPriorityColor(item.priority),
                              fontSize: '11px',
                              fontWeight: 'bold',
                            }}>
                              {getPriorityLabel(item.priority)}
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '8px' }}>
                          {item.description}
                        </p>
                        <button style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 0,
                        }}>
                          <Clock size={14} color="#00D9FF" />
                          <span style={{ fontSize: '12px', color: '#00D9FF' }}>{item.timestamp}에서 확인</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tips */}
              <div style={{
                marginTop: '16px',
                padding: '16px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <TrendingUp size={18} color="#7209B7" />
                  <span style={{ fontWeight: 'bold', color: 'white' }}>향상을 위한 팁</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {feedback.aiFeedback.tips.map((tip, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ color: '#7209B7' }}>💡</span>
                      <span style={{ fontSize: '14px', color: '#D1D5DB' }}>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Rewards Earned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            padding: '20px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(255, 214, 10, 0.1), rgba(255, 107, 53, 0.1))',
            border: '1px solid rgba(255, 214, 10, 0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Award size={24} color="#FFD60A" />
              <span style={{ fontWeight: 'bold', color: 'white', fontSize: '16px' }}>획득 리워드</span>
            </div>
            <div style={{
              padding: '6px 14px',
              borderRadius: '20px',
              background: 'rgba(255, 214, 10, 0.2)',
              border: '1px solid rgba(255, 214, 10, 0.3)',
            }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#FFD60A' }}>
                +{feedback.rewards.totalPoints}P
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{
              flex: 1,
              padding: '14px 10px',
              borderRadius: '12px',
              background: 'rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>+{feedback.rewards.uploadPoints}P</div>
              <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>업로드</div>
            </div>
            <div style={{
              flex: 1,
              padding: '14px 10px',
              borderRadius: '12px',
              background: 'rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>+{feedback.rewards.viewPoints}P</div>
              <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>조회수</div>
            </div>
            <div style={{
              flex: 1,
              padding: '14px 10px',
              borderRadius: '12px',
              background: 'rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>+{feedback.rewards.likePoints}P</div>
              <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>좋아요</div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}
        >
          <button style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            padding: '16px',
            borderRadius: '14px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            cursor: 'pointer',
          }}>
            <Share2 size={22} color="#9CA3AF" />
            <span style={{ fontSize: '12px', color: '#9CA3AF' }}>공유</span>
          </button>
          <button style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            padding: '16px',
            borderRadius: '14px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            cursor: 'pointer',
          }}>
            <Download size={22} color="#9CA3AF" />
            <span style={{ fontSize: '12px', color: '#9CA3AF' }}>저장</span>
          </button>
          <button style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            padding: '16px',
            borderRadius: '14px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            cursor: 'pointer',
          }}>
            <Send size={22} color="#9CA3AF" />
            <span style={{ fontSize: '12px', color: '#9CA3AF' }}>문의</span>
          </button>
        </motion.div>
      </div>

      {/* Fixed Bottom Button */}
      <div style={{
        position: 'fixed',
        bottom: '70px',
        left: 0,
        right: 0,
        padding: '16px 20px',
        background: 'linear-gradient(to top, #0D0D12 80%, transparent)',
      }}>
        <button
          onClick={() => router.push('/ugc/upload')}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
            border: 'none',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 0 30px rgba(255, 107, 53, 0.4)',
          }}
        >
          <RotateCcw size={20} />
          새 영상 업로드
        </button>
      </div>
    </div>
  );
}
