import { Trainer, PTPackage } from '@/types/pt';

export const MOCK_TRAINERS: Trainer[] = [
  {
    id: 'trainer1',
    name: '강동원',
    profileImage: 'https://i.pravatar.cc/150?img=11',
    gender: 'male',
    specialty: ['체중 감량', '다이어트', '체형 교정'],
    experience: 10,
    rating: 4.9,
    reviewCount: 127,
    bio: '10년 경력의 다이어트 전문 트레이너입니다.',
    certifications: ['NSCA-CPT', 'ACSM-CPT'],
    matchScore: 95,
  },
  {
    id: 'trainer2',
    name: '이효리',
    profileImage: 'https://i.pravatar.cc/150?img=8',
    gender: 'female',
    specialty: ['근비대', '파워리프팅'],
    experience: 7,
    rating: 4.8,
    reviewCount: 89,
    bio: '파워리프팅 대회 입상 경력.',
    certifications: ['NSCA-CSCS'],
    matchScore: 88,
  },
];

export const MOCK_PT_PACKAGES: PTPackage[] = [
  {
    id: 'pkg1',
    name: 'AI 추천 플랜',
    sessions: 16,
    price: 1200000,
    duration: 60,
    type: 'recommended',
    benefits: ['주 2-3회 트레이닝', '식단 관리 포함', 'InBody 측정 무제한'],
  },
  {
    id: 'pkg2',
    name: '균형형',
    sessions: 8,
    price: 640000,
    duration: 30,
    type: 'balanced',
    benefits: ['주 1-2회 트레이닝', '기본 식단 가이드'],
  },
];