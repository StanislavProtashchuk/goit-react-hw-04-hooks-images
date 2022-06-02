
import axios from 'axios';
const API_KEY = '25715337-58cde3c0d1b1902de73779f35';
const BASE_URL = 'https://pixabay.com/api';

export default function API(name, page) {
  return axios
    .get(
      `${BASE_URL}/?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
    )
    .then(response => {
      return response.data.hits;
    });
}