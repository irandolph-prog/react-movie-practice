import MovieCard from "../components/MovieCard";
import { useState } from "react";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");     // persist the search query in state so that it can be used to filter the movies and also to persist the value in the input field

    const movies = [
        { id: 1, title: "John Wick", release_date: 2020 },
        { id: 2, title: "Cars", release_date: 2006 },
        { id: 3, title: "Star Wars: A New Hope", release_date: 1977 },
        { id: 4, title: "2 Fast 2 Furious", release_date: 2003 },
    ];

    const handleSearch = (e) => {
        e.preventDefault();     // don't clear form on submit
        alert(searchQuery);
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

        <div className="movies-grid">
            {movies.map((movie) => (
                movie.title.toLowerCase().startsWith(searchQuery) && (
                    <MovieCard movie={movie} key={movie.id} />
                )
            ))}
        </div>
    </div>
}

export default Home