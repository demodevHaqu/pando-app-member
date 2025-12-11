🎯 PHASE 10: 스트레칭 존Task 10.1: 타입 정의 및 Mock 데이터파일: types/stretching.tstypescriptexport interface StretchingVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  category: 'neck' | 'shoulder' | 'back' | 'hip' | 'leg' | 'full-body';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetMuscles: string[];
  views: number;
  likes: number;
  isRecommended?: boolean;
}

export interface StretchingRoutine {
  id: string;
  name: string;
  videos: StretchingVideo[];
  totalDuration: number;
  category: string;
  isCustom: boolean;
}

export interface StretchingHistory {
  id: string;
  memberId: string;
  videoId: string;
  date: string;
  duration: number;
  completed: boolean;
}파일: data/mock/stretching.tstypescriptimport { StretchingVideo, StretchingRoutine, StretchingHistory } from '@/types/stretching';

export const MOCK_STRETCHING_VIDEOS: StretchingVideo[] = [
  {
    id: 'stretch1',
    title: '목·어깨 긴장 완화',
    description: '장시간 앉아있는 분들을 위한 목과 어깨 스트레칭',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    videoUrl: 'https://example.com/video1.mp4',
    duration: 5,
    category: 'neck',
    difficulty: 'beginner',
    targetMuscles: ['목', '승모근', '어깨'],
    views: 1234,
    likes: 89,
    isRecommended: true,
  },
  {
    id: 'stretch2',
    title: '하체 유연성 향상',
    description: '하체 근육을 부드럽게 풀어주는 스트레칭',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
    videoUrl: 'https://example.com/video2.mp4',
    duration: 8,
    category: 'leg',
    difficulty: 'beginner',
    targetMuscles: ['햄스트링', '종아리', '대퇴사두근'],
    views: 987,
    likes: 67,
    isRecommended: true,
  },
  {
    id: 'stretch3',
    title: '허리 통증 완화',
    description: '허리 통증이 있는 분들을 위한 안전한 스트레칭',
    thumbnailUrl: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400',
    videoUrl: 'https://example.com/video3.mp4',
    duration: 10,
    category: 'back',
    difficulty: 'intermediate',
    targetMuscles: ['요추', '둔근', '척추기립근'],
    views: 2341,
    likes: 156,
    isRecommended: false,
  },
  {
    id: 'stretch4',
    title: '전신 스트레칭',
    description: '온몸을 시원하게 풀어주는 전신 루틴',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
    videoUrl: 'https://example.com/video4.mp4',
    duration: 15,
    category: 'full-body',
    difficulty: 'intermediate',
    targetMuscles: ['전신'],
    views: 3456,
    likes: 234,
    isRecommended: false,
  },
  {
    id: 'stretch5',
    title: '고관절 가동성',
    description: '고관절 유연성을 높이는 심화 스트레칭',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    videoUrl: 'https://example.com/video5.mp4',
    duration: 12,
    category: 'hip',
    difficulty: 'advanced',
    targetMuscles: ['고관절', '둔근', '장요근'],
    views: 876,
    likes: 54,
    isRecommended: false,
  },
];

export const MOCK_STRETCHING_ROUTINES: StretchingRoutine[] = [
  {
    id: 'routine1',
    name: '아침 기상 루틴',
    videos: [MOCK_STRETCHING_VIDEOS[0], MOCK_STRETCHING_VIDEOS[1]],
    totalDuration: 13,
    category: 'morning',
    isCustom: false,
  },
  {
    id: 'routine2',
    name: '운동 후 회복',
    videos: [MOCK_STRETCHING_VIDEOS[2], MOCK_STRETCHING_VIDEOS[3]],
    totalDuration: 25,
    category: 'recovery',
    isCustom: false,
  },
];

