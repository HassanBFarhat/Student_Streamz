import React, {useEffect, useState} from 'react';

function VideoBox({ showTitle, imdbID }) {
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [selectedEpisode, setSelectedEpisode] = useState(1);
    const handleSeasonChange = (event) => {
        setSelectedSeason(parseInt(event.target.value, 10));
    };

    const handleEpisodeChange = (event) => {
        setSelectedEpisode(parseInt(event.target.value, 10));
    };

    const [likeStatus, setLikeStatus] = useState(null);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:3002/api/likes/${imdbID}`)
            .then((response) => response.json())
            .then((data) => {
                setLikeStatus(data.likeStatus);
                setLikes(data.likes);
                setDislikes(data.dislikes);
            })
            .catch((error) => console.error('Error fetching like/dislike status:', error));
    }, [imdbID]);

    const handleLike = () => {
        if (likeStatus === null) {

            setLikeStatus(true);
            updateLikeStatus(true);
            setLikes(1);
            setDislikes(0);
        } else if (likeStatus === true) {

            // If already liked, remove like
            setLikeStatus(null);
            updateLikeStatus(null);
            setLikes(0);
        } else {

            setLikeStatus(true);
            updateLikeStatus(true);
            setLikes(1);
            setDislikes(0);
        }
    };

    const handleDislike = () => {
        if (likeStatus === null) {

            // If not liked/disliked yet, set as disliked
            setLikeStatus(false);
            updateLikeStatus(false);
            setLikes(0);
            setDislikes(1);
        } else if (likeStatus === false) {

            // If already disliked, remove dislike
            setLikeStatus(null);
            updateLikeStatus(null);
            setDislikes(0);
        } else {

            // If liked, update to disliked
            setLikeStatus(false);
            updateLikeStatus(false);
            setLikes(0);
            setDislikes(1);
        }
    };

    const updateLikeStatus = (likeStatus) => {
        // Update like/dislike status on the server
        fetch(`http://localhost:3002/api/likes/${imdbID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ likeStatus }),
        })
            .catch((error) => console.error('Error updating like/dislike status:', error));
    };

    return (
        <div className="video-box">
            <h2>{showTitle}</h2>

            <div className="video-container">
                <iframe
                    id={`${imdbID}-videoFrame`}
                    width="280"
                    height="160"
                    src={`https://vidsrc.xyz/embed/tv?imdb=${imdbID}&season=${selectedSeason}&episode=${selectedEpisode}`}
                    allowFullScreen
                ></iframe>

                <div className="input-boxes">
                    <label htmlFor={`${imdbID}-season`}>Enter Season:</label>
                    <input
                        type="number"
                        id={`${imdbID}-season`}
                        value={selectedSeason}
                        onChange={handleSeasonChange}
                        min={1}
                    />

                    <label htmlFor={`${imdbID}-episode`}>Enter Episode:</label>
                    <input
                        type="number"
                        id={`${imdbID}-episode`}
                        value={selectedEpisode}
                        onChange={handleEpisodeChange}
                        min={1}
                    />
                </div>
            </div>

            <div className="like-dislike-buttons">
                <button onClick={handleLike}>Like ({likes})</button>
                <button onClick={handleDislike}>Dislike ({dislikes})</button>
            </div>

        </div>
    );
}

function HomePage() {
    // Replace these with actual show data
    const shows = [
        { title: 'The Wire', imdbID: 'tt0306414' },
        { title: 'The Sopranos', imdbID: 'tt0141842' },
        { title: 'The Fall', imdbID: 'tt2294189' },
        { title: 'Breaking Bad', imdbID: 'tt0903747' },
        { title: 'House', imdbID: 'tt0412142' },
        { title: 'BoJack Horseman', imdbID: 'tt3398228' },
        { title: 'Oz', imdbID: 'tt0118421' },
        { title: 'Boardwalk Empire', imdbID: 'tt0979432' },
        { title: 'Chappelle\'s Show', imdbID: 'tt0353049' },
        { title: 'Freaks and Geeks', imdbID: 'tt0193676' },
        { title: 'The X-Files', imdbID: 'tt0106179' },
        { title: 'Spawn', imdbID: 'tt0118475' },
        { title: 'The Boondocks', imdbID: 'tt0373732' },
        { title: 'Twin Peaks', imdbID: 'tt0098936' },
        { title: 'Silicon Valley', imdbID: 'tt2575988' },
        { title: 'Mindhunter', imdbID: 'tt5290382' },
        { title: 'Family Guy', imdbID: 'tt0182576' },
        { title: 'South Park', imdbID: 'tt0121955' },
        { title: 'Cops', imdbID: 'tt0096563' },
        { title: 'Deadwood', imdbID: 'tt0348914' },
        { title: 'The Jamie Foxx Show', imdbID: 'tt0115221' },
        { title: 'Malcolm in the Middle', imdbID: 'tt0212671' },
    ];

    const username = decodeURIComponent(window.location.href.split('/').pop());

    return (
        <>
            <h1>Welcome to Student Streamz! {username} </h1>
            <div className="video-grid">
                {shows.map((show) => (
                    <VideoBox key={show.imdbID} showTitle={show.title} imdbID={show.imdbID} />
                ))}
            </div>
        </>
    );
}

export default HomePage;
