import {
  ImageGalleriesItem,
  ImageGalleriesItemImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ imgURL, alt, largeImage, onToggle }) => {
  return (
    <ImageGalleriesItem onClick={() => onToggle(largeImage, alt)}>
      <ImageGalleriesItemImage src={imgURL} alt={alt} />
    </ImageGalleriesItem>
  );
};
