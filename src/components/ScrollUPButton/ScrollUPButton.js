import { Component } from 'react';

// scroll button appears when the page scrolls to 40px

export class ScrollUPButton extends Component {
  state = {
    pagePx: '',
    id: '',
  };

  componentDidMount() {
    window.addEventListener('scroll', this.showScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.showScroll);
  }

  showScroll = () => {
    document.documentElement.scrollTop > 40
      ? this.setState({ id: 'myBtn' })
      : this.setState({ id: '' });
  };

  topButtonClick = () => {
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <button
        tupe="button"
        onClick={this.topButtonClick}
        id={this.state.id}
        title="Go to top"
      >
        Top ↑
      </button>
    );
  }
}
