import axios from 'axios';

const myApiKey = '30503846-4904d0ca902c721f10c3b74b1';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const fetchImages = ({ searchQuery = '', currentPage = 1, pageSize = 12 }) => {
  return axios
    .get(
      `?key=${myApiKey}&q=${searchQuery}&pageSize=${pageSize}&page=${currentPage}`
    )
    .then(({ data }) => data.hits);
};

export const fetch = { fetchImages };
