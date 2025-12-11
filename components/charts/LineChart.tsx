'use client';

import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { cn } from '@/lib/utils';

interface DataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface LineChartProps {
  data: DataPoint[];
  dataKey?: string;
  xAxisKey?: string;
  color?: 'blue' | 'green' | 'orange' | 'pink' | 'purple';
  showGrid?: boolean;
  showArea?: boolean;
  showDots?: boolean;
  height?: number;
  className?: string;
  gradientFill?: boolean;
}

const colorConfig = {
  blue: { stroke: '#00D9FF', fill: 'url(#gradient-blue)' },
  green: { stroke: '#39FF14', fill: 'url(#gradient-green)' },
  orange: { stroke: '#FF6B35', fill: 'url(#gradient-orange)' },
  pink: { stroke: '#FF006E', fill: 'url(#gradient-pink)' },
  purple: { stroke: '#7209B7', fill: 'url(#gradient-purple)' },
};

export default function LineChart({
  data,
  dataKey = 'value',
  xAxisKey = 'name',
  color = 'blue',
  showGrid = false,
  showArea = true,
  showDots = true,
  height = 200,
  className,
  gradientFill = true,
}: LineChartProps) {
  const colors = colorConfig[color];

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-cyber-mid border border-white/10 rounded-lg px-3 py-2 shadow-xl">
          <p className="text-white/60 text-xs">{label}</p>
          <p className="text-white font-bold" style={{ color: colors.stroke }}>
            {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  const ChartComponent = showArea ? AreaChart : RechartsLineChart;

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent data={data}>
          <defs>
            <linearGradient id="gradient-blue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#00D9FF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradient-green" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#39FF14" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#39FF14" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradient-orange" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF6B35" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#FF6B35" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradient-pink" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF006E" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#FF006E" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradient-purple" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7209B7" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#7209B7" stopOpacity={0} />
            </linearGradient>
          </defs>

          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255, 255, 255, 0.1)"
              vertical={false}
            />
          )}

          <XAxis
            dataKey={xAxisKey}
            stroke="rgba(255, 255, 255, 0.3)"
            tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
            tickLine={false}
          />

          <YAxis
            stroke="rgba(255, 255, 255, 0.3)"
            tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
            tickLine={false}
          />

          <Tooltip content={<CustomTooltip />} />

          {showArea ? (
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={colors.stroke}
              strokeWidth={2}
              fill={gradientFill ? colors.fill : 'transparent'}
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
          ) : (
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={colors.stroke}
              strokeWidth={2}
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
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
}

// Multi-line chart
interface MultiLineChartProps {
  data: DataPoint[];
  lines: Array<{
    dataKey: string;
    color: 'blue' | 'green' | 'orange' | 'pink' | 'purple';
    name?: string;
  }>;
  xAxisKey?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  height?: number;
  className?: string;
}

export function MultiLineChart({
  data,
  lines,
  xAxisKey = 'name',
  showGrid = false,
  showLegend = true,
  height = 200,
  className,
}: MultiLineChartProps) {
  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ value: number; dataKey: string; color: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-cyber-mid border border-white/10 rounded-lg px-3 py-2 shadow-xl">
          <p className="text-white/60 text-xs mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-white text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value}
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
          {lines.map((line) => (
            <div key={line.dataKey} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colorConfig[line.color].stroke }}
              />
              <span className="text-xs text-white/60">{line.name || line.dataKey}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data}>
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.1)"
                vertical={false}
              />
            )}

            <XAxis
              dataKey={xAxisKey}
              stroke="rgba(255, 255, 255, 0.3)"
              tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
              tickLine={false}
            />

            <YAxis
              stroke="rgba(255, 255, 255, 0.3)"
              tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
              tickLine={false}
            />

            <Tooltip content={<CustomTooltip />} />

            {lines.map((line) => (
              <Line
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                stroke={colorConfig[line.color].stroke}
                strokeWidth={2}
                dot={{
                  fill: colorConfig[line.color].stroke,
                  stroke: '#0D0D12',
                  strokeWidth: 2,
                  r: 3,
                }}
                activeDot={{
                  fill: colorConfig[line.color].stroke,
                  stroke: '#0D0D12',
                  strokeWidth: 2,
                  r: 5,
                }}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
