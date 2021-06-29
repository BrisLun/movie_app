import PropTypes from 'prop-types';
import React from "react";
import axios from "axios";
import Movie from "../components/Movies";
import "./Home.css";


// function App() {
//   return (
//     <div className="App">

//     </div>
//   );
// }

class Home extends React.Component {
    // setting default value
    state = {
        isLoading: true,
        movies: []
    };

    getMovies = async () => {
        //wait axios
        //es6
        const {
            data: {
                data: { movies }
            }
        } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by");

        // same with 'this.setState({ movies : movies })'
        this.setState({ movies, isLoading: false })
    }

    componentDidMount() {
        // setTimeout(() => {
        //   this.setState({ isLoading: false })
        // }, 6000);
        this.getMovies()
    }

    render() {
        const { isLoading, movies } = this.state;
        return (
            <section className="container">
                {isLoading
                    ? (<div className="loader">
                        <span className="loader_text">Loading...</span>
                    </div>) : (
                        <div className="movies">
                            {movies.map(movie => {
                                return (
                                    <Movie
                                        key={movie.id}
                                        id={movie.id}
                                        year={movie.year}
                                        title={movie.title}
                                        summary={movie.summary}
                                        poster={movie.medium_cover_image}
                                        genres={movie.genres} />
                                )
                            })}
                        </div>
                    )}
            </section>
        );
    }
}

export default Home;
