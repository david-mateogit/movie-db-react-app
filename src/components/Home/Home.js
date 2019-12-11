import React, { useState, useEffect } from 'react';
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE,
} from '../../config';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';
import './Home.css';
import MovieThumb from '../elements/MovieThumb/MovieThumb';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [heroImage, setHeroImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');

  const createEndpoint = (type, loadMore, term) => {
    return `${API_URL}${type}?api_key=${API_KEY}&language=en-US&page=${loadMore &&
      currentPage + 1}&query=${term}`;
  };

  const fetchItems = async (endpoint, term) => {
    try {
      const response = await (await fetch(endpoint)).json();
      if (term === 'search') {
        if (searchTerm.length > 1) {
          setMovies([...movies, ...response.results]);
        } else {
          setMovies([...response.results]);
          setHeroImage(response.results[0]);
        }
      }

      if (term === 'load') {
        setMovies([...movies, ...response.results]);
        setHeroImage(movies[0] || response.results[0]);
      }

      if (term === 'clear') {
        setMovies([...response.results]);
        setHeroImage(response.results[0]);
      }

      setLoading(false);
      setCurrentPage(response.page);
      setTotalPages(response.total_pages);
    } catch (e) {
      console.log('There was an error: ', e);
    }
  };

  useEffect(() => {
    const localState = JSON.parse(localStorage.getItem('HomeState'));
    const localSearch = JSON.parse(localStorage.getItem('SearchTerm'));
    if (localSearch && localSearch.length > 1) {
      setQuery(localSearch);
    }
    if (localState && localState.movies.length > 1) {
      setMovies(localState.movies);
      setHeroImage(localState.heroImage);
      setLoading(localState.loading);
      setCurrentPage(localState.currentPage);
      setTotalPages(localState.totalPages);
    } else {
      setLoading(true);

      fetchItems(createEndpoint('movie/popular', false, ''), 'load');
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const stateObject = {
      movies,
      heroImage,
      loading,
      currentPage,
      totalPages,
    };
    if (searchTerm.length > 1) {
      localStorage.setItem('SearchTerm', JSON.stringify(searchTerm));
    }
    localStorage.setItem('HomeState', JSON.stringify(stateObject));
  }, [currentPage, heroImage, loading, movies, searchTerm, totalPages]);

  const updateItems = (loadMore, text) => {
    setMovies(loadMore ? [...movies] : []);
    setLoading(true);
    setSearchTerm(loadMore ? searchTerm : text);
    if (text || searchTerm.length > 1) {
      fetchItems(
        createEndpoint('search/movie', loadMore, text || searchTerm),
        'search'
      );
    } else {
      fetchItems(createEndpoint('movie/popular', loadMore, ''), 'load');
    }
  };

  const clearItems = async () => {
    localStorage.setItem('SearchTerm', JSON.stringify(''));
    setLoading(true);
    setSearchTerm('');
    setQuery('');
    fetchItems(createEndpoint('movie/popular', undefined, undefined), 'clear');
  };

  return (
    <div className="rmdb-home">
      <div>
        {heroImage && (
          <HeroImage
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
            title={heroImage.title}
            text={heroImage.overview}
          />
        )}
        <SearchBar searchItems={updateItems} />
      </div>
      <div className="rmdb-home-grid">
        <FourColGrid
          header={
            (searchTerm && searchTerm.length > 1) || query.length > 1
              ? 'Search Results'
              : 'Popular Movies'
          }
          loading={loading}
          clearItems={clearItems}
        >
          {movies.map((element, i) => {
            return (
              <MovieThumb
                key={i}
                clickable
                image={
                  element.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`
                    : './images/no_image.jpg'
                }
                movieId={element.id}
                movieName={element.original_title}
              />
            );
          })}
        </FourColGrid>
        {loading ? <Spinner /> : null}
        {currentPage < totalPages && !loading ? (
          <LoadMoreBtn loadMoreItems={updateItems} text="Load More" />
        ) : null}
      </div>
    </div>
  );
};

export default Home;
