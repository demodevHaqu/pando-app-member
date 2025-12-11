'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Star,
  Users,
  Award,
  Calendar,
  Clock,
  Heart,
  ChevronRight,
  Instagram,
  Youtube,
  MessageCircle
} from 'lucide-react';
import Button from '@/components/ui/Button';

interface Instructor {
  id: string;
  name: string;
  profileImageUrl?: string;
  title: string;
  specialties: string[];
  rating: number;
  totalReviews: number;
  totalClasses: number;
  experience: number; // years
  bio?: string;
  certifications?: string[];
  socials?: {
    instagram?: string;
    youtube?: string;
  };
  isFavorite?: boolean;
}

interface InstructorProfileProps {
  instructor: Instructor;
  onFollow?: () => void;
  onMessage?: () => void;
  onViewSchedule?: () => void;
  className?: string;
}

export default function InstructorProfile({
  instructor,
  onFollow,
  onMessage,
  onViewSchedule,
  className,
}: InstructorProfileProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Profile Header */}
      <div className="relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 h-32 bg-gradient-to-b from-electric-blue/20 to-transparent rounded-t-xl" />

        <div className="relative pt-16 px-4 pb-4">
          {/* Profile Image */}
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="w-full h-full rounded-full border-4 border-cyber-mid overflow-hidden bg-white/10">
              {instructor.profileImageUrl ? (
                <img
                  src={instructor.profileImageUrl}
                  alt={instructor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl text-white/40">
                  {instructor.name[0]}
                </div>
              )}
            </div>
            {/* Rating Badge */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyber-yellow text-cyber-dark text-xs font-bold">
              <Star size={12} fill="currentColor" />
              {instructor.rating.toFixed(1)}
            </div>
          </div>

          {/* Name & Title */}
          <div className="text-center">
            <h2 className="text-xl font-bold text-white">{instructor.name}</h2>
            <p className="text-electric-blue">{instructor.title}</p>
          </div>

          {/* Specialties */}
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {instructor.specialties.map((specialty, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatItem
          icon={<Users size={18} />}
          value={instructor.totalClasses.toLocaleString()}
          label="진행 클래스"
        />
        <StatItem
          icon={<Star size={18} />}
          value={instructor.totalReviews.toLocaleString()}
          label="리뷰"
        />
        <StatItem
          icon={<Award size={18} />}
          value={`${instructor.experience}년`}
          label="경력"
        />
      </div>

      {/* Bio */}
      {instructor.bio && (
        <div className="p-4 rounded-xl bg-cyber-mid border border-white/10">
          <h3 className="font-semibold text-white mb-2">소개</h3>
          <p className="text-white/70 text-sm leading-relaxed">{instructor.bio}</p>
        </div>
      )}

      {/* Certifications */}
      {instructor.certifications && instructor.certifications.length > 0 && (
        <div className="p-4 rounded-xl bg-cyber-mid border border-white/10">
          <h3 className="font-semibold text-white mb-3">자격증</h3>
          <div className="space-y-2">
            {instructor.certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-white/70"
              >
                <Award size={14} className="text-cyber-yellow flex-shrink-0" />
                {cert}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Social Links */}
      {instructor.socials && (
        <div className="flex justify-center gap-3">
          {instructor.socials.instagram && (
            <motion.a
              href={instructor.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
            >
              <Instagram size={20} className="text-white" />
            </motion.a>
          )}
          {instructor.socials.youtube && (
            <motion.a
              href={instructor.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center"
            >
              <Youtube size={20} className="text-white" />
            </motion.a>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          variant={instructor.isFavorite ? "outline" : "ghost"}
          className="flex-1"
          onClick={onFollow}
        >
          <Heart
            size={18}
            className={instructor.isFavorite ? "fill-power-pink text-power-pink" : ""}
          />
          {instructor.isFavorite ? '팔로잉' : '팔로우'}
        </Button>
        <Button variant="ghost" className="flex-1" onClick={onMessage}>
          <MessageCircle size={18} />
          메시지
        </Button>
      </div>

      {/* Schedule Button */}
      <Button
        variant="energy"
        className="w-full"
        onClick={onViewSchedule}
        shine
      >
        <Calendar size={18} />
        클래스 스케줄 보기
      </Button>
    </div>
  );
}

// Stat Item Component
function StatItem({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="p-3 rounded-xl bg-cyber-mid border border-white/10 text-center">
      <div className="flex justify-center text-electric-blue mb-1">{icon}</div>
      <div className="font-bold text-white">{value}</div>
      <div className="text-xs text-white/50">{label}</div>
    </div>
  );
}

// Compact Instructor Card
interface InstructorCardProps {
  instructor: Instructor;
  onClick?: () => void;
  className?: string;
}

export function InstructorCard({
  instructor,
  onClick,
  className,
}: InstructorCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-xl bg-cyber-mid border border-white/10 text-left",
        className
      )}
    >
      {/* Avatar */}
      <div className="relative">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-white/10">
          {instructor.profileImageUrl ? (
            <img
              src={instructor.profileImageUrl}
              alt={instructor.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl text-white/40">
              {instructor.name[0]}
            </div>
          )}
        </div>
        <div className="absolute -bottom-1 -right-1 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-cyber-yellow text-cyber-dark text-xs font-bold">
          <Star size={10} fill="currentColor" />
          {instructor.rating.toFixed(1)}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white">{instructor.name}</span>
          {instructor.isFavorite && (
            <Heart size={14} className="text-power-pink fill-power-pink" />
          )}
        </div>
        <p className="text-sm text-electric-blue">{instructor.title}</p>
        <div className="flex items-center gap-2 mt-1 text-xs text-white/50">
          <span>{instructor.specialties.slice(0, 2).join(', ')}</span>
        </div>
      </div>

      <ChevronRight size={20} className="text-white/30" />
    </motion.button>
  );
}

// Mini Avatar for Lists
interface InstructorAvatarProps {
  instructor: Pick<Instructor, 'name' | 'profileImageUrl'>;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  onClick?: () => void;
  className?: string;
}

export function InstructorAvatar({
  instructor,
  size = 'md',
  showName = false,
  onClick,
  className,
}: InstructorAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const Component = onClick ? motion.button : 'div';

  return (
    <Component
      onClick={onClick}
      whileHover={onClick ? { scale: 1.1 } : undefined}
      className={cn(
        "flex flex-col items-center gap-1",
        onClick && "cursor-pointer",
        className
      )}
    >
      <div className={cn(
        "rounded-full overflow-hidden bg-white/10",
        sizeClasses[size]
      )}>
        {instructor.profileImageUrl ? (
          <img
            src={instructor.profileImageUrl}
            alt={instructor.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/40">
            {instructor.name[0]}
          </div>
        )}
      </div>
      {showName && (
        <span className="text-xs text-white/60 truncate max-w-[60px]">
          {instructor.name}
        </span>
      )}
    </Component>
  );
}
