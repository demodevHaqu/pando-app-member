'use client';

import React from 'react';
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { cn } from '@/lib/utils';

interface DataPoint {
  subject: string;
  value: number;
  fullMark?: number;
  [key: string]: string | number | undefined;
}

interface RadarChartProps {
  data: DataPoint[];
  dataKey?: string;
  color?: 'blue' | 'green' | 'orange' | 'pink' | 'purple';
  showDots?: boolean;
  fillOpacity?: number;
  height?: number;
  className?: string;
}

const colorConfig = {
  blue: { stroke: '#00D9FF', fill: '#00D9FF' },
  green: { stroke: '#39FF14', fill: '#39FF14' },
  orange: { stroke: '#FF6B35', fill: '#FF6B35' },
  pink: { stroke: '#FF006E', fill: '#FF006E' },
  purple: { stroke: '#7209B7', fill: '#7209B7' },
};

export default function RadarChart({
  data,
  dataKey = 'value',
  color = 'blue',
  showDots = true,
  fillOpacity = 0.3,
  height = 300,
  className,
}: RadarChartProps) {
  const colors = colorConfig[color];

  const CustomTooltip = ({ active, payload }: {
    active?: boolean;
    payload?: Array<{ payload: DataPoint }>;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-cyber-mid border border-white/10 rounded-lg px-3 py-2 shadow-xl">
          <p className="text-white font-bold">{data.subject}</p>
          <p style={{ color: colors.stroke }}>{data.value} / {data.fullMark || 100}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid
            stroke="rgba(255, 255, 255, 0.1)"
            gridType="polygon"
          />
          <PolarAngleAxis
            dataKey="subject"
            tick={{
              fill: 'rgba(255, 255, 255, 0.7)',
              fontSize: 12,
            }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 'auto']}
            tick={{
              fill: 'rgba(255, 255, 255, 0.4)',
              fontSize: 10,
            }}
            axisLine={false}
          />

          <Tooltip content={<CustomTooltip />} />

          <Radar
            name="Score"
            dataKey={dataKey}
            stroke={colors.stroke}
            strokeWidth={2}
            fill={colors.fill}
            fillOpacity={fillOpacity}
            dot={showDots ? {
              fill: colors.stroke,
              stroke: '#0D0D12',
              strokeWidth: 2,
              r: 4,
            } : false}
            activeDot={{
              fill: colors.stroke,
              stroke: '#0D0D12',
              strokeWidth: 2,
              r: 6,
              style: { filter: `drop-shadow(0 0 8px ${colors.stroke})` }
            }}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Comparison Radar Chart
interface ComparisonRadarChartProps {
  data: DataPoint[];
  radars: Array<{
    dataKey: string;
    color: 'blue' | 'green' | 'orange' | 'pink' | 'purple';
    name?: string;
  }>;
  showLegend?: boolean;
  height?: number;
  className?: string;
}

export function ComparisonRadarChart({
  data,
  radars,
  showLegend = true,
  height = 300,
  className,
}: ComparisonRadarChartProps) {
  const CustomTooltip = ({ active, payload }: {
    active?: boolean;
    payload?: Array<{ payload: DataPoint; dataKey: string; value: number; color: string; name: string }>;
  }) => {
    if (active && payload && payload.length) {
      const subject = payload[0].payload.subject;
      return (
        <div className="bg-cyber-mid border border-white/10 rounded-lg px-3 py-2 shadow-xl">
          <p className="text-white/60 text-xs mb-1">{subject}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn("w-full", className)}>
      {showLegend && (
        <div className="flex gap-4 mb-2 justify-center">
          {radars.map((radar) => (
            <div key={radar.dataKey} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colorConfig[radar.color].stroke }}
              />
              <span className="text-xs text-white/60">{radar.name || radar.dataKey}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid
              stroke="rgba(255, 255, 255, 0.1)"
              gridType="polygon"
            />
            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fill: 'rgba(255, 255, 255, 0.7)',
                fontSize: 12,
              }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 'auto']}
              tick={{
                fill: 'rgba(255, 255, 255, 0.4)',
                fontSize: 10,
              }}
              axisLine={false}
            />

            <Tooltip content={<CustomTooltip />} />

            {radars.map((radar, index) => {
              const colors = colorConfig[radar.color];
              return (
                <Radar
                  key={radar.dataKey}
                  name={radar.name || radar.dataKey}
                  dataKey={radar.dataKey}
                  stroke={colors.stroke}
                  strokeWidth={2}
                  fill={colors.fill}
                  fillOpacity={0.2 - index * 0.05}
                  dot={{
                    fill: colors.stroke,
                    stroke: '#0D0D12',
                    strokeWidth: 2,
                    r: 3,
                  }}
                />
              );
            })}
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Fitness Score Radar (preset for fitness metrics)
interface FitnessRadarProps {
  scores: {
    strength?: number;
    endurance?: number;
    flexibility?: number;
    balance?: number;
    power?: number;
    agility?: number;
  };
  maxScore?: number;
  color?: 'blue' | 'green' | 'orange' | 'pink' | 'purple';
  height?: number;
  className?: string;
}

export function FitnessRadar({
  scores,
  maxScore = 100,
  color = 'blue',
  height = 300,
  className,
}: FitnessRadarProps) {
  const data: DataPoint[] = [
    { subject: '근력', value: scores.strength || 0, fullMark: maxScore },
    { subject: '지구력', value: scores.endurance || 0, fullMark: maxScore },
    { subject: '유연성', value: scores.flexibility || 0, fullMark: maxScore },
    { subject: '균형', value: scores.balance || 0, fullMark: maxScore },
    { subject: '파워', value: scores.power || 0, fullMark: maxScore },
    { subject: '민첩성', value: scores.agility || 0, fullMark: maxScore },
  ];

  return (
    <RadarChart
      data={data}
      color={color}
      height={height}
      className={className}
    />
  );
}
