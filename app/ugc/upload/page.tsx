'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import {
  Upload,
  Video,
  Camera,
  X,
  Play,
  Pause,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Loader2,
} from 'lucide-react';

const EXERCISE_CATEGORIES = [
  { id: 'squat', label: '스쿼트', icon: '🏋️' },
  { id: 'deadlift', label: '데드리프트', icon: '💪' },
  { id: 'benchpress', label: '벤치프레스', icon: '🔥' },
  { id: 'pullup', label: '풀업', icon: '🎯' },
  { id: 'lunge', label: '런지', icon: '🦵' },
  { id: 'plank', label: '플랭크', icon: '🧘' },
  { id: 'other', label: '기타', icon: '📹' },
];

export default function UGCUploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [wantsFeedback, setWantsFeedback] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        alert('파일 크기는 100MB를 초과할 수 없습니다');
        return;
      }
      if (!file.type.startsWith('video/')) {
        alert('동영상 파일만 업로드 가능합니다');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('영상을 선택해주세요');
      return;
    }
    if (!title.trim()) {
      alert('제목을 입력해주세요');
      return;
    }
    if (!selectedCategory) {
      alert('운동 종류를 선택해주세요');
      return;
    }

    setIsUploading(true);

    // 업로드 시뮬레이션
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setUploadProgress(i);
    }

    setIsUploading(false);
    alert('영상이 업로드되었습니다! AI 분석 후 피드백을 받아보실 수 있습니다.');
    router.push('/ugc/video123');
  };

  return (
    <div className="min-h-screen bg-cyber-dark pb-24">
      <Header title="영상 업로드" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 업로드 영역 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {!selectedFile ? (
            <Card
              variant="glass"
              className="border-2 border-dashed border-white/20 hover:border-electric-blue/50 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-energy/20 flex items-center justify-center">
                  <Upload size={32} className="text-energy-orange" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">영상 업로드</h3>
                <p className="text-gray-400 text-sm mb-4">
                  운동 영상을 업로드하고
                  <br />
                  AI 피드백을 받아보세요
                </p>
                <div className="flex justify-center gap-3">
                  <Badge type="status">MP4, MOV</Badge>
                  <Badge type="status">최대 100MB</Badge>
                </div>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-cyber-mid mb-4">
                <video
                  ref={videoRef}
                  src={previewUrl || ''}
                  className="w-full h-full object-contain"
                  onEnded={() => setIsPlaying(false)}
                />

                {/* 재생 컨트롤 */}
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                  onClick={togglePlayPause}
                >
                  <button className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    {isPlaying ? (
                      <Pause size={28} className="text-white" />
                    ) : (
                      <Play size={28} className="text-white ml-1" />
                    )}
                  </button>
                </div>

                {/* 삭제 버튼 */}
                <button
                  onClick={handleRemoveFile}
                  className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/70"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Video size={16} />
                <span className="truncate">{selectedFile.name}</span>
                <span className="flex-shrink-0">
                  ({(selectedFile.size / 1024 / 1024).toFixed(1)}MB)
                </span>
              </div>
            </Card>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {!selectedFile && (
            <div className="flex gap-3 mt-3">
              <Button
                variant="ghost"
                size="lg"
                className="flex-1"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera size={20} className="mr-2" />
                카메라
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="flex-1"
                onClick={() => fileInputRef.current?.click()}
              >
                <Video size={20} className="mr-2" />
                갤러리
              </Button>
            </div>
          )}
        </motion.div>

        {/* 영상 정보 입력 */}
        {selectedFile && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <h3 className="font-bold text-white mb-3">영상 정보</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">제목 *</label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="예: 스쿼트 자세 체크 부탁드려요"
                      maxLength={50}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">설명 (선택)</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="궁금한 점이나 피드백 받고 싶은 부분을 적어주세요"
                      className="w-full h-24 p-3 bg-cyber-mid border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-electric-blue/50 resize-none"
                      maxLength={200}
                    />
                    <div className="text-right text-xs text-gray-500 mt-1">
                      {description.length}/200
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* 운동 종류 선택 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <h3 className="font-bold text-white mb-3">운동 종류 *</h3>
                <div className="grid grid-cols-4 gap-2">
                  {EXERCISE_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`p-3 rounded-lg text-center transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-gradient-energy text-white'
                          : 'bg-cyber-mid text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-2xl mb-1">{cat.icon}</div>
                      <div className="text-xs">{cat.label}</div>
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* AI 피드백 옵션 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-premium/20 flex items-center justify-center">
                      <span className="text-xl">🤖</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-white">AI 피드백 받기</h3>
                      <p className="text-xs text-gray-400">자세 분석 및 개선점 제안</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={wantsFeedback}
                      onChange={(e) => setWantsFeedback(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-energy"></div>
                  </label>
                </div>

                {wantsFeedback && (
                  <div className="mt-4 p-3 bg-electric-blue/10 border border-electric-blue/30 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle size={16} className="text-electric-blue flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-300">
                        AI 분석은 보통 1-2분 정도 소요됩니다. 분석이 완료되면 알림을
                        보내드립니다.
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>

            {/* 업로드 가이드 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card variant="glass">
                <h3 className="font-bold text-white mb-3">좋은 피드백을 위한 팁</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-neon-green flex-shrink-0 mt-0.5" />
                    <span>전신이 보이도록 촬영해주세요</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-neon-green flex-shrink-0 mt-0.5" />
                    <span>밝은 조명에서 촬영하면 더 정확해요</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-neon-green flex-shrink-0 mt-0.5" />
                    <span>옆면 또는 대각선에서 촬영해주세요</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-neon-green flex-shrink-0 mt-0.5" />
                    <span>2-3회 반복 동작을 포함해주세요</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </div>

      {/* 하단 고정 버튼 */}
      {selectedFile && (
        <div className="fixed bottom-16 left-0 right-0 max-w-[425px] mx-auto p-4 bg-gradient-to-t from-cyber-dark via-cyber-dark to-transparent">
          <Button
            variant="energy"
            size="lg"
            className="w-full"
            onClick={handleUpload}
            disabled={isUploading || !title.trim() || !selectedCategory}
            glow
            shine
          >
            {isUploading ? (
              <>
                <Loader2 size={20} className="mr-2 animate-spin" />
                업로드 중... {uploadProgress}%
              </>
            ) : (
              <>
                <Upload size={20} className="mr-2" />
                영상 업로드
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
