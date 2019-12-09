import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../../config';
import ActorThumb from '../ActorThumb/ActorThumb';
import './ActorInfo.css';

const ActorInfo = ({ actor }) => {
  return (
    <>
      {actor && (
        <div
          className="rmdb-actorinfo"
          style={{
            background: actor.profile_path
              ? `url(${IMAGE_BASE_URL}${BACKDROP_SIZE}${actor.profile_path})`
              : '#000',
          }}
        >
          <div className="rmdb-actorinfo-content">
            <div className="rmdb-actorinfo-thumb">
              <ActorThumb
                image={
                  actor.profile_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                    : './images/no_image.jpg'
                }
              />
            </div>
            <div className="rmdb-actorinfo-text">
              <span>
                <h1>
                  {actor.name}
                  <FontAwesome className="fa-star" name="star" size="2x" />{' '}
                </h1>
              </span>
              <h3>BIO</h3>
              <p>{actor.biography}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ActorInfo.propTypes = {
  actor: PropTypes.object.isRequired,
};

export default ActorInfo;
