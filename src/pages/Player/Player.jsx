import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';

const Player = () => {

  const { id } = useParams();        // ✅ get movie id from URL
  const navigate = useNavigate();    // ✅ for back button
  const [movie, setMovie] = useState(null);

  const API_KEY = import.meta.env.VITE_OMDB_KEY;

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
      });
  }, [id]);

  return (
    <div className='player'>

      {/* Back Button */}
      <img 
        src={back_arrow_icon} 
        alt="backArrowIcon"
        onClick={() => navigate(-1)}
        style={{ cursor: "pointer" }}
      />

      {/* Trailer (Still Hardcoded) */}
      <iframe 
        width='90%' 
        height='90%' 
        src='https://www.youtube.com/embed/399Ez7WHK5s'
        frameBorder='0'
        allow="autoplay; encrypted-media"
        allowFullScreen>
      </iframe>

      {/* Real Movie Info */}
      {movie && (
        <div className="player-info">
          <p><strong>Released:</strong> {movie.Released}</p>
          <p><strong>Title:</strong> {movie.Title}</p>
          <p><strong>Type:</strong> {movie.Type}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
        </div>
      )}

    </div>
  )
}

export default Player;






// import React from 'react'
// import './Player.css'
// import back_arrow_icon from '../../assets/back_arrow_icon.png'

// const Player = () => {
//   return (
//     <div className='player'>
//       <img src={back_arrow_icon} alt="backArrowIcon" />
//       <iframe 
//         width='90%' 
//         height='90%' 
//         src='https://www.youtube.com/embed/YQQD67N5pi0?start=6116'
//         frameBorder='0'
//         allow="autoplay; encrypted-media"
//         allowFullScreen>
//       </iframe>

//       <div className="player-info">
//         <p>Published Date</p>
//         <p>Name</p>
//         <p>Type</p>
//       </div>  
//     </div>
//   )
// }

// export default Player