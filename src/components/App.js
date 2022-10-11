import { Component } from 'react';

import { TailSpin } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { ScrollUPButton } from './ScrollUPButton/ScrollUPButton';
import { fetch } from '../services/image-api';
import { Modal } from './Modal/Modal';

import { AppBlock, Loader, ButtonContainer } from './App.styled';

export class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    showModal: false,
    selectImage: {},
    error: null,
  };

  scrollHeight = 0;

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }

    if (
      prevState.images !== this.state.images &&
      this.state.images.length > 20
    ) {
      setTimeout(() => {
        window.scrollTo({
          top: this.scrollHeight,
          behavior: 'smooth',
        });
      }, 500);
    }

    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchImages(this.handleClick.currentPage);
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
    });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { searchQuery, currentPage };

    this.scrollHeight = document.documentElement.scrollHeight;

    this.setState({ isLoading: true });

    fetch
      .fetchImages(options)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          //currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  toggleModal = (url, alt) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      selectImage: { url, alt },
    }));
  };

  handleClick = currentPage => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const {
      showModal,
      images,
      isLoading,
      error,
      selectImage: { url, alt },
    } = this.state;

    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

    return (
      <AppBlock>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={url} alt={alt} />
          </Modal>
        )}

        {error && <p>Oops Error! {error.message}</p>}

        <Searchbar onSubmit={this.onChangeQuery} />

        <ImageGallery images={images} onToggleModal={this.toggleModal} />

        {isLoading && (
          <Loader>
            <TailSpin type="TailSpin" color="#3f51b5" height={80} width={80} />
          </Loader>
        )}

        {shouldRenderLoadMoreButton && (
          <ButtonContainer>
            <Button loadMore={this.handleClick} />
            <ScrollUPButton />
          </ButtonContainer>
        )}
      </AppBlock>
    );
  }
}
