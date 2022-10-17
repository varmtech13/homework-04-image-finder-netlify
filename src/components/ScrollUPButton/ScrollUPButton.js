import { useEffect, useState } from 'react';

import { ButtonUP } from './ScrollUPButton.styled';

// scroll button appears when the page scrolls to 40px

export const ScrollUPButton = () => {
  const [id, setId] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', showScroll);

    return () => {
      window.removeEventListener('scroll', showScroll);
    };
  });

  const showScroll = () => {
    document.documentElement.scrollTop > 40 ? setId('myBtn') : setId('');
  };

  const topButtonClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <ButtonUP tupe="button" onClick={topButtonClick} id={id} title="Go to top">
      Top ↑
    </ButtonUP>
  );
};
