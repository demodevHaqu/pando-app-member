'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Badge from '@/components/ui/Badge';
import { MOCK_PAYMENTS } from '@/data/mock/payment';
import { Receipt, CreditCard, Download, Calendar, RefreshCw } from 'lucide-react';

// Card Component
const Card = ({
  children,
  variant = 'default',
  glow = false,
  onClick,
  style = {},
}: {
  children: React.ReactNode;
  variant?: 'default' | 'hologram' | 'glass';
  glow?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}) => {
  const baseStyle: React.CSSProperties = {
    background: variant === 'hologram'
      ? 'linear-gradient(145deg, rgba(26, 26, 36, 0.95), rgba(13, 13, 18, 0.98))'
      : variant === 'glass'
      ? 'rgba(255, 255, 255, 0.05)'
      : 'linear-gradient(145deg, rgba(26, 26, 36, 0.95), rgba(13, 13, 18, 0.98))',
    border: variant === 'hologram'
      ? '1px solid rgba(0, 217, 255, 0.3)'
      : '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '16px',
    backdropFilter: 'blur(20px)',
    boxShadow: glow
      ? '0 0 20px rgba(0, 217, 255, 0.2)'
      : '0 4px 24px rgba(0, 0, 0, 0.4)',
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  };

  return <div style={baseStyle} onClick={onClick}>{children}</div>;
};

// Button Component
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  style = {},
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'energy';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}) => {
  const sizeStyles = {
    sm: { padding: '8px 16px', fontSize: '14px' },
    md: { padding: '12px 24px', fontSize: '16px' },
    lg: { padding: '16px 32px', fontSize: '18px' },
  };

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, #00D9FF, #7209B7)',
      color: 'white',
      border: 'none',
    },
    ghost: {
      background: 'transparent',
      color: '#9CA3AF',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    energy: {
      background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
      color: 'white',
      border: 'none',
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...sizeStyles[size],
        ...variantStyles[variant],
        borderRadius: '12px',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        ...style,
      }}
    >
      {children}
    </button>
  );
};

// Tabs Component
const Tabs = ({
  tabs,
  activeTab,
  onChange,
}: {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
}) => {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: '12px',
            border: 'none',
            background: activeTab === tab.id
              ? 'linear-gradient(135deg, #00D9FF, #7209B7)'
              : 'rgba(255, 255, 255, 0.05)',
            color: activeTab === tab.id ? 'white' : '#9CA3AF',
            fontWeight: 600,
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

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
    <div style={{ minHeight: '100vh', background: '#0D0D12' }}>
      <Header title="결제 내역" showBack={true} showLogo={true} />

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '80px', maxWidth: '672px', margin: '0 auto' }}>
        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <Card variant="hologram" glow>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '8px' }}>이번 달 사용</div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {thisMonthSpent.toLocaleString()}
                </div>
                <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>원</div>
              </div>
            </Card>

            <Card variant="glass">
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '8px' }}>총 사용</div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #39FF14, #00D9FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {totalSpent.toLocaleString()}
                </div>
                <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>원</div>
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={{ fontWeight: 'bold', color: 'white', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Receipt size={20} />
              결제 내역
            </h3>
            <span style={{ fontSize: '14px', color: '#9CA3AF' }}>{filteredPayments.length}건</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                    style={{ opacity: payment.status === 'refunded' ? 0.7 : 1 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                      }}>
                        {getCategoryIcon(payment.category)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <div>
                            <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
                              {payment.description}
                            </h4>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#9CA3AF' }}>
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

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span style={{ color: '#9CA3AF' }}>결제 수단</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <CreditCard size={14} color="#9CA3AF" />
                          <span style={{ color: 'white' }}>
                            {getPaymentMethodName(payment.paymentMethod)}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span style={{ color: '#9CA3AF' }}>주문번호</span>
                        <span style={{ color: 'white', fontFamily: 'monospace', fontSize: '12px' }}>
                          {payment.orderId}
                        </span>
                      </div>

                      {payment.status === 'refunded' && payment.refundedAt && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                          <span style={{ color: '#9CA3AF' }}>환불일</span>
                          <span style={{ color: '#FF006E' }}>
                            {new Date(payment.refundedAt).toLocaleDateString('ko-KR')}
                          </span>
                        </div>
                      )}

                      {payment.refundReason && (
                        <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                          <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '4px' }}>환불 사유</div>
                          <div style={{ fontSize: '14px', color: '#D1D5DB' }}>
                            {payment.refundReason}
                          </div>
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <div>
                        <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '4px' }}>결제 금액</div>
                        <div
                          style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: payment.status === 'refunded' ? '#6B7280' : undefined,
                            textDecoration: payment.status === 'refunded' ? 'line-through' : 'none',
                            background: payment.status !== 'refunded' ? 'linear-gradient(135deg, #FF6B35, #FF006E)' : undefined,
                            WebkitBackgroundClip: payment.status !== 'refunded' ? 'text' : undefined,
                            WebkitTextFillColor: payment.status !== 'refunded' ? 'transparent' : undefined,
                            backgroundClip: payment.status !== 'refunded' ? 'text' : undefined,
                          }}
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
                          <Download size={16} style={{ marginRight: '8px' }} />
                          영수증
                        </Button>
                      )}

                      {payment.status === 'refunded' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#FF006E' }}>
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
              <div style={{ textAlign: 'center', padding: '48px 0', color: '#9CA3AF' }}>
                <Receipt size={48} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
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
            <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>안내사항</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#D1D5DB' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#00D9FF' }}>•</span>
                <span>영수증은 결제 완료 후 언제든지 다운로드 가능합니다</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#00D9FF' }}>•</span>
                <span>환불은 결제일로부터 7일 이내 가능합니다</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#00D9FF' }}>•</span>
                <span>PT 세션 이용 후에는 부분 환불만 가능합니다</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#00D9FF' }}>•</span>
                <span>결제 관련 문의는 고객센터로 연락해주세요</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
