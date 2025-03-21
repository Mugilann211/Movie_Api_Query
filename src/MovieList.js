import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./MovieList.css";

const fetchMovies = async (search) => {
  const API_URL = `https://www.omdbapi.com/?s=${search}&apikey=64c5f078`; 
  const { data } = await axios.get(API_URL);
  return data.Search || [];
};

const MovieList = () => {
  const [search, setSearch] = useState("Batman");
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["movies", search],
    queryFn: () => fetchMovies(search),
    enabled: false,
  });

  const handleSearch = () => {
    if (search.length < 3) {
      alert("Enter at least 3 characters.");
      return;
    }
    refetch();
  };

  return (
    <div className="movie-container">
      <h2>Search Movies</h2>
      <div className="search-box">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter movie name..."
        />
        <button onClick={handleSearch}> Search </button>
      </div>

      {isLoading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error fetching movies.</p>}
      {data?.Error && <p className="error">Error: {data.Error}</p>}

      <div className="movie-grid">
        {data?.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
            <div className="movie-info">
              <strong>{movie.Title}</strong>
              <p>{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
