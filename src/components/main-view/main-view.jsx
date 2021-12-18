//r-A requirement for creating a component
//blueprint for creating new <components className=""></components>
import React from 'react';
import axios from 'axios';
import './main-view.scss';
//import the login view into the main-view
import { LoginView } from '../login-view/login-view';
//import the registration view into the main-view
import { RegistrationView } from "../registration-view/registration-view";
//import the movie-card view into the main-view
import { MovieCard } from '../movie-card/movie-card';
//import the movie-view into the main-view
import { MovieView } from '../movie-view/movie-view';

import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';

// Exposing a component makes it available for use by other components
// The class MainView extends React.Component {...}.creates the MainView component.
export default class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null
    }
  } 
    
  componentDidMount() {
    axios.get('https://murmuring-bastion-72555.herokuapp.com/movies')
    .then(response => {
      console.log(response)
      this.setState({
        movies: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
        
  /*When a movie is clicked, this function is invoked and updates 
  the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /* When a user successfully logs in, this
  function updates the `user` property in state to that *particular user*/
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

//When a user successfully registers
onRegistration(register) {
  this.setState({
    register
  });
}

//returns the visual representation of the component
// a requirement for creating a component
//blueprint for creating new components.
render() {
  const { movies, selectedMovie, user, register } = this.state;

  if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);

  /* If there is no user, the LoginView is rendered. If there is a user
  logged in, the user details are *passed as a prop to the LoginView*/
  if (!user) return (<LoginView onLoggedIn={user => this.onLoggedIn(user)} />);

  // Before the movies have been loaded
  if (movies.length === 0) return (<div className="main-view" />);

  return (
  <div className="main-view"><Navbar bg="navColor" variant="dark" expand="lg">
              <Container fluid>
                <Navbar.Brand href="#home">myComedylix</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link href="#home">Movies</Nav.Link>
                  <Nav.Link href="#user">Profile</Nav.Link>
                  <Nav.Link href="#logout">Logout</Nav.Link>
                </Nav>
              </Container>
            </Navbar>
            <div>
              <Container>
                {selectedMovie
                  ? (
                    <Row className="justify-content-lg-center">
                      <Col lg={9} >
                        <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                      </Col>
                    </Row>
                  )
                  : (
                    <Row className="justify-content-lg-center">
                      { movies.map(movie => (
                        <Col lg={3} md={4} sm={6} >
                          <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                        </Col>
                        ))
                      }
                    </Row>
                  )  
                }
              </Container>
            </div>
</div>
  );

  }
}
