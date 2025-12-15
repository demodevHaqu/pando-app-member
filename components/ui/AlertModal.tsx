'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { create } from 'zustand';

// Alert types
type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertState {
  isOpen: boolean;
  title: string;
  message: string;
  type: AlertType;
  onConfirm?: () => void;
  showAlert: (options: {
    title?: string;
    message: string;
    type?: AlertType;
    onConfirm?: () => void;
  }) => void;
  hideAlert: () => void;
}

// Zustand store for global alert state
export const useAlertStore = create<AlertState>((set) => ({
  isOpen: false,
  title: '',
  message: '',
  type: 'info',
  onConfirm: undefined,
  showAlert: ({ title = '', message, type = 'info', onConfirm }) =>
    set({ isOpen: true, title, message, type, onConfirm }),
  hideAlert: () => set({ isOpen: false, title: '', message: '', onConfirm: undefined }),
}));

// Helper function to show alert (can be used anywhere)
export const showAlert = (
  message: string,
  options?: { title?: string; type?: AlertType; onConfirm?: () => void }
) => {
  useAlertStore.getState().showAlert({
    message,
    title: options?.title || '',
    type: options?.type || 'info',
    onConfirm: options?.onConfirm,
  });
};

// Alert Modal Component
export default function AlertModal() {
  const { isOpen, title, message, type, onConfirm, hideAlert } = useAlertStore();

  const handleConfirm = useCallback(() => {
    onConfirm?.();
    hideAlert();
  }, [onConfirm, hideAlert]);

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        hideAlert();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hideAlert]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={32} color="#39FF14" />;
      case 'error':
        return <AlertCircle size={32} color="#FF006E" />;
      case 'warning':
        return <AlertTriangle size={32} color="#FFD60A" />;
      case 'info':
      default:
        return <Info size={32} color="#00D9FF" />;
    }
  };

  const getIconBgColor = () => {
    switch (type) {
      case 'success':
        return 'rgba(57, 255, 20, 0.15)';
      case 'error':
        return 'rgba(255, 0, 110, 0.15)';
      case 'warning':
        return 'rgba(255, 214, 10, 0.15)';
      case 'info':
      default:
        return 'rgba(0, 217, 255, 0.15)';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'rgba(57, 255, 20, 0.3)';
      case 'error':
        return 'rgba(255, 0, 110, 0.3)';
      case 'warning':
        return 'rgba(255, 214, 10, 0.3)';
      case 'info':
      default:
        return 'rgba(0, 217, 255, 0.3)';
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case 'success':
        return 'linear-gradient(135deg, #39FF14, #00D9FF)';
      case 'error':
        return 'linear-gradient(135deg, #FF006E, #FF6B35)';
      case 'warning':
        return 'linear-gradient(135deg, #FFD60A, #FF6B35)';
      case 'info':
      default:
        return 'linear-gradient(135deg, #00D9FF, #7209B7)';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={hideAlert}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '340px',
              background: 'linear-gradient(145deg, #1A1A24, #0D0D12)',
              borderRadius: '24px',
              padding: '32px 24px 24px',
              textAlign: 'center',
              border: `1px solid ${getBorderColor()}`,
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={hideAlert}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                padding: '6px',
                color: '#6B7280',
                background: 'rgba(255, 255, 255, 0.05)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={16} />
            </button>

            {/* Icon */}
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                background: getIconBgColor(),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              {getIcon()}
            </div>

            {/* Title */}
            {title && (
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '8px',
                }}
              >
                {title}
              </h3>
            )}

            {/* Message */}
            <p
              style={{
                fontSize: '15px',
                color: '#D1D5DB',
                lineHeight: 1.6,
                marginBottom: '24px',
                whiteSpace: 'pre-line',
              }}
            >
              {message}
            </p>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              style={{
                width: '100%',
                padding: '14px 24px',
                background: getButtonColor(),
                color: 'white',
                fontWeight: 'bold',
                fontSize: '15px',
                borderRadius: '14px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              }}
            >
              확인
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
