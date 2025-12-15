'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import {
  Video,
  Plus,
  Play,
  Heart,
  MessageCircle,
  Eye,
  Trophy,
  Filter,
  TrendingUp,
  Clock,
  Star,
  Award,
  Flame,
  CheckCircle,
} from 'lucide-react';

// 목업 UGC 영상 데이터
const MOCK_UGC_VIDEOS = [
  {
    id: 'v1',
    thumbnail: '🏋️',
    title: '스쿼트 자세 교정 요청',
    exercise: '스쿼트',
    duration: 25,
    author: {
      name: '김민수',
      avatar: '👨',
      level: 12,
    },
    stats: {
      views: 1234,
      likes: 89,
      comments: 23,
    },
    feedbackStatus: 'completed',
    taggedTrainer: {
      name: '김태훈',
      image: '👨‍🦱',
    },
    createdAt: '2시간 전',
    isMyVideo: false,
  },
  {
    id: 'v2',
    thumbnail: '💪',
    title: '데드리프트 폼 체크해주세요',
    exercise: '데드리프트',
    duration: 28,
    author: {
      name: '이지현',
      avatar: '👩',
      level: 8,
    },
    stats: {
      views: 856,
      likes: 67,
      comments: 15,
    },
    feedbackStatus: 'pending',
    taggedTrainer: {
      name: '이수진',
      image: '👩',
    },
    createdAt: '5시간 전',
    isMyVideo: false,
  },
  {
    id: 'v3',
    thumbnail: '🎯',
    title: '벤치프레스 그립 너비 질문',
    exercise: '벤치프레스',
    duration: 22,
    author: {
      name: '나',
      avatar: '😊',
      level: 15,
    },
    stats: {
      views: 342,
      likes: 45,
      comments: 8,
    },
    feedbackStatus: 'completed',
    taggedTrainer: {
      name: '김태훈',
      image: '👨‍🦱',
    },
    createdAt: '1일 전',
    isMyVideo: true,
    rewards: {
      uploadPoints: 50,
      viewPoints: 15,
      likePoints: 45,
    },
  },
  {
    id: 'v4',
    thumbnail: '🔥',
    title: '런지 무릎 각도 체크',
    exercise: '런지',
    duration: 18,
    author: {
      name: '박준영',
      avatar: '👨',
      level: 6,
    },
    stats: {
      views: 567,
      likes: 34,
      comments: 11,
    },
    feedbackStatus: 'in_progress',
    taggedTrainer: {
      name: '박성준',
      image: '👨‍🦳',
    },
    createdAt: '1일 전',
    isMyVideo: false,
  },
  {
    id: 'v5',
    thumbnail: '💥',
    title: '숄더프레스 자세 봐주세요',
    exercise: '숄더프레스',
    duration: 20,
    author: {
      name: '최서연',
      avatar: '👩',
      level: 10,
    },
    stats: {
      views: 789,
      likes: 56,
      comments: 19,
    },
    feedbackStatus: 'completed',
    taggedTrainer: {
      name: '최유리',
      image: '👩‍🦰',
    },
    createdAt: '2일 전',
    isMyVideo: false,
  },
];

// 내 UGC 통계
const MY_UGC_STATS = {
  totalVideos: 8,
  totalViews: 4521,
  totalLikes: 312,
  totalPoints: 1580,
  badges: [
    { icon: '🎬', name: '영상 크리에이터', desc: '10개 이상 업로드' },
    { icon: '⭐', name: '인기 스타', desc: '100+ 좋아요' },
  ],
};

type FilterType = 'all' | 'trending' | 'recent' | 'my';

