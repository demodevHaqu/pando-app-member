'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Dumbbell, Sparkles, Flame, Heart, Clock, ChevronRight, Trash2 } from 'lucide-react';

interface ScanHistoryItem {
  id: string;
  type: 'equipment' | 'stretching' | 'sauna' | 'recovery';
  name: string;
  timestamp: Date;
  data?: string;
}

interface ScanHistoryProps {
  items: ScanHistoryItem[];
  onItemClick?: (item: ScanHistoryItem) => void;
  onItemDelete?: (id: string) => void;
  onClearAll?: () => void;
  maxItems?: number;
  className?: string;
}

const typeConfig = {
  equipment: {
    icon: Dumbbell,
    color: 'text-energy-orange',
    bg: 'bg-energy-orange/10',
    border: 'border-energy-orange/30',
    label: '운동 기구',
  },
  stretching: {
    icon: Sparkles,
    color: 'text-electric-blue',
    bg: 'bg-electric-blue/10',
    border: 'border-electric-blue/30',
    label: '스트레칭존',
  },
  sauna: {
    icon: Flame,
    color: 'text-power-pink',
    bg: 'bg-power-pink/10',
    border: 'border-power-pink/30',
    label: '사우나',
  },
  recovery: {
    icon: Heart,
    color: 'text-neon-green',
    bg: 'bg-neon-green/10',
    border: 'border-neon-green/30',
    label: '리커버리존',
  },
};

export default function ScanHistory({
  items,
  onItemClick,
  onItemDelete,
  onClearAll,
  maxItems = 10,
  className,
}: ScanHistoryProps) {
  const displayItems = items.slice(0, maxItems);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
  };

  if (items.length === 0) {
    return (
      <div className={cn("text-center py-8", className)}>
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
          <Clock size={32} className="text-white/20" />
        </div>
        <p className="text-white/40">스캔 기록이 없습니다</p>
        <p className="text-white/30 text-sm mt-1">QR 코드를 스캔하면 여기에 표시됩니다</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/60">최근 스캔</h3>
        {onClearAll && items.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-white/40 hover:text-power-pink transition-colors"
          >
            전체 삭제
          </button>
        )}
      </div>

      {/* List */}
      <div className="space-y-2">
        <AnimatePresence>
          {displayItems.map((item, index) => {
            const config = typeConfig[item.type];
            const Icon = config.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "group relative flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                  config.bg,
                  config.border,
                  "hover:scale-[1.02]"
                )}
                onClick={() => onItemClick?.(item)}
              >
                {/* Icon */}
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  config.bg
                )}>
                  <Icon size={20} className={config.color} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn("text-xs font-medium", config.color)}>
                      {config.label}
                    </span>
                    <span className="text-xs text-white/30">
                      {formatTime(item.timestamp)}
                    </span>
                  </div>
                  <p className="text-white font-medium truncate">{item.name}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {onItemDelete && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      whileHover={{ scale: 1.1 }}
                      className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-power-pink/20 transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        onItemDelete(item.id);
                      }}
                    >
                      <Trash2 size={14} className="text-power-pink" />
                    </motion.button>
                  )}
                  <ChevronRight size={16} className="text-white/30" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* More indicator */}
      {items.length > maxItems && (
        <p className="text-center text-xs text-white/40">
          +{items.length - maxItems}개 더 보기
        </p>
      )}
    </div>
  );
}

// Compact inline version
interface ScanHistoryInlineProps {
  items: ScanHistoryItem[];
  onItemClick?: (item: ScanHistoryItem) => void;
  className?: string;
}

export function ScanHistoryInline({
  items,
  onItemClick,
  className,
}: ScanHistoryInlineProps) {
  const recentItems = items.slice(0, 5);

  if (recentItems.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex gap-2 overflow-x-auto hide-scrollbar pb-2", className)}>
      {recentItems.map((item) => {
        const config = typeConfig[item.type];
        const Icon = config.icon;

        return (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onItemClick?.(item)}
            className={cn(
              "flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg border",
              config.bg,
              config.border
            )}
          >
            <Icon size={14} className={config.color} />
            <span className="text-sm text-white truncate max-w-[100px]">
              {item.name}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
