'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import { Plus, X, Clock, GripVertical, Save, Play } from 'lucide-react';
import { MOCK_STRETCHING_VIDEOS } from '@/data/mock/stretching';

export default function CreateStretchingRoutinePage() {
  const router = useRouter();
  const [routineName, setRoutineName] = useState('');
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const [showVideoSelector, setShowVideoSelector] = useState(false);

  const selectedVideoData = selectedVideos
    .map((id) => MOCK_STRETCHING_VIDEOS.find((v) => v.id === id))
    .filter(Boolean);

  const totalDuration = selectedVideoData.reduce((sum, v) => sum + (v?.duration || 0), 0);

  const handleAddVideo = (videoId: string) => {
    if (!selectedVideos.includes(videoId)) {
      setSelectedVideos([...selectedVideos, videoId]);
    }
    setShowVideoSelector(false);
  };

  const handleRemoveVideo = (videoId: string) => {
    setSelectedVideos(selectedVideos.filter((id) => id !== videoId));
  };

  const handleSave = () => {
    if (!routineName.trim()) {
      alert('루틴 이름을 입력해주세요');
      return;
    }
    if (selectedVideos.length === 0) {
      alert('최소 1개 이상의 영상을 추가해주세요');
      return;
    }
    alert('루틴이 저장되었습니다!');
    router.push('/stretching');
  };

  const categories = [
    { id: 'all', label: '전체' },
    { id: 'neck', label: '목·어깨' },
    { id: 'back', label: '허리' },
    { id: 'hip', label: '골반' },
    { id: 'leg', label: '다리' },
    { id: 'full-body', label: '전신' },
  ];

  const [filterCategory, setFilterCategory] = useState('all');

  const filteredVideos =
    filterCategory === 'all'
      ? MOCK_STRETCHING_VIDEOS
      : MOCK_STRETCHING_VIDEOS.filter((v) => v.category === filterCategory);

  return (
    <div className="min-h-screen bg-cyber-dark pb-24">
      <Header title="나만의 루틴 만들기" showBack={true} showLogo={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 루틴 이름 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <h3 className="font-bold text-white mb-3">루틴 이름</h3>
            <Input
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
              placeholder="예: 아침 스트레칭, 운동 후 회복"
              maxLength={30}
            />
          </Card>
        </motion.div>

        {/* 선택된 영상 목록 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-white">스트레칭 영상</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock size={16} />
              <span>총 {totalDuration}분</span>
            </div>
          </div>

          {selectedVideoData.length > 0 ? (
            <div className="space-y-2">
              {selectedVideoData.map((video, idx) => (
                <motion.div
                  key={video!.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card>
                    <div className="flex items-center gap-3">
                      <div className="text-gray-500 cursor-grab">
                        <GripVertical size={20} />
                      </div>
                      <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={video!.thumbnailUrl}
                          alt={video!.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white text-sm truncate">{video!.title}</div>
                        <div className="text-xs text-gray-400">{video!.duration}분</div>
                      </div>
                      <button
                        onClick={() => handleRemoveVideo(video!.id)}
                        className="p-2 text-gray-400 hover:text-power-pink transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card variant="glass">
              <div className="text-center py-8 text-gray-400">
                <Play size={48} className="mx-auto mb-3 opacity-50" />
                <p>영상을 추가해주세요</p>
              </div>
            </Card>
          )}

          <Button
            variant="ghost"
            size="lg"
            className="w-full mt-3"
            onClick={() => setShowVideoSelector(true)}
          >
            <Plus size={20} className="mr-2" />
            영상 추가하기
          </Button>
        </motion.div>

        {/* 영상 선택 모달 */}
        {showVideoSelector && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-end">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              className="w-full max-w-[425px] mx-auto bg-cyber-dark rounded-t-3xl max-h-[80vh] overflow-hidden"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">영상 선택</h3>
                <button
                  onClick={() => setShowVideoSelector(false)}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {/* 카테고리 필터 */}
              <div className="p-4 border-b border-white/10">
                <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFilterCategory(cat.id)}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm transition-all ${
                        filterCategory === cat.id
                          ? 'bg-gradient-growth text-white'
                          : 'bg-cyber-mid text-gray-400'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 영상 목록 */}
              <div className="p-4 overflow-y-auto max-h-[50vh] space-y-2">
                {filteredVideos.map((video) => {
                  const isSelected = selectedVideos.includes(video.id);
                  return (
                    <div
                      key={video.id}
                      onClick={() => !isSelected && handleAddVideo(video.id)}
                      className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-electric-blue/20 border border-electric-blue/50'
                          : 'bg-cyber-mid hover:bg-white/10'
                      }`}
                    >
                      <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white text-sm truncate">{video.title}</div>
                        <div className="text-xs text-gray-400">{video.duration}분</div>
                      </div>
                      {isSelected && <Badge type="growth">추가됨</Badge>}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[425px] mx-auto p-4 bg-gradient-to-t from-cyber-dark via-cyber-dark to-transparent">
        <Button
          variant="energy"
          size="lg"
          className="w-full"
          onClick={handleSave}
          disabled={!routineName.trim() || selectedVideos.length === 0}
          glow
          shine
        >
          <Save size={20} className="mr-2" />
          루틴 저장하기
        </Button>
      </div>
    </div>
  );
}
