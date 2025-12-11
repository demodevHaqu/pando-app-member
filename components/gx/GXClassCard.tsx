'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Clock,
  Users,
  Flame,
  Zap,
  Heart,
  Music,
  Dumbbell,
  ChevronRight,
  Star,
  MapPin,
  Calendar
} from 'lucide-react';
import Button from '@/components/ui/Button';

interface GXClass {
  id: string;
  name: string;
  instructor: string;
  instructorImageUrl?: string;
  category: 'cardio' | 'strength' | 'yoga' | 'dance' | 'cycling' | 'pilates';
  startTime: string;
  endTime: string;
  duration: number; // minutes
  room: string;
  currentParticipants: number;
  maxParticipants: number;
  difficulty: 1 | 2 | 3;
  calories?: number;
  isBooked?: boolean;
  isFavorite?: boolean;
}

interface GXClassCardProps {
  gxClass: GXClass;
  onBook?: () => void;
  onCancel?: () => void;
  onFavorite?: () => void;
  onClick?: () => void;
  className?: string;
}

const categoryConfig = {
  cardio: {
    icon: Flame,
    color: 'text-energy-orange',
    bg: 'bg-energy-orange/10',
    border: 'border-energy-orange/30',
    label: '카디오',
  },
  strength: {
    icon: Dumbbell,
    color: 'text-electric-blue',
    bg: 'bg-electric-blue/10',
    border: 'border-electric-blue/30',
    label: '근력',
  },
  yoga: {
    icon: Heart,
    color: 'text-neon-green',
    bg: 'bg-neon-green/10',
    border: 'border-neon-green/30',
    label: '요가',
  },
  dance: {
    icon: Music,
    color: 'text-power-pink',
    bg: 'bg-power-pink/10',
    border: 'border-power-pink/30',
    label: '댄스',
  },
  cycling: {
    icon: Zap,
    color: 'text-cyber-yellow',
    bg: 'bg-cyber-yellow/10',
    border: 'border-cyber-yellow/30',
    label: '사이클링',
  },
  pilates: {
    icon: Zap,
    color: 'text-tech-purple',
    bg: 'bg-tech-purple/10',
    border: 'border-tech-purple/30',
    label: '필라테스',
  },
};

const difficultyConfig = {
  1: { label: '초급', color: 'text-neon-green' },
  2: { label: '중급', color: 'text-cyber-yellow' },
  3: { label: '고급', color: 'text-power-pink' },
};

export default function GXClassCard({
  gxClass,
  onBook,
  onCancel,
  onFavorite,
  onClick,
  className,
}: GXClassCardProps) {
  const config = categoryConfig[gxClass.category];
  const Icon = config.icon;
  const diffConfig = difficultyConfig[gxClass.difficulty];
  const isFull = gxClass.currentParticipants >= gxClass.maxParticipants;
  const spotsLeft = gxClass.maxParticipants - gxClass.currentParticipants;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative p-4 rounded-xl border bg-cyber-mid cursor-pointer overflow-hidden",
        config.border,
        className
      )}
    >
      {/* Background Gradient */}
      <div className={cn(
        "absolute inset-0 opacity-5",
        config.bg
      )} />

      {/* Content */}
      <div className="relative space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center",
              config.bg
            )}>
              <Icon size={24} className={config.color} />
            </div>
            <div>
              <h3 className="font-bold text-white">{gxClass.name}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={cn("text-xs font-medium", config.color)}>
                  {config.label}
                </span>
                <span className="text-white/30">•</span>
                <span className={cn("text-xs", diffConfig.color)}>
                  {diffConfig.label}
                </span>
              </div>
            </div>
          </div>

          {/* Favorite Button */}
          {onFavorite && (
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onFavorite();
              }}
              className="p-2"
            >
              <Star
                size={20}
                className={cn(
                  gxClass.isFavorite ? "text-cyber-yellow fill-cyber-yellow" : "text-white/30"
                )}
              />
            </motion.button>
          )}
        </div>

        {/* Time & Location */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-white/70">
            <Clock size={14} />
            <span>{gxClass.startTime} - {gxClass.endTime}</span>
            <span className="text-white/40">({gxClass.duration}분)</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/70">
            <MapPin size={14} />
            <span>{gxClass.room}</span>
          </div>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden">
            {gxClass.instructorImageUrl ? (
              <img
                src={gxClass.instructorImageUrl}
                alt={gxClass.instructor}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/40 text-sm">
                {gxClass.instructor[0]}
              </div>
            )}
          </div>
          <span className="text-white/80">{gxClass.instructor} 강사</span>
        </div>

        {/* Participants & Calories */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-white/50" />
              <span className={cn(
                "text-sm",
                isFull ? "text-power-pink" : "text-white/70"
              )}>
                {gxClass.currentParticipants}/{gxClass.maxParticipants}
              </span>
              {!isFull && spotsLeft <= 3 && (
                <span className="text-xs text-power-pink">({spotsLeft}자리 남음)</span>
              )}
            </div>
            {gxClass.calories && (
              <div className="flex items-center gap-1.5">
                <Flame size={14} className="text-energy-orange" />
                <span className="text-sm text-white/70">{gxClass.calories}kcal</span>
              </div>
            )}
          </div>

          {/* Action Button */}
          {gxClass.isBooked ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onCancel?.();
              }}
            >
              예약 취소
            </Button>
          ) : (
            <Button
              variant="energy"
              size="sm"
              disabled={isFull}
              onClick={(e) => {
                e.stopPropagation();
                onBook?.();
              }}
            >
              {isFull ? '마감' : '예약'}
            </Button>
          )}
        </div>
      </div>

      {/* Booked Badge */}
      {gxClass.isBooked && (
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 rounded-full bg-neon-green/20 text-neon-green text-xs font-medium">
            예약완료
          </span>
        </div>
      )}
    </motion.div>
  );
}

