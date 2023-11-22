import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../ShowInformationPage.css'

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
        <div className='show-info-container'>
            <div className='poster-img-container'>
                <img id='the-poster-img' src={imgUrl + apiShowDetails.poster_path} alt={apiShowDetails.name}/>
            </div>
            <div className='show-details-container'>
                <div className='show-title-and-tagline'>
                    <h1>{apiShowDetails.name}</h1>
                    <p id='original-title'>({apiShowDetails.original_name})</p>
                    <p id='show-tagline'>{apiShowDetails.tagline}</p>
                </div>
                <div className='overview-and-extra-info'>
                    <h3>Overview:</h3>
                    <p>{apiShowDetails.overview}</p>
                    <h4>First Air Date: <p id='details'>{apiShowDetails.first_air_date}</p></h4>
                    <h4>Status: <p id='details'>{apiShowDetails.status}</p></h4>
                    <h4>Number of Seasons: <p id='details'>{apiShowDetails.number_of_seasons}</p></h4>
                    <h4>Number of Epidsodes: <p id='details'>{apiShowDetails.number_of_episodes}</p></h4>
                </div>
                <label>
                    Choose Season: 
                    <input type="number" 
                           min={minSelectedSeason} 
                           max={apiShowDetails.number_of_seasons}
                           value={selectedSeason} 
                           onChange={handleSeasonChange}>
                    </input>
                </label>
                <br/>
                <label>
                    Choose Episode: 
                    <input type="number"
                           min={1}
                           max={maxSelectedEpisode}
                           value={selectedEpisode}
                           onChange={handleEpisodeChange}>
                    </input>
                </label>
                <br/>
                <br/>
                <button onClick={handleSubmit}>Click to Watch Show</button>
            </div>
        </div>
        </>
    );
}

export default ShowInformationPage;