import React from 'react';
import { Content, ContentType } from '../types';
import ImagePlayer from './ImagePlayer';
import VideoPlayer from './VideoPlayer';
import YouTubePlayer from './YouTubePlayer';

interface ContentDisplayProps {
  content: Content | null;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content }) => {
  if (!content) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center p-8 bg-black bg-opacity-50 rounded-lg shadow-2xl animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 tracking-wider">Signage Display</h2>
          <p className="text-lg text-gray-300">Waiting for content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      {(() => {
        switch (content.type) {
          case ContentType.IMAGE:
            return <ImagePlayer src={content.url} alt={content.title} />;
          case ContentType.VIDEO:
            return <VideoPlayer src={content.url} />;
          case ContentType.YOUTUBE:
            return <YouTubePlayer videoId={content.id} />;
          default:
            return <div className="text-red-500">Unsupported content type</div>;
        }
      })()}
    </div>
  );
};

export default ContentDisplay;