// Compact version for lists
interface GXClassCardCompactProps {
  gxClass: GXClass;
  onClick?: () => void;
  className?: string;
}

export function GXClassCardCompact({
  gxClass,
  onClick,
  className,
}: GXClassCardCompactProps) {
  const config = categoryConfig[gxClass.category];
  const Icon = config.icon;
  const isFull = gxClass.currentParticipants >= gxClass.maxParticipants;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-xl border bg-cyber-mid text-left",
        config.border,
        className
      )}
    >
      <div className={cn(
        "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
        config.bg
      )}>
        <Icon size={20} className={config.color} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-white truncate">{gxClass.name}</span>
          {gxClass.isBooked && (
            <span className="text-xs text-neon-green">예약됨</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-white/50">
          <span>{gxClass.startTime}</span>
          <span>•</span>
          <span>{gxClass.instructor}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className={cn(
          "text-xs",
          isFull ? "text-power-pink" : "text-white/50"
        )}>
          {gxClass.currentParticipants}/{gxClass.maxParticipants}
        </span>
        <ChevronRight size={16} className="text-white/30" />
      </div>
    </motion.button>
  );
}

// Schedule Timeline Card
interface GXScheduleCardProps {
  date: Date;
  classes: GXClass[];
  onClassClick?: (gxClass: GXClass) => void;
  className?: string;
}

export function GXScheduleCard({
  date,
  classes,
  onClassClick,
  className,
}: GXScheduleCardProps) {
  const formatDate = (d: Date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return {
      day: d.getDate(),
      weekday: days[d.getDay()],
      month: d.getMonth() + 1,
    };
  };

  const dateInfo = formatDate(date);
  const isToday = new Date().toDateString() === date.toDateString();

  return (
    <div className={cn("space-y-3", className)}>
      {/* Date Header */}
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-12 h-12 rounded-xl flex flex-col items-center justify-center",
          isToday ? "bg-electric-blue text-white" : "bg-white/5 text-white/60"
        )}>
          <span className="text-lg font-bold">{dateInfo.day}</span>
          <span className="text-xs">{dateInfo.weekday}</span>
        </div>
        <div>
          <p className="text-white font-medium">
            {dateInfo.month}월 {dateInfo.day}일 {dateInfo.weekday}요일
          </p>
          <p className="text-sm text-white/50">{classes.length}개 클래스</p>
        </div>
      </div>

      {/* Classes */}
      <div className="space-y-2 pl-6 border-l border-white/10">
        {classes.map((gxClass) => (
          <GXClassCardCompact
            key={gxClass.id}
            gxClass={gxClass}
            onClick={() => onClassClick?.(gxClass)}
          />
        ))}
      </div>
    </div>
  );
}
