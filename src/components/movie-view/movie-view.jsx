import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import "./movie-view.scss";

//This is temporary. Remove this as soon as you add an external style sheet.
let tempHeightStyle = {
  height: '500px'
};
export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;
    return (
    <div className='movie-view'>
      <div className="movie-poster">
        <img src={movie.ImagePath} style={tempHeightStyle} crossOrigin="anonymous" />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
          <div className="movie-genre">
            <span className="label">Genre: </span>
            <span className="value">{movie.Genre.Name}</span>
            <Link to={`/genres/${movie.Genre.Name}`} className="value">{movie.Genre.Name}</Link>

          </div>
            <div className="movie-director">
              <span className="label">Director: </span>
              <span className="value">{movie.Director.Name}</span>
              <Link to={`/directors/${movie.Director.Name}`} className="value">{movie.Director.Name}</Link>
              
            </div>
              <div className="movie-description">
                <span className="label">Description: </span>
                <span className="value">{movie.Description}</span>
              </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>
                <Button variant="outline-primary" className="btn-outline-primary" value={movie._id} onClick={(e) => this.addFavoriteMovie(e, movie)}>Add to Favorites</Button>
    </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
    ImgPath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
  }).isRequired,
  Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
  }).isRequired
}).isRequired,
user: PropTypes.shape({
  Username: PropTypes.string.isRequired,
  FavoriteMovies: PropTypes.array.isRequired
}).isRequired,
setUser: PropTypes.func.isRequired,
};
