import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './movie-card.scss';


export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick  } = this.props;

    return (
      <CardGroup style={{xs: {height: '300px'}, sm: {height: '550px'}}} >
              <Card className="movieCard text-center" >
                <Card.Img className="cardImage" variant="top" src={movie.ImagePath} crossOrigin="anonymous" />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>{movie.Description}</Card.Text>
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">Open</Button>
                  </Link>
                  <Row>
                    <Col md={{ span: 9, offset: 1 }}>
                      <Card.Text class="text-truncate">{movie.Description}</Card.Text>
                    </Col>
                  </Row>
                  <Card.Subtitle className="mb-2 text-muted">{movie.ReleaseYear}</Card.Subtitle>
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">Open</Button>
                  </Link>
                </Card.Body>
              </Card>
            </CardGroup>
    );
  }
}
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Birth: PropTypes.date,
      Death: PropTypes.date
    }),
    Featured: PropTypes.bool,
    ImagePath: PropTypes.string.isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};