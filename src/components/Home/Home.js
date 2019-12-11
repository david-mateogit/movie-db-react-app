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

  const fetchItems = async (endpoint, caller) => {
    const result = await fetch(endpoint);
    const response = await result.json();

    if (response.results) {
      if (caller === 'searchItems') {
        setMovies([...response.results]);
        setHeroImage(response.results[0]);
      } else if (caller === 'loadMore') {
        setMovies([...movies, ...response.results]);
        setHeroImage(heroImage || response.results[0]);
      }
    }

    setLoading(false);
    setCurrentPage(response.page);
    setTotalPages(response.total_pages);
  };

  const loadMoreItems = () => {
    let endpoint = '';
    setLoading(true);
    if (searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage +
        1}`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${currentPage +
        1}`;
    }
    fetchItems(endpoint, 'loadMore');
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
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      fetchItems(endpoint, 'loadMore');
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

  const searchItems = query => {
    let endpoint;
    setLoading(true);

    setSearchTerm(query);
    if (query.length === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${query}`;
    }

    fetchItems(endpoint, 'searchItems');
  };

  const clearItems = async () => {
    const localSearch = await JSON.parse(localStorage.getItem('SearchTerm'));
    if (localSearch && localSearch.length > 1) {
      await localStorage.setItem('SearchTerm', JSON.stringify(''));
      setLoading(true);
      setSearchTerm('');
      setQuery('');
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      fetchItems(endpoint, 'searchItems');
    }
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
        <SearchBar searchItems={searchItems} />
      </div>
      <div className="rmdb-home-grid">
        <FourColGrid
          header={
            searchTerm.length > 1 || query.length > 1
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
          <LoadMoreBtn loadMoreItems={loadMoreItems} text="Load More" />
        ) : null}
      </div>
    </div>
  );
};

export default Home;
