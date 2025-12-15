const YOUTUBE_API_KEY = 'AIzaSyBbVuAvgcb7R8vK2fumj8MH0iNu_v7Z0n4';
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  channelTitle: string;
  publishedAt: string;
}

export interface YouTubeSearchResult {
  videos: YouTubeVideo[];
  nextPageToken?: string;
}

// 운동별 검색 쿼리 매핑
const EXERCISE_SEARCH_QUERIES: Record<string, string> = {
  'barbell squat': '바벨 스쿼트 자세 가이드',
  'deadlift': '데드리프트 올바른 자세',
  'bench press': '벤치프레스 자세 가이드',
  'pull-up': '풀업 턱걸이 자세',
  'plank': '플랭크 자세 가이드',
  'overhead press': '오버헤드프레스 어깨운동',
  'dumbbell row': '덤벨로우 등운동',
  'leg press': '레그프레스 자세',
  'romanian deadlift': '루마니안 데드리프트',
  'russian twist': '러시안 트위스트 코어운동',
  'leg raise': '레그레이즈 복근운동',
  'treadmill running': '러닝머신 달리기 자세',
  'rowing machine': '로잉머신 사용법',
  'burpee': '버피 운동 자세',
  'mountain climber': '마운틴클라이머 운동',
  'jump squat': '점프스쿼트 자세',
  'hamstring stretch': '햄스트링 스트레칭',
  'hip flexor stretch': '고관절 스트레칭',
  'cat-cow stretch': '캣카우 스트레칭',
  'lunge': '런지 운동 자세',
};

// 운동 이름으로 검색 쿼리 가져오기
export function getSearchQuery(exerciseName: string): string {
  const lowerName = exerciseName.toLowerCase();
  return EXERCISE_SEARCH_QUERIES[lowerName] || `${exerciseName} 운동 자세 가이드`;
}

// YouTube 검색 API 호출
export async function searchYouTubeVideos(
  query: string,
  maxResults: number = 3
): Promise<YouTubeSearchResult> {
  try {
    const searchParams = new URLSearchParams({
      part: 'snippet',
      q: query,
      type: 'video',
      maxResults: maxResults.toString(),
      key: YOUTUBE_API_KEY,
      regionCode: 'KR',
      relevanceLanguage: 'ko',
      videoEmbeddable: 'true',
      order: 'relevance',
    });

    const response = await fetch(`${YOUTUBE_API_BASE}/search?${searchParams}`);

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();

    const videos: YouTubeVideo[] = data.items.map((item: {
      id: { videoId: string };
      snippet: {
        title: string;
        description: string;
        thumbnails: { high?: { url: string }; medium?: { url: string }; default?: { url: string } };
        channelTitle: string;
        publishedAt: string;
      };
    }) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.high?.url ||
                    item.snippet.thumbnails.medium?.url ||
                    item.snippet.thumbnails.default?.url || '',
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
    }));

    return {
      videos,
      nextPageToken: data.nextPageToken,
    };
  } catch (error) {
    console.error('YouTube API 호출 실패:', error);
    return { videos: [] };
  }
}

// 운동 이름으로 관련 영상 검색
export async function getExerciseVideos(
  exerciseName: string,
  maxResults: number = 3
): Promise<YouTubeVideo[]> {
  const query = getSearchQuery(exerciseName);
  const result = await searchYouTubeVideos(query, maxResults);
  return result.videos;
}

// YouTube 동영상 임베드 URL 생성
export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

// YouTube 썸네일 URL 생성
export function getYouTubeThumbnailUrl(videoId: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'high'): string {
  const qualityMap = {
    default: 'default',
    medium: 'mqdefault',
    high: 'hqdefault',
    maxres: 'maxresdefault',
  };
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

// 기본 운동 영상 (API 호출 실패 시 폴백용)
export const DEFAULT_EXERCISE_VIDEOS: Record<string, YouTubeVideo> = {
  squat: {
    id: 'Dy28eq2PjcM',
    title: '스쿼트 완벽 가이드',
    description: '올바른 스쿼트 자세를 배워보세요',
    thumbnailUrl: 'https://img.youtube.com/vi/Dy28eq2PjcM/hqdefault.jpg',
    channelTitle: '피트니스 가이드',
    publishedAt: '2024-01-01',
  },
  deadlift: {
    id: 'r4MzxtBKyNE',
    title: '데드리프트 자세 교정',
    description: '허리 부상 없이 데드리프트하는 방법',
    thumbnailUrl: 'https://img.youtube.com/vi/r4MzxtBKyNE/hqdefault.jpg',
    channelTitle: '피트니스 가이드',
    publishedAt: '2024-01-01',
  },
  'bench press': {
    id: 'gRVjAtPip0Y',
    title: '벤치프레스 가이드',
    description: '가슴 운동의 기본, 벤치프레스',
    thumbnailUrl: 'https://img.youtube.com/vi/gRVjAtPip0Y/hqdefault.jpg',
    channelTitle: '피트니스 가이드',
    publishedAt: '2024-01-01',
  },
};
