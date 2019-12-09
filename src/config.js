const API_URL = 'https://api.themoviedb.org/3/';
let API_KEY;
let API_ACCESS_TOKEN_V4;

if (process.env.NODE_ENV !== 'production') {
  API_KEY = process.env.REACT_APP_API_KEY;
  API_ACCESS_TOKEN_V4 = process.env.REACT_APP_ACCESS_TOKEN_V4;
} else {
  API_KEY = process.env.API_KEY;
  API_ACCESS_TOKEN_V4 = process.env.ACCESS_TOKEN_V4;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

// Sizes: w300, w780, w1280, original
const BACKDROP_SIZE = 'w1280';

// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = 'w500';

export {
  API_URL,
  API_KEY,
  API_ACCESS_TOKEN_V4,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
};
