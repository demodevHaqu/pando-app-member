'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { MOCK_STRETCHING_VIDEOS, MOCK_STRETCHING_ROUTINES } from '@/data/mock/stretching';
import { Play, Clock, Eye, Heart, Filter, Zap } from 'lucide-react';

export default function StretchingPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: '전체', icon: '🎯' },
    { id: 'neck', label: '목/어깨', icon: '🦒' },
    { id: 'shoulder', label: '어깨', icon: '💫' },
    { id: 'back', label: '허리', icon: '🐱' },
    { id: 'leg', label: '다리', icon: '🦵' },
    { id: 'full-body', label: '전신', icon: '🧘' },
  ];

  const filteredVideos = selectedCategory === 'all'
    ? MOCK_STRETCHING_VIDEOS
    : MOCK_STRETCHING_VIDEOS.filter((v) => v.category === selectedCategory);

  const recommendedVideos = MOCK_STRETCHING_VIDEOS.filter((v) => v.isRecommended);

  const getDifficultyBadge = (difficulty: string) => {
    const badges: { [key: string]: { type: 'growth' | 'energy' | 'premium'; text: string } } = {
      beginner: { type: 'growth', text: '초급' },
      intermediate: { type: 'energy', text: '중급' },
      advanced: { type: 'premium', text: '고급' },
    };
    return badges[difficulty] || { type: 'growth', text: '초급' };
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="스트레칭 존" showBack={true} />

      <div className="px-4 sm:px-6 lg:px-8 py-4 space-y-6 pb-20 max-w-2xl mx-auto">
        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card variant="hologram" glow className="animate-energy-pulse">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-3xl">🤖</div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gradient-energy mb-1">
                  AI 추천 루틴
                </h2>
                <p className="text-sm text-gray-400">
                  오늘의 운동 패턴 분석 결과
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {MOCK_STRETCHING_ROUTINES.slice(0, 1).map((routine) => (
                <Card key={routine.id} variant="glass" glow>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 glass rounded-lg flex items-center justify-center text-2xl">
                      💆
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white mb-1">{routine.title}</h3>
                      <p className="text-xs text-gray-400 mb-2">{routine.description}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Clock size={12} />
                        <span>{Math.floor(routine.duration / 60)}분</span>
                        <span>·</span>
                        <span>{routine.videos.length}개 동작</span>
                      </div>
                    </div>
                    <Button
                      variant="energy"
                      size="sm"
                      onClick={() => router.push(`/stretching/video/${routine.videos[0].id}`)}
                    >
                      시작
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Filter size={18} className="text-white" />
            <h3 className="font-bold text-white">카테고리</h3>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200
                  flex items-center gap-2
                  ${
                    selectedCategory === category.id
                      ? 'bg-gradient-energy text-white shadow-glow-orange'
                      : 'bg-cyber-mid text-gray-400 hover:bg-white/10 border border-white/10'
                  }
                `}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* AI Recommended */}
        {selectedCategory === 'all' && recommendedVideos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Zap size={18} className="text-energy-orange" />
              <h3 className="font-bold text-white">회원님을 위한 추천</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {recommendedVideos.slice(0, 2).map((video, index) => {
                const difficultyBadge = getDifficultyBadge(video.difficulty);

                return (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Card
                      glow
                      onClick={() => router.push(`/stretching/video/${video.id}`)}
                    >
                      <div className="relative mb-2">
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center group-hover:bg-black/60 transition-colors">
                          <Play size={32} className="text-white" />
                        </div>
                        <div className="absolute top-2 right-2">
                          <Badge type="energy" glow>추천</Badge>
                        </div>
                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs text-white">
                          {formatDuration(video.duration)}
                        </div>
                      </div>

                      <h4 className="font-bold text-white text-sm mb-1 line-clamp-1">
                        {video.title}
                      </h4>
                      <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                        {video.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <Badge type={difficultyBadge.type}>{difficultyBadge.text}</Badge>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                            <Eye size={12} />
                            <span>{video.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart size={12} />
                            <span>{video.likes}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Video Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-white">
              {selectedCategory === 'all'
                ? '전체 스트레칭'
                : categories.find((c) => c.id === selectedCategory)?.label}
            </h3>
            <span className="text-sm text-gray-400">{filteredVideos.length}개</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {filteredVideos.map((video, index) => {
              const difficultyBadge = getDifficultyBadge(video.difficulty);

              return (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <Card
                    glow
                    onClick={() => router.push(`/stretching/video/${video.id}`)}
                  >
                    <div className="relative mb-2">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center hover:bg-black/60 transition-colors">
                        <Play size={32} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs text-white">
                        {formatDuration(video.duration)}
                      </div>
                    </div>

                    <h4 className="font-bold text-white text-sm mb-1 line-clamp-1">
                      {video.title}
                    </h4>
                    <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                      {video.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <Badge type={difficultyBadge.type}>{difficultyBadge.text}</Badge>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Eye size={12} />
                          <span>{video.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart size={12} />
                          <span>{video.likes}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
