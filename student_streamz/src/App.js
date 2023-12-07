// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './webpages/HomePage';
import MovieInformationPage from './webpages/MovieInformationPage';
import ShowInformationPage from './webpages/ShowInformationPage';
import MovieVideoPlayer from './webpages/MovieVideoPlayer';
import ShowVideoPlayer from './webpages/ShowVideoPlayer';
import ShowOptionsPage from './webpages/ShowOptionsPage';
import LoginPage from './webpages/LoginPage';
import SignUpPage from './webpages/SignUpPage';
import Layout from './Layout'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path='/movieinformation' element={<MovieInformationPage />} />
            <Route path='/movieinformation/:movieId' element={<MovieInformationPage />} />
            <Route path='/showinformation' element={<ShowInformationPage />} />
            <Route path='/showinformation/:showId' element={<ShowInformationPage />} />
            <Route path='/videoplayer' element={<MovieVideoPlayer />} />
            <Route path='/videoplayer/tv/:showIdTmdb/:showIdImdb/season/:seasonNum/episode/:episodeNum' element={<ShowVideoPlayer />} />
            <Route path='/videoplayer/movie/:movieIdTmdb/:movieIdImdb' element={<MovieVideoPlayer />} />
            <Route path='/showoptions' element={<ShowOptionsPage />} />
            <Route path='/showoptions/:searchText' element={<ShowOptionsPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/sign_up' element={<SignUpPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
