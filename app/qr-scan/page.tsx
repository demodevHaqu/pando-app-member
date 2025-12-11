'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { QrCode, Camera, History, Dumbbell, Wind, Droplets, Sparkles } from 'lucide-react';
import { MOCK_SCANNED_ITEMS } from '@/data/mock/equipment';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  SectionTitle,
  PrimaryButton,
  IconBox,
  GradientIconBox,
  Tag,
} from '@/components/ui/ModernUI';

export default function QRScanPage() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedItems] = useState(MOCK_SCANNED_ITEMS);

  const quickAccessZones = [
    {
      id: 'equipment',
      name: '기구 운동',
      icon: Dumbbell,
      color: 'blue' as const,
      iconColor: '#00D9FF',
      description: 'QR 코드 스캔',
      action: () => setIsScanning(true),
    },
    {
      id: 'stretching',
      name: '스트레칭 존',
      icon: Wind,
      color: 'green' as const,
      iconColor: '#39FF14',
      description: '회복 스트레칭',
      action: () => router.push('/qr-scan/stretching'),
    },
    {
      id: 'sauna',
      name: '사우나',
      icon: Droplets,
      color: 'orange' as const,
      iconColor: '#FF6B35',
      description: '체크인/아웃',
      action: () => router.push('/qr-scan/sauna'),
    },
    {
      id: 'recovery',
      name: '리커버리 존',
      icon: Sparkles,
      color: 'purple' as const,
      iconColor: '#7209B7',
      description: 'AI 추천',
      action: () => router.push('/qr-scan/recovery'),
    },
  ];

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      router.push('/qr-scan/equipment/eq1');
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="QR 스캔" showBack={false} />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* QR Scanner Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FeatureCard>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              {!isScanning ? (
                <>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ marginBottom: '20px' }}
                  >
                    <QrCode size={80} color="#00D9FF" style={{ margin: '0 auto' }} />
                  </motion.div>
                  <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
                    기구 QR 코드를 스캔하세요
                  </h2>
                  <p style={{ color: '#9CA3AF', marginBottom: '24px', fontSize: '14px' }}>
                    기구별 운동 영상과 기록을 확인할 수 있습니다
                  </p>
                  <PrimaryButton
                    onClick={handleScan}
                    icon={<Camera size={20} />}
                    fullWidth
                    size="lg"
                  >
                    스캔 시작
                  </PrimaryButton>
                </>
              ) : (
                <>
                  <div style={{
                    position: 'relative',
                    width: '200px',
                    height: '200px',
                    margin: '0 auto 20px',
                  }}>
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        border: '3px solid #00D9FF',
                        borderRadius: '20px',
                        boxShadow: '0 0 20px rgba(0, 217, 255, 0.5)',
                      }}
                    />
                    <motion.div
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: '#00D9FF',
                        boxShadow: '0 0 10px #00D9FF',
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Camera size={48} color="#00D9FF" />
                    </div>
                  </div>
                  <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{ color: 'white', fontWeight: '600' }}
                  >
                    QR 코드를 인식하는 중...
                  </motion.p>
                </>
              )}
            </div>
          </FeatureCard>
        </motion.div>

        {/* Quick Access Zones */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <SectionTitle title="빠른 이동" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {quickAccessZones.map((zone, index) => {
              const Icon = zone.icon;
              return (
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <ModernCard onClick={zone.action} style={{ padding: '20px' }}>
                    <IconBox color={zone.color} size={48}>
                      <Icon size={24} color={zone.iconColor} />
                    </IconBox>
                    <h4 style={{ fontWeight: 'bold', color: 'white', margin: '12px 0 4px', fontSize: '15px' }}>
                      {zone.name}
                    </h4>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>{zone.description}</p>
                  </ModernCard>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Recent Scans */}
        {scannedItems.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SectionTitle
              title="최근 스캔"
              action="전체보기"
              onAction={() => router.push('/qr-scan/history')}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {scannedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <ModernCard
                    onClick={() => router.push(`/qr-scan/equipment/${item.equipmentId}`)}
                    style={{ padding: '16px' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <GradientIconBox
                        gradient="linear-gradient(135deg, #FF6B35, #FF006E)"
                        size={48}
                      >
                        <Dumbbell size={24} color="white" />
                      </GradientIconBox>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontWeight: 'bold', color: 'white', margin: 0, fontSize: '15px' }}>
                          {item.equipmentName}
                        </h4>
                        <p style={{ fontSize: '13px', color: '#6B7280', margin: '4px 0 0' }}>
                          {item.location}
                        </p>
                      </div>
                      <span style={{ fontSize: '12px', color: '#6B7280' }}>
                        {new Date(item.scannedAt).toLocaleTimeString('ko-KR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </ModernCard>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Info Banner */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ModernCard style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{ fontSize: '28px' }}>💡</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '10px', fontSize: '15px' }}>
                  QR 스캔 팁
                </h4>
                <ul style={{ fontSize: '13px', color: '#9CA3AF', margin: 0, paddingLeft: '16px', lineHeight: 1.8 }}>
                  <li>기구 QR 코드로 운동 영상과 기록을 확인하세요</li>
                  <li>리커버리 존에서 AI 추천을 받아보세요</li>
                  <li>사우나 이용 시 체크인/아웃을 잊지 마세요</li>
                </ul>
              </div>
            </div>
          </ModernCard>
        </motion.section>
      </div>
    </div>
  );
}
