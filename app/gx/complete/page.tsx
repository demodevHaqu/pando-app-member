'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  CheckCircle,
  Star,
  Flame,
  Clock,
  Users,
  Heart,
  Share2,
  MessageSquare,
  Trophy,
} from 'lucide-react';

// Mock 클래스 완료 데이터
const MOCK_CLASS_RESULT = {
  className: '파워 요가',
  instructor: '박지연',
  duration: 50,
  caloriesBurned: 320,
  participants: 24,
  difficulty: '중급',
  completedAt: new Date().toISOString(),
  rewards: {
    points: 150,
    badge: 'GX 10회 달성',
  },
};

export default function GXCompletePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const classId = searchParams.get('classId');

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmitFeedback = () => {
    if (rating === 0) {
      alert('별점을 선택해주세요');
      return;
    }
    setIsSubmitted(true);
    setTimeout(() => {
      router.push('/gx');
    }, 2000);
  };

  const quickFeedbacks = [
    '동작이 쉬웠어요',
    '강도가 적절했어요',
    '음악이 좋았어요',
    '강사님이 친절해요',
    '다음에도 참여할게요',
    '땀이 많이 났어요',
  ];

  const [selectedFeedbacks, setSelectedFeedbacks] = useState<string[]>([]);

  const toggleFeedback = (fb: string) => {
    if (selectedFeedbacks.includes(fb)) {
      setSelectedFeedbacks(selectedFeedbacks.filter((f) => f !== fb));
    } else {
      setSelectedFeedbacks([...selectedFeedbacks, fb]);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-white mb-2">피드백 감사합니다!</h2>
          <p className="text-gray-400">GX 스케줄로 이동합니다...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-dark pb-24">
      <Header title="클래스 완료" showBack={false} showNotification={false} />

      {/* 축하 애니메이션 */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * window.innerWidth,
                y: -20,
                rotate: 0,
              }}
              animate={{
                y: window.innerHeight + 20,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
              }}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: ['#FF6B35', '#00D9FF', '#39FF14', '#FF006E', '#FFD60A'][
                  Math.floor(Math.random() * 5)
                ],
              }}
            />
          ))}
        </div>
      )}

      <div className="p-4 space-y-6">
        {/* 완료 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="text-7xl mb-4"
          >
            🎊
          </motion.div>
          <h1 className="text-3xl font-bold text-gradient-energy mb-2">클래스 완료!</h1>
          <p className="text-gray-400">오늘도 수고하셨습니다</p>
        </motion.div>

        {/* 클래스 결과 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="hologram" glow>
            <h3 className="font-bold text-white text-lg mb-4">{MOCK_CLASS_RESULT.className}</h3>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 glass-dark rounded-lg text-center">
                <Clock size={24} className="text-electric-blue mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{MOCK_CLASS_RESULT.duration}분</div>
                <div className="text-xs text-gray-400">운동 시간</div>
              </div>
              <div className="p-3 glass-dark rounded-lg text-center">
                <Flame size={24} className="text-energy-orange mx-auto mb-2" />
                <div className="text-xl font-bold text-white">
                  {MOCK_CLASS_RESULT.caloriesBurned}
                </div>
                <div className="text-xs text-gray-400">소모 칼로리</div>
              </div>
              <div className="p-3 glass-dark rounded-lg text-center">
                <Users size={24} className="text-neon-green mx-auto mb-2" />
                <div className="text-xl font-bold text-white">
                  {MOCK_CLASS_RESULT.participants}명
                </div>
                <div className="text-xs text-gray-400">함께한 회원</div>
              </div>
              <div className="p-3 glass-dark rounded-lg text-center">
                <Trophy size={24} className="text-cyber-yellow mx-auto mb-2" />
                <div className="text-xl font-bold text-white">
                  +{MOCK_CLASS_RESULT.rewards.points}P
                </div>
                <div className="text-xs text-gray-400">획득 포인트</div>
              </div>
            </div>

            {/* 뱃지 획득 */}
            {MOCK_CLASS_RESULT.rewards.badge && (
              <div className="p-3 bg-gradient-premium/20 rounded-lg border border-tech-purple/30 flex items-center gap-3">
                <div className="text-3xl">🏅</div>
                <div>
                  <div className="text-sm text-gray-400">새로운 뱃지 획득!</div>
                  <div className="font-bold text-white">{MOCK_CLASS_RESULT.rewards.badge}</div>
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* 별점 평가 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <h3 className="font-bold text-white mb-4">오늘 클래스는 어떠셨나요?</h3>

            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={40}
                    className={`transition-colors ${
                      star <= rating ? 'text-cyber-yellow fill-cyber-yellow' : 'text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="text-center text-sm text-gray-400 mb-4">
              {rating === 0 && '별점을 선택해주세요'}
              {rating === 1 && '아쉬웠어요'}
              {rating === 2 && '그저 그랬어요'}
              {rating === 3 && '괜찮았어요'}
              {rating === 4 && '좋았어요'}
              {rating === 5 && '최고였어요!'}
            </div>
          </Card>
        </motion.div>

        {/* 빠른 피드백 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <h3 className="font-bold text-white mb-3">빠른 피드백</h3>
            <div className="flex flex-wrap gap-2">
              {quickFeedbacks.map((fb) => (
                <button
                  key={fb}
                  onClick={() => toggleFeedback(fb)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    selectedFeedbacks.includes(fb)
                      ? 'bg-gradient-energy text-white'
                      : 'bg-cyber-mid text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {fb}
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 상세 피드백 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
              <MessageSquare size={18} className="text-electric-blue" />
              추가 의견 (선택)
            </h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="클래스에 대한 의견을 자유롭게 작성해주세요..."
              className="w-full h-24 p-3 bg-cyber-mid border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-electric-blue/50 resize-none"
            />
          </Card>
        </motion.div>

        {/* 공유 버튼들 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-3"
        >
          <Button variant="ghost" size="lg" className="flex-1">
            <Heart size={18} className="mr-2" />
            찜하기
          </Button>
          <Button variant="ghost" size="lg" className="flex-1">
            <Share2 size={18} className="mr-2" />
            공유하기
          </Button>
        </motion.div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[425px] mx-auto p-4 bg-gradient-to-t from-cyber-dark via-cyber-dark to-transparent">
        <Button
          variant="energy"
          size="lg"
          className="w-full"
          onClick={handleSubmitFeedback}
          glow
          shine
        >
          <CheckCircle size={20} className="mr-2" />
          피드백 제출하기
        </Button>
      </div>
    </div>
  );
}
