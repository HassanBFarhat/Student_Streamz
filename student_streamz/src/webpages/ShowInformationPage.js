import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../ShowInformationPage.css'

function ShowInformationPage() {

    const navigate = useNavigate();
    const handleSubmit = () => {
        // Redirect to the display page with the input text as a parameter
        navigate(`/videoplayer/tv/${encodeURIComponent(apiShowDetails.id)}/${encodeURIComponent(apiShowDetails.imdb_id)}
                  /season/${encodeURIComponent(selectedFirstSeason)}/episode/${encodeURIComponent(selectedEpisode)}`);        
      };

    const imgUrl = `https://image.tmdb.org/t/p/original`;

    const [apiShowDetails, setApiShowDetails] = useState([]);
    const [maxSelectedEpisode, setMaxSelectedEpisode] = useState(0);
    const [selectedFirstSeason, setSelectedFirstSeason] = useState(1);
    const [selectedEpisode, setSelectedEpisode] = useState(1);

    const handleSeasonChange = (e) => {
        setMaxSelectedEpisode(apiShowDetails.seasons[selectedFirstSeason].episode_count);
        setSelectedFirstSeason(parseInt(e.target.value, 10));
        setSelectedEpisode(1);
    }

    const handleEpisodeChange = (e) => {
        if (apiShowDetails.number_of_seasons === 1) {
            setMaxSelectedEpisode(apiShowDetails.seasons[selectedFirstSeason - 1].episode_count);
        } else {
            setMaxSelectedEpisode(apiShowDetails.seasons[selectedFirstSeason].episode_count);
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
            if (data.number_of_seasons === 1) {
                setMaxSelectedEpisode(data.seasons[0].episode_count);
            } else {
                setMaxSelectedEpisode(data.seasons[1].episode_count);
            }
            if (data.number_of_seasons === 1) {
                setSelectedFirstSeason(data.seasons[0].season_number);
            } else {
                setSelectedFirstSeason(data.seasons[1].season_number);
            }
        };

        fetchShowDetailsFromApi();
    }, []);

    if (apiShowDetails === undefined) {
        return null;
    }
   
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
                           min={1} 
                           max={apiShowDetails.number_of_seasons}
                           value={selectedFirstSeason} 
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