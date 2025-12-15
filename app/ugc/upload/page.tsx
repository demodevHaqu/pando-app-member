'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
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
  Clock,
  User,
  Search,
  Award,
  Gift,
  ArrowLeft,
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

const MOCK_TRAINERS = [
  { id: 't1', name: '김태훈', specialty: '웨이트', image: '👨‍🦱', rating: 4.9 },
  { id: 't2', name: '이수진', specialty: '필라테스', image: '👩', rating: 4.8 },
  { id: 't3', name: '박민수', specialty: '크로스핏', image: '👨', rating: 4.7 },
  { id: 't4', name: '최지현', specialty: '체형교정', image: '👩‍🦰', rating: 4.9 },
];

export default function UGCUploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [correctionRequest, setCorrectionRequest] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [wantsFeedback, setWantsFeedback] = useState(true);
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null);
  const [showTrainerModal, setShowTrainerModal] = useState(false);
  const [trainerSearch, setTrainerSearch] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'warning' | 'error'>('success');

  const showToastMessage = (message: string, type: 'success' | 'warning' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        showToastMessage('파일 크기는 100MB를 초과할 수 없습니다', 'warning');
        return;
      }
      if (!file.type.startsWith('video/')) {
        showToastMessage('동영상 파일만 업로드 가능합니다', 'warning');
        return;
      }
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Check video duration
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        setVideoDuration(video.duration);
        if (video.duration < 15) {
          showToastMessage('영상은 최소 15초 이상이어야 합니다', 'warning');
        } else if (video.duration > 30) {
          showToastMessage('영상은 최대 30초까지 업로드 가능합니다', 'warning');
        }
        URL.revokeObjectURL(video.src);
      };
      video.src = url;
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setVideoDuration(0);
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
      showToastMessage('영상을 선택해주세요', 'warning');
      return;
    }
    if (videoDuration < 15 || videoDuration > 30) {
      showToastMessage('영상 길이는 15~30초여야 합니다', 'warning');
      return;
    }
    if (!title.trim()) {
      showToastMessage('제목을 입력해주세요', 'warning');
      return;
    }
    if (!selectedCategory) {
      showToastMessage('운동 종류를 선택해주세요', 'warning');
      return;
    }

    setIsUploading(true);

    // Upload simulation
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setUploadProgress(i);
    }

    setIsUploading(false);
    showToastMessage('영상이 업로드되었습니다!', 'success');
    setTimeout(() => router.push('/ugc/video123'), 1000);
  };

  const filteredTrainers = MOCK_TRAINERS.filter(
    (t) =>
      t.name.includes(trainerSearch) ||
      t.specialty.includes(trainerSearch)
  );

  const selectedTrainerData = MOCK_TRAINERS.find((t) => t.id === selectedTrainer);

  const isDurationValid = videoDuration >= 15 && videoDuration <= 30;

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '120px' }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}>
        <button
          onClick={() => router.back()}
          style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer' }}
        >
          <ArrowLeft size={24} color="#9CA3AF" />
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>운동 영상 업로드</h1>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Upload Area */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {!selectedFile ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                padding: '40px 20px',
                borderRadius: '16px',
                border: '2px dashed rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.03)',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s',
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 16px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.2), rgba(255, 0, 110, 0.2))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Upload size={32} color="#FF6B35" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
                영상 업로드
              </h3>
              <p style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '16px' }}>
                운동 영상을 업로드하고<br />트레이너 피드백을 받아보세요
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  background: 'rgba(0, 217, 255, 0.15)',
                  color: '#00D9FF',
                  fontSize: '12px',
                }}>MP4, MOV</span>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  background: 'rgba(255, 214, 10, 0.15)',
                  color: '#FFD60A',
                  fontSize: '12px',
                }}>15~30초</span>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  background: 'rgba(114, 9, 183, 0.15)',
                  color: '#7209B7',
                  fontSize: '12px',
                }}>최대 100MB</span>
              </div>
            </div>
          ) : (
            <div style={{
              padding: '16px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <div style={{
                position: 'relative',
                aspectRatio: '16/9',
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#1A1A24',
                marginBottom: '12px',
              }}>
                <video
                  ref={videoRef}
                  src={previewUrl || ''}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onEnded={() => setIsPlaying(false)}
                />

                {/* Play Control */}
                <div
                  onClick={togglePlayPause}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0, 0, 0, 0.3)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {isPlaying ? (
                      <Pause size={28} color="white" />
                    ) : (
                      <Play size={28} color="white" style={{ marginLeft: '4px' }} />
                    )}
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={handleRemoveFile}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    padding: '8px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <X size={20} color="white" />
                </button>

                {/* Duration Badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  background: isDurationValid ? 'rgba(57, 255, 20, 0.2)' : 'rgba(255, 0, 110, 0.2)',
                  border: `1px solid ${isDurationValid ? 'rgba(57, 255, 20, 0.5)' : 'rgba(255, 0, 110, 0.5)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  <Clock size={14} color={isDurationValid ? '#39FF14' : '#FF006E'} />
                  <span style={{ fontSize: '12px', color: isDurationValid ? '#39FF14' : '#FF006E', fontWeight: 'bold' }}>
                    {Math.round(videoDuration)}초
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#9CA3AF' }}>
                <Video size={16} />
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {selectedFile.name}
                </span>
                <span>({(selectedFile.size / 1024 / 1024).toFixed(1)}MB)</span>
              </div>

              {!isDurationValid && (
                <div style={{
                  marginTop: '12px',
                  padding: '12px',
                  borderRadius: '10px',
                  background: 'rgba(255, 0, 110, 0.1)',
                  border: '1px solid rgba(255, 0, 110, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <AlertCircle size={16} color="#FF006E" />
                  <span style={{ fontSize: '13px', color: '#FF006E' }}>
                    영상 길이는 15~30초여야 합니다
                  </span>
                </div>
              )}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />

          {!selectedFile && (
            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Camera size={20} />
                카메라
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Video size={20} />
                갤러리
              </button>
            </div>
          )}
        </motion.div>

        {/* Video Info */}
        {selectedFile && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                padding: '20px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>영상 정보</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#9CA3AF', marginBottom: '8px' }}>
                    제목 *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="예: 스쿼트 자세 체크 부탁드려요"
                    maxLength={50}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      background: '#1A1A24',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '15px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#9CA3AF', marginBottom: '8px' }}>
                    설명 (선택)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="궁금한 점이나 배경 정보를 적어주세요"
                    maxLength={200}
                    style={{
                      width: '100%',
                      height: '80px',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      background: '#1A1A24',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '15px',
                      outline: 'none',
                      resize: 'none',
                      fontFamily: 'inherit',
                    }}
                  />
                  <div style={{ textAlign: 'right', fontSize: '11px', color: '#6B7280', marginTop: '4px' }}>
                    {description.length}/200
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Exercise Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              style={{
                padding: '20px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>운동 종류 *</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {EXERCISE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      padding: '12px 8px',
                      borderRadius: '12px',
                      border: selectedCategory === cat.id
                        ? '2px solid #FF6B35'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      background: selectedCategory === cat.id
                        ? 'rgba(255, 107, 53, 0.15)'
                        : '#1A1A24',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '4px' }}>{cat.icon}</div>
                    <div style={{
                      fontSize: '11px',
                      color: selectedCategory === cat.id ? '#FF6B35' : '#9CA3AF',
                    }}>
                      {cat.label}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Correction Request */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                padding: '20px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.1), rgba(114, 9, 183, 0.1))',
                border: '1px solid rgba(255, 0, 110, 0.2)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(255, 0, 110, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <AlertCircle size={20} color="#FF006E" />
                </div>
                <div>
                  <h3 style={{ fontWeight: 'bold', color: 'white', fontSize: '15px' }}>교정 요청 사항</h3>
                  <p style={{ fontSize: '12px', color: '#9CA3AF' }}>피드백 받고 싶은 부분을 구체적으로 작성해주세요</p>
                </div>
              </div>
              <textarea
                value={correctionRequest}
                onChange={(e) => setCorrectionRequest(e.target.value)}
                placeholder="예: 무릎이 앞으로 나가는 것 같은데 괜찮은지 봐주세요. 허리가 말리는 느낌도 있어요."
                maxLength={300}
                style={{
                  width: '100%',
                  height: '100px',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 0, 110, 0.3)',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'none',
                  fontFamily: 'inherit',
                }}
              />
              <div style={{ textAlign: 'right', fontSize: '11px', color: '#6B7280', marginTop: '4px' }}>
                {correctionRequest.length}/300
              </div>
            </motion.div>

            {/* Trainer Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              style={{
                padding: '20px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(114, 9, 183, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <User size={20} color="#7209B7" />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 'bold', color: 'white', fontSize: '15px' }}>트레이너 태그</h3>
                    <p style={{ fontSize: '12px', color: '#9CA3AF' }}>특정 트레이너에게 피드백 요청</p>
                  </div>
                </div>
              </div>

              {selectedTrainerData ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'rgba(114, 9, 183, 0.15)',
                  border: '1px solid rgba(114, 9, 183, 0.3)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: '#1A1A24',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                    }}>
                      {selectedTrainerData.image}
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold', color: 'white', fontSize: '14px' }}>
                        {selectedTrainerData.name} 트레이너
                      </div>
                      <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                        {selectedTrainerData.specialty} · ⭐ {selectedTrainerData.rating}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTrainer(null)}
                    style={{
                      padding: '8px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <X size={18} color="#9CA3AF" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowTrainerModal(true)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    border: '1px dashed rgba(114, 9, 183, 0.5)',
                    background: 'transparent',
                    color: '#7209B7',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <Search size={18} />
                  트레이너 검색 및 태그하기
                </button>
              )}
            </motion.div>

            {/* AI Feedback Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                padding: '20px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.2), rgba(57, 255, 20, 0.2))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                  }}>
                    🤖
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 'bold', color: 'white' }}>AI 피드백도 받기</h3>
                    <p style={{ fontSize: '12px', color: '#9CA3AF' }}>자세 분석 및 개선점 제안</p>
                  </div>
                </div>
                <button
                  onClick={() => setWantsFeedback(!wantsFeedback)}
                  style={{
                    width: '52px',
                    height: '28px',
                    borderRadius: '14px',
                    background: wantsFeedback
                      ? 'linear-gradient(135deg, #00D9FF, #39FF14)'
                      : '#3A3A4A',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.3s',
                  }}
                >
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'white',
                    position: 'absolute',
                    top: '3px',
                    left: wantsFeedback ? '27px' : '3px',
                    transition: 'all 0.3s',
                  }} />
                </button>
              </div>
            </motion.div>

            {/* Rewards Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              style={{
                padding: '16px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(255, 214, 10, 0.1), rgba(255, 107, 53, 0.1))',
                border: '1px solid rgba(255, 214, 10, 0.2)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Gift size={20} color="#FFD60A" />
                <span style={{ fontWeight: 'bold', color: '#FFD60A', fontSize: '14px' }}>업로드 리워드</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  textAlign: 'center',
                }}>
                  <Award size={18} color="#FFD60A" style={{ marginBottom: '4px' }} />
                  <div style={{ fontSize: '13px', color: 'white', fontWeight: 'bold' }}>+50P</div>
                  <div style={{ fontSize: '10px', color: '#9CA3AF' }}>업로드</div>
                </div>
                <div style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  textAlign: 'center',
                }}>
                  <Award size={18} color="#00D9FF" style={{ marginBottom: '4px' }} />
                  <div style={{ fontSize: '13px', color: 'white', fontWeight: 'bold' }}>+10P</div>
                  <div style={{ fontSize: '10px', color: '#9CA3AF' }}>100회 조회당</div>
                </div>
                <div style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  textAlign: 'center',
                }}>
                  <Award size={18} color="#FF006E" style={{ marginBottom: '4px' }} />
                  <div style={{ fontSize: '13px', color: 'white', fontWeight: 'bold' }}>+5P</div>
                  <div style={{ fontSize: '10px', color: '#9CA3AF' }}>좋아요당</div>
                </div>
              </div>
            </motion.div>

            {/* Upload Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                padding: '16px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>좋은 피드백을 위한 팁</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  '전신이 보이도록 촬영해주세요',
                  '밝은 조명에서 촬영하면 더 정확해요',
                  '옆면 또는 대각선에서 촬영해주세요',
                  '2-3회 반복 동작을 포함해주세요',
                ].map((tip, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={16} color="#39FF14" />
                    <span style={{ fontSize: '13px', color: '#D1D5DB' }}>{tip}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Fixed Bottom Button */}
      {selectedFile && (
        <div style={{
          position: 'fixed',
          bottom: '70px',
          left: 0,
          right: 0,
          padding: '16px 20px',
          background: 'linear-gradient(to top, #0D0D12 80%, transparent)',
        }}>
          <button
            onClick={handleUpload}
            disabled={isUploading || !title.trim() || !selectedCategory || !isDurationValid}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '14px',
              background: isUploading || !title.trim() || !selectedCategory || !isDurationValid
                ? '#3A3A4A'
                : 'linear-gradient(135deg, #FF6B35, #FF006E)',
              border: 'none',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: isUploading || !title.trim() || !selectedCategory || !isDurationValid
                ? 'not-allowed'
                : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: isUploading || !title.trim() || !selectedCategory || !isDurationValid
                ? 'none'
                : '0 0 30px rgba(255, 107, 53, 0.4)',
            }}
          >
            {isUploading ? (
              <>
                <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                업로드 중... {uploadProgress}%
              </>
            ) : (
              <>
                <Upload size={20} />
                영상 업로드
              </>
            )}
          </button>
        </div>
      )}

      {/* Trainer Selection Modal */}
      {showTrainerModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
          onClick={() => setShowTrainerModal(false)}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            style={{
              width: '100%',
              maxWidth: '425px',
              maxHeight: '70vh',
              background: 'linear-gradient(145deg, #1A1A24, #0D0D12)',
              borderRadius: '24px 24px 0 0',
              padding: '24px',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              width: '40px',
              height: '4px',
              borderRadius: '2px',
              background: 'rgba(255, 255, 255, 0.2)',
              margin: '0 auto 20px',
            }} />

            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
              트레이너 선택
            </h3>

            {/* Search */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              borderRadius: '12px',
              background: '#0D0D12',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '16px',
            }}>
              <Search size={18} color="#6B7280" />
              <input
                type="text"
                value={trainerSearch}
                onChange={(e) => setTrainerSearch(e.target.value)}
                placeholder="트레이너 이름 또는 전문 분야 검색"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            {/* Trainer List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '400px', overflowY: 'auto' }}>
              {filteredTrainers.map((trainer) => (
                <button
                  key={trainer.id}
                  onClick={() => {
                    setSelectedTrainer(trainer.id);
                    setShowTrainerModal(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '14px',
                    background: '#1A1A24',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                  }}>
                    {trainer.image}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
                      {trainer.name} 트레이너
                    </div>
                    <div style={{ fontSize: '13px', color: '#9CA3AF' }}>
                      {trainer.specialty} · ⭐ {trainer.rating}
                    </div>
                  </div>
                  <ChevronRight size={20} color="#6B7280" />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Toast */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          style={{
            position: 'fixed',
            bottom: '140px',
            left: '20px',
            right: '20px',
            maxWidth: '385px',
            margin: '0 auto',
            padding: '14px 16px',
            borderRadius: '12px',
            background: toastType === 'success'
              ? 'rgba(57, 255, 20, 0.15)'
              : toastType === 'warning'
                ? 'rgba(255, 214, 10, 0.15)'
                : 'rgba(255, 0, 110, 0.15)',
            border: `1px solid ${toastType === 'success'
              ? 'rgba(57, 255, 20, 0.3)'
              : toastType === 'warning'
                ? 'rgba(255, 214, 10, 0.3)'
                : 'rgba(255, 0, 110, 0.3)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 200,
          }}
        >
          {toastType === 'success' ? (
            <CheckCircle size={18} color="#39FF14" />
          ) : toastType === 'warning' ? (
            <AlertCircle size={18} color="#FFD60A" />
          ) : (
            <AlertCircle size={18} color="#FF006E" />
          )}
          <span style={{
            fontSize: '14px',
            color: toastType === 'success' ? '#39FF14' : toastType === 'warning' ? '#FFD60A' : '#FF006E',
          }}>
            {toastMessage}
          </span>
        </motion.div>
      )}

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