export const MOCK_STRETCHING_HISTORY: StretchingHistory[] = [
  {
    id: 'hist1',
    memberId: 'member1',
    videoId: 'stretch1',
    date: '2025-01-15',
    duration: 5,
    completed: true,
  },
  {
    id: 'hist2',
    memberId: 'member1',
    videoId: 'stretch2',
    date: '2025-01-14',
    duration: 8,
    completed: true,
  },
];Task 10.2: 스트레칭 메인파일: app/stretching/page.tsxtypescript'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Play, Clock, Heart, TrendingUp, Sparkles } from 'lucide-react';
import { MOCK_STRETCHING_VIDEOS, MOCK_STRETCHING_ROUTINES } from '@/data/mock/stretching';

export default function StretchingPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: '전체', icon: '🎯' },
    { id: 'neck', label: '목·어깨', icon: '💆' },
    { id: 'back', label: '허리', icon: '🧘' },
    { id: 'hip', label: '골반', icon: '🦵' },
    { id: 'leg', label: '다리', icon: '👟' },
    { id: 'full-body', label: '전신', icon: '🤸' },
  ];

  const filteredVideos =
    selectedCategory === 'all'
      ? MOCK_STRETCHING_VIDEOS
      : MOCK_STRETCHING_VIDEOS.filter((v) => v.category === selectedCategory);

  const recommendedVideos = MOCK_STRETCHING_VIDEOS.filter((v) => v.isRecommended);

  const difficultyLabels = {
    beginner: '초급',
    intermediate: '중급',
    advanced: '고급',
  };

  const difficultyColors = {
    beginner: 'growth',
    intermediate: 'energy',
    advanced: 'premium',
  };

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="스트레칭 존" showBack={false} showNotification={true} />

      <div className="p-4 space-y-6">
        {/* AI 추천 루틴 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="hologram">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={20} className="text-cyber-yellow" />
              <h3 className="font-bold text-white">AI 추천 루틴</h3>
            </div>
            <div className="space-y-2">
              {MOCK_STRETCHING_ROUTINES.slice(0, 2).map((routine, idx) => (
                <div
                  key={routine.id}
                  onClick={() => router.push(`/stretching/routine/${routine.id}`)}
                  className="p-3 glass rounded-lg cursor-pointer hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-white">{routine.name}</h4>
                    <Badge type="growth">{routine.videos.length}개 영상</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock size={14} />
                    <span>{routine.totalDuration}분</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 카테고리 필터 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-growth text-white shadow-glow-green'
                    : 'bg-cyber-mid text-gray-400 hover:text-white'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 비디오 그리드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-white">스트레칭 영상</h3>
            <span className="text-sm text-gray-400">{filteredVideos.length}개</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {filteredVideos.map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
              >
                <Card
                  className="overflow-hidden"
                  onClick={() => router.push(`/stretching/video/${video.id}`)}
                >
                  {/* 썸네일 */}
                  <div className="relative aspect-video mb-3 rounded-lg overflow-hidden">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-all">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play size={24} className="text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge type={difficultyColors[video.difficulty] as any}>
                        {difficultyLabels[video.difficulty]}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs text-white">
                      {video.duration}분
                    </div>
                  </div>

                  {/* 정보 */}
                  <h4 className="font-bold text-white text-sm mb-2 line-clamp-2">
                    {video.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <TrendingUp size={12} />
                      <span>{video.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart size={12} />
                      <span>{video.likes}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 나만의 루틴 만들기 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant="ghost"
            size="lg"
            className="w-full"
            onClick={() => router.push('/stretching/create-routine')}
          >
            <Sparkles size={20} className="mr-2" />
            나만의 루틴 만들기
          </Button>
        </motion.div>
      </div>
    </div>
  );
}Task 10.3: 스트레칭 비디오 상세파일: app/stretching/video/[id]/page.tsxtypescript'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Play, Clock, Heart, TrendingUp, CheckCircle, Plus } from 'lucide-react';
import { MOCK_STRETCHING_VIDEOS } from '@/data/mock/stretching';

