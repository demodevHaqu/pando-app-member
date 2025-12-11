'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { MOCK_STRETCHING_VIDEOS } from '@/data/mock/stretching';
import { Play, Heart, Plus, Clock, Target, Eye, Share2, CheckCircle } from 'lucide-react';

export default function StretchingVideoPage() {
  const router = useRouter();
  const params = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const video = MOCK_STRETCHING_VIDEOS.find((v) => v.id === params.id) || MOCK_STRETCHING_VIDEOS[0];

  const relatedVideos = MOCK_STRETCHING_VIDEOS
    .filter((v) => v.id !== video.id && v.category === video.category)
    .slice(0, 3);

  const steps = [
    {
      id: 1,
      title: '준비 자세',
      description: '편안하게 서서 어깨를 이완시킵니다. 발은 어깨 너비로 벌립니다.',
      duration: 30,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      title: '목 돌리기',
      description: '천천히 목을 오른쪽으로 돌려 5초간 유지합니다. 반대편도 같은 방법으로 진행합니다.',
      duration: 60,
      image: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      title: '목 옆으로 기울이기',
      description: '귀가 어깨에 닿도록 천천히 기울입니다. 양쪽을 번갈아가며 진행합니다.',
      duration: 60,
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
    },
    {
      id: 4,
      title: '마무리 동작',
      description: '목을 천천히 앞뒤로 움직이며 긴장을 풀어줍니다.',
      duration: 30,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    },
  ];

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

  const difficultyBadge = getDifficultyBadge(video.difficulty);

  const handleStart = () => {
    setIsCompleted(true);
    // In a real app, this would start the video/routine
  };

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="스트레칭 상세" showBack={true} />

      <div className="pb-20">
        {/* Video Player Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative h-64 bg-black"
        >
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <button
              onClick={handleStart}
              className="w-20 h-20 rounded-full bg-gradient-energy flex items-center justify-center shadow-glow-orange hover:scale-110 transition-transform"
            >
              <Play size={32} className="text-white ml-1" />
            </button>
          </div>
          <div className="absolute top-4 right-4 px-3 py-1 bg-black/80 rounded-lg text-white font-bold">
            {formatDuration(video.duration)}
          </div>
        </motion.div>

        <div className="px-4 sm:px-6 lg:px-8 py-4 space-y-6 max-w-2xl mx-auto">
          {/* Video Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="glass">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-2">{video.title}</h1>
                  <p className="text-gray-300 mb-3">{video.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Badge type={difficultyBadge.type}>{difficultyBadge.text}</Badge>
                <Badge type="growth">{video.category}</Badge>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Eye size={16} />
                  <span>{video.views.toLocaleString()} 조회</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart size={16} className={isLiked ? 'fill-power-pink text-power-pink' : ''} />
                  <span>{(video.likes + (isLiked ? 1 : 0)).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{formatDuration(video.duration)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={isLiked ? 'energy' : 'ghost'}
                  size="sm"
                  className="flex-1"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart size={16} className={isLiked ? 'fill-white mr-2' : 'mr-2'} />
                  좋아요
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  <Plus size={16} className="mr-2" />
                  루틴 추가
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 size={16} />
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Target Muscles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <div className="flex items-center gap-2 mb-3">
                <Target size={18} className="text-electric-blue" />
                <h3 className="font-bold text-white">타겟 부위</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {video.targetMuscles.map((muscle, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-electric-blue/20 text-electric-blue rounded-full text-sm border border-electric-blue/30"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <CheckCircle size={20} className="text-neon-green" />
              동작 순서
            </h3>

            <div className="space-y-3">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card glow>
                    <div className="flex gap-4">
                      <div className="w-16 h-16 flex-shrink-0 bg-gradient-energy rounded-lg flex items-center justify-center text-2xl font-bold text-white shadow-glow-orange">
                        {step.id}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-white">{step.title}</h4>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock size={12} />
                            <span>{step.duration}초</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-300">{step.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Related Videos */}
          {relatedVideos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="font-bold text-white text-lg mb-3">관련 스트레칭</h3>

              <div className="space-y-3">
                {relatedVideos.map((relatedVideo, index) => {
                  const relatedBadge = getDifficultyBadge(relatedVideo.difficulty);

                  return (
                    <motion.div
                      key={relatedVideo.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <Card
                        glow
                        onClick={() => router.push(`/stretching/video/${relatedVideo.id}`)}
                      >
                        <div className="flex gap-3">
                          <div className="relative w-32 h-24 flex-shrink-0">
                            <img
                              src={relatedVideo.thumbnailUrl}
                              alt={relatedVideo.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                              <Play size={24} className="text-white" />
                            </div>
                            <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 rounded text-xs text-white">
                              {formatDuration(relatedVideo.duration)}
                            </div>
                          </div>

                          <div className="flex-1">
                            <h4 className="font-bold text-white mb-1 line-clamp-2">
                              {relatedVideo.title}
                            </h4>
                            <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                              {relatedVideo.description}
                            </p>

                            <div className="flex items-center justify-between">
                              <Badge type={relatedBadge.type}>{relatedBadge.text}</Badge>
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                <div className="flex items-center gap-1">
                                  <Eye size={12} />
                                  <span>{relatedVideo.views}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Heart size={12} />
                                  <span>{relatedVideo.likes}</span>
                                </div>
                              </div>
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
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 w-full p-4 bg-cyber-dark/95 backdrop-blur-lg border-t border-white/10">
        <Button
          variant="energy"
          size="lg"
          glow
          shine
          className="w-full max-w-2xl mx-auto block"
          onClick={handleStart}
        >
          {isCompleted ? '다시 시작하기' : '스트레칭 시작하기'} ⚡
        </Button>
      </div>
    </div>
  );
}
