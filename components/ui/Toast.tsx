'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotificationStore } from '@/store/notificationStore';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

// Color definitions
const COLORS = {
  neonGreen: '#39FF14',
  powerPink: '#FF006E',
  cyberYellow: '#FFD60A',
  electricBlue: '#00D9FF',
  cyberMid: '#1A1A24',
};

export default function Toast() {
  const { notifications, removeNotification } = useNotificationStore();

  const getIconColor = (type: string) => {
    switch (type) {
      case 'success':
        return COLORS.neonGreen;
      case 'error':
        return COLORS.powerPink;
      case 'warning':
        return COLORS.cyberYellow;
      case 'info':
        return COLORS.electricBlue;
      default:
        return '#FFFFFF';
    }
  };

  const getBackgroundStyle = (type: string): React.CSSProperties => {
    switch (type) {
      case 'success':
        return {
          background: 'rgba(57, 255, 20, 0.1)',
          borderColor: 'rgba(57, 255, 20, 0.5)',
        };
      case 'error':
        return {
          background: 'rgba(255, 0, 110, 0.1)',
          borderColor: 'rgba(255, 0, 110, 0.5)',
        };
      case 'warning':
        return {
          background: 'rgba(255, 214, 10, 0.1)',
          borderColor: 'rgba(255, 214, 10, 0.5)',
        };
      case 'info':
        return {
          background: 'rgba(0, 217, 255, 0.1)',
          borderColor: 'rgba(0, 217, 255, 0.5)',
        };
      default:
        return {
          background: COLORS.cyberMid,
          borderColor: 'rgba(255, 255, 255, 0.1)',
        };
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '80px',
        right: '16px',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        maxWidth: '320px',
      }}
    >
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            style={{
              padding: '16px',
              borderRadius: '12px',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
              ...getBackgroundStyle(notification.type),
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
              }}
            >
              {notification.type === 'success' && (
                <CheckCircle size={20} color={getIconColor(notification.type)} />
              )}
              {notification.type === 'error' && (
                <AlertCircle size={20} color={getIconColor(notification.type)} />
              )}
              {notification.type === 'warning' && (
                <AlertCircle size={20} color={getIconColor(notification.type)} />
              )}
              {notification.type === 'info' && (
                <Info size={20} color={getIconColor(notification.type)} />
              )}
              {!['success', 'error', 'warning', 'info'].includes(notification.type) && (
                <Info size={20} color={getIconColor(notification.type)} />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 'bold',
                    color: 'white',
                    marginBottom: '4px',
                    fontSize: '14px',
                  }}
                >
                  {notification.title}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    color: '#D1D5DB',
                    lineHeight: 1.4,
                  }}
                >
                  {notification.message}
                </div>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9CA3AF',
                  cursor: 'pointer',
                  padding: '4px',
                  flexShrink: 0,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
