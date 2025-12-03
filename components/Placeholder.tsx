import React from 'react';

const Placeholder: React.FC = () => {
  const PLACEHOLDER_IMAGE_URL = 'assets/deloitte-logo.png';
  return (
    <div className="w-full h-full flex items-center justify-center bg-black animate-fade-in">
      <img
        src={PLACEHOLDER_IMAGE_URL}
        alt="Company Logo"
        className="max-w-[50%] max-h-[50%] object-contain"
      />
    </div>
  );
};

export default Placeholder;