export default function UGCPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filters: { id: FilterType; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: '전체', icon: <Filter size={14} /> },
    { id: 'trending', label: '인기', icon: <TrendingUp size={14} /> },
    { id: 'recent', label: '최신', icon: <Clock size={14} /> },
    { id: 'my', label: '내 영상', icon: <Star size={14} /> },
  ];

  const filteredVideos = MOCK_UGC_VIDEOS.filter(video => {
    if (activeFilter === 'my') return video.isMyVideo;
    return true;
  }).sort((a, b) => {
    if (activeFilter === 'trending') return b.stats.views - a.stats.views;
    return 0;
  });

  const getFeedbackStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return { label: '피드백 완료', color: '#39FF14', bg: 'rgba(57, 255, 20, 0.15)' };
      case 'in_progress':
        return { label: '피드백 중', color: '#00D9FF', bg: 'rgba(0, 217, 255, 0.15)' };
      case 'pending':
        return { label: '대기 중', color: '#FFD60A', bg: 'rgba(255, 214, 10, 0.15)' };
      default:
        return { label: '대기 중', color: '#6B7280', bg: 'rgba(107, 114, 128, 0.15)' };
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12' }}>
      <Header title="UGC" showBack={false} />

      <main style={{ padding: '20px', paddingBottom: '100px' }}>
        {/* My Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'linear-gradient(135deg, rgba(114, 9, 183, 0.3), rgba(255, 0, 110, 0.3))',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '24px',
            border: '1px solid rgba(114, 9, 183, 0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #7209B7, #FF006E)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Trophy size={24} color="white" />
              </div>
              <div>
                <h2 style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>내 UGC 현황</h2>
                <p style={{ color: '#D1D5DB', fontSize: '13px' }}>총 {MY_UGC_STATS.totalPoints}P 획득</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {MY_UGC_STATS.badges.map((badge, idx) => (
                <div
                  key={idx}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                  }}
                  title={badge.name}
                >
                  {badge.icon}
                </div>
              ))}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
          }}>
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '12px',
              padding: '12px',
              textAlign: 'center',
            }}>
              <Video size={18} color="#00D9FF" style={{ marginBottom: '4px' }} />
              <p style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>{MY_UGC_STATS.totalVideos}</p>
              <p style={{ color: '#9CA3AF', fontSize: '11px' }}>영상</p>
            </div>
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '12px',
              padding: '12px',
              textAlign: 'center',
            }}>
              <Eye size={18} color="#FF6B35" style={{ marginBottom: '4px' }} />
              <p style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>{MY_UGC_STATS.totalViews.toLocaleString()}</p>
              <p style={{ color: '#9CA3AF', fontSize: '11px' }}>조회수</p>
            </div>
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '12px',
              padding: '12px',
              textAlign: 'center',
            }}>
              <Heart size={18} color="#FF006E" style={{ marginBottom: '4px' }} />
              <p style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>{MY_UGC_STATS.totalLikes}</p>
              <p style={{ color: '#9CA3AF', fontSize: '11px' }}>좋아요</p>
            </div>
          </div>
        </motion.div>

        {/* Upload CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => router.push('/ugc/upload')}
          style={{
            width: '100%',
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
            borderRadius: '16px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            boxShadow: '0 0 30px rgba(255, 107, 53, 0.3)',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Plus size={24} color="white" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>운동 영상 업로드</p>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px' }}>트레이너에게 자세 교정 받기</p>
            </div>
          </div>
          <div style={{
            padding: '6px 12px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
          }}>
            <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>+50P</span>
          </div>
        </motion.button>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '20px',
            overflowX: 'auto',
            paddingBottom: '4px',
          }}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                background: activeFilter === filter.id
                  ? 'linear-gradient(135deg, #00D9FF, #7209B7)'
                  : 'rgba(255, 255, 255, 0.08)',
                color: activeFilter === filter.id ? 'white' : '#9CA3AF',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {filter.icon}
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Video List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <AnimatePresence mode="popLayout">
            {filteredVideos.map((video, index) => {
              const statusBadge = getFeedbackStatusBadge(video.feedbackStatus);

              return (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => router.push(`/ugc/${video.id}`)}
                  style={{
                    background: '#1A1A24',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: video.isMyVideo ? '1px solid rgba(0, 217, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: 'pointer',
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div style={{ display: 'flex', gap: '16px', padding: '16px' }}>
                    {/* Thumbnail */}
                    <div style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #252533, #1A1A24)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      flexShrink: 0,
                    }}>
                      <span style={{ fontSize: '40px' }}>{video.thumbnail}</span>
                      {/* Duration badge */}
                      <div style={{
                        position: 'absolute',
                        bottom: '6px',
                        right: '6px',
                        padding: '2px 6px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}>
                        <Play size={10} color="white" fill="white" />
                        <span style={{ color: 'white', fontSize: '10px' }}>{video.duration}초</span>
                      </div>
                      {/* My video badge */}
                      {video.isMyVideo && (
                        <div style={{
                          position: 'absolute',
                          top: '6px',
                          left: '6px',
                          padding: '2px 6px',
                          background: 'rgba(0, 217, 255, 0.9)',
                          borderRadius: '4px',
                        }}>
                          <span style={{ color: 'white', fontSize: '9px', fontWeight: 'bold' }}>MY</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* Title & Status */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                        <h3 style={{
                          color: 'white',
                          fontSize: '15px',
                          fontWeight: 'bold',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {video.title}
                        </h3>
                        <div style={{
                          padding: '3px 8px',
                          background: statusBadge.bg,
                          borderRadius: '6px',
                          flexShrink: 0,
                        }}>
                          <span style={{ color: statusBadge.color, fontSize: '10px', fontWeight: 'bold' }}>
                            {statusBadge.label}
                          </span>
                        </div>
                      </div>

                      {/* Exercise Category */}
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '3px 8px',
                        background: 'rgba(255, 107, 53, 0.15)',
                        borderRadius: '6px',
                        marginBottom: '10px',
                      }}>
                        <Flame size={12} color="#FF6B35" />
                        <span style={{ color: '#FF6B35', fontSize: '11px' }}>{video.exercise}</span>
                      </div>

                      {/* Author & Trainer */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '16px' }}>{video.author.avatar}</span>
                          <span style={{ color: '#D1D5DB', fontSize: '12px' }}>{video.author.name}</span>
                          <span style={{
                            padding: '2px 6px',
                            background: 'rgba(114, 9, 183, 0.2)',
                            borderRadius: '4px',
                            color: '#7209B7',
                            fontSize: '10px',
                          }}>
                            Lv.{video.author.level}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontSize: '14px' }}>{video.taggedTrainer.image}</span>
                          <span style={{ color: '#9CA3AF', fontSize: '11px' }}>{video.taggedTrainer.name}</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Eye size={14} color="#6B7280" />
                          <span style={{ color: '#6B7280', fontSize: '12px' }}>{video.stats.views.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Heart size={14} color="#6B7280" />
                          <span style={{ color: '#6B7280', fontSize: '12px' }}>{video.stats.likes}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MessageCircle size={14} color="#6B7280" />
                          <span style={{ color: '#6B7280', fontSize: '12px' }}>{video.stats.comments}</span>
                        </div>
                        <span style={{ color: '#4B5563', fontSize: '11px', marginLeft: 'auto' }}>{video.createdAt}</span>
                      </div>

                      {/* Rewards for my video */}
                      {video.isMyVideo && video.rewards && (
                        <div style={{
                          marginTop: '10px',
                          padding: '8px 10px',
                          background: 'rgba(57, 255, 20, 0.1)',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}>
                          <Award size={14} color="#39FF14" />
                          <span style={{ color: '#39FF14', fontSize: '11px' }}>
                            +{video.rewards.uploadPoints + video.rewards.viewPoints + video.rewards.likePoints}P 획득
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State for My Videos */}
        {activeFilter === 'my' && filteredVideos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '60px 20px',
            }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <Video size={36} color="#6B7280" />
            </div>
            <p style={{ color: '#9CA3AF', fontSize: '15px', marginBottom: '8px' }}>아직 업로드한 영상이 없어요</p>
            <p style={{ color: '#6B7280', fontSize: '13px' }}>운동 영상을 업로드하고 전문가 피드백을 받아보세요!</p>
          </motion.div>
        )}

        {/* Points Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            marginTop: '24px',
            padding: '16px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <p style={{ color: '#6B7280', fontSize: '12px', textAlign: 'center' }}>
            <span style={{ color: '#FF6B35' }}>업로드 +50P</span> · <span style={{ color: '#00D9FF' }}>100회 조회당 +10P</span> · <span style={{ color: '#FF006E' }}>좋아요당 +5P</span>
          </p>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
}
