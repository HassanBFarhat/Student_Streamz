import React, { useEffect, useState } from 'react';

function ShowInformationPage() {

    const tvId = decodeURIComponent(window.location.href.split('/').pop());

    const apiKey = `e5aab5ab325195040b8c8598f9ba0a51`;
    const showDetailsUrl  = `https://api.themoviedb.org/3/tv/${tvId}?api_key=${apiKey}`;
    const imgUrl = `https://image.tmdb.org/t/p/original`;

    const [apiShowDetails, setApiShowDetails] = useState([]);

    const fetchShowDetailsFromApi = async () => {
        const response = await fetch(showDetailsUrl);
        const data = await response.json();
        setApiShowDetails(data);
    };

    useEffect(() => {
        fetchShowDetailsFromApi();
    }, []);

    if (apiShowDetails === undefined) {
        return null;
    }

    // ****** DEBUGGER ******
    console.log(apiShowDetails);
    // ****** DEBUGGER ******    


    return (
        <>
        <h1>ShowInformationPage</h1>
        <h1>Title: {apiShowDetails.name}</h1>
        <h1>Original Title: {apiShowDetails.original_name}</h1>
        <h1>Tagline: {apiShowDetails.tagline}</h1>
        <h1>Overview: {apiShowDetails.overview}</h1>
        <h1>Air Date: {apiShowDetails.first_air_date}</h1>
        <h1>Status: {apiShowDetails.status}</h1>
        <h1># of Seasons: {apiShowDetails.number_of_seasons}</h1>
        <h1># of Episodes: {apiShowDetails.number_of_episodes}</h1>
        <h1>Poster: <img src={imgUrl + apiShowDetails.poster_path}/></h1>
        </>
    );
}

export default ShowInformationPage;