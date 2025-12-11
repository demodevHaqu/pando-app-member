'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { MOCK_POSTS } from '@/data/mock/ugc';
import { Heart, MessageCircle, Share2, MoreHorizontal, TrendingUp } from 'lucide-react';

export default function FeedPage() {
  const router = useRouter();
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [hasMore, setHasMore] = useState(true);

  const handleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const loadMore = () => {
    // Simulate loading more posts
    setTimeout(() => {
      if (posts.length >= 6) {
        setHasMore(false);
      } else {
        setPosts([...posts, ...MOCK_POSTS]);
      }
    }, 500);
  };

  const getCategoryBadge = (category: string) => {
    const badges: { [key: string]: { type: 'growth' | 'energy' | 'premium'; text: string } } = {
      motivation: { type: 'energy', text: '동기부여' },
      'before-after': { type: 'premium', text: '변화' },
      routine: { type: 'growth', text: '루틴' },
      achievement: { type: 'energy', text: '성과' },
    };
    return badges[category] || { type: 'growth', text: category };
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes}분 전`;
    }
    if (hours < 24) return `${hours}시간 전`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="피드" showBack={false} />

      <div className="px-4 sm:px-6 lg:px-8 py-4 space-y-4 pb-20 max-w-2xl mx-auto">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid grid-cols-2 gap-3">
            <Card glow onClick={() => router.push('/feed/challenges')}>
              <div className="text-center py-2">
                <TrendingUp size={24} className="text-energy-orange mx-auto mb-2" />
                <div className="font-bold text-white text-sm">챌린지</div>
                <div className="text-xs text-gray-400">참여하기</div>
              </div>
            </Card>

            <Button
              variant="energy"
              size="md"
              className="h-full"
              onClick={() => {/* Open create post modal */}}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">✍️</div>
                <div className="text-sm">글쓰기</div>
              </div>
            </Button>
          </div>
        </motion.div>

        {/* Feed Posts */}
        <div className="space-y-4">
          {posts.map((post, index) => {
            const isLiked = likedPosts.has(post.id);
            const categoryBadge = getCategoryBadge(post.category);

            return (
              <motion.div
                key={`${post.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Card glow>
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.authorImage}
                        alt={post.authorName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-bold text-white">{post.authorName}</div>
                        <div className="text-xs text-gray-400">{formatDate(post.createdAt)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge type={categoryBadge.type}>{categoryBadge.text}</Badge>
                      <button className="text-gray-400 hover:text-white">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-200 mb-3 leading-relaxed">{post.content}</p>

                  {/* Post Images */}
                  {post.images && post.images.length > 0 && (
                    <div
                      className={`grid gap-2 mb-3 ${
                        post.images.length === 1
                          ? 'grid-cols-1'
                          : post.images.length === 2
                          ? 'grid-cols-2'
                          : 'grid-cols-2'
                      }`}
                    >
                      {post.images.map((image, i) => (
                        <div
                          key={i}
                          className={`relative ${
                            post.images!.length === 3 && i === 0 ? 'col-span-2' : ''
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Post image ${i + 1}`}
                            className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => router.push(`/feed/post/${post.id}`)}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Hashtags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-electric-blue text-sm cursor-pointer hover:underline"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-2 text-gray-400 hover:text-power-pink transition-colors"
                      >
                        <Heart
                          size={20}
                          className={isLiked ? 'fill-power-pink text-power-pink' : ''}
                        />
                        <span className={isLiked ? 'text-power-pink' : ''}>
                          {post.likes + (isLiked ? 1 : 0)}
                        </span>
                      </button>

                      <button
                        onClick={() => router.push(`/feed/post/${post.id}`)}
                        className="flex items-center gap-2 text-gray-400 hover:text-electric-blue transition-colors"
                      >
                        <MessageCircle size={20} />
                        <span>{post.comments}</span>
                      </button>

                      <button className="flex items-center gap-2 text-gray-400 hover:text-neon-green transition-colors">
                        <Share2 size={20} />
                        <span>{post.shares}</span>
                      </button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/feed/post/${post.id}`)}
                    >
                      자세히
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Load More */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              variant="ghost"
              size="lg"
              className="w-full"
              onClick={loadMore}
            >
              더 보기
            </Button>
          </motion.div>
        )}

        {!hasMore && (
          <div className="text-center text-gray-400 py-8">
            모든 게시물을 확인했습니다
          </div>
        )}
      </div>
    </div>
  );
}
