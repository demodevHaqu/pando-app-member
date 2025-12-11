'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { WifiOff, RefreshCw } from 'lucide-react';

export default function OfflinePage() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-cyber-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <Card variant="hologram" className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mb-6"
          >
            <WifiOff size={64} className="text-gray-500 mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-2xl font-bold text-white mb-2">오프라인 상태</h1>
            <p className="text-gray-400 mb-6">
              인터넷 연결을 확인해주세요.
              <br />
              일부 기능은 오프라인에서도 사용 가능합니다.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <div className="p-3 rounded-lg bg-cyber-mid/50 border border-white/10 text-sm text-gray-300">
              💡 오프라인에서 가능한 기능:
              <ul className="mt-2 space-y-1 ml-4">
                <li>• 저장된 루틴 조회</li>
                <li>• 운동 기록 추가</li>
                <li>• 다운로드된 영상 시청</li>
              </ul>
            </div>

            <Button
              variant="energy"
              size="lg"
              className="w-full"
              onClick={handleRetry}
              glow
            >
              <RefreshCw size={20} className="mr-2" />
              다시 시도
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs text-gray-500 mt-6"
          >
            WiFi 또는 모바일 데이터 연결 확인 후 다시 시도해주세요
          </motion.p>
        </Card>
      </motion.div>
    </div>
  );
}
