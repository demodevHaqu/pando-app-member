'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import { MOCK_POSTS, MOCK_COMMENTS } from '@/data/mock/ugc';
import { Heart, MessageCircle, Share2, Send, MoreHorizontal } from 'lucide-react';

export default function PostDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  const post = MOCK_POSTS.find((p) => p.id === params.id) || MOCK_POSTS[0];
  const postComments = comments.filter((c) => c.postId === post.id);

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

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: `comment-${Date.now()}`,
        postId: post.id,
        authorId: 'current-user',
        authorName: '나',
        authorImage: 'https://i.pravatar.cc/150?img=1',
        content: comment,
        likes: 0,
        createdAt: new Date().toISOString(),
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  const handleCommentLike = (commentId: string) => {
    setLikedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const categoryBadge = getCategoryBadge(post.category);

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="게시글" showBack={true} />

      <div className="pb-32">
        {/* Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 sm:px-6 lg:px-8 py-4 max-w-2xl mx-auto"
        >
          <Card variant="hologram" glow>
            {/* Post Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorImage}
                  alt={post.authorName}
                  className="w-12 h-12 rounded-full border-2 border-electric-blue"
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
            <p className="text-gray-200 mb-4 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>

            {/* Post Images */}
            {post.images && post.images.length > 0 && (
              <div
                className={`grid gap-2 mb-4 ${
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
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Hashtags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
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

            {/* Post Stats */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="flex items-center gap-2 text-gray-400 hover:text-power-pink transition-colors"
                >
                  <Heart
                    size={24}
                    className={isLiked ? 'fill-power-pink text-power-pink' : ''}
                  />
                  <span className={`font-bold ${isLiked ? 'text-power-pink' : 'text-white'}`}>
                    {post.likes + (isLiked ? 1 : 0)}
                  </span>
                </button>

                <div className="flex items-center gap-2 text-gray-400">
                  <MessageCircle size={24} />
                  <span className="font-bold text-white">{postComments.length}</span>
                </div>

                <button className="flex items-center gap-2 text-gray-400 hover:text-neon-green transition-colors">
                  <Share2 size={24} />
                  <span className="font-bold text-white">{post.shares}</span>
                </button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Comments Section */}
        <div className="px-4 sm:px-6 lg:px-8 space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <MessageCircle size={20} />
              댓글 {postComments.length}개
            </h3>
          </div>

          {/* Comments List */}
          <div className="space-y-3">
            {postComments.map((commentItem, index) => {
              const isCommentLiked = likedComments.has(commentItem.id);

              return (
                <motion.div
                  key={commentItem.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Card>
                    <div className="flex items-start gap-3">
                      <img
                        src={commentItem.authorImage}
                        alt={commentItem.authorName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-white">
                            {commentItem.authorName}
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatDate(commentItem.createdAt)}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">
                          {commentItem.content}
                        </p>
                        <button
                          onClick={() => handleCommentLike(commentItem.id)}
                          className="flex items-center gap-1 text-xs text-gray-400 hover:text-power-pink transition-colors"
                        >
                          <Heart
                            size={14}
                            className={isCommentLiked ? 'fill-power-pink text-power-pink' : ''}
                          />
                          <span className={isCommentLiked ? 'text-power-pink' : ''}>
                            {commentItem.likes + (isCommentLiked ? 1 : 0)}
                          </span>
                        </button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {postComments.length === 0 && (
            <Card variant="glass">
              <div className="text-center py-8 text-gray-400">
                <MessageCircle size={48} className="mx-auto mb-2 opacity-50" />
                <p>첫 댓글을 남겨보세요!</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Fixed Comment Input */}
      <div className="fixed bottom-0 left-0 right-0 w-full p-4 bg-cyber-dark/95 backdrop-blur-lg border-t border-white/10">
        <form onSubmit={handleCommentSubmit} className="flex gap-2 max-w-2xl mx-auto">
          <Input
            type="text"
            placeholder="댓글을 입력하세요..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1"
          />
          <Button
            type="submit"
            variant="energy"
            size="md"
            disabled={!comment.trim()}
          >
            <Send size={20} />
          </Button>
        </form>
      </div>
    </div>
  );
}
