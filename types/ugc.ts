export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  content: string;
  images?: string[];
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  createdAt: string;
  category: 'routine' | 'before-after' | 'motivation' | 'general';
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  content: string;
  likes: number;
  isLiked?: boolean;
  createdAt: string;
  replies?: Comment[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  participants: number;
  goal: string;
  reward: string;
  rewardPoints: number;
  status: 'ongoing' | 'upcoming' | 'completed';
  progress?: number; // percentage
  isJoined?: boolean;
  image?: string;
}
