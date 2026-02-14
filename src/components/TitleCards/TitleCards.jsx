import React, { useEffect, useState, useRef } from "react";
import "./TitleCards.css";

const TitleCards = ({ title, category }) => {

  const [movies, setMovies] = useState([]);
  const cardsRef = useRef();

  // 👇 ADD IT HERE
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
          <div className="card" key={movie.imdbID}>
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



// import React, { useEffect, useRef } from 'react'
// import './TitleCards.css'
// import cards_data from '../../assets/cards/Cards_data'


// const TitleCards = ({title, category}) => {
  
//   const cardsRef = useRef();

//   const handleWheel = (event)=>{
//     event.preventDefault();
//     cardsRef.current.scrollLeft += event.deltaY;
//   }

//   useEffect(()=>{
//     cardsRef.current.addEventListener('wheel', handleWheel);
//   },[])

//   return (
//     <div className='title-cards'>
//       <h2>{title?title:"Popular on Netflix"}</h2>
//       <div className="card-list" ref={cardsRef}>
//         {cards_data.map((card, index)=>{
//           return <div className="card" key={index}>
//             <img src={card.image} alt="movieimage" />
//             <p>{card.name}</p>
//           </div>
//         })}
//       </div>
//     </div>
//   )
// }

// export default TitleCards