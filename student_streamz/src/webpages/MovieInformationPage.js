import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../MovieInformationPage.css'

function MovieInformationPage() {

    const navigate = useNavigate();
    const handleSubmit = () => {
        // Redirect to the display page with the input text as a parameter
        navigate(`/videoplayer/movie/${encodeURIComponent(apiMovieDetails.id)}/${encodeURIComponent(apiMovieDetails.imdb_id)}`);        
      };

    const imgUrl = `https://image.tmdb.org/t/p/original`;

    const [apiMovieDetails, setApiMovieDetails] = useState([]);

    useEffect(() => {
        const movieId = decodeURIComponent(window.location.href.split('/').pop());

        const apiKey = `e5aab5ab325195040b8c8598f9ba0a51`;
        const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

        const fetchMovieDetailsFromApi = async () => {
            const response = await fetch(movieDetailsUrl);
            const data = await response.json();
            setApiMovieDetails(data);
        };

        fetchMovieDetailsFromApi();
    }, []);

    if (apiMovieDetails === undefined) {
        return null;
    }  

    return (
        <>
        <div className='movie-info-container'>
            <div className='poster-img-container'>
                <img id='the-poster-img' src={imgUrl + apiMovieDetails.poster_path} alt={apiMovieDetails.title}/>
            </div>
            <div className='movie-details-container'>
                <div className='movie-title-and-tagline'>
                    <h1>{apiMovieDetails.title}</h1>
                    <p id='movie-tagline'>{apiMovieDetails.tagline}</p>
                </div>
                <div className='overview-and-extra-info'>
                    <h3>Overview:</h3>
                    <p>{apiMovieDetails.overview}</p>
                    <h4>Runtime: <p id='details'>{apiMovieDetails.runtime}</p></h4>
                    <h4>Release Date: <p id='details'>{apiMovieDetails.release_date}</p></h4>
                    <h4>Status: <p id='details'>{apiMovieDetails.status}</p></h4>
                    <h4>Budget: <p id='details'>{apiMovieDetails.budget}</p></h4>
                    <h4>Revenue: <p id='details'>{apiMovieDetails.revenue}</p></h4>
                </div>
                <button onClick={handleSubmit}>Watch Movie Now</button>
            </div>
        </div>
        </>
    );
}

export default MovieInformationPage;