// a requirement for creating a component
//blueprint for creating new components.
import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// Exposing a component makes it available for use by other components
// The class MainView extends React.Component {...}.creates the MainView component.

let imgPath = './img/';

let  movies = [
  { _id :   "6197b6235ba878fd0afa7411", 
  Title:   "Spirited Away ", 
  Genre:  {
    Name : "Animated"
  },
  Director : {
    Name: "Hayao Miyazaki"},
  Description:   "A girl and her family visit an amusement park. The parents of the girl are turned into pigs, and she is kidnapped by ghosts. ",
  ImagePath:imgPath + "https://www.google.com/imgres?imgurl=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D103823133348220&imgrefurl=https%3A%2F%2Fwww.facebook.com%2FSpiritedAwayOfficial%2F&tbnid=rc0tpglcHeGV1M&vet=12ahUKEwinqvmV58n0AhWjyrsIHQrQAWgQMygLegUIARDSAQ..i&docid=WxsocM6BcaLNSM&w=400&h=500&q=spirited%20away%20movies%20images&ved=2ahUKEwinqvmV58n0AhWjyrsIHQrQAWgQMygLegUIARDSAQ"},


  { _id :   "6197b6235ba878fd0afa7411", 
  Title:  "Harry Potter and the Sorcerer's Stone", 
  Genre:  {
    Name : "Family"
  },
  Director : {
    Name: "Chris Columbus"},
  Description: "An eleven-year old boy goes to wizard school for a year and doesn't cast a single spell onscreen the entire time.", 
  ImagePath: imgPath +  "harryPotterAndTheSorcerersStone.jpg"},

  { _id :   "6197bc855ba878fd0afa7418 ", 
  Title: "The Lion King", 
  Genre:  {
    Name : "Animated",
  },
  Director : {
    Name: "Rob Minkoff"},
  Description: "Animated lions perform a completely faithful rendition of Hamlet.",  
  ImagePath: imgPath +  "theLionKing.jpg"} ]

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


