'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Clock,
  CheckCircle,
  X,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { MOCK_STRETCHING_VIDEOS } from '@/data/mock/stretching';

// Mock 루틴 데이터
const MOCK_ROUTINE = {
  id: 'routine1',
  name: '아침 스트레칭 루틴',
  description: '하루를 상쾌하게 시작하는 전신 스트레칭',
  videoIds: ['stretch1', 'stretch2', 'stretch3'],
  totalDuration: 15,
  createdAt: '2025-01-10',
};

export default function StretchingRoutineDetailPage() {
  const router = useRouter();
  const params = useParams();
  const routineId = params.id as string;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);

  const routineVideos = MOCK_ROUTINE.videoIds
    .map((id) => MOCK_STRETCHING_VIDEOS.find((v) => v.id === id))
    .filter(Boolean);

  const currentVideo = routineVideos[currentIndex];
  const totalDuration = routineVideos.reduce((sum, v) => sum + (v?.duration || 0), 0);
  const completedDuration = completedVideos.reduce((sum, id) => {
    const video = MOCK_STRETCHING_VIDEOS.find((v) => v.id === id);
    return sum + (video?.duration || 0);
  }, 0);

  // 타이머 효과
  useEffect(() => {
    if (currentVideo && timeRemaining === 0) {
      setTimeRemaining(currentVideo.duration * 60);
    }
  }, [currentVideo]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleVideoComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining]);

  const handleVideoComplete = () => {
    if (currentVideo && !completedVideos.includes(currentVideo.id)) {
      setCompletedVideos([...completedVideos, currentVideo.id]);
    }

    if (currentIndex < routineVideos.length - 1) {
      setCurrentIndex(currentIndex + 1);
      const nextVideo = routineVideos[currentIndex + 1];
      setTimeRemaining(nextVideo ? nextVideo.duration * 60 : 0);
    } else {
      setIsPlaying(false);
      setShowCompleteModal(true);
    }
  };

  const handlePrevVideo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      const prevVideo = routineVideos[currentIndex - 1];
      setTimeRemaining(prevVideo ? prevVideo.duration * 60 : 0);
      setIsPlaying(false);
    }
  };

  const handleNextVideo = () => {
    if (currentIndex < routineVideos.length - 1) {
      if (currentVideo && !completedVideos.includes(currentVideo.id)) {
        setCompletedVideos([...completedVideos, currentVideo.id]);
      }
      setCurrentIndex(currentIndex + 1);
      const nextVideo = routineVideos[currentIndex + 1];
      setTimeRemaining(nextVideo ? nextVideo.duration * 60 : 0);
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setCompletedVideos([]);
    setTimeRemaining(routineVideos[0]?.duration ? routineVideos[0].duration * 60 : 0);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((totalDuration - (completedDuration + (currentVideo?.duration || 0) - timeRemaining / 60)) / totalDuration) * 100;

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
        <p className="text-white">루틴 정보를 찾을 수 없습니다</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-dark pb-24">
      <Header title={MOCK_ROUTINE.name} showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 비디오 플레이어 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="relative aspect-video rounded-xl overflow-hidden bg-cyber-mid">
            <img
              src={currentVideo.thumbnailUrl}
              alt={currentVideo.title}
              className="w-full h-full object-cover"
            />

            {/* 재생 오버레이 */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="flex items-center gap-6">
                <button
                  onClick={handlePrevVideo}
                  disabled={currentIndex === 0}
                  className="p-3 bg-white/20 rounded-full backdrop-blur-sm disabled:opacity-30"
                >
                  <SkipBack size={24} className="text-white" />
                </button>

                <Button
                  variant="energy"
                  size="lg"
                  className="rounded-full w-16 h-16"
                  onClick={() => setIsPlaying(!isPlaying)}
                  glow
                >
                  {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
                </Button>

                <button
                  onClick={handleNextVideo}
                  disabled={currentIndex === routineVideos.length - 1}
                  className="p-3 bg-white/20 rounded-full backdrop-blur-sm disabled:opacity-30"
                >
                  <SkipForward size={24} className="text-white" />
                </button>
              </div>
            </div>

            {/* 상단 컨트롤 */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 bg-black/50 rounded-full backdrop-blur-sm"
              >
                {isMuted ? (
                  <VolumeX size={20} className="text-white" />
                ) : (
                  <Volume2 size={20} className="text-white" />
                )}
              </button>
            </div>

            {/* 타이머 표시 */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm font-bold">{formatTime(timeRemaining)}</span>
                <span className="text-white/70 text-sm">
                  {currentIndex + 1} / {routineVideos.length}
                </span>
              </div>
              <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-energy transition-all duration-1000"
                  style={{
                    width: `${((currentVideo.duration * 60 - timeRemaining) / (currentVideo.duration * 60)) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 현재 영상 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="hologram">
            <div className="flex items-start justify-between mb-3">
              <div>
                <Badge type="energy">
                  {currentIndex + 1}/{routineVideos.length}
                </Badge>
                <h2 className="text-xl font-bold text-white mt-2">{currentVideo.title}</h2>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <Clock size={16} />
                <span className="text-sm">{currentVideo.duration}분</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm">{currentVideo.description}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              <Badge type="growth">{currentVideo.category}</Badge>
              <Badge type="premium">{currentVideo.difficulty}</Badge>
            </div>
          </Card>
        </motion.div>

        {/* 전체 진행률 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-white">전체 진행률</h3>
              <button onClick={handleRestart} className="text-gray-400 hover:text-white">
                <RotateCcw size={18} />
              </button>
            </div>

            <div className="h-2 bg-cyber-mid rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-growth transition-all"
                style={{ width: `${(completedVideos.length / routineVideos.length) * 100}%` }}
              />
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">
                {completedVideos.length}개 완료
              </span>
              <span className="text-neon-green">
                {Math.round((completedVideos.length / routineVideos.length) * 100)}%
              </span>
            </div>
          </Card>
        </motion.div>

        {/* 영상 목록 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-bold text-white mb-3">영상 목록</h3>
          <div className="space-y-2">
            {routineVideos.map((video, idx) => {
              if (!video) return null;
              const isCompleted = completedVideos.includes(video.id);
              const isCurrent = idx === currentIndex;

              return (
                <div
                  key={video.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setTimeRemaining(video.duration * 60);
                    setIsPlaying(false);
                  }}
                  className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer transition-all ${
                    isCurrent
                      ? 'bg-gradient-energy/20 border border-energy-orange/50'
                      : isCompleted
                      ? 'bg-neon-green/10 border border-neon-green/30'
                      : 'bg-cyber-mid hover:bg-white/10'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle size={24} className="text-neon-green" />
                    ) : (
                      <span
                        className={`font-bold ${isCurrent ? 'text-energy-orange' : 'text-gray-500'}`}
                      >
                        {idx + 1}
                      </span>
                    )}
                  </div>

                  <div className="w-12 h-9 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div
                      className={`font-bold text-sm truncate ${
                        isCurrent ? 'text-energy-orange' : 'text-white'
                      }`}
                    >
                      {video.title}
                    </div>
                    <div className="text-xs text-gray-400">{video.duration}분</div>
                  </div>

                  {isCurrent && isPlaying && (
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-1 bg-energy-orange rounded-full animate-pulse"
                          style={{
                            height: `${12 + i * 4}px`,
                            animationDelay: `${i * 0.15}s`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[425px] mx-auto p-4 bg-gradient-to-t from-cyber-dark via-cyber-dark to-transparent">
        {completedVideos.length === routineVideos.length ? (
          <Button
            variant="energy"
            size="lg"
            className="w-full"
            onClick={() => setShowCompleteModal(true)}
            glow
            shine
          >
            <CheckCircle size={20} className="mr-2" />
            루틴 완료!
          </Button>
        ) : (
          <Button
            variant="energy"
            size="lg"
            className="w-full"
            onClick={() => setIsPlaying(!isPlaying)}
            glow
            shine
          >
            {isPlaying ? (
              <>
                <Pause size={20} className="mr-2" />
                일시정지
              </>
            ) : (
              <>
                <Play size={20} className="mr-2" />
                {completedVideos.length === 0 ? '루틴 시작하기' : '계속하기'}
              </>
            )}
          </Button>
        )}
      </div>

      {/* 완료 모달 */}
      <Modal isOpen={showCompleteModal} onClose={() => setShowCompleteModal(false)} title="">
        <div className="text-center py-6">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <h3 className="text-2xl font-bold text-gradient-energy mb-2">스트레칭 완료!</h3>
          <p className="text-gray-400 mb-6">
            {MOCK_ROUTINE.name}을 완료했습니다.
            <br />총 {totalDuration}분 동안 스트레칭을 진행했어요.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-3 glass-dark rounded-lg text-center">
              <div className="text-2xl font-bold text-neon-green">{routineVideos.length}개</div>
              <div className="text-xs text-gray-400">완료한 영상</div>
            </div>
            <div className="p-3 glass-dark rounded-lg text-center">
              <div className="text-2xl font-bold text-electric-blue">{totalDuration}분</div>
              <div className="text-xs text-gray-400">총 운동 시간</div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="lg"
              className="flex-1"
              onClick={() => {
                setShowCompleteModal(false);
                handleRestart();
              }}
            >
              다시 하기
            </Button>
            <Button
              variant="energy"
              size="lg"
              className="flex-1"
              onClick={() => router.push('/stretching')}
              glow
            >
              완료
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
