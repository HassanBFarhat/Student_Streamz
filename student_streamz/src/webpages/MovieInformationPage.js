import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function MovieInformationPage() {

    const navigate = useNavigate();
    const handleSubmit = () => {
        // Redirect to the display page with the input text as a parameter
        navigate(`/videoplayer/movie/${encodeURIComponent(apiMovieDetails.id)}/${encodeURIComponent(apiMovieDetails.imdb_id)}`);        
      };

    const movieId = decodeURIComponent(window.location.href.split('/').pop());

    const apiKey = `e5aab5ab325195040b8c8598f9ba0a51`;
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
    const imgUrl = `https://image.tmdb.org/t/p/original`;

    const [apiMovieDetails, setApiMovieDetails] = useState([]);

    const fetchMovieDetailsFromApi = async () => {
        const response = await fetch(movieDetailsUrl);
        const data = await response.json();
        setApiMovieDetails(data);
    };

    useEffect(() => {
        fetchMovieDetailsFromApi();
    }, []);

    if (apiMovieDetails === undefined) {
        return null;
    }

    // ****** DEBUGGER ******
    console.log(apiMovieDetails);
    // ****** DEBUGGER ******    

    return (
        <>
        <h1>MovieInformationPage</h1>
        <h1>Title: {apiMovieDetails.title}</h1>
        <h1>TagLine: {apiMovieDetails.tagline}</h1>
        <h1>Overview: {apiMovieDetails.overview}</h1>
        <h1>Runtime: {apiMovieDetails.runtime}</h1>
        <h1>Realse Date: {apiMovieDetails.release_date}</h1>
        <h1>Status: {apiMovieDetails.status}</h1>
        <h1>Budget: {apiMovieDetails.budget}</h1>
        <h1>Revenue: {apiMovieDetails.revenue}</h1>
        <h1>Poster: <img src={imgUrl + apiMovieDetails.poster_path}/></h1>
        <button onClick={handleSubmit}>Watch Movie Now</button>
        </>
    );
}

export default MovieInformationPage;