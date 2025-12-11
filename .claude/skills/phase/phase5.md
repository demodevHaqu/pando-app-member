🎯 PHASE 5: QR 스캔 기능Task 5.1: 타입 정의 및 Mock 데이터파일: types/equipment.tstypescriptexport interface Equipment {
  id: string;
  name: string;
  nameKo: string;
  category: 'strength' | 'cardio' | 'functional';
  imageUrl?: string;
  videoUrl30s?: string;
  videoUrl2m?: string;
  description: string;
  muscleGroups: string[];
  recommendedSets: number;
  recommendedReps: number;
  recommendedWeight?: number;
  instructions: string[];
  commonMistakes: string[];
  location: string;
}

export interface ScanHistory {
  id: string;
  equipmentId: string;
  scannedAt: string;
  type: 'equipment' | 'stretching' | 'sauna' | 'recovery';
}파일: data/mock/equipment.tstypescriptimport { Equipment } from '@/types/equipment';

export const MOCK_EQUIPMENT: Equipment[] = [
  {
    id: 'eq1',
    name: 'Squat Rack',
    nameKo: '스쿼트 랙',
    category: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    videoUrl30s: 'https://example.com/squat-30s.mp4',
    videoUrl2m: 'https://example.com/squat-2m.mp4',
    description: '하체 운동의 기본, 스쿼트를 안전하게 수행할 수 있는 장비입니다.',
    muscleGroups: ['대퇴사두근', '둔근', '햄스트링'],
    recommendedSets: 4,
    recommendedReps: 12,
    recommendedWeight: 60,
    instructions: [
      '발을 어깨 너비로 벌리고 서세요',
      '바를 어깨에 올리고 가슴을 펴세요',
      '무릎이 발끝을 넘지 않도록 주의하며 앉으세요',
      '허벅지가 바닥과 평행할 때까지 내려가세요',
      '힘차게 밀어올리세요',
    ],
    commonMistakes: [
      '무릎이 발끝보다 앞으로 나감',
      '허리가 둥글게 말림',
      '충분히 내려가지 않음',
      '발뒤꿈치가 들림',
    ],
    location: '2층 프리웨이트존',
  },
  {
    id: 'eq2',
    name: 'Bench Press',
    nameKo: '벤치프레스',
    category: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400',
    videoUrl30s: 'https://example.com/bench-30s.mp4',
    videoUrl2m: 'https://example.com/bench-2m.mp4',
    description: '가슴 운동의 대표 종목, 상체 근력을 키우는 필수 운동입니다.',
    muscleGroups: ['대흉근', '삼두근', '삼각근'],
    recommendedSets: 4,
    recommendedReps: 10,
    recommendedWeight: 50,
    instructions: [
      '벤치에 누워 발을 바닥에 단단히 디디세요',
      '바를 가슴 위에서 어깨 너비보다 넓게 잡으세요',
      '천천히 가슴까지 내리세요',
      '힘차게 밀어올리세요',
      '팔꿈치를 완전히 펴세요',
    ],
    commonMistakes: [
      '엉덩이가 벤치에서 떨어짐',
      '바가 너무 빠르게 내려감',
      '팔꿈치가 과도하게 벌어짐',
      '발이 불안정함',
    ],
    location: '2층 프리웨이트존',
  },
  {
    id: 'eq3',
    name: 'Treadmill',
    nameKo: '러닝머신',
    category: 'cardio',
    imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400',
    description: '유산소 운동의 기본, 걷기와 달리기를 할 수 있습니다.',
    muscleGroups: ['하체 전체', '심폐지구력'],
    recommendedSets: 1,
    recommendedReps: 30,
    instructions: [
      '안전 클립을 옷에 부착하세요',
      '천천히 속도를 올리세요',
      '바른 자세로 달리세요',
      '운동 후 천천히 속도를 줄이세요',
    ],
    commonMistakes: [
      '손잡이를 너무 세게 잡음',
      '앞으로 숙인 자세',
      '너무 빠른 속도로 시작',
    ],
    location: '3층 유산소존',
  },
];

export const MOCK_SCAN_HISTORY: any[] = [
  {
    id: 'scan1',
    equipmentId: 'eq1',
    equipment: MOCK_EQUIPMENT[0],
    scannedAt: '2025-01-15T14:30:00Z',
    type: 'equipment',
  },
  {
    id: 'scan2',
    equipmentId: 'eq2',
    equipment: MOCK_EQUIPMENT[1],
    scannedAt: '2025-01-15T15:00:00Z',
    type: 'equipment',
  },
];Task 5.2: QR 스캔 메인 화면파일: app/qr-scan/page.tsxtypescript'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { QrCode, Camera, History, Dumbbell, Sparkles, Flame, Droplets } from 'lucide-react';
import { MOCK_SCAN_HISTORY } from '@/data/mock/equipment';

export default function QRScanPage() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);

  const quickAccessCards = [
    {
      id: 'equipment',
      title: '기구 스캔',
      icon: Dumbbell,
      color: 'energy',
      description: '기구 QR을 스캔하세요',
    },
    {
      id: 'stretching',
      title: '스트레칭존',
      icon: Sparkles,
      color: 'growth',
      description: '스트레칭 영상 보기',
      link: '/qr-scan/stretching',
    },
    {
      id: 'sauna',
      title: '사우나',
      icon: Flame,
      color: 'premium',
      description: '입실 체크인',
      link: '/qr-scan/sauna',
    },
    {
      id: 'recovery',
      title: '리커버리존',
      icon: Droplets,
      color: 'growth',
      description: '회복 시설 이용',
      link: '/qr-scan/recovery',
    },
  ];

  const handleScan = () => {
    setIsScanning(true);
    // 데모용: 2초 후 자동으로 기구 상세로 이동
    setTimeout(() => {
      router.push('/qr-scan/equipment/eq1');
    }, 2000);
  };

  const handleMockScan = (equipmentId: string) => {
    router.push(`/qr-scan/equipment/${equipmentId}`);
  };

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="QR 스캔" showBack={false} showNotification={true} />

      <div className="p-4 space-y-6">
        {/* QR 스캔 카드 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="hologram" className="text-center">
            {!isScanning ? (
              <>
                <div className="w-32 h-32 bg-gradient-energy rounded-full mx-auto mb-6 flex items-center justify-center animate-energy-pulse">
                  <QrCode size={64} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">기구 QR 스캔</h2>
                <p className="text-gray-400 mb-6">
                  운동 기구의 QR 코드를 스캔하여
                  <br />
                  사용법과 추천 루틴을 확인하세요
                </p>
                <Button
                  variant="energy"
                  size="lg"
                  className="w-full"
                  onClick={handleScan}
                  glow
                  shine
                >
                  <Camera size={20} className="mr-2" />
                  스캔 시작하기
                </Button>
              </>
            ) : (
              <div className="py-8">
                <div className="w-48 h-48 mx-auto mb-6 relative">
                  <div className="absolute inset-0 border-4 border-electric-blue rounded-lg animate-pulse" />
                  <div className="absolute inset-4 border-2 border-electric-blue/50 rounded-lg" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera size={64} className="text-electric-blue animate-float" />
                  </div>
                </div>
                <p className="text-white font-bold text-lg mb-2">스캔 중...</p>
                <p className="text-gray-400">QR 코드를 화면에 맞춰주세요</p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* 빠른 접근 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-bold text-white mb-3">빠른 접근</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickAccessCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + idx * 0.05 }}
                >
                  <Card
                    glow
                    onClick={() => card.link && router.push(card.link)}
                    className="text-center"
                  >
                    <div
                      className={`w-16 h-16 bg-gradient-${card.color} rounded-full mx-auto mb-3 flex items-center justify-center`}
                    >
                      <Icon size={32} className="text-white" />
                    </div>
                    <div className="font-bold text-white mb-1">{card.title}</div>
                    <div className="text-xs text-gray-400">{card.description}</div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* 최근 스캔 이력 */}
        {MOCK_SCAN_HISTORY.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <History size={20} className="text-electric-blue" />
                최근 스캔
              </h3>
            </div>
            <div className="space-y-2">
              {MOCK_SCAN_HISTORY.map((scan) => (
                <Card
                  key={scan.id}
                  glow
                  onClick={() => handleMockScan(scan.equipmentId)}
                  className="flex items-center gap-4"
                >
                  <div className="w-16 h-16 bg-cyber-mid rounded-lg overflow-hidden flex-shrink-0">
                    {scan.equipment.imageUrl && (
                      <img
                        src={scan.equipment.imageUrl}
                        alt={scan.equipment.nameKo}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white mb-1">{scan.equipment.nameKo}</div>
                    <div className="text-sm text-gray-400">{scan.equipment.location}</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(scan.scannedAt).toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}Task 5.3: 기구 상세 화면파일: app/qr-scan/equipment/[id]/page.tsxtypescript'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Tabs from '@/components/ui/Tabs';
import { Play, BookOpen, AlertCircle, TrendingUp, ClipboardCheck } from 'lucide-react';
import { MOCK_EQUIPMENT } from '@/data/mock/equipment';

export default function EquipmentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const equipmentId = params.id as string;

  const equipment = MOCK_EQUIPMENT.find((eq) => eq.id === equipmentId);

  const [painLevel, setPainLevel] = useState(0);
  const [completedSets, setCompletedSets] = useState(0);

  if (!equipment) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
        <p className="text-white">기구를 찾을 수 없습니다</p>
      </div>
    );
  }

  const handleLogWorkout = () => {
    alert(`운동 기록 완료!\n세트: ${completedSets}\n통증: ${painLevel}/10`);
    router.push('/');
  };

  const tabContent = [
    {
      id: 'quick',
      label: '30초 요약',
      content: (
        <div className="space-y-4">
          <div className="aspect-video bg-cyber-mid rounded-lg flex items-center justify-center">
            <Play size={48} className="text-electric-blue" />
            <p className="text-gray-400 ml-3">30초 요약 영상</p>
          </div>
          <Card>
            <h4 className="font-bold text-white mb-2">핵심 포인트</h4>
            <ul className="space-y-2">
              {equipment.instructions.slice(0, 3).map((instruction, idx) => (
                <li key={idx} className="flex gap-2 text-gray-300 text-sm">
                  <span className="text-electric-blue">•</span>
                  {instruction}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      ),
    },
    {
      id: 'detail',
      label: '상세 설명',
      content: (
        <div className="space-y-4">
          <div className="aspect-video bg-cyber-mid rounded-lg flex items-center justify-center">
            <Play size={48} className="text-electric-blue" />
            <p className="text-gray-400 ml-3">2분 상세 영상</p>
          </div>
          <Card>
            <h4 className="font-bold text-white mb-3">자세한 사용법</h4>
            <ol className="space-y-3">
              {equipment.instructions.map((instruction, idx) => (
                <li key={idx} className="flex gap-3 text-gray-300 text-sm">
                  <span className="w-6 h-6 bg-electric-blue/20 rounded-full flex items-center justify-center text-electric-blue text-xs font-bold flex-shrink-0">
                    {idx + 1}
                  </span>
                  {instruction}
                </li>
              ))}
            </ol>
          </Card>
          <Card variant="glass">
            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
              <AlertCircle size={20} className="text-cyber-yellow" />
              주의사항
            </h4>
            <ul className="space-y-2">
              {equipment.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="flex gap-2 text-gray-300 text-sm">
                  <span className="text-cyber-yellow">⚠</span>
                  {mistake}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-cyber-dark pb-20">
      <Header title={equipment.nameKo} showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 기구 정보 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="hologram">
            {equipment.imageUrl && (
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src={equipment.imageUrl}
                  alt={equipment.nameKo}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{equipment.nameKo}</h2>
                <p className="text-gray-400 text-sm">{equipment.location}</p>
              </div>
              <Badge type="energy">{equipment.category}</Badge>
            </div>
            <p className="text-gray-300 mb-4">{equipment.description}</p>
            <div className="flex flex-wrap gap-2">
              {equipment.muscleGroups.map((muscle, idx) => (
                <span key={idx} className="px-3 py-1 glass-dark rounded-full text-sm text-gray-300">
                  {muscle}
                </span>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 추천 세트/반복/중량 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-energy">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={20} className="text-white" />
              <h3 className="font-bold text-white">AI 추천</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {equipment.recommendedSets}
                </div>
                <div className="text-sm text-white/80">세트</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {equipment.recommendedReps}
                </div>
                <div className="text-sm text-white/80">회</div>
              </div>
              {equipment.recommendedWeight && (
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">
                    {equipment.recommendedWeight}
                  </div>
                  <div className="text-sm text-white/80">kg</div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* 영상 탭 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs tabs={tabContent} />
        </motion.div>

        {/* 운동 기록 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <ClipboardCheck size={20} className="text-electric-blue" />
              운동 기록하기
            </h3>

            <div className="space-y-4">
              {/* 세트 완료 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-gray-400">완료한 세트</label>
                  <span className="text-electric-blue font-bold">
                    {completedSets}/{equipment.recommendedSets}
                  </span>
                </div>
                <div className="flex gap-2">
                  {Array.from({ length: equipment.recommendedSets }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCompletedSets(idx + 1)}
                      className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                        idx < completedSets
                          ? 'bg-gradient-growth text-white'
                          : 'bg-cyber-mid text-gray-500'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* 통증 레벨 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-gray-400">통증 레벨</label>
                  <span className="text-power-pink font-bold">{painLevel}/10</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={painLevel}
                  onChange={(e) => setPainLevel(Number(e.target.value))}
                  className="w-full h-2 bg-cyber-mid rounded-lg appearance-none cursor-pointer accent-power-pink"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>없음</span>
                  <span>보통</span>
                  <span>심함</span>
                </div>
              </div>

              <Button
                variant="energy"
                size="lg"
                className="w-full"
                onClick={handleLogWorkout}
                disabled={completedSets === 0}
                glow
                shine
              >
                기록 완료
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* 자세 가이드 버튼 */}
        <Button
          variant="growth"
          size="lg"
          className="w-full"
          onClick={() => router.push(`/qr-scan/equipment/${equipmentId}/form-guide`)}
        >
          <BookOpen size={20} className="mr-2" />
          AI 자세 가이드 (모션 트래킹)
        </Button>
      </div>
    </div>
  );
}Task 5.4: 스트레칭존파일: app/qr-scan/stretching/page.tsxtypescript'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Play, Clock } from 'lucide-react';

export default function StretchingZonePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: '전체' },
    { id: 'neck', label: '목/어깨' },
    { id: 'back', label: '허리' },
    { id: 'hip', label: '골반' },
    { id: 'leg', label: '다리' },
  ];

  const stretchingVideos = [
    {
      id: 'st1',
      title: '목/어깨 긴장 완화',
      duration: 5,
      category: 'neck',
      difficulty: 'beginner',
      thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    },
    {
      id: 'st2',
      title: '허리 통증 스트레칭',
      duration: 8,
      category: 'back',
      difficulty: 'beginner',
      thumbnail: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400',
    },
    {
      id: 'st3',
      title: '골반 교정 루틴',
      duration: 10,
      category: 'hip',
      difficulty: 'intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
    },
    {
      id: 'st4',
      title: '하체 유연성 향상',
      duration: 12,
      category: 'leg',
      difficulty: 'intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    },
  ];

  const aiRecommended = stretchingVideos.slice(0, 2);

  const filteredVideos =
    selectedCategory === 'all'
      ? stretchingVideos
      : stretchingVideos.filter((v) => v.category === selectedCategory);

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="스트레칭존" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* AI 추천 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-lg font-bold text-white">🤖 AI 추천 루틴</h3>
            <Badge type="energy">오늘</Badge>
          </div>
          <div className="space-y-3">
            {aiRecommended.map((video) => (
              <Card
                key={video.id}
                variant="hologram"
                glow
                onClick={() => router.push(`/stretching/video/${video.id}`)}
              >
                <div className="flex gap-4">
                  <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0 relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play size={32} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white mb-2">{video.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                      <Clock size={16} />
                      <span>{video.duration}분</span>
                    </div>
                    <Badge type="growth">{video.difficulty}</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* 카테고리 필터 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-bold text-white mb-3">카테고리</h3>
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-electric-blue text-white font-bold'
                    : 'bg-cyber-mid text-gray-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 영상 그리드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-bold text-white mb-3">
            {selectedCategory === 'all' ? '전체 영상' : categories.find((c) => c.id === selectedCategory)?.label}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {filteredVideos.map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
              >
                <Card glow onClick={() => router.push(`/stretching/video/${video.id}`)}>
                  <div className="aspect-video rounded-lg overflow-hidden mb-3 relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play size={24} className="text-white" />
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 rounded text-xs text-white">
                      {video.duration}분
                    </div>
                  </div>
                  <h4 className="font-bold text-white text-sm mb-2">{video.title}</h4>
                  <Badge type="growth">{video.difficulty}</Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}Task 5.5: 사우나 화면파일: app/qr-scan/sauna/page.tsxtypescript'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { Flame, Clock, AlertCircle, LogOut, LogIn } from 'lucide-react';

export default function SaunaPage() {
  const router = useRouter();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (isCheckedIn && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          const newTime = prev + 1;
          if (newTime >= 900) {
            // 15분
            setShowWarning(true);
          }
          return newTime;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isCheckedIn, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    setTimer(0);
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    setTimer(0);
    setShowWarning(false);
    alert(`이용 시간: ${formatTime(timer)}\n포인트 10P 적립!`);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="사우나" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 사우나 상태 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="hologram" className="text-center">
            <div
              className={`w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center ${
                isCheckedIn
                  ? 'bg-gradient-energy animate-energy-pulse'
                  : 'bg-cyber-mid'
              }`}
            >
              <Flame size={64} className={isCheckedIn ? 'text-white' : 'text-gray-500'} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {isCheckedIn ? '이용 중' : '사우나 입실'}
            </h2>
            {isCheckedIn ? (
              <>
                <div className="text-5xl font-bold text-gradient-energy mb-4">
                  {formatTime(timer)}
                </div>
                <p className="text-gray-400 mb-6">
                  {timer < 600
                    ? '편안한 시간 되세요 😌'
                    : timer < 900
                    ? '적정 시간입니다 👍'
                    : '충분히 이용하셨어요 ⚠️'}
                </p>
                <Button
                  variant="growth"
                  size="lg"
                  className="w-full"
                  onClick={handleCheckOut}
                  shine
                >
                  <LogOut size={20} className="mr-2" />
                  퇴실하기
                </Button>
              </>
            ) : (
              <>
                <p className="text-gray-400 mb-6">
                  QR 코드를 스캔하여 입실해주세요
                  <br />
                  적정 이용 시간: 10-15분
                </p>
                <Button
                  variant="energy"
                  size="lg"
                  className="w-full"
                  onClick={handleCheckIn}
                  glow
                  shine
                >
                  <LogIn size={20} className="mr-2" />
                  입실하기
                </Button>
              </>
            )}
          </Card>
        </motion.div>

        {/* 이용 가이드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Clock size={20} className="text-electric-blue" />
              사우나 이용 가이드
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex gap-2">
                <span className="text-electric-blue">•</span>
                <span>적정 이용 시간: 10-15분</span>
              </li>
              <li className="flex gap-2">
                <span className="text-electric-blue">•</span>
                <span>수분 섭취를 충분히 해주세요</span>
              </li>
              <li className="flex gap-2">
                <span className="text-electric-blue">•</span>
                <span>어지러움이 느껴지면 즉시 나와주세요</span>
              </li>
              <li className="flex gap-2">
                <span className="text-electric-blue">•</span>
                <span>운동 직후보다는 10분 후 이용을 권장합니다</span>
              </li>
            </ul>
          </Card>
        </motion.div>

        {/* 주의사항 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card variant="glass">
            <div className="flex gap-3">
              <AlertCircle size={24} className="text-cyber-yellow flex-shrink-0" />
              <div>
                <div className="font-bold text-white mb-1">안전 수칙</div>
                <p className="text-sm text-gray-400">
                  심혈관 질환, 고혈압, 임신 중인 경우 이용을 자제해주세요.
                  <br />
                  과도한 이용은 건강에 해로울 수 있습니다.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* 과도 이용 경고 모달 */}
      <Modal
        isOpen={showWarning}
        onClose={() => setShowWarning(false)}
        title="⚠️ 이용 시간 경고"
      >
        <div className="text-center py-4">
          <p className="text-white mb-4">
            15분 이상 이용하셨습니다.
            <br />
            건강을 위해 퇴실을 권장드립니다.
          </p>
          <Button
            variant="energy"
            size="lg"
            className="w-full"
            onClick={handleCheckOut}
          >
            지금 퇴실하기
          </Button>
          <button
            onClick={() => setShowWarning(false)}
            className="text-gray-400 text-sm mt-3 hover:text-white"
          >
            계속 이용하기
          </button>
        </div>
      </Modal>
    </div>
  );
}✅ PHASE 5 완료 체크리스트:

 QR 스캔 메인 화면
 기구 상세 화면 (영상 탭, 운동 기록)
 스트레칭존 (AI 추천, 카테고리 필터)
 사우나 (입실/퇴실 타이머)
 최근 스캔 이력