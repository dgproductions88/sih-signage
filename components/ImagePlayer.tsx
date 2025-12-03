import React from 'react';

interface ImagePlayerProps {
  src: string;
  alt: string;
}

const ImagePlayer: React.FC<ImagePlayerProps> = ({ src, alt }) => {
  return (
    <img
      key={src}
      src={src}
      alt={alt}
      className="w-full h-full object-cover animate-fade-in"
    />
  );
};

export default ImagePlayer;
