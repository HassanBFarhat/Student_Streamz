import React, { useEffect, useState } from 'react';
import '../VideoPlayerPage.css'

function MovieVideoPlayer() {

    const [moviesData, setMoviesData] = useState([]);

    const imdbId = decodeURIComponent(window.location.href.split('/').pop());
    const tmdbId = decodeURIComponent(window.location.href.split('/')[6]);
    const movieOrShow = decodeURIComponent(window.location.href.split('/')[5]);
    let movieTitle;


    useEffect(() => {

        const availableMoviesURL = `https://vidsrc.xyz/movies/latest/page-0.json`;

        const fetchMoviesFromVidSrc = async (theApiUrl) => {
            const response = await fetch(theApiUrl);
            const data = await response.json();
            setMoviesData(data);
        };
        fetchMoviesFromVidSrc(availableMoviesURL);

        for (let page = 1; page <= moviesData.pages; page++) {
            const newUrl = `https://vidsrc.xyz/movies/latest/page-${page}.json`;
            fetchMoviesFromVidSrc(newUrl);
            for (let movieIndx = 0; movieIndx < moviesData.result.length; movieIndx++) {
                if (imdbId === moviesData.result[movieIndx].imdb_id 
                    || tmdbId === moviesData.result[movieIndx].tmdb_id) {
                    movieTitle = moviesData.result[movieIndx].title;
                    return;
                }
            }
        }
    }, []);


    return (
        <>
        <h1>VideoPlayerPage</h1>
        <iframe
            id='video-player'
            src={ (imdbId === null) ? `https://vidsrc.xyz/embed/movie?tmdb=${tmdbId}` : `https://vidsrc.xyz/embed/movie?imdb=${imdbId}`}
            title={movieTitle}
            allowFullScreen
        ></iframe>
        <h1>{imdbId}</h1>
        <h1>{tmdbId}</h1>
        <h1>{movieOrShow}</h1>
        </>
    );
}

export default MovieVideoPlayer;