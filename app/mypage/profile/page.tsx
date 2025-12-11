'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MOCK_MEMBER } from '@/data/mock/members';
import { Camera, User, Mail, Phone, Calendar, Users } from 'lucide-react';
import {
  ModernCard,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
} from '@/components/ui/ModernUI';

export default function ProfileEditPage() {
  const router = useRouter();
  const member = MOCK_MEMBER;

  const [formData, setFormData] = useState({
    name: member.name,
    email: member.email,
    phone: '010-1234-5678',
    birthDate: '1990-01-01',
    gender: 'male',
    height: '175',
    weight: '70',
  });

  const [profileImage, setProfileImage] = useState(member.profileImage);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = () => {
    alert('프로필 사진 변경 기능');
  };

  const handleSave = () => {
    alert('프로필이 저장되었습니다');
    router.back();
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(26, 26, 36, 0.9)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '15px',
    outline: 'none',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '120px' }}>
      <PageHeader title="프로필 수정" />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Profile Photo */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ModernCard style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={profileImage}
                alt="Profile"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  border: '4px solid #00D9FF',
                  objectFit: 'cover',
                }}
              />
              <button
                onClick={handleImageUpload}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(255, 107, 53, 0.4)',
                }}
              >
                <Camera size={20} color="white" />
              </button>
            </div>
            <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '14px' }}>
              프로필 사진을 변경하려면 클릭하세요
            </p>
          </ModernCard>
        </motion.section>

        {/* Basic Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 style={{ fontWeight: 'bold', color: 'white', fontSize: '17px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={20} />
            기본 정보
          </h3>

          <ModernCard style={{ padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>
                  <User size={14} />
                  이름
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="이름을 입력하세요"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>
                  <Mail size={14} />
                  이메일
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="이메일을 입력하세요"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>
                  <Phone size={14} />
                  전화번호
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="전화번호를 입력하세요"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>
                  <Calendar size={14} />
                  생년월일
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>
                  <Users size={14} />
                  성별
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  {['male', 'female'].map((gender) => (
                    <button
                      key={gender}
                      onClick={() => setFormData({ ...formData, gender })}
                      style={{
                        padding: '14px',
                        borderRadius: '12px',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        border: formData.gender === gender ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                        background: formData.gender === gender ? 'linear-gradient(135deg, #FF6B35, #FF006E)' : 'rgba(26, 26, 36, 0.9)',
                        color: formData.gender === gender ? 'white' : '#9CA3AF',
                        boxShadow: formData.gender === gender ? '0 0 20px rgba(255, 107, 53, 0.3)' : 'none',
                      }}
                    >
                      {gender === 'male' ? '남성' : '여성'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ModernCard>
        </motion.section>

        {/* Body Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 style={{ fontWeight: 'bold', color: 'white', fontSize: '17px', marginBottom: '14px' }}>신체 정보</h3>

          <ModernCard style={{ padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px', display: 'block' }}>
                  키 (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="키를 입력하세요"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px', display: 'block' }}>
                  체중 (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="체중을 입력하세요"
                  style={inputStyle}
                />
              </div>

              <div style={{ paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span style={{ color: '#6B7280' }}>BMI</span>
                  <span style={{ color: 'white', fontWeight: 'bold' }}>
                    {(
                      parseInt(formData.weight) /
                      ((parseInt(formData.height) / 100) ** 2)
                    ).toFixed(1)}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>
                  정상 체중 범위입니다
                </div>
              </div>
            </div>
          </ModernCard>
        </motion.section>

        {/* Account Settings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 style={{ fontWeight: 'bold', color: 'white', fontSize: '17px', marginBottom: '14px' }}>계정 설정</h3>

          <ModernCard style={{ padding: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => alert('비밀번호 변경 기능')}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '14px',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ color: 'white', fontWeight: '500', fontSize: '14px' }}>비밀번호 변경</div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                  정기적인 비밀번호 변경을 권장합니다
                </div>
              </button>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }} />

              <button
                onClick={() => {
                  if (confirm('정말 탈퇴하시겠습니까?')) {
                    alert('회원 탈퇴 기능');
                  }
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '14px',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ color: '#FF006E', fontWeight: '500', fontSize: '14px' }}>회원 탈퇴</div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                  탈퇴 시 모든 데이터가 삭제됩니다
                </div>
              </button>
            </div>
          </ModernCard>
        </motion.section>

        {/* Info Notice */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ModernCard style={{ padding: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                '프로필 정보는 AI 추천 시스템에 활용됩니다',
                '신체 정보는 정확한 운동 추천을 위해 중요합니다',
                '개인정보는 암호화되어 안전하게 보관됩니다',
              ].map((text, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: '#00D9FF' }}>•</span>
                  <span style={{ fontSize: '13px', color: '#9CA3AF' }}>{text}</span>
                </div>
              ))}
            </div>
          </ModernCard>
        </motion.section>
      </div>

      {/* Fixed Bottom Buttons */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 20px',
        background: 'rgba(13, 13, 18, 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', maxWidth: '600px', margin: '0 auto' }}>
          <SecondaryButton size="lg" onClick={() => router.back()} fullWidth>
            취소
          </SecondaryButton>
          <PrimaryButton size="lg" onClick={handleSave} fullWidth>
            저장
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
