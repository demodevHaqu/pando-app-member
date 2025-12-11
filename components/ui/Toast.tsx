'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotificationStore } from '@/store/notificationStore';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { notifications, removeNotification } = useNotificationStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-neon-green" />;
      case 'error':
        return <AlertCircle size={20} className="text-power-pink" />;
      case 'warning':
        return <AlertCircle size={20} className="text-cyber-yellow" />;
      case 'info':
        return <Info size={20} className="text-electric-blue" />;
      default:
        return <Info size={20} />;
    }
  };

  const getBackground = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-neon-green/10 border-neon-green/50';
      case 'error':
        return 'bg-power-pink/10 border-power-pink/50';
      case 'warning':
        return 'bg-cyber-yellow/10 border-cyber-yellow/50';
      case 'info':
        return 'bg-electric-blue/10 border-electric-blue/50';
      default:
        return 'bg-cyber-mid border-white/10';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`p-4 rounded-lg backdrop-blur-sm border ${getBackground(
              notification.type
            )} shadow-lg`}
          >
            <div className="flex items-start gap-3">
              {getIcon(notification.type)}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white mb-1">{notification.title}</div>
                <div className="text-sm text-gray-300">{notification.message}</div>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
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
