import '../css/Home.css'
import MovieCard from "../components/MovieCard";
import { searchMovies, getPopularMovies } from '../services/api';
import { useState, useEffect } from "react";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");     // persist the search query in state so that it can be used to filter the movies and also to persist the value in the input field
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies...");
            }
            finally {
                setLoading(false);
            }
        }
        loadPopularMovies();
    }, []);    // runs once when the component mounts, fetches popular movies and sets them in state

    const handleSearch = async (e) => {
        e.preventDefault();     // don't clear form on submit
        if(!searchQuery.trim()) return;
        if(loading) return;

        setLoading(true);
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (err) {
            console.log(err);
            setError("Failed to search movies...")
        } finally {
            setLoading(false);
        }

        setSearchQuery("");
    };


    return <div className="Home">
        <form onSubmit={handleSearch} className="search-form">
            <input
                type="text"
                placeholder="Search for Movies..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}    // state changes, whole component re-rendered
            />
            <button type="submit" className="search-button">Search</button>
        </form>

        {error && <div className='error-message'>{error}</div>}

        {loading ? (
            <div className='loading'>Loading...</div>
        ) : (<div className="movies-grid">
            {movies.map(
                (movie) => (
                    (<MovieCard movie={movie} key={movie.id} />)
                )
            )}
        </div>)}
    </div>
}

export default Home