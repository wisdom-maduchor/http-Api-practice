
import React, { useCallback, useEffect, useState} from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
     
          // method 1
  // function getMoviesHandler() {
  //   fetch('https://swapi.dev/api/films/')
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const transaformedMovies = data.results.map((movieData) => {
  //         return {
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           openingText: movieData.opening_crawl,
  //           releaseDate: movieData.release_date,
  //         };
  //       });
  //       setMovies(transaformedMovies);
  //     });
  // }

          // method 2
//  async function getMovieHandler() {
//   const response = await fetch('https://imdb236.p.rapidapi.com/api/imdb/top250-movies',{
//     method: 'GET',
//     headers: {
//       'x-rapidapi-key': '4f359c7e6dmsh801471f5ca99ebbp1ab93ajsn5ee7f185a49c',
//       'x-rapidapi-host': 'imdb236.p.rapidapi.com'
//     }
//   });
//   const data = await response.json();
//     console.log(data[0].originalTitle);
//     console.log(data[0]);
//   const transformedMovie = data.map(movieData => {
//     return {
//       id: movieData.id,
//       title: movieData.originalTitle,
//       openingText: movieData.filmingLocations,
//       releaseDate: movieData.releaseDate,
//     }
//   });
//   setMovies(transformedMovie);
//  };


const GOTMoviesHandler = useCallback(async () => {
  setIsLoading(true);
  setError(null);

  try {
      const response = await fetch ('https://react-http-5e364-default-rtdb.firebaseio.com/movies.json', 
      //   {
      //   method: 'GET',
      //   headers: {
      //     'x-rapidapi-key': '0da7802b0fmshb9d92efa9e9f93cp12c6efjsne0b0e3f6e5c4',
      //     'x-rapidapi-host': 'imdb8.p.rapidapi.com'
      //     }
      // }
    );
      
      if(!response.ok){
        throw new Error('something went wrong!')
      }
      
      const data = await response.json();
      console.log(data);

      const loadedMovie = [];
      
      for(const key in data) {
        loadedMovie.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }

      // const tranformedMovie = data.d.map(movieData => {
      //   return{
      //     id: movieData.id,
      //     title: movieData.l,
      //     openingText: movieData.s,
      //     releaseDate: movieData.y
      //   }
      // });
      setMovies(loadedMovie);

  } catch (error) {
    setError(error.message);
  }
  setIsLoading(false); 
}, []);

useEffect(()=>{
  GOTMoviesHandler()
}, [GOTMoviesHandler]);

async function addMovieHandler(movie) {
  const response = await fetch ('https://react-http-5e364-default-rtdb.firebaseio.com/movies.json',{
    method: 'POST',
    body: JSON.stringify(movie),
    headers: {
      'Content-Type': 'application/json'
    },
  });

  const data = await response.json();
    console.log(movie);
}

 let content = 'No movie found';

 if(movies.length > 0) {
   content = <MoviesList movies={movies} />;
 }

 if (error) {
   content = <p>{error}</p>;
 }

 if(isLoading){
   content = <p>Loading...</p>
 }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={GOTMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>No movies found</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>} */}
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
