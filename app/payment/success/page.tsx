'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { CheckCircle, Download, Share2, Home, Calendar } from 'lucide-react';
import { showAlert } from '@/components/ui/AlertModal';

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mock 결제 정보 (실제로는 URL params나 state에서 가져옴)
  const paymentInfo = {
    orderId: 'ORD-2025011512345',
    orderDate: new Date().toISOString(),
    productName: searchParams.get('product') || 'PT 16회 패키지',
    originalPrice: 1200000,
    discountAmount: 120000,
    finalPrice: 1080000,
    paymentMethod: '신한카드 (1234)',
    pointsEarned: 10800,
    status: 'completed',
  };

  const handleDownloadReceipt = () => {
    showAlert('영수증이 다운로드됩니다.', { type: 'info' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Fit Genie 결제 완료',
        text: `${paymentInfo.productName} 결제가 완료되었습니다.`,
      });
    } else {
      showAlert('공유 기능이 지원되지 않는 환경입니다.', { type: 'info' });
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark pb-24">
      <Header title="결제 완료" showBack={false} showLogo={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 결제 완료 아이콘 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-gradient-growth rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-green"
          >
            <CheckCircle size={48} className="text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white mb-2">결제가 완료되었습니다!</h1>
          <p className="text-gray-400">주문번호: {paymentInfo.orderId}</p>
        </motion.div>

        {/* 결제 상세 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card variant="hologram">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white">결제 내역</h3>
              <Badge type="growth">완료</Badge>
            </div>

            <div className="space-y-3">
              {/* 상품 정보 */}
              <div className="p-3 glass-dark rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">상품명</span>
                  <span className="text-white font-bold">{paymentInfo.productName}</span>
                </div>
              </div>

              {/* 금액 정보 */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">상품 금액</span>
                  <span className="text-white">{paymentInfo.originalPrice.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">할인 금액</span>
                  <span className="text-power-pink">-{paymentInfo.discountAmount.toLocaleString()}원</span>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <div className="flex justify-between">
                    <span className="text-white font-bold">최종 결제금액</span>
                    <span className="text-2xl font-bold text-gradient-energy">
                      {paymentInfo.finalPrice.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 결제 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <h3 className="font-bold text-white mb-4">결제 정보</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">결제일시</span>
                <span className="text-white">
                  {new Date(paymentInfo.orderDate).toLocaleString('ko-KR')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">결제 수단</span>
                <span className="text-white">{paymentInfo.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">적립 포인트</span>
                <span className="text-neon-green font-bold">+{paymentInfo.pointsEarned.toLocaleString()}P</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 안내 메시지 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card variant="glass">
            <div className="flex gap-3">
              <Calendar size={24} className="text-electric-blue flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">다음 단계</h4>
                <p className="text-sm text-gray-400">
                  PT 예약 페이지에서 원하는 시간에 세션을 예약하세요. 트레이너와 첫 상담을 통해 맞춤
                  운동 계획을 세울 수 있습니다.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 액션 버튼들 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-3"
        >
          <Button variant="ghost" size="md" onClick={handleDownloadReceipt} className="w-full">
            <Download size={18} className="mr-2" />
            영수증 저장
          </Button>
          <Button variant="ghost" size="md" onClick={handleShare} className="w-full">
            <Share2 size={18} className="mr-2" />
            공유하기
          </Button>
        </motion.div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[425px] mx-auto p-4 bg-gradient-to-t from-cyber-dark via-cyber-dark to-transparent space-y-2">
        <Button
          variant="energy"
          size="lg"
          className="w-full"
          onClick={() => router.push('/pt/booking')}
          glow
          shine
        >
          <Calendar size={20} className="mr-2" />
          PT 예약하러 가기
        </Button>
        <Button variant="ghost" size="lg" className="w-full" onClick={() => router.push('/')}>
          <Home size={20} className="mr-2" />
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cyber-dark flex items-center justify-center"><p className="text-white">로딩 중...</p></div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
