'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink, Youtube, Loader2 } from 'lucide-react';
import { YouTubeVideo, getExerciseVideos, getYouTubeEmbedUrl } from '@/lib/youtube';

interface YouTubeVideoPlayerProps {
  exerciseName: string;
  exerciseNameEn?: string;
}

export default function YouTubeVideoPlayer({
  exerciseName,
  exerciseNameEn
}: YouTubeVideoPlayerProps) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [showEmbed, setShowEmbed] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        // 먼저 영어 이름으로 시도, 없으면 한국어 이름으로 검색
        const searchName = exerciseNameEn || exerciseName;
        const fetchedVideos = await getExerciseVideos(searchName, 3);
        setVideos(fetchedVideos);
        if (fetchedVideos.length > 0) {
          setSelectedVideo(fetchedVideos[0]);
        }
      } catch (error) {
        console.error('영상 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [exerciseName, exerciseNameEn]);

  const handlePlayVideo = (video: YouTubeVideo) => {
    setSelectedVideo(video);
    setShowEmbed(true);
  };

  const openInYouTube = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  if (loading) {
    return (
      <div style={{
        background: 'linear-gradient(145deg, rgba(26, 26, 36, 0.95), rgba(13, 13, 18, 0.98))',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Youtube size={22} color="#FF0000" />
          <h4 style={{ fontWeight: 'bold', color: 'white', margin: 0 }}>운동 예시 영상</h4>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          color: '#9CA3AF',
        }}>
          <Loader2 size={24} className="animate-spin" style={{ marginRight: '10px' }} />
          영상을 불러오는 중...
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div style={{
        background: 'linear-gradient(145deg, rgba(26, 26, 36, 0.95), rgba(13, 13, 18, 0.98))',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Youtube size={22} color="#FF0000" />
          <h4 style={{ fontWeight: 'bold', color: 'white', margin: 0 }}>운동 예시 영상</h4>
        </div>
        <div style={{
          textAlign: 'center',
          padding: '30px',
          color: '#6B7280',
          fontSize: '14px',
        }}>
          해당 운동의 예시 영상이 없습니다
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(145deg, rgba(26, 26, 36, 0.95), rgba(13, 13, 18, 0.98))',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      padding: '24px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Youtube size={22} color="#FF0000" />
          <h4 style={{ fontWeight: 'bold', color: 'white', margin: 0 }}>운동 예시 영상</h4>
        </div>
        {selectedVideo && (
          <button
            onClick={() => openInYouTube(selectedVideo.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              background: 'rgba(255, 0, 0, 0.1)',
              border: '1px solid rgba(255, 0, 0, 0.3)',
              borderRadius: '8px',
              color: '#FF0000',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            <ExternalLink size={14} />
            YouTube에서 보기
          </button>
        )}
      </div>

      {/* Main Video Player */}
      {selectedVideo && (
        <div style={{ marginBottom: '16px' }}>
          {showEmbed ? (
            <div style={{
              position: 'relative',
              paddingTop: '56.25%', // 16:9 aspect ratio
              borderRadius: '16px',
              overflow: 'hidden',
              background: 'black',
            }}>
              <iframe
                src={`${getYouTubeEmbedUrl(selectedVideo.id)}?autoplay=1&rel=0`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <motion.div
              onClick={() => setShowEmbed(true)}
              style={{
                position: 'relative',
                paddingTop: '56.25%',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={selectedVideo.thumbnailUrl}
                alt={selectedVideo.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'rgba(255, 0, 0, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(255, 0, 0, 0.5)',
                }}>
                  <Play size={32} color="white" fill="white" />
                </div>
              </div>
              {/* Duration badge placeholder */}
              <div style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                padding: '4px 8px',
                background: 'rgba(0, 0, 0, 0.8)',
                borderRadius: '4px',
                fontSize: '12px',
                color: 'white',
              }}>
                HD
              </div>
            </motion.div>
          )}

          {/* Video Info */}
          <div style={{ marginTop: '12px' }}>
            <h5 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: 'white',
              margin: '0 0 4px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {selectedVideo.title}
            </h5>
            <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>
              {selectedVideo.channelTitle}
            </p>
          </div>
        </div>
      )}

      {/* Video List */}
      {videos.length > 1 && (
        <div>
          <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '12px' }}>관련 영상</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {videos.slice(0, 3).map((video, index) => (
              <motion.div
                key={video.id}
                onClick={() => handlePlayVideo(video)}
                style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '10px',
                  background: selectedVideo?.id === video.id
                    ? 'rgba(0, 217, 255, 0.1)'
                    : 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  border: selectedVideo?.id === video.id
                    ? '1px solid rgba(0, 217, 255, 0.3)'
                    : '1px solid transparent',
                }}
                whileHover={{ background: 'rgba(255, 255, 255, 0.08)' }}
              >
                {/* Thumbnail */}
                <div style={{
                  position: 'relative',
                  width: '100px',
                  height: '56px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0, 0, 0, 0.3)',
                  }}>
                    <Play size={20} color="white" fill="white" />
                  </div>
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: '13px',
                    fontWeight: '500',
                    color: 'white',
                    margin: '0 0 4px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {video.title}
                  </p>
                  <p style={{ fontSize: '11px', color: '#6B7280', margin: 0 }}>
                    {video.channelTitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
