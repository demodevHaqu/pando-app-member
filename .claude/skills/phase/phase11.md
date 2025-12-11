🎯 PHASE 11: UGC (User Generated Content)
Task 11.1: 타입 정의 및 Mock 데이터
파일: types/ugc.ts
typescriptexport interface Post {
  id: string;
  memberId: string;
  memberName: string;
  memberImage?: string;
  content: string;
  images: string[];
  tags: string[];
  likes: number;
  comments: number;
  createdAt: string;
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  memberId: string;
  memberName: string;
  memberImage?: string;
  content: string;
  createdAt: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  startDate: string;
  endDate: string;
  participants: number;
  reward: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}
파일: data/mock/ugc.ts
typescriptimport { Post, Comment, Challenge } from '@/types/ugc';

export const MOCK_POSTS: Post[] = [
  {
    id: 'post1',
    memberId: 'member1',
    memberName: '김철수',
    memberImage: 'https://i.pravatar.cc/150?img=1',
    content: '3개월만에 -10kg 감량 성공! 💪 꾸준히 하니까 되네요. 포기하지 마세요!',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
    ],
    tags: ['다이어트', '체중감량', '동기부여'],
    likes: 234,
    comments: 45,
    createdAt: '2025-01-15T10:30:00Z',
    isLiked: false,
  },
  {
    id: 'post2',
    memberId: 'member2',
    memberName: '이영희',
    memberImage: 'https://i.pravatar.cc/150?img=5',
    content: '오늘도 PT 완료! 강동원 트레이너님 감사합니다 🙏',
    images: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400'],
    tags: ['PT', '운동일기'],
    likes: 89,
    comments: 12,
    createdAt: '2025-01-15T14:20:00Z',
    isLiked: true,
  },
  {
    id: 'post3',
    memberId: 'member3',
    memberName: '박민수',
    memberImage: 'https://i.pravatar.cc/150?img=12',
    content: 'GX 요가 수업 너무 좋아요! 몸이 한결 가벼워진 느낌 😊',
    images: [],
    tags: ['요가', 'GX', '스트레칭'],
    likes: 67,
    comments: 8,
    createdAt: '2025-01-14T19:00:00Z',
    isLiked: false,
  },
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'comment1',
    postId: 'post1',
    memberId: 'member2',
    memberName: '이영희',
    memberImage: 'https://i.pravatar.cc/150?img=5',
    content: '대박!! 진짜 대단하세요 👏',
    createdAt: '2025-01-15T11:00:00Z',
  },
  {
    id: 'comment2',
    postId: 'post1',
    memberId: 'member3',
    memberName: '박민수',
    memberImage: 'https://i.pravatar.cc/150?img=12',
    content: '저도 화이팅 해야겠어요!',
    createdAt: '2025-01-15T12:30:00Z',
  },
];

export const MOCK_CHALLENGES: Challenge[] = [
  {
    id: 'challenge1',
    title: '30일 플랭크 챌린지',
    description: '매일 플랭크 시간을 늘려가며 코어 근력을 키워보세요!',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    startDate: '2025-01-20',
    endDate: '2025-02-20',
    participants: 234,
    reward: '1,000 포인트',
    status: 'upcoming',
  },
  {
    id: 'challenge2',
    title: '신년 다이어트 챌린지',
    description: '새해 목표 체중 달성하기! 함께 해요 💪',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
    startDate: '2025-01-01',
    endDate: '2025-02-28',
    participants: 567,
    reward: '5,000 포인트',
    status: 'ongoing',
  },
];

Task 11.2: 피드 메인
파일: app/feed/page.tsx
typescript'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Heart, MessageCircle, Share2, Plus, TrendingUp } from 'lucide-react';
import { MOCK_POSTS, MOCK_CHALLENGES } from '@/data/mock/ugc';

