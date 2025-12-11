'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
  badge?: number | string;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  activeTab?: string;
  variant?: 'default' | 'pills';
  className?: string;
  onTabChange?: (tabId: string) => void;
  onChange?: (tabId: string) => void;
}

export default function Tabs({
  tabs,
  defaultTabId,
  activeTab,
  variant = 'default',
  className = '',
  onTabChange,
  onChange,
}: TabsProps) {
  const [internalActiveTabId, setInternalActiveTabId] = useState(defaultTabId || tabs[0]?.id);

  const currentActiveTabId = activeTab ?? internalActiveTabId;

  const handleTabChange = (tabId: string) => {
    if (!activeTab) {
      setInternalActiveTabId(tabId);
    }
    onTabChange?.(tabId);
    onChange?.(tabId);
  };

  const currentTab = tabs.find((tab) => tab.id === currentActiveTabId);
  const hasContent = tabs.some((tab) => tab.content !== undefined);

  return (
    <div className={`w-full ${className}`}>
      {/* Tab buttons */}
      <div
        className={
          variant === 'pills'
            ? 'flex flex-wrap gap-2 mb-6'
            : `flex border-b border-white/10 ${hasContent ? 'mb-6' : ''}`
        }
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`relative px-4 py-3 font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
              currentActiveTabId === tab.id
                ? variant === 'pills'
                  ? 'bg-gradient-energy text-white rounded-full'
                  : 'text-electric-blue'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
            {tab.badge !== undefined && (
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  currentActiveTabId === tab.id
                    ? 'bg-white/20'
                    : 'bg-white/10'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Underline indicator for default variant */}
      {variant === 'default' && hasContent && (
        <motion.div
          layoutId="underline"
          className="h-0.5 bg-gradient-to-r from-electric-blue to-neon-green"
          style={{
            width: '32px',
            marginBottom: '-6px',
          }}
        />
      )}

      {/* Content - only render if tabs have content */}
      {hasContent && currentTab?.content && (
        <motion.div
          key={currentActiveTabId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {currentTab.content}
        </motion.div>
      )}
    </div>
  );
}
