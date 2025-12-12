'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
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
} from 'lucide-react';

// Mock 피드백 데이터
const MOCK_VIDEO_FEEDBACK = {
  id: 'video123',
  title: '스쿼트 자세 체크 부탁드려요',
  description: '처음 스쿼트를 시작했는데 자세가 맞는지 봐주세요',
  category: 'squat',
  uploadedAt: '2025-01-15T10:00:00',
  videoUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600',
  duration: 45,
  status: 'analyzed', // pending, analyzing, analyzed
  overallScore: 78,
  feedback: {
    good: [
      {
        title: '발 위치',
        description: '어깨 너비로 잘 벌리고 계십니다.',
        timestamp: '0:05',
      },
      {
        title: '시선 방향',
        description: '정면을 잘 응시하고 있습니다.',
        timestamp: '0:12',
      },
      {
        title: '상체 각도',
        description: '상체를 적절히 세우고 있습니다.',
        timestamp: '0:20',
      },
    ],
    improve: [
      {
        title: '무릎 방향',
        description: '무릎이 발끝 안쪽으로 들어가는 경향이 있습니다. 발끝 방향과 같은 방향으로 유지해주세요.',
        timestamp: '0:08',
        priority: 'high',
      },
      {
        title: '깊이',
        description: '허벅지가 지면과 평행할 때까지 더 내려가면 좋겠습니다.',
        timestamp: '0:15',
        priority: 'medium',
      },
      {
        title: '호흡',
        description: '내려갈 때 숨을 들이쉬고, 올라올 때 내쉬어 주세요.',
        timestamp: '0:25',
        priority: 'low',
      },
    ],
    tips: [
      '거울을 보며 연습하면 자세 교정에 도움이 됩니다.',
      '맨몸으로 자세를 충분히 익힌 후 중량을 추가하세요.',
      '발뒤꿈치가 들리지 않도록 주의하세요.',
    ],
  },
  aiComment:
    '전반적으로 좋은 자세입니다! 무릎 방향만 신경 써주시면 더 안전하고 효과적인 스쿼트가 될 것 같습니다. 꾸준히 연습하세요! 💪',
};

export default function UGCFeedbackPage() {
  const router = useRouter();
  const params = useParams();
  const videoId = params.videoId as string;

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'good' | 'improve'>('improve');

  const feedback = MOCK_VIDEO_FEEDBACK;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-neon-green';
    if (score >= 60) return 'text-cyber-yellow';
    return 'text-energy-orange';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-neon-green to-electric-blue';
    if (score >= 60) return 'from-cyber-yellow to-energy-orange';
    return 'from-energy-orange to-power-pink';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-power-pink';
      case 'medium':
        return 'text-cyber-yellow';
      default:
        return 'text-electric-blue';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return '중요';
      case 'medium':
        return '보통';
      default:
        return '참고';
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark pb-24">
      <Header title="AI 피드백" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 비디오 플레이어 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="relative aspect-video rounded-xl overflow-hidden bg-cyber-mid">
            <img
              src={feedback.videoUrl}
              alt={feedback.title}
              className="w-full h-full object-cover"
            />

            {/* 재생 컨트롤 */}
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                {isPlaying ? (
                  <Pause size={28} className="text-white" />
                ) : (
                  <Play size={28} className="text-white ml-1" />
                )}
              </button>
            </div>

            {/* 분석 완료 뱃지 */}
            <div className="absolute top-3 left-3">
              <Badge type="growth">
                <CheckCircle size={14} className="mr-1" />
                분석 완료
              </Badge>
            </div>

            {/* 타임라인 */}
            <div className="absolute bottom-3 left-3 right-3">
              <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full w-0 bg-gradient-energy" />
              </div>
            </div>
          </div>

          <div className="mt-3">
            <h2 className="text-lg font-bold text-white">{feedback.title}</h2>
            <p className="text-sm text-gray-400 mt-1">{feedback.description}</p>
          </div>
        </motion.div>

        {/* 종합 점수 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="hologram" glow>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm text-gray-400 mb-1">종합 점수</h3>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${getScoreColor(feedback.overallScore)}`}>
                    {feedback.overallScore}
                  </span>
                  <span className="text-gray-400">/100</span>
                </div>
              </div>
              <div className="w-24 h-24 relative">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="none"
                    stroke="#1A1A24"
                    strokeWidth="8"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(feedback.overallScore / 100) * 251.2} 251.2`}
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF6B35" />
                      <stop offset="100%" stopColor="#39FF14" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Target size={24} className={getScoreColor(feedback.overallScore)} />
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 glass-dark rounded-lg">
              <p className="text-sm text-gray-300">{feedback.aiComment}</p>
            </div>
          </Card>
        </motion.div>

        {/* 피드백 탭 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('improve')}
              className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                activeTab === 'improve'
                  ? 'bg-gradient-energy text-white'
                  : 'bg-cyber-mid text-gray-400'
              }`}
            >
              <AlertTriangle size={16} className="inline mr-2" />
              개선점 ({feedback.feedback.improve.length})
            </button>
            <button
              onClick={() => setActiveTab('good')}
              className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                activeTab === 'good'
                  ? 'bg-gradient-growth text-white'
                  : 'bg-cyber-mid text-gray-400'
              }`}
            >
              <CheckCircle size={16} className="inline mr-2" />
              잘한 점 ({feedback.feedback.good.length})
            </button>
          </div>

          <div className="space-y-3">
            {activeTab === 'improve'
              ? feedback.feedback.improve.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-energy-orange/20 flex items-center justify-center flex-shrink-0">
                          <AlertTriangle size={16} className="text-energy-orange" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-white">{item.title}</h4>
                            <Badge
                              type={
                                item.priority === 'high'
                                  ? 'energy'
                                  : item.priority === 'medium'
                                  ? 'status'
                                  : 'growth'
                              }
                            >
                              {getPriorityLabel(item.priority)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-300">{item.description}</p>
                          <button className="mt-2 text-xs text-electric-blue flex items-center gap-1">
                            <Clock size={12} />
                            {item.timestamp}에서 확인
                          </button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              : feedback.feedback.good.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-neon-green/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle size={16} className="text-neon-green" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-white mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-300">{item.description}</p>
                          <button className="mt-2 text-xs text-electric-blue flex items-center gap-1">
                            <Clock size={12} />
                            {item.timestamp}에서 확인
                          </button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
          </div>
        </motion.div>

        {/* 추가 팁 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card variant="glass">
            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
              <TrendingUp size={18} className="text-tech-purple" />
              향상을 위한 팁
            </h3>
            <div className="space-y-2">
              {feedback.feedback.tips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-tech-purple">💡</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 액션 버튼들 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-3"
        >
          <Button variant="ghost" size="lg" className="flex-col h-auto py-3">
            <Share2 size={20} className="mb-1" />
            <span className="text-xs">공유</span>
          </Button>
          <Button variant="ghost" size="lg" className="flex-col h-auto py-3">
            <Download size={20} className="mb-1" />
            <span className="text-xs">저장</span>
          </Button>
          <Button variant="ghost" size="lg" className="flex-col h-auto py-3">
            <MessageSquare size={20} className="mb-1" />
            <span className="text-xs">문의</span>
          </Button>
        </motion.div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[425px] mx-auto p-4 bg-gradient-to-t from-cyber-dark via-cyber-dark to-transparent">
        <Button
          variant="energy"
          size="lg"
          className="w-full"
          onClick={() => router.push('/ugc/upload')}
          glow
          shine
        >
          <RotateCcw size={20} className="mr-2" />
          다시 촬영하기
        </Button>
      </div>
    </div>
  );
}
