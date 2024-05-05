import React from 'react';
import { Plus } from '@phosphor-icons/react';
import './PhotoAvatar.css';

interface Props {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  button?: boolean;
  onClick?: () => void;
}

const PhotoAvatar: React.FC<Props> = ({ src, alt, width, height, button, onClick }) => {
  const wrapperWidth = width ? width : 50;
  const wrapperHeight = height ? height : 50;

  const currentButton = button ? (
    <button
      style={{
        width: wrapperWidth * 0.12,
        height: wrapperHeight * 0.12,
        maxWidth: 40,
        maxHeight: 40,
        bottom: (width || 50) > 100 ? (width || 50) * 0.07 : 0,
        right: (height || 50) > 100 ? (height || 50) * 0.07 : 0,
      }}
      className="PhotoAvatar__buttton"
      onClick={onClick}
    >
      <Plus size={24} color="#faf5f5" />
    </button>
  ) : null;

  return (
    <div style={{ width: wrapperWidth, height: wrapperHeight }} className="PhotoAvatar">
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', borderRadius: '50%' }}
        className="PhotoAvatar__image"
      />
      {currentButton}
    </div>
  );
};

export default PhotoAvatar;
