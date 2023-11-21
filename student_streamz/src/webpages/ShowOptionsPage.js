import React, { useEffect, useState } from 'react';
import "../ShowOptionsPage.css"

function ShowOrMovieOption () {

    const inputText = decodeURIComponent(window.location.href.split('/').pop());
    const queryText = inputText.replace(/ /g, '+');

    const apiKey = "e5aab5ab325195040b8c8598f9ba0a51";
    const movieUrl = `https://api.themoviedb.org/3/search/movie?query=${queryText}&api_key=${apiKey}`;
    const tvUrl = `https://api.themoviedb.org/3/search/tv?query=${queryText}&api_key=${apiKey}`;
    const imgUrl = `https://image.tmdb.org/t/p/original`;

    const [apiMovieData, setApiMovieData] = useState([]);
    const [apiTvData, setApiTvData] = useState([]);

    // Assume fetchMovieDataFromApi() is an async function that will return a Promise that will allow
    // us to parse the JSON for the movies searched
    const fetchMovieDataFromApi = async () => {
        const response = await fetch(movieUrl);
        const data = await response.json();
        setApiMovieData(data);
    };

    // Assume fetchMovieDataFromApi() is an async function that will return a Promise that will allow
    // us to parse the JSON for the shows searched
    const fetchTvDataFromApi = async () => {
        const response = await fetch(tvUrl);
        const data = await response.json();
        setApiTvData(data);
    };

    useEffect(() => {
      // Call the function to fetch the data from the API
      fetchMovieDataFromApi();
      fetchTvDataFromApi();
    }, []); // Empty dependency array to ensure the effect runs only once

    // If the data array is undefined, to keep the application from not crashing, return null
    if (apiMovieData.results === undefined || apiTvData.results === undefined) {
        return null;
    }

    // ***** Start: DEBUGGER REMOVE LATER *****
    console.log(apiMovieData.results)
    console.log(apiTvData.results)
    // ***** End: DEBUGGER REMOVE LATER *****

    return (
        // <h1>{inputText} <br/> {queryText} <br/> </h1>
        <div className='OptionBox'>
            <div className='OptionContainer'>
                <div className='OptionsGrid'>
                    {apiTvData.results.map(show => 
                    <div>
                        <a href={`?#/showinformation/${encodeURIComponent(show.id)}`}>
                            <img id="optionImg" src={imgUrl + show.poster_path} alt={show.name}/>
                        </a>
                        <p>{show.name}</p>
                        <p>{show.id}</p>
                    </div>)}
                </div>
                <div className='OptionsGrid'>
                    {apiMovieData.results.map(show => 
                    <div>
                        <a href={`?#/movieinformation/${encodeURIComponent(show.id)}`}>
                            <img id="optionImg" src={imgUrl + show.poster_path} alt={show.title}/>
                        </a>
                        <p>{show.title}</p>
                        <p>{show.id}</p>
                    </div>)}
                </div>
            </div>
        </div>
    );

}

function ShowOptionsPage() {

    useEffect(() => {
        const handleUrlChange = () => {
          // Reload the page when the URL changes
          window.location.reload();
        };
    
        // Attach the event listener to the current window
        window.addEventListener('popstate', handleUrlChange);
    
        // Cleanup the event listener when the component unmounts
        return () => {
          window.removeEventListener('popstate', handleUrlChange);
        };
      }, []); // Empty dependency array ensures the effect runs only once on component mount
    
    return (
        <>
        <ShowOrMovieOption/>
        </>
    );
}

export default ShowOptionsPage;