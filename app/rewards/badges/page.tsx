'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { Award, Lock, Share2, CheckCircle, Star } from 'lucide-react';

// Mock 뱃지 데이터
const MOCK_BADGES = [
  // 획득한 뱃지
  {
    id: 'badge1',
    name: '첫 발걸음',
    description: '첫 번째 운동 완료',
    icon: '🎯',
    category: '시작',
    rarity: 'common',
    earnedAt: '2025-01-10',
    isEarned: true,
  },
  {
    id: 'badge2',
    name: '꾸준한 러너',
    description: '7일 연속 출석',
    icon: '🏃',
    category: '출석',
    rarity: 'rare',
    earnedAt: '2025-01-15',
    isEarned: true,
  },
  {
    id: 'badge3',
    name: 'GX 매니아',
    description: 'GX 클래스 10회 참석',
    icon: '🧘',
    category: 'GX',
    rarity: 'epic',
    earnedAt: '2025-01-14',
    isEarned: true,
  },
  {
    id: 'badge4',
    name: '근육맨',
    description: '웨이트 루틴 30회 완료',
    icon: '💪',
    category: '운동',
    rarity: 'rare',
    earnedAt: '2025-01-12',
    isEarned: true,
  },
  {
    id: 'badge5',
    name: '새벽형 인간',
    description: '오전 6시 이전 운동 5회',
    icon: '🌅',
    category: '시간',
    rarity: 'epic',
    earnedAt: '2025-01-11',
    isEarned: true,
  },
  // 미획득 뱃지
  {
    id: 'badge6',
    name: '철인',
    description: '30일 연속 출석',
    icon: '🏆',
    category: '출석',
    rarity: 'legendary',
    progress: 15,
    maxProgress: 30,
    isEarned: false,
  },
  {
    id: 'badge7',
    name: 'PT 마스터',
    description: 'PT 세션 50회 완료',
    icon: '🎖️',
    category: 'PT',
    rarity: 'legendary',
    progress: 23,
    maxProgress: 50,
    isEarned: false,
  },
  {
    id: 'badge8',
    name: '스쿼트 챔피언',
    description: '스쿼트 1000회 달성',
    icon: '🦵',
    category: '운동',
    rarity: 'epic',
    progress: 456,
    maxProgress: 1000,
    isEarned: false,
  },
  {
    id: 'badge9',
    name: '소셜 버터플라이',
    description: '피드 게시글 20개 작성',
    icon: '🦋',
    category: '소셜',
    rarity: 'rare',
    progress: 8,
    maxProgress: 20,
    isEarned: false,
  },
  {
    id: 'badge10',
    name: '완벽한 자세',
    description: 'AI 자세 점수 95점 이상 10회',
    icon: '🎯',
    category: '운동',
    rarity: 'legendary',
    progress: 3,
    maxProgress: 10,
    isEarned: false,
  },
  {
    id: 'badge11',
    name: '칼로리 버너',
    description: '총 10000 칼로리 소모',
    icon: '🔥',
    category: '운동',
    rarity: 'epic',
    progress: 7250,
    maxProgress: 10000,
    isEarned: false,
  },
  {
    id: 'badge12',
    name: '리커버리 전문가',
    description: '스트레칭 50회 완료',
    icon: '🧘‍♂️',
    category: '리커버리',
    rarity: 'rare',
    progress: 28,
    maxProgress: 50,
    isEarned: false,
  },
];

const RARITY_CONFIG = {
  common: {
    label: '일반',
    color: 'text-gray-400',
    bg: 'bg-gray-500/20',
    border: 'border-gray-500/30',
  },
  rare: {
    label: '레어',
    color: 'text-electric-blue',
    bg: 'bg-electric-blue/20',
    border: 'border-electric-blue/30',
  },
  epic: {
    label: '에픽',
    color: 'text-tech-purple',
    bg: 'bg-tech-purple/20',
    border: 'border-tech-purple/30',
  },
  legendary: {
    label: '레전더리',
    color: 'text-cyber-yellow',
    bg: 'bg-cyber-yellow/20',
    border: 'border-cyber-yellow/30',
  },
};

