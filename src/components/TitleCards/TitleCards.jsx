import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./TitleCards.css";

const TitleCards = ({ title, category }) => {

  const [movies, setMovies] = useState([]);
  const cardsRef = useRef();
  const navigate = useNavigate();   // ✅ added

  const API_KEY = import.meta.env.VITE_OMDB_KEY;

  useEffect(() => {

    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${category}`)
      .then(res => res.json())
      .then(data => {
        if (data.Response === "True") {
          setMovies(data.Search);
        }
      });

  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title}</h2>

      <div className="card-list" ref={cardsRef}>
        {movies && movies.map((movie) => (
          
          <div
            className="card"
            key={movie.imdbID}
            onClick={() => navigate(`/player/${movie.imdbID}`)}  // ✅ added
          >
            <img
              src={
                movie.Poster && movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/240x360?text=No+Image"
              }
              alt={movie.Title}
            />
            <p>{movie.Title}</p>
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