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
  getMovies(token) {
    axios.get('https://murmuring-bastion-72555.herokuapp.com/movies/', {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(response => {
            this.props.setMovies(response.data.sort((a, b) => b.Released - a.Released))
        })
        .catch(err => {
            console.error(err)
        });
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

onLoggedIn(authData) {
    this.setState({ user: authData.user });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', JSON.stringify(authData.user));
    this.getMovies(authData.token);
}

onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({ user: null });
}

setUser(user) {
    this.setState({ user });
    localStorage.setItem('user', JSON.stringify(user));
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
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  this.setState({
      user: null,
  });
  window.open("/", "_self");
}


//returns the visual representation of the component
// a requirement for creating a component
//blueprint for creating new components.
render() {
  const { movies, selectedMovie, name, user, username, password, email, birthday, favorites, register } = this.state;

  //if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);

  /* If there is no user, the LoginView is rendered. If there is a user
  logged in, the user details are *passed as a prop to the LoginView*/
  //if (!user) return (<LoginView onLoggedIn={user => this.onLoggedIn(user)} />);

  // Before the movies have been loaded
  //if (movies.length === 0) return (<div className="main-view" />);


  return (
          

    <Routes>
    
    <Route exact path="/" render={() => {
          console.log('login')
          if (user) return <Navbar user={user}></Navbar>
          
          if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
          
        
      }} />

      {/* Register view */}
      <Route exact path="/register" render={() => {
        if (user) return <Redirect to="/" />
          return <Col>
            <RegistrationView
            />
          </Col>
        }} />
    
    

      <div className="main-view">
  
      <Row className="main-view justify-content-md-center">
        <Route exact path="/" render={() => {
          return movies.map(movie => (
            <Col lg={3} md={6} sm={10} xs={12} className='mb-4 h-100 mx-auto'>
            <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
          </Col>
            /*<Col lg={3} md={6} sm={9} xs={6} key={m._id}>
              <MovieCard movie={m} />
            </Col>*/
          ))
        }} /> 

        <Route path="/movies/:movieId" render={({ match, history }) => {
          return <Col md={8}>
            <Navbar user={user}></Navbar>
            <MovieView movie={movies.find(m => m._id === match.params.movieId)} user={user}
          setUser={user => this.setUser(user)} onBackClick={() => history.goBack()}
            
            />
          </Col>
        }} />


         <Route path="/genres/:name" render={({ match, history }) => { 
        if ( !user ) 
        return (
          <Col>
            <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
          </Col>
        );
        if (movies.length === 0) return <div className="main-view" />;
        return <Col md={8}>
          <Navbar user={user} ></Navbar>
          <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()}/>
        </Col>
        }}  />


        <Route path="/directors/:name" render={({ match, history }) => { 
        if ( !user ) 
        return (
          <Col>
            <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
          </Col>
        );
        
        if (movies.length === 0) return <div className="main-view" />;
        return <Col md={8}>
          <Navbar user={user}></Navbar>
          <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()}/>
        </Col>
        }}  />

        {/* Path to Profile view  */}
      <Route  path="/profile" render={(history) => {
        if ( !user ) 
        return (
          <Col>
            <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
          </Col>
        );
        if (movies.length === 0) return <div className="main-view" />;
        return (
        <>
        <Col>
        <Navbar user={user}></Navbar>
        <ProfileView
          history={history}
          users={users}
          user={user}
          movies={movies} onLoggedOut={() => this.onLoggedOut()} onBackClick={() => history.goBack()}
          
          />
        </Col>
        </>)
      }} /> 
      </Row>
      </div>
    </Routes>
  );
}
}