export default function BadgesPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'earned' | 'locked'>('all');
  const [selectedBadge, setSelectedBadge] = useState<(typeof MOCK_BADGES)[0] | null>(null);

  const earnedBadges = MOCK_BADGES.filter((b) => b.isEarned);
  const lockedBadges = MOCK_BADGES.filter((b) => !b.isEarned);

  const filteredBadges =
    filter === 'all'
      ? MOCK_BADGES
      : filter === 'earned'
      ? earnedBadges
      : lockedBadges;

  const categories = [...new Set(MOCK_BADGES.map((b) => b.category))];

  return (
    <div className="min-h-screen bg-cyber-dark pb-20">
      <Header title="뱃지 컬렉션" showBack={true} showLogo={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 통계 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="hologram" glow>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">수집한 뱃지</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gradient-energy">
                    {earnedBadges.length}
                  </span>
                  <span className="text-gray-400">/ {MOCK_BADGES.length}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {Object.entries(RARITY_CONFIG).map(([key, config]) => {
                  const count = earnedBadges.filter((b) => b.rarity === key).length;
                  if (count === 0) return null;
                  return (
                    <div
                      key={key}
                      className={`px-2 py-1 rounded ${config.bg} ${config.border} border`}
                    >
                      <span className={`text-xs font-bold ${config.color}`}>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 진행률 */}
            <div className="mt-4">
              <div className="h-2 bg-cyber-mid rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-energy"
                  style={{ width: `${(earnedBadges.length / MOCK_BADGES.length) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2 text-right">
                {Math.round((earnedBadges.length / MOCK_BADGES.length) * 100)}% 완료
              </p>
            </div>
          </Card>
        </motion.div>

        {/* 필터 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex gap-2">
            {[
              { id: 'all', label: '전체' },
              { id: 'earned', label: `획득 (${earnedBadges.length})` },
              { id: 'locked', label: `미획득 (${lockedBadges.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                  filter === tab.id
                    ? 'bg-gradient-energy text-white'
                    : 'bg-cyber-mid text-gray-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 뱃지 그리드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-3 gap-3">
            {filteredBadges.map((badge, idx) => {
              const rarityConfig = RARITY_CONFIG[badge.rarity as keyof typeof RARITY_CONFIG];

              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  onClick={() => setSelectedBadge(badge)}
                  className="cursor-pointer"
                >
                  <Card
                    className={`text-center relative overflow-hidden ${
                      !badge.isEarned ? 'opacity-60' : ''
                    } ${rarityConfig.border} border`}
                  >
                    {/* 레어도 표시 */}
                    <div
                      className={`absolute top-1 right-1 px-1 py-0.5 rounded text-[10px] font-bold ${rarityConfig.bg} ${rarityConfig.color}`}
                    >
                      {rarityConfig.label}
                    </div>

                    <div className="relative">
                      <div
                        className={`text-4xl ${
                          !badge.isEarned ? 'grayscale opacity-50' : ''
                        }`}
                      >
                        {badge.icon}
                      </div>
                      {!badge.isEarned && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock size={20} className="text-gray-500" />
                        </div>
                      )}
                    </div>

                    <h4 className="font-bold text-white text-xs mt-2 truncate">{badge.name}</h4>

                    {!badge.isEarned && badge.progress !== undefined && (
                      <div className="mt-2">
                        <div className="h-1 bg-cyber-mid rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-energy"
                            style={{
                              width: `${(badge.progress / (badge.maxProgress || 1)) * 100}%`,
                            }}
                          />
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1">
                          {badge.progress}/{badge.maxProgress}
                        </p>
                      </div>
                    )}

                    {badge.isEarned && (
                      <CheckCircle
                        size={14}
                        className="absolute bottom-1 right-1 text-neon-green"
                      />
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* 뱃지 상세 모달 */}
      <Modal
        isOpen={!!selectedBadge}
        onClose={() => setSelectedBadge(null)}
        title="뱃지 상세"
      >
        {selectedBadge && (
          <div className="space-y-4">
            <div className="text-center py-4">
              <div
                className={`text-7xl mb-4 ${
                  !selectedBadge.isEarned ? 'grayscale opacity-50' : ''
                }`}
              >
                {selectedBadge.icon}
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <h3 className="text-2xl font-bold text-white">{selectedBadge.name}</h3>
                {selectedBadge.isEarned && (
                  <CheckCircle size={20} className="text-neon-green" />
                )}
              </div>
              <Badge
                type={
                  selectedBadge.rarity === 'legendary'
                    ? 'energy'
                    : selectedBadge.rarity === 'epic'
                    ? 'premium'
                    : selectedBadge.rarity === 'rare'
                    ? 'growth'
                    : 'info'
                }
              >
                {RARITY_CONFIG[selectedBadge.rarity as keyof typeof RARITY_CONFIG].label}
              </Badge>
            </div>

            <Card variant="glass">
              <p className="text-gray-300 text-center">{selectedBadge.description}</p>
            </Card>

            {selectedBadge.isEarned ? (
              <div className="p-3 bg-neon-green/10 border border-neon-green/30 rounded-lg">
                <div className="flex items-center gap-2 text-neon-green">
                  <CheckCircle size={16} />
                  <span className="text-sm font-bold">
                    {new Date(selectedBadge.earnedAt!).toLocaleDateString('ko-KR')} 획득
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3 bg-cyber-mid rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">진행률</span>
                    <span className="text-sm font-bold text-white">
                      {selectedBadge.progress}/{selectedBadge.maxProgress}
                    </span>
                  </div>
                  <div className="h-2 bg-cyber-dark rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-energy"
                      style={{
                        width: `${
                          ((selectedBadge.progress || 0) / (selectedBadge.maxProgress || 1)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-400 text-center">
                  {(selectedBadge.maxProgress || 0) - (selectedBadge.progress || 0)}개 더 필요합니다
                </p>
              </div>
            )}

            <div className="flex gap-3">
              {selectedBadge.isEarned && (
                <Button variant="ghost" size="lg" className="flex-1">
                  <Share2 size={18} className="mr-2" />
                  공유하기
                </Button>
              )}
              <Button
                variant="energy"
                size="lg"
                className="flex-1"
                onClick={() => setSelectedBadge(null)}
                glow
              >
                확인
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
