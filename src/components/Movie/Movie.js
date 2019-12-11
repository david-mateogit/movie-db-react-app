import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { API_URL, API_KEY } from '../../config';
import Navigation from '../elements/Navigation/Navigation';
import MovieInfo from '../elements/MovieInfo/MovieInfo';
import MovieInfoBar from '../elements/MovieInfoBar/MovieInfoBar';
import MovieTrailers from '../elements/MovieTrailers/MovieTrailers';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import Actors from '../elements/Actor/Actors';
import Spinner from '../elements/Spinner/Spinner';
import './Movie.css';

const Movie = ({ match, location }) => {
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState([]);
  const [actors, setActors] = useState(null);
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async endpoint => {
    const result = await fetch(endpoint);
    const response = await result.json();
    if (response.status_code) {
      setLoading(false);
    } else {
      setMovie(response);
      const trailersURL = `${API_URL}movie/${match.params.movieId}/videos?api_key=${API_KEY}`;
      const movieURL = `${API_URL}movie/${match.params.movieId}/credits?api_key=${API_KEY}`;
      const trailersResult = await fetch(trailersURL);
      const movieTrailers = await trailersResult.json();
      const trailers =
        movieTrailers.results &&
        movieTrailers.results.map(m => {
          return { trailer: m.key, site: m.site };
        });
      setTrailer(trailers);
      const actorResult = await fetch(movieURL);
      const movieCrew = await actorResult.json();
      const movieDirectors =
        movieCrew.crew &&
        movieCrew.crew.filter(member => {
          return member.job === 'Director';
        });
      setActors(movieCrew.cast);
      setDirectors(movieDirectors);
      setLoading(false);
      const localObj = {
        movie: response,
        trailers,
        actors: movieCrew.cast,
        directors: movieDirectors,
      };
      localStorage.setItem(`${match.params.movieId}`, JSON.stringify(localObj));
    }
  };

  useEffect(() => {
    const localState = JSON.parse(
      localStorage.getItem(`${match.params.movieId}`)
    );

    console.log(localState);
    if (localState && localState.movie.title) {
      setMovie(localState.movie);
      setTrailer(localState.trailers);
      setActors(localState.actors);
      setDirectors(localState.directors);
      setLoading(localState.loading);
    } else {
      setLoading(true);
      const endpoint = `${API_URL}movie/${match.params.movieId}?api_key=${API_KEY}&language=en-US`;
      fetchItems(endpoint);
    }

    // eslint-disable-next-line
  }, [])

  return (
    <div className="rmdb-movie">
      {movie && (
        <>
          <Navigation movie={movie.title || location.movieName} id={movie.id} />
          <MovieInfo movie={movie} directors={directors} actors={actors} />
          <MovieInfoBar movie={movie} />
          <MovieTrailers trailers={trailer} />
        </>
      )}
      {actors && actors.length > 1 && (
        <div className="rmdb-movie-grid">
          <FourColGrid header="Actors" loading={loading}>
            {actors.map((element, i) => {
              return <Actors key={i} actor={element} movie={movie} clickable />;
            })}
          </FourColGrid>
        </div>
      )}
      <div className="rmdb-not-found">
        {!actors && !loading ? <h1>No Movie Found!</h1> : null}
      </div>
      {loading ? <Spinner /> : null}
    </div>
  );
};

Movie.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
export default Movie;
