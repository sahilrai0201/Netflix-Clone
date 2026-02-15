import React, { useEffect, useState } from "react";
import "./TitleCards.css";
import { useNavigate } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const API_KEY = "aebe2c9b";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${category}&apikey=${API_KEY}`
        );

        const data = await response.json();

        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      }
    };

    fetchMovies();
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title}</h2>

      <div className="card-list">
        {movies.map((movie) => (
          <div
            className="card"
            key={movie.imdbID}
            onClick={() => navigate(`/player/${movie.imdbID}`)}
          >
            <img
              src={
                movie.Poster && movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/300x170?text=No+Image"
              }
              alt={movie.Title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/300x170?text=No+Image";
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;





// import React, { useEffect, useState, useRef } from "react";
// import "./TitleCards.css";

// const TitleCards = ({ title, category }) => {

//   const [movies, setMovies] = useState([]);
//   const cardsRef = useRef();

//   // 👇 ADD IT HERE
//   const API_KEY = import.meta.env.VITE_OMDB_KEY;

//   useEffect(() => {

//     fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${category}`)
//       .then(res => res.json())
//       .then(data => {
//         if (data.Response === "True") {
//           setMovies(data.Search);
//         }
//       });

//   }, [category]);

//   return (
//     <div className="title-cards">
//       <h2>{title}</h2>
//       <div className="card-list" ref={cardsRef}>
//         {movies && movies.map((movie) => (
//           <div className="card" key={movie.imdbID}>
//             <img
//               src={
//                 movie.Poster && movie.Poster !== "N/A"
//                   ? movie.Poster
//                   : "https://via.placeholder.com/240x360?text=No+Image"
//               }
//               alt={movie.Title}
//             />
//             <p>{movie.Title}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

// };

// export default TitleCards;