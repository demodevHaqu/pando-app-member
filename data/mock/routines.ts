import { Routine } from '@/types/routine';
import { MOCK_EXERCISES } from './exercises';

export const MOCK_ROUTINES: Routine[] = [
  {
    id: 'routine1',
    name: '오늘의 AI 루틴',
    description: 'AI가 회원님의 목표와 컨디션을 분석하여 추천하는 루틴입니다',
    duration: 45,
    exercises: MOCK_EXERCISES,
    difficulty: 3,
    calories: 380,
    type: 'ai-generated',
    createdAt: '2025-01-15',
  },
  {
    id: 'today',
    name: '오늘의 AI 루틴',
    description: 'AI가 회원님의 목표와 컨디션을 분석하여 추천하는 루틴입니다',
    duration: 45,
    exercises: MOCK_EXERCISES,
    difficulty: 3,
    calories: 380,
    type: 'ai-generated',
    createdAt: '2025-01-15',
  },
];