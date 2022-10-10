import { Component } from 'react';
import {
  ImageGalleriesItem,
  ImageGalleriesItemImage,
} from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  render() {
    const { imgURL, alt, largeImage, onToggle } = this.props;
    return (
      <ImageGalleriesItem onClick={() => onToggle(largeImage, alt)}>
        <ImageGalleriesItemImage src={imgURL} alt={alt} />
      </ImageGalleriesItem>
    );
  }
}
