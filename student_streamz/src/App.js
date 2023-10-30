// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './webpages/HomePage';
import NotFoundPage from './webpages/NotFoundPage';
import ShowSelectionPage from './webpages/ShowSelectionPage';
import VideoInformationPage from './webpages/VideoInformationPage';
import VideoPlayerPage from './webpages/VideoPlayerPage';
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
            <Route path='/videoinformation' element={<VideoInformationPage />} />
            <Route path='/videoplayer' element={<VideoPlayerPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
