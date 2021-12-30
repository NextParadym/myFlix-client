//r-A requirement for creating a component
//blueprint for creating new <components className=""></components>
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Redirect } from "react-router-dom";
import './main-view.scss';
//import the login view into the main-view
import { LoginView } from '../login-view/login-view';
//import the registration view into the main-view
import { RegistrationView } from "../registration-view/registration-view";
//import the movie-card view into the main-view
import { MovieCard } from '../movie-card/movie-card';
//import the movie-view into the main-view
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from "../profile-view/profile-view.jsx";
import { NavBarView } from "../navbar-view/navbar-view";
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
      register: null,
      Description:null,
      Movies:null,
    };
  } 
  getUsers(token) {
    axios.get(`https://murmuring-bastion-72555.herokuapp.com/users/`, {
        headers: { Authorization: `Bearer ${token}` },
    })
        .then((response) => {
            this.setState({
                users: response.data,
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}
  getMovies(token) {
    axios.get('https://murmuring-bastion-72555.herokuapp.com/movies/', {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
          movies: response.data
      });
  })
  .catch(function (error) {
      console.log(error);
  });
}

componentDidMount() {
  let accessToken = localStorage.getItem('token');
  if (accessToken !== null) {
    this.setState({
      user: localStorage.getItem('user')
    });
    this.getMovies(accessToken);
  }
}

/*When a movie is clicked, this function is invoked and updates 
  the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

//When a user successfully registers
onRegistration(register) {
  this.setState({
    register
  });
}

/* When a user successfully logs in, this
function updates the `user` property in state to that *particular user*/
onLoggedIn(authData) {
  console.log(authData);
  this.setState({
      user: authData.user.Username,
  });

  localStorage.setItem("token", authData.token);
  localStorage.setItem("user", authData.user.Username);
  this.getMovies(authData.token);
}

onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState
    ({ user: null
    });
    window.open("/", "_self");
  }

//returns the visual representation of the component
// a requirement for creating a component
//blueprint for creating new components.

render() {
  const { movies, user, users } = this.state;
  
  return (
  <Router>
    <NavBarView />
    <br />
    <br />
    <br />
    <Row className="main-view justify-content-md-center">
        <Route exact path="/" render={() => {
            if (!user) return <Col> <LoginView onLoggedIn={(user) => this.onLoggedIn(user)}
            />
            
            <RegistrationView />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
                return movies.map((m) =>(
                <Col lg={3} md={6} sm={10} xs={12} className='mb-4 h-100 mx-auto' >
                  <MovieCard key={m._id} movie={m} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                </Col>
              ));}} 
        />

        <Route path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
        }} />

        <Route path="/directors/:name"
                        render={({ match, history }) => {
                            if (!user)
                                return (
                                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                );
                            if (movies.length === 0) return <div className="main-view" />;
                            return (
                                <Col md={8}>
                                    <DirectorView
                                        Director={movies.find((m) => m.Director.Name === match.params.name
                                        ).Director
                                        }
                                        movies={movies}
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            );
                        }}
        />
                    
        <Route path="/genres/:name"
                        render={({ match, history }) => {
                            if (!user)
                                return (
                                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                );
                            if (movies.length === 0) return <div className="main-view" />;
                            return (
                                <Col md={8}>
                                    <GenreView
                                        movies={movies}
                                        Genre={movies.find((m) => m.Genre.Name === match.params.name
                                        ).Genre
                                        }
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            );
        }}
        />
        <Route exact path="/users/:Username"
                        render={({ match, history }) => {
                            if (!user)
                                return (
                                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                );
                            if (movies.length === 0) return <div className="main-view" />;
                            return (
                                <ProfileView
                                    history={history}
                                    movies={movies}
                                    users={users}
                                    user={user}
                                    onBackClick={() => history.goBack()}
                                />
                            );
      }}
      /></Row>
</Router>
  );
  }
}