export default function StretchingVideoPage() {
  const router = useRouter();
  const params = useParams();
  const videoId = params.id as string;

  const video = MOCK_STRETCHING_VIDEOS.find((v) => v.id === videoId);
  const [isLiked, setIsLiked] = useState(false);

  if (!video) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
        <p className="text-white">영상을 찾을 수 없습니다</p>
      </div>
    );
  }

  const difficultyLabels = {
    beginner: '초급',
    intermediate: '중급',
    advanced: '고급',
  };

  const difficultyColors = {
    beginner: 'growth',
    intermediate: 'energy',
    advanced: 'premium',
  };

  // Mock 스텝
  const steps = [
    {
      id: 1,
      time: '0:00 - 1:00',
      title: '준비 자세',
      description: '편안한 자세로 앉아 호흡을 가다듬습니다.',
    },
    {
      id: 2,
      time: '1:00 - 3:00',
      title: '목 스트레칭',
      description: '천천히 목을 좌우로 기울이며 목 옆 근육을 늘려줍니다.',
    },
    {
      id: 3,
      time: '3:00 - 5:00',
      title: '어깨 스트레칭',
      description: '팔을 들어 반대편 손으로 당겨 어깨 근육을 풀어줍니다.',
    },
  ];

  const relatedVideos = MOCK_STRETCHING_VIDEOS.filter(
    (v) => v.id !== videoId && v.category === video.category
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-cyber-dark pb-24">
      <Header title="스트레칭 영상" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 비디오 플레이어 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="relative aspect-video rounded-xl overflow-hidden bg-cyber-mid">
            <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Button variant="energy" size="lg" className="rounded-full w-20 h-20" glow shine>
                <Play size={32} className="ml-1" />
              </Button>
            </div>
            <div className="absolute top-4 right-4">
              <Badge type={difficultyColors[video.difficulty] as any}>
                {difficultyLabels[video.difficulty]}
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* 영상 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <h2 className="text-xl font-bold text-white mb-3">{video.title}</h2>
            <p className="text-gray-300 mb-4">{video.description}</p>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Clock size={16} />
                <span>{video.duration}분</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <TrendingUp size={16} />
                <span>{video.views} 조회</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Heart size={16} className={isLiked ? 'fill-power-pink text-power-pink' : ''} />
                <span>{video.likes + (isLiked ? 1 : 0)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant={isLiked ? 'premium' : 'ghost'}
                size="md"
                onClick={() => setIsLiked(!isLiked)}
                className="flex-1"
              >
                <Heart size={16} className={`mr-2 ${isLiked ? 'fill-current' : ''}`} />
                {isLiked ? '좋아요' : '좋아요'}
              </Button>
              <Button variant="ghost" size="md" className="flex-1">
                <Plus size={16} className="mr-2" />
                루틴에 추가
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* 타겟 근육 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <h3 className="font-bold text-white mb-3">타겟 근육</h3>
            <div className="flex flex-wrap gap-2">
              {video.targetMuscles.map((muscle, idx) => (
                <Badge key={idx} type="growth">
                  {muscle}
                </Badge>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 단계별 가이드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <h3 className="font-bold text-white mb-4">단계별 가이드</h3>
            <div className="space-y-3">
              {steps.map((step, idx) => (
                <div key={step.id} className="flex gap-3">
                  <div className="w-10 h-10 bg-gradient-growth rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white">
                    {step.id}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white">{step.title}</span>
                      <span className="text-xs text-gray-400">{step.time}</span>
                    </div>
                    <p className="text-sm text-gray-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 연관 영상 */}
        {relatedVideos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-bold text-white mb-3">연관 영상</h3>
            <div className="space-y-2">
              {relatedVideos.map((relVideo) => (
                <Card
                  key={relVideo.id}
                  onClick={() => router.push(`/stretching/video/${relVideo.id}`)}
                >
                  <div className="flex gap-3">
                    <div className="w-24 aspect-video rounded-lg overflow-hidden flex-shrink-0 relative">
                      <img
                        src={relVideo.thumbnailUrl}
                        alt={relVideo.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play size={16} className="text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-sm mb-1 line-clamp-2">
                        {relVideo.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Clock size={12} />
                        <span>{relVideo.duration}분</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[425px] mx-auto p-4 bg-gradient-to-t from-cyber-dark via-cyber-dark to-transparent">
        <Button variant="energy" size="lg" className="w-full" glow shine>
          <Play size={20} className="mr-2" />
          시작하기
        </Button>
      </div>
    </div>
  );
}