import React, { useState, useEffect } from "react";
import "./Content.css";

function Content() {
  const [movies, setMovies] = useState([]);
  const movieToken = JSON.parse(localStorage.getItem("movieToken"));

  const saveToWatchlist = async (movieId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/users/watchlist/${movieId}`,
        {
          method: "PUT",
          headers: {
            authorization: `Bearer ${movieToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Movie saved to watchlist!");
        // You can handle additional UI updates or feedback here
      } else {
        console.error("Error saving movie to watchlist:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving movie to watchlist:", error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:8080/movies", {
      method: "GET",
      headers: {
        authorization: `Bearer ${movieToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.msg);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [movieToken]);

  return (
    <div className="content-container">
      {movies.map((movie) => (
        <div key={movie._id} className="movie-card">
          <img src={movie.img} alt={movie.title} className="movie-image" />
          <div className="movie-details">
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-genre">{movie.genre}</p>
            <p className="movie-rating">{`Rating: ${movie.rating}`}</p>
            <button
              onClick={() => saveToWatchlist(movie._id)}
              className="save-button"
            >
              Save to Watchlist
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Content;