export default function FeedPage() {
  const router = useRouter();
  const [posts, setPosts] = useState(MOCK_POSTS);

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      )
    );
  };

  const ongoingChallenges = MOCK_CHALLENGES.filter((c) => c.status === 'ongoing');

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const posted = new Date(date);
    const diffMs = now.getTime() - posted.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    return `${diffDays}일 전`;
  };

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="피드" showBack={false} showNotification={true} />

      <div className="p-4 space-y-6">
        {/* 챌린지 배너 */}
        {ongoingChallenges.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card variant="hologram" onClick={() => router.push('/feed/challenges')}>
              <div className="flex items-center gap-3">
                <TrendingUp size={32} className="text-cyber-yellow" />
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">진행 중인 챌린지</h3>
                  <p className="text-sm text-gray-400">
                    {ongoingChallenges[0].title} 외 {ongoingChallenges.length - 1}건
                  </p>
                </div>
                <Badge type="energy">{ongoingChallenges[0].participants}명 참여</Badge>
              </div>
            </Card>
          </motion.div>
        )}

        {/* 게시글 작성 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Button
            variant="energy"
            size="lg"
            className="w-full"
            onClick={() => router.push('/feed/create')}
            glow
          >
            <Plus size={20} className="mr-2" />
            운동 인증하기
          </Button>
        </motion.div>

        {/* 포스트 피드 */}
        <div className="space-y-4">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
            >
              <Card>
                {/* 헤더 */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    {post.memberImage ? (
                      <img
                        src={post.memberImage}
                        alt={post.memberName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-premium flex items-center justify-center text-white font-bold">
                        {post.memberName[0]}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white">{post.memberName}</div>
                    <div className="text-xs text-gray-400">{getTimeAgo(post.createdAt)}</div>
                  </div>
                </div>

                {/* 내용 */}
                <p className="text-gray-300 mb-3">{post.content}</p>

                {/* 이미지 */}
                {post.images.length > 0 && (
                  <div
                    className={`grid gap-2 mb-3 ${
                      post.images.length === 1
                        ? 'grid-cols-1'
                        : post.images.length === 2
                        ? 'grid-cols-2'
                        : 'grid-cols-2'
                    }`}
                  >
                    {post.images.map((img, i) => (
                      <div
                        key={i}
                        className={`rounded-lg overflow-hidden ${
                          post.images.length === 1 ? 'aspect-video' : 'aspect-square'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                {/* 태그 */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-electric-blue/10 text-electric-blue rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* 액션 */}
                <div className="flex items-center gap-4 pt-3 border-t border-white/10">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-2 text-gray-400 hover:text-power-pink transition-colors"
                  >
                    <Heart
                      size={20}
                      className={post.isLiked ? 'fill-power-pink text-power-pink' : ''}
                    />
                    <span className={post.isLiked ? 'text-power-pink' : ''}>{post.likes}</span>
                  </button>
                  <button
                    onClick={() => router.push(`/feed/post/${post.id}`)}
                    className="flex items-center gap-2 text-gray-400 hover:text-electric-blue transition-colors"
                  >
                    <MessageCircle size={20} />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-neon-green transition-colors ml-auto">
                    <Share2 size={20} />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

Task 11.3: 포스트 상세파일: app/feed/post/[id]/page.tsxtypescript'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Heart, MessageCircle, Share2, Send } from 'lucide-react';
import { MOCK_POSTS, MOCK_COMMENTS } from '@/data/mock/ugc';

export default function PostDetailPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const post = MOCK_POSTS.find((p) => p.id === postId);
  const [comments, setComments] = useState(MOCK_COMMENTS.filter((c) => c.postId === postId));
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(post?.isLiked || false);

  if (!post) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
        <p className="text-white">게시글을 찾을 수 없습니다</p>
      </div>
    );
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: `comment${Date.now()}`,
      postId: postId,
      memberId: 'member1',
      memberName: '김철수',
      memberImage: 'https://i.pravatar.cc/150?img=1',
      content: newComment,
      createdAt: new Date().toISOString(),
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const posted = new Date(date);
    const diffMs = now.getTime() - posted.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    return `${diffDays}일 전`;
  };

  return (
    <div className="min-h-screen bg-cyber-dark pb-24">
      <Header title="게시글" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 게시글 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            {/* 헤더 */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                {post.memberImage ? (
                  <img
                    src={post.memberImage}
                    alt={post.memberName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-premium flex items-center justify-center text-white font-bold">
                    {post.memberName[0]}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="font-bold text-white">{post.memberName}</div>
                <div className="text-xs text-gray-400">{getTimeAgo(post.createdAt)}</div>
              </div>
            </div>

            {/* 내용 */}
            <p className="text-gray-300 mb-4 leading-relaxed">{post.content}</p>

            {/* 이미지 */}
            {post.images.length > 0 && (
              <div className="space-y-2 mb-4">
                {post.images.map((img, i) => (
                  <div key={i} className="rounded-lg overflow-hidden">
                    <img src={img} alt="" className="w-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* 태그 */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-electric-blue/10 text-electric-blue rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* 액션 */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center gap-2 text-gray-400 hover:text-power-pink transition-colors"
              >
                <Heart size={20} className={isLiked ? 'fill-power-pink text-power-pink' : ''} />
                <span className={isLiked ? 'text-power-pink' : ''}>
                  {post.likes + (isLiked ? 1 : 0)}
                </span>
              </button>
              <div className="flex items-center gap-2 text-gray-400">
                <MessageCircle size={20} />
                <span>{comments.length}</span>
              </div>
              <button className="flex items-center gap-2 text-gray-400 hover:text-neon-green transition-colors ml-auto">
                <Share2 size={20} />
              </button>
            </div>
          </Card>
        </motion.div>

        {/* 댓글 목록 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-bold text-white mb-3">댓글 {comments.length}</h3>
          <div className="space-y-3">
            {comments.map((comment, idx) => (
              <Card key={comment.id}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    {comment.memberImage ? (
                      <img
                        src={comment.memberImage}
                        alt={comment.memberName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-premium flex items-center justify-center text-white text-sm font-bold">
                        {comment.memberName[0]}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white text-sm">{comment.memberName}</span>
                      <span className="text-xs text-gray-500">{getTimeAgo(comment.createdAt)}</span>
                    </div>
                    <p className="text-sm text-gray-300">{comment.content}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 댓글 입력 */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[425px] mx-auto p-4 bg-cyber-dark border-t border-white/10">
        <div className="flex gap-2">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
          />
          <Button variant="energy" size="md" onClick={handleAddComment} disabled={!newComment.trim()}>
            <Send size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}Task 11.4: 챌린지 목록파일: app/feed/challenges/page.tsxtypescript'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Calendar, Users, Award, TrendingUp } from 'lucide-react';
import { MOCK_CHALLENGES } from '@/data/mock/ugc';

export default function ChallengesPage() {
  const router = useRouter();

  const statusLabels = {
    upcoming: { label: '예정', color: 'energy' },
    ongoing: { label: '진행중', color: 'growth' },
    completed: { label: '완료', color: 'premium' },
  };

  const getDaysLeft = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffMs = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="챌린지" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 챌린지 안내 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="hologram">
            <div className="text-center">
              <div className="text-4xl mb-3">🏆</div>
              <h2 className="text-xl font-bold text-white mb-2">함께하는 운동 챌린지</h2>
              <p className="text-gray-400">
                매달 새로운 챌린지에 참여하고
                <br />
                리워드를 받아보세요!
              </p>
            </div>
          </Card>
        </motion.div>

        {/* 챌린지 목록 */}
        <div className="space-y-4">
          {MOCK_CHALLENGES.map((challenge, idx) => {
            const status = statusLabels[challenge.status];
            const daysLeft = getDaysLeft(challenge.endDate);

            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.1 }}
              >
                <Card
                  variant={challenge.status === 'ongoing' ? 'hologram' : 'default'}
                  onClick={() => router.push(`/feed/challenge/${challenge.id}`)}
                >
                  {/* 썸네일 */}
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <img
                      src={challenge.thumbnailUrl}
                      alt={challenge.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 정보 */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{challenge.title}</h3>
                      <p className="text-sm text-gray-400 mb-3">{challenge.description}</p>
                    </div>
                    <Badge type={status.color as any}>{status.label}</Badge>
                  </div>

                  {/* 통계 */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 glass-dark rounded-lg">
                      <Users size={20} className="text-electric-blue mx-auto mb-1" />
                      <div className="text-sm font-bold text-white">{challenge.participants}</div>
                      <div className="text-xs text-gray-400">참여자</div>
                    </div>
                    <div className="text-center p-3 glass-dark rounded-lg">
                      <Calendar size={20} className="text-neon-green mx-auto mb-1" />
                      <div className="text-sm font-bold text-white">
                        {challenge.status === 'ongoing' ? `D-${daysLeft}` : '종료'}
                      </div>
                      <div className="text-xs text-gray-400">남은 기간</div>
                    </div>
                    <div className="text-center p-3 glass-dark rounded-lg">
                      <Award size={20} className="text-cyber-yellow mx-auto mb-1" />
                      <div className="text-sm font-bold text-white">{challenge.reward}</div>
                      <div className="text-xs text-gray-400">리워드</div>
                    </div>
                  </div>

                  {/* 기간 */}
                  <div className="text-xs text-gray-500 text-center">
                    {new Date(challenge.startDate).toLocaleDateString('ko-KR')} ~{' '}
                    {new Date(challenge.endDate).toLocaleDateString('ko-KR')}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}