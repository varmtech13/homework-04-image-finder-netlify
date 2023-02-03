/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import { TailSpin } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { ScrollUPButton } from './ScrollUPButton/ScrollUPButton';
import { fetch } from '../services/image-api';
import { Modal } from './Modal/Modal';

import { AppBlock, Loader, ButtonContainer } from './App.styled';
import { useState, useEffect, useRef } from 'react';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectImage, setSelectImage] = useState({});

  const scrollHeightRef = useRef(0);

  useEffect(() => {
    if (searchQuery) {
      fetchImages();
    }
  }, [searchQuery, currentPage]);

  useEffect(() => {
    if (images && images.length > 20) {
      setTimeout(() => {
        window.scrollTo({
          top: scrollHeightRef.current,
          behavior: 'smooth',
        });
      }, 500);
    }
  }, [images, scrollHeightRef]);

  const onChangeQuery = query => {
    setSearchQuery(query);
    setImages([]);
    setCurrentPage(1);
    setError(null);
  };

  const fetchImages = () => {
    const options = { searchQuery, currentPage };

    setIsLoading(true);

    scrollHeightRef.current = document.documentElement.scrollHeight;

    fetch
      .fetchImages(options)
      .then(images => setImages(prevState => [...prevState, ...images]))
      .catch(error => setError({ error }))
      .finally(() => setIsLoading(false));
  };

  const toggleModal = (url, alt) => {
    setShowModal(showModal => (showModal = !showModal));
    setSelectImage({ url, alt });
  };

  const handleClick = currentPage => {
    setCurrentPage(currentPage => currentPage + 1);
  };

  const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

  return (
    <AppBlock>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={selectImage.url} alt={selectImage.alt} />
        </Modal>
      )}

      {error && <p>Oops Error! {error.message}</p>}

      <Searchbar onSubmit={onChangeQuery} />

      <ImageGallery images={images} onToggleModal={toggleModal} />

      {isLoading && (
        <Loader>
          <TailSpin type="TailSpin" color="#3f51b5" height={80} width={80} />
        </Loader>
      )}

      {shouldRenderLoadMoreButton && (
        <ButtonContainer>
          <Button loadMore={handleClick} />
          <ScrollUPButton />
        </ButtonContainer>
      )}
    </AppBlock>
  );
};
