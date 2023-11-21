// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './webpages/HomePage';
import NotFoundPage from './webpages/NotFoundPage';
import ShowSelectionPage from './webpages/ShowSelectionPage';
import MovieInformationPage from './webpages/MovieInformationPage';
import ShowInformationPage from './webpages/ShowInformationPage';
import VideoPlayerPage from './webpages/VideoPlayerPage';
import ShowOptionsPage from './webpages/ShowOptionsPage';
import Layout from './Layout'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path='/notfound' element={<NotFoundPage />} />
            <Route path='/showselection' element={<ShowSelectionPage />} />
            <Route path='/movieinformation' element={<MovieInformationPage />} />
            <Route path='/movieinformation/:movieId' element={<MovieInformationPage />} />
            <Route path='/showinformation' element={<ShowInformationPage />} />
            <Route path='/showinformation/:showId' element={<ShowInformationPage />} />
            <Route path='/videoplayer' element={<VideoPlayerPage />} />
            <Route path='/videoplayer/tv/:showIdTmdb/:showIdImdb/season/:seasonNum/episode/:episodeNum' element={<VideoPlayerPage />} />
            <Route path='/videoplayer/movie/:movieIdTmdb/:movieIdImdb' element={<VideoPlayerPage />} />
            <Route path='/showoptions' element={<ShowOptionsPage />} />
            <Route path='/showoptions/:searchText' element={<ShowOptionsPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
