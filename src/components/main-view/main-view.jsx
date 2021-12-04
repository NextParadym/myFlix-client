// a requirement for creating a component
//blueprint for creating new components.
import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
//import spiritedAway from '../../images/spiritedAway.jpg'

// Exposing a component makes it available for use by other components
// The class MainView extends React.Component {...}.creates the MainView component.

//let imgPath = './images';

let  movies = [
  { _id :   "6197b6235ba878fd0afa7411", 
  Title:   "Spirited Away ", 
  Genre:  {
    Name : "Animated"
  },
  Director : {
    Name: "Hayao Miyazaki"},
  Description:   "A girl and her family visit an amusement park. The parents of the girl are turned into pigs, and she is kidnapped by ghosts. ",
  //ImagePath:  "/images/spiritedAway.jpg" },
  ImagePath:"https://images-na.ssl-images-amazon.com/images/I/71+0HKU5mJL.jpg"},

  //ImagePath: imgPath +  "spiritedAway.jpg"},
  //import spiritedAway from '../../images/spiritedAway.jpg'


  { _id :   "6197b6235ba878fd0afa7412", 
  Title:  "Harry Potter and the Sorcerer's Stone", 
  Genre:  {
    Name : "Family"
  },
  Director : {
    Name: "Chris Columbus"},
  Description: "An eleven-year old boy goes to wizard school for a year and doesn't cast a single spell onscreen the entire time.", 
  ImagePath: <img src = "/images/spiritedAway.jpg" alt = ""/> },

  { _id :   "6197bc855ba878fd0afa7418 ", 
  Title: "The Lion King", 
  Genre:  {
    Name : "Animated",
  },
  Director : {
    Name: "Rob Minkoff"},
  Description: "Animated lions perform a completely faithful rendition of Hamlet.",  
  //ImagePath: imgPath +  "theLionKing.jpg"}
  ImagePath: <img src = "/images/spiritedAway.jpg" alt = ""/> },
]

  export default class MainView extends React.Component {

        constructor() {
          super();
          this.state = {
            movies: movies,
            selectedMovie: null
          };
        }
      
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }
  //returns the visual representation of the component
  // a requirement for creating a component
//blueprint for creating new components.

  render() {
    const { movies, selectedMovie } = this.state;
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))
        }
      </div>
    );
  }
}


