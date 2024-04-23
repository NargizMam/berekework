import React from 'react';

export interface Props {
  id?: string;
  image?: string;
  video?: string;
}

const GalleryVideoCardItem: React.FC<Props> = ({ image, video }) => {
  return image ? (
    <div className="GalleryVideoBlock__image-wrapper">
      <img src={image} alt="image" className="GalleryVideoBlock__image" />
    </div>
  ) : (
    <video controls className="GalleryVideoBlock__media">
      <source src={video} type="video/mp4" className="GalleryVideoBlock__media" />
      Ваш браузер не поддерживает видео в формате mp4.
    </video>
  );
};

export default GalleryVideoCardItem;
