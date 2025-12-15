'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import Tabs from '@/components/ui/Tabs';
import { MOCK_CHALLENGES } from '@/data/mock/ugc';
import { Trophy, Users, Calendar, Target, Gift, Clock } from 'lucide-react';

export default function ChallengesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: '전체' },
    { id: 'ongoing', label: '진행중' },
    { id: 'upcoming', label: '예정' },
    { id: 'completed', label: '완료' },
  ];

  const filteredChallenges = activeTab === 'all'
    ? MOCK_CHALLENGES
    : MOCK_CHALLENGES.filter((c) => c.status === activeTab);

  const getStatusBadge = (status: string) => {
    const badges: { [key: string]: { variant: 'growth' | 'energy' | 'premium'; text: string } } = {
      ongoing: { variant: 'energy', text: '진행중' },
      upcoming: { variant: 'growth', text: '예정' },
      completed: { variant: 'premium', text: '완료' },
    };
    return badges[status] || { variant: 'growth', text: status };
  };

  const calculateDaysLeft = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="챌린지" showBack={true} showLogo={true} />

      <div className="px-4 sm:px-6 lg:px-8 py-4 space-y-6 pb-20 max-w-2xl mx-auto">
        {/* Header Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card variant="hologram" className="animate-energy-pulse">
            <div className="text-center py-2">
              <div className="text-3xl mb-2">🏆</div>
              <h2 className="text-xl font-bold text-gradient-energy mb-1">
                챌린지에 도전하세요!
              </h2>
              <p className="text-sm text-gray-400">
                목표를 달성하고 보상을 받으세요
              </p>
            </div>
          </Card>
        </motion.div>

        {/* My Challenges Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="font-bold text-white text-lg mb-3">내 챌린지</h3>
          <div className="grid grid-cols-3 gap-3">
            <Card variant="glass" className="text-center">
              <div className="text-2xl font-bold text-gradient-energy mb-1">1</div>
              <div className="text-xs text-gray-400">진행중</div>
            </Card>
            <Card variant="glass" className="text-center">
              <div className="text-2xl font-bold text-gradient-growth mb-1">0</div>
              <div className="text-xs text-gray-400">완료</div>
            </Card>
            <Card variant="glass" className="text-center">
              <div className="text-2xl font-bold text-gradient-premium mb-1">1000</div>
              <div className="text-xs text-gray-400">획득 포인트</div>
            </Card>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </motion.div>

        {/* Challenges List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="space-y-4">
            {filteredChallenges.map((challenge, index) => {
              const statusBadge = getStatusBadge(challenge.status);
              const daysLeft = calculateDaysLeft(challenge.endDate);

              return (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card
                    variant={challenge.isJoined ? 'hologram' : 'default'}
                  >
                    {/* Challenge Image */}
                    {challenge.image && (
                      <div className="relative -m-4 mb-4">
                        <img
                          src={challenge.image}
                          alt={challenge.title}
                          className="w-full h-40 object-cover rounded-t-xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark/50 to-transparent rounded-t-xl" />
                        <div className="absolute top-3 right-3">
                          <Badge variant={statusBadge.variant} glow>
                            {statusBadge.text}
                          </Badge>
                        </div>
                        {challenge.isJoined && (
                          <div className="absolute top-3 left-3">
                            <Badge variant="premium">참여중</Badge>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Challenge Info */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {challenge.title}
                        </h3>
                        <p className="text-gray-300 text-sm">{challenge.description}</p>
                      </div>

                      {/* Progress (for joined challenges) */}
                      {challenge.isJoined && challenge.progress !== undefined && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">진행률</span>
                            <span className="text-sm font-bold text-neon-green">
                              {challenge.progress}%
                            </span>
                          </div>
                          <ProgressBar
                            value={challenge.progress}
                            max={100}
                            color="green"
                          />
                        </div>
                      )}

                      {/* Challenge Details Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Users size={16} className="text-electric-blue" />
                          <div>
                            <div className="text-gray-400 text-xs">참여자</div>
                            <div className="text-white font-bold">
                              {challenge.participants.toLocaleString()}명
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Gift size={16} className="text-energy-orange" />
                          <div>
                            <div className="text-gray-400 text-xs">보상</div>
                            <div className="text-white font-bold">
                              {challenge.rewardPoints}P
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Calendar size={16} className="text-neon-green" />
                          <div>
                            <div className="text-gray-400 text-xs">기간</div>
                            <div className="text-white font-bold text-xs">
                              {formatDate(challenge.startDate)} ~
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Clock size={16} className="text-power-pink" />
                          <div>
                            <div className="text-gray-400 text-xs">남은 시간</div>
                            <div className="text-white font-bold">
                              {daysLeft > 0 ? `${daysLeft}일` : '종료'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Goal */}
                      <div className="pt-3 border-t border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <Target size={16} className="text-electric-blue" />
                          <span className="text-sm font-bold text-white">목표</span>
                        </div>
                        <p className="text-sm text-gray-300">{challenge.goal}</p>
                      </div>

                      {/* Reward */}
                      <Card variant="glass">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Gift size={20} className="text-energy-orange" />
                            <div>
                              <div className="text-xs text-gray-400">보상</div>
                              <div className="text-sm font-bold text-white">
                                {challenge.reward}
                              </div>
                            </div>
                          </div>
                          <Trophy size={24} className="text-energy-orange" />
                        </div>
                      </Card>

                      {/* Action Button */}
                      <div className="flex gap-2">
                        {challenge.isJoined ? (
                          <>
                            <Button
                              variant="growth"
                              size="md"
                              className="flex-1"
                              onClick={() => router.push('/routine')}
                            >
                              진행하기
                            </Button>
                            <Button
                              variant="ghost"
                              size="md"
                              className="flex-1"
                            >
                              포기하기
                            </Button>
                          </>
                        ) : challenge.status === 'upcoming' ? (
                          <Button
                            variant="ghost"
                            size="md"
                            className="w-full"
                            disabled
                          >
                            시작 대기중
                          </Button>
                        ) : (
                          <Button
                            variant="energy"
                            size="md"
                            glow
                            shine
                            className="w-full"
                          >
                            챌린지 참여하기
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {filteredChallenges.length === 0 && (
          <Card variant="glass">
            <div className="text-center py-12 text-gray-400">
              <Trophy size={48} className="mx-auto mb-3 opacity-50" />
              <p>해당하는 챌린지가 없습니다</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
