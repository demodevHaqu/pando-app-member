'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Tabs from '@/components/ui/Tabs';
import { MOCK_PAYMENTS } from '@/data/mock/payment';
import { Receipt, CreditCard, Download, Calendar, RefreshCw } from 'lucide-react';

export default function PaymentHistoryPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: '전체' },
    { id: 'pt', label: 'PT' },
    { id: 'membership', label: '회원권' },
    { id: 'other', label: '기타' },
  ];

  const filteredPayments = activeTab === 'all'
    ? MOCK_PAYMENTS
    : MOCK_PAYMENTS.filter((p) => {
        if (activeTab === 'other') {
          return p.category !== 'pt' && p.category !== 'membership';
        }
        return p.category === activeTab;
      });

  const totalSpent = MOCK_PAYMENTS
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const thisMonthSpent = MOCK_PAYMENTS
    .filter((p) => {
      const paymentDate = new Date(p.createdAt);
      const now = new Date();
      return (
        p.status === 'completed' &&
        paymentDate.getMonth() === now.getMonth() &&
        paymentDate.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, p) => sum + p.amount, 0);

  const getStatusBadge = (status: string) => {
    const badges: { [key: string]: { type: 'growth' | 'energy' | 'premium'; text: string } } = {
      completed: { type: 'growth', text: '완료' },
      pending: { type: 'energy', text: '대기' },
      refunded: { type: 'premium', text: '환불' },
      failed: { type: 'energy', text: '실패' },
    };
    return badges[status] || { type: 'growth', text: status };
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      pt: '💪',
      membership: '🎫',
      coupon: '🎁',
      gx: '🧘',
    };
    return icons[category] || '💳';
  };

  const getPaymentMethodName = (method: string) => {
    const methods: { [key: string]: string } = {
      card: '신용카드',
      kakao: '카카오페이',
      naver: '네이버페이',
    };
    return methods[method] || method;
  };

  const handleDownloadReceipt = (payment: (typeof MOCK_PAYMENTS)[number]) => {
    // In a real app, this would download the receipt
    alert(`영수증 다운로드: ${payment.orderId}`);
  };

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="결제 내역" showBack={true} />

      <div className="px-4 sm:px-6 lg:px-8 py-4 space-y-6 pb-20 max-w-2xl mx-auto">
        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid grid-cols-2 gap-3">
            <Card variant="hologram" glow>
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-2">이번 달 사용</div>
                <div className="text-2xl font-bold text-gradient-energy">
                  {thisMonthSpent.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400 mt-1">원</div>
              </div>
            </Card>

            <Card variant="glass">
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-2">총 사용</div>
                <div className="text-2xl font-bold text-gradient-growth">
                  {totalSpent.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400 mt-1">원</div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </motion.div>

        {/* Payment History List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <Receipt size={20} />
              결제 내역
            </h3>
            <span className="text-sm text-gray-400">{filteredPayments.length}건</span>
          </div>

          <div className="space-y-3">
            {filteredPayments.map((payment, index) => {
              const statusBadge = getStatusBadge(payment.status);

              return (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Card
                    glow
                    className={payment.status === 'refunded' ? 'opacity-70' : ''}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 glass rounded-lg flex items-center justify-center text-2xl">
                        {getCategoryIcon(payment.category)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h4 className="font-bold text-white mb-1">
                              {payment.description}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Calendar size={14} />
                              <span>
                                {new Date(payment.createdAt).toLocaleDateString('ko-KR')}
                              </span>
                            </div>
                          </div>
                          <Badge type={statusBadge.type}>{statusBadge.text}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">결제 수단</span>
                        <div className="flex items-center gap-2">
                          <CreditCard size={14} className="text-gray-400" />
                          <span className="text-white">
                            {getPaymentMethodName(payment.paymentMethod)}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">주문번호</span>
                        <span className="text-white font-mono text-xs">
                          {payment.orderId}
                        </span>
                      </div>

                      {payment.status === 'refunded' && payment.refundedAt && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">환불일</span>
                          <span className="text-power-pink">
                            {new Date(payment.refundedAt).toLocaleDateString('ko-KR')}
                          </span>
                        </div>
                      )}

                      {payment.refundReason && (
                        <div className="pt-2 border-t border-white/10">
                          <div className="text-xs text-gray-400 mb-1">환불 사유</div>
                          <div className="text-sm text-gray-300">
                            {payment.refundReason}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">결제 금액</div>
                        <div
                          className={`text-xl font-bold ${
                            payment.status === 'refunded'
                              ? 'text-gray-500 line-through'
                              : 'text-gradient-energy'
                          }`}
                        >
                          {payment.amount.toLocaleString()}원
                        </div>
                      </div>

                      {payment.status === 'completed' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadReceipt(payment)}
                        >
                          <Download size={16} className="mr-2" />
                          영수증
                        </Button>
                      )}

                      {payment.status === 'refunded' && (
                        <div className="flex items-center gap-1 text-sm text-power-pink">
                          <RefreshCw size={14} />
                          <span>환불 완료</span>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {filteredPayments.length === 0 && (
            <Card variant="glass">
              <div className="text-center py-12 text-gray-400">
                <Receipt size={48} className="mx-auto mb-3 opacity-50" />
                <p>결제 내역이 없습니다</p>
              </div>
            </Card>
          )}
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <h3 className="font-bold text-white mb-3">안내사항</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <span className="text-electric-blue">•</span>
                <span>영수증은 결제 완료 후 언제든지 다운로드 가능합니다</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-electric-blue">•</span>
                <span>환불은 결제일로부터 7일 이내 가능합니다</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-electric-blue">•</span>
                <span>PT 세션 이용 후에는 부분 환불만 가능합니다</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-electric-blue">•</span>
                <span>결제 관련 문의는 고객센터로 연락해주세요</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
