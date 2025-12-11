'use client';

import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { cn } from '@/lib/utils';

interface DataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface BarChartProps {
  data: DataPoint[];
  dataKey?: string;
  xAxisKey?: string;
  color?: 'blue' | 'green' | 'orange' | 'pink' | 'purple' | 'gradient';
  showGrid?: boolean;
  showLabel?: boolean;
  horizontal?: boolean;
  height?: number;
  barRadius?: number;
  className?: string;
}

const colorConfig = {
  blue: ['#00D9FF'],
  green: ['#39FF14'],
  orange: ['#FF6B35'],
  pink: ['#FF006E'],
  purple: ['#7209B7'],
  gradient: ['#FF6B35', '#FF006E', '#7209B7', '#00D9FF', '#39FF14'],
};

export default function BarChart({
  data,
  dataKey = 'value',
  xAxisKey = 'name',
  color = 'blue',
  showGrid = false,
  showLabel = false,
  horizontal = false,
  height = 200,
  barRadius = 8,
  className,
}: BarChartProps) {
  const colors = colorConfig[color];
  const isGradient = color === 'gradient';

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-cyber-mid border border-white/10 rounded-lg px-3 py-2 shadow-xl">
          <p className="text-white/60 text-xs">{label}</p>
          <p className="text-white font-bold" style={{ color: colors[0] }}>
            {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderCustomBarLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
      <text
        x={horizontal ? x + width + 5 : x + width / 2}
        y={horizontal ? y + 12 : y - 10}
        fill="rgba(255, 255, 255, 0.8)"
        textAnchor={horizontal ? "start" : "middle"}
        fontSize={12}
        fontWeight="bold"
      >
        {value}
      </text>
    );
  };

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          layout={horizontal ? 'vertical' : 'horizontal'}
          margin={{ top: showLabel ? 20 : 10, right: 10, left: 10, bottom: 10 }}
        >
          <defs>
            {data.map((_, index) => (
              <linearGradient
                key={`bar-gradient-${index}`}
                id={`bar-gradient-${index}`}
                x1="0"
                y1="0"
                x2={horizontal ? "1" : "0"}
                y2={horizontal ? "0" : "1"}
              >
                <stop
                  offset="0%"
                  stopColor={isGradient ? colors[index % colors.length] : colors[0]}
                  stopOpacity={1}
                />
                <stop
                  offset="100%"
                  stopColor={isGradient ? colors[(index + 1) % colors.length] : colors[0]}
                  stopOpacity={0.7}
                />
              </linearGradient>
            ))}
          </defs>

          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255, 255, 255, 0.1)"
              horizontal={!horizontal}
              vertical={horizontal}
            />
          )}

          {horizontal ? (
            <>
              <XAxis
                type="number"
                stroke="rgba(255, 255, 255, 0.3)"
                tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey={xAxisKey}
                stroke="rgba(255, 255, 255, 0.3)"
                tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                tickLine={false}
                width={80}
              />
            </>
          ) : (
            <>
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
            </>
          )}

          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />

          <Bar
            dataKey={dataKey}
            radius={[barRadius, barRadius, barRadius, barRadius]}
            label={showLabel ? renderCustomBarLabel : undefined}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#bar-gradient-${index})`}
                style={{
                  filter: `drop-shadow(0 0 8px ${isGradient ? colors[index % colors.length] : colors[0]}40)`,
                }}
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Stacked Bar Chart
interface StackedBarChartProps {
  data: DataPoint[];
  bars: Array<{
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

export function StackedBarChart({
  data,
  bars,
  xAxisKey = 'name',
  showGrid = false,
  showLegend = true,
  height = 200,
  className,
}: StackedBarChartProps) {
  const simpleColorConfig = {
    blue: '#00D9FF',
    green: '#39FF14',
    orange: '#FF6B35',
    pink: '#FF006E',
    purple: '#7209B7',
  };

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ value: number; dataKey: string; fill: string; name: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-cyber-mid border border-white/10 rounded-lg px-3 py-2 shadow-xl">
          <p className="text-white/60 text-xs mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-white text-sm">
              <span style={{ color: entry.fill }}>{entry.name || entry.dataKey}:</span> {entry.value}
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
        <div className="flex gap-4 mb-2 justify-center flex-wrap">
          {bars.map((bar) => (
            <div key={bar.dataKey} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded"
                style={{ backgroundColor: simpleColorConfig[bar.color] }}
              />
              <span className="text-xs text-white/60">{bar.name || bar.dataKey}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data}>
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

            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />

            {bars.map((bar, index) => (
              <Bar
                key={bar.dataKey}
                dataKey={bar.dataKey}
                name={bar.name || bar.dataKey}
                stackId="stack"
                fill={simpleColorConfig[bar.color]}
                radius={index === bars.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Progress Bar Chart (for comparing current vs goal)
interface ProgressBarChartProps {
  data: Array<{
    name: string;
    current: number;
    goal: number;
  }>;
  height?: number;
  className?: string;
}

export function ProgressBarChart({
  data,
  height = 200,
  className,
}: ProgressBarChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    remaining: Math.max(0, item.goal - item.current),
    percentage: Math.round((item.current / item.goal) * 100),
  }));

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={chartData} layout="vertical">
          <XAxis
            type="number"
            stroke="rgba(255, 255, 255, 0.3)"
            tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke="rgba(255, 255, 255, 0.3)"
            tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
            tickLine={false}
            width={80}
          />

          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-cyber-mid border border-white/10 rounded-lg px-3 py-2 shadow-xl">
                    <p className="text-white font-bold">{data.name}</p>
                    <p className="text-electric-blue text-sm">현재: {data.current}</p>
                    <p className="text-white/60 text-sm">목표: {data.goal}</p>
                    <p className="text-neon-green text-sm">달성률: {data.percentage}%</p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Bar dataKey="current" stackId="progress" fill="#00D9FF" radius={[0, 0, 0, 0]} />
          <Bar dataKey="remaining" stackId="progress" fill="rgba(255, 255, 255, 0.1)" radius={[0, 4, 4, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
