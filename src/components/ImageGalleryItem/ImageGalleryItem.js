import { Component } from 'react';

export class ImageGalleryItem extends Component {
  render() {
    const { imgURL, alt, largeImage, onToggle } = this.props;
    return (
      <li onClick={() => onToggle(largeImage, alt)}>
        <img src={imgURL} alt={alt} />
      </li>
    );
  }
}
