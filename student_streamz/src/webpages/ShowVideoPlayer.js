import React, { useEffect, useState } from 'react';
import '../VideoPlayerPage.css'

function ShowVideoPlayer() {

    const [showsData, setShowsData] = useState([]);

    const tmdbId = decodeURIComponent(window.location.href.split('/')[6]);
    const seasonNum = decodeURIComponent(window.location.href.split('/')[9]);
    const episodeNum = decodeURIComponent(window.location.href.split('/')[11]);
    const movieOrShow = decodeURIComponent(window.location.href.split('/')[5]);
    let showTitle;


    useEffect(() => {

        const availableShowsURL = `https://vidsrc.xyz/tvshows/latest/page-0.json`;

        const fetchShowsFromVidSrc = async (theApiUrl) => {
            const response = await fetch(theApiUrl);
            const data = await response.json();
            setShowsData(data);
        };
        fetchShowsFromVidSrc(availableShowsURL);

        for (let page = 1; page <= showsData.pages; page++) {
            const newUrl = `https://vidsrc.xyz/tvshows/latest/page-${page}.json`;
            fetchShowsFromVidSrc(newUrl);
            for (let showIndx = 0; showIndx < showsData.result.length; showIndx++) {
                if (tmdbId === showsData.result[showIndx].tmdb_id) {
                    showTitle = showsData.result[showIndx].title;
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
            src={`https://vidsrc.xyz/embed/tv?tmdb=${tmdbId}&season=${seasonNum}&episode=${episodeNum}`}
            title={showTitle}
            allowFullScreen
        ></iframe>
        <h1>{tmdbId}</h1>
        <h1>{seasonNum}</h1>
        <h1>{episodeNum}</h1>
        <h1>{movieOrShow}</h1>
        </>
    );
}

export default ShowVideoPlayer;