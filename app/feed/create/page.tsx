'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Camera, Image, X, Hash, MapPin, Smile, Send } from 'lucide-react';

export default function CreatePostPage() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const suggestedTags = ['운동인증', '오운완', 'PT', 'GX', '다이어트', '헬스', '근력운동', '유산소'];

  const handleAddTag = (tag: string) => {
    const cleanTag = tag.replace('#', '').trim();
    if (cleanTag && !tags.includes(cleanTag) && tags.length < 5) {
      setTags([...tags, cleanTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageUpload = () => {
    // Mock 이미지 업로드
    const mockImages = [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
    ];
    if (images.length < 4) {
      const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
      setImages([...images, randomImage]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert('내용을 입력해주세요');
      return;
    }

    setIsSubmitting(true);

    // Mock 제출 처리
    setTimeout(() => {
      setIsSubmitting(false);
      alert('게시글이 등록되었습니다!');
      router.push('/feed');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-cyber-dark pb-24">
      <Header title="운동 인증하기" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 내용 입력 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="오늘의 운동을 기록해보세요! 어떤 운동을 했나요?"
              className="w-full h-40 bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none"
              maxLength={500}
            />
            <div className="flex justify-between items-center pt-3 border-t border-white/10">
              <span className="text-sm text-gray-500">{content.length}/500</span>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Smile size={20} className="text-gray-400" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <MapPin size={20} className="text-gray-400" />
                </button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 이미지 업로드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
              <Image size={20} className="text-electric-blue" />
              사진 추가 (최대 4장)
            </h3>

            <div className="grid grid-cols-4 gap-2">
              {/* 업로드된 이미지 */}
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center"
                  >
                    <X size={14} className="text-white" />
                  </button>
                </div>
              ))}

              {/* 업로드 버튼 */}
              {images.length < 4 && (
                <button
                  onClick={handleImageUpload}
                  className="aspect-square rounded-lg border-2 border-dashed border-gray-600 flex flex-col items-center justify-center gap-1 hover:border-electric-blue hover:bg-electric-blue/5 transition-all"
                >
                  <Camera size={24} className="text-gray-500" />
                  <span className="text-xs text-gray-500">추가</span>
                </button>
              )}
            </div>
          </Card>
        </motion.div>

        {/* 태그 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
              <Hash size={20} className="text-neon-green" />
              태그 추가 (최대 5개)
            </h3>

            {/* 선택된 태그 */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag) => (
                  <Badge key={tag} type="energy" className="flex items-center gap-1">
                    #{tag}
                    <button onClick={() => handleRemoveTag(tag)} className="ml-1">
                      <X size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* 태그 입력 */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag(tagInput)}
                placeholder="태그를 입력하세요"
                className="flex-1 px-4 py-2 bg-cyber-mid rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-blue"
              />
              <Button
                variant="ghost"
                size="md"
                onClick={() => handleAddTag(tagInput)}
                disabled={!tagInput.trim() || tags.length >= 5}
              >
                추가
              </Button>
            </div>

            {/* 추천 태그 */}
            <div className="flex flex-wrap gap-2">
              {suggestedTags
                .filter((tag) => !tags.includes(tag))
                .map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleAddTag(tag)}
                    className="px-3 py-1 bg-cyber-mid text-gray-400 rounded-full text-sm hover:bg-electric-blue/20 hover:text-electric-blue transition-all"
                  >
                    #{tag}
                  </button>
                ))}
            </div>
          </Card>
        </motion.div>

        {/* 운동 기록 연동 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card variant="glass">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white mb-1">오늘의 운동 기록 추가</h4>
                <p className="text-sm text-gray-400">완료한 루틴 정보를 자동으로 추가합니다</p>
              </div>
              <Button variant="ghost" size="sm">
                연동하기
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[425px] mx-auto p-4 bg-gradient-to-t from-cyber-dark via-cyber-dark to-transparent">
        <Button
          variant="energy"
          size="lg"
          className="w-full"
          onClick={handleSubmit}
          disabled={!content.trim() || isSubmitting}
          glow
          shine
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              업로드 중...
            </span>
          ) : (
            <>
              <Send size={20} className="mr-2" />
              게시하기
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
