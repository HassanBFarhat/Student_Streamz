import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function ShowInformationPage() {

    const navigate = useNavigate();
    const handleSubmit = () => {
        // Redirect to the display page with the input text as a parameter
        navigate(`/videoplayer/tv/${encodeURIComponent(apiShowDetails.id)}/${encodeURIComponent(apiShowDetails.imdb_id)}
                  /season/${encodeURIComponent(selectedSeason)}/episode/${encodeURIComponent(selectedEpisode)}`);        
      };

    const imgUrl = `https://image.tmdb.org/t/p/original`;

    const [apiShowDetails, setApiShowDetails] = useState([]);
    const [maxSelectedEpisode, setMaxSelectedEpisode] = useState(0);
    const [minSelectedSeason, setMinSelectedSeason] = useState(0);
    const [selectedSeason, setSelectedSeason] = useState(0);
    const [selectedEpisode, setSelectedEpisode] = useState(1);

    const handleSeasonChange = (e) => {
        setMaxSelectedEpisode(apiShowDetails.seasons[selectedSeason].episode_count);
        setSelectedSeason(parseInt(e.target.value, 10));
        setSelectedEpisode(1);
    }

    const handleEpisodeChange = (e) => {
        if (minSelectedSeason !== 0) {
            setMaxSelectedEpisode(apiShowDetails.seasons[selectedSeason - 1].episode_count);
        } else {
            setMaxSelectedEpisode(apiShowDetails.seasons[selectedSeason].episode_count);
        }
        setSelectedEpisode(parseInt(e.target.value, 10));
    }
    
    useEffect(() => {
        const tvId = decodeURIComponent(window.location.href.split('/').pop());

        const apiKey = `e5aab5ab325195040b8c8598f9ba0a51`;
        const showDetailsUrl  = `https://api.themoviedb.org/3/tv/${tvId}?api_key=${apiKey}`;

        const fetchShowDetailsFromApi = async () => {
            const response = await fetch(showDetailsUrl);
            const data = await response.json();
            setApiShowDetails(data);
            setMaxSelectedEpisode(data.seasons[0].episode_count);
            setMinSelectedSeason(data.seasons[0].season_number);
            setSelectedSeason(data.seasons[0].season_number);
        };

        fetchShowDetailsFromApi();
    }, []);

    if (apiShowDetails === undefined) {
        return null;
    }

    // ****** DEBUGGER ******
    console.log("FOURTH")
    console.log(apiShowDetails);
    console.log(selectedSeason);
    console.log(selectedEpisode);
    console.log(maxSelectedEpisode);
    console.log();
    console.log(minSelectedSeason);
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
        <h1>Poster: <img src={imgUrl + apiShowDetails.poster_path} alt={apiShowDetails.name}/></h1>
        <br/>
        <label>
            Choose Season: 
            <input type="number" 
                   min={minSelectedSeason} 
                   max={apiShowDetails.number_of_seasons}
                   value={selectedSeason} 
                   onChange={handleSeasonChange}>
            </input>
        </label>
        <label>
            Choose Episode: 
            <input type="number"
                   min={1}
                   max={maxSelectedEpisode}
                   value={selectedEpisode}
                   onChange={handleEpisodeChange}
                   >
            </input>
        </label>
        <button onClick={handleSubmit}>Click to Watch Show</button>
        </>
    );
}

export default ShowInformationPage;