import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';

import './movie-card.scss';


export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick  } = this.props;

    return (
      <Container className="movieContainer">
        <Row>
          <Col><CardGroup style = {{ width : '20rem', height: '45rem'}}>
              <Card className="movieCard text-center" >
                <Card.Img className="cardImage" variant="top" src={movie.ImagePath} />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>{movie.Description}</Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">{movie.ReleaseYear}</Card.Subtitle>
                  <Button variant="secondary" onClick={() => onMovieClick(movie)} >Detail</Button>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
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
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.date,
      Death: PropTypes.date
    }),
    Featured: PropTypes.bool,
    ImagePath: PropTypes.string.isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};