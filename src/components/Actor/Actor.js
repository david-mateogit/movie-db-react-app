import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { API_URL, API_KEY } from '../../config';
import Navigation from '../elements/Navigation/Navigation';
import ActorInfo from '../elements/ActorInfo/ActorInfo';
import Spinner from '../elements/Spinner/Spinner';
import './Actor.css';

const Actor = ({ match, location }) => {
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchActor = async endpoint => {
    const result = await fetch(endpoint);
    const response = await result.json();
    if (response.status_code) {
      setLoading(false);
    } else {
      setActor(response);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const endpoint = `${API_URL}person/${match.params.actorId}?api_key=${API_KEY}&language=en-US`;
    fetchActor(endpoint);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="rmdb-actor">
      {actor ? (
        <>
          <Navigation
            movie={location.movieName}
            actor={actor.name}
            id={match.params.movieId}
          />
          <ActorInfo actor={actor} />
        </>
      ) : (
        <div className="actor-not-found">
          {!actor && !loading ? <h1>No Actor Found!</h1> : null}
        </div>
      )}
      {loading ? <Spinner /> : null}
    </div>
  );
};

Actor.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Actor;
