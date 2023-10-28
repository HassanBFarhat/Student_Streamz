// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './webpages/HomePage';
import NotFoundPage from './webpages/NotFoundPage';
import ShowSelectionPage from './webpages/ShowSelectionPage';
import VideoInformationPage from './webpages/VideoInformationPage';
import VideoPlayerPage from './webpages/VideoPlayerPage';

function App() {
  return (
    <div className="App">
      <h1>TEST</h1>
      <Routes>
        <Route exact path="./webpages/HomePage.js" element={<HomePage></HomePage>}></Route>
        <Route path='./webpages/NotFoundPage.js' element={<NotFoundPage></NotFoundPage>}></Route>
        <Route path='./webpages/ShowSelectionPage.js' element={<ShowSelectionPage></ShowSelectionPage>}></Route>
        <Route path='./webpages/VideoInformationPage.js' element={<VideoInformationPage></VideoInformationPage>}></Route>
        <Route path='./webpages/VideoPlayer.js' element={<VideoPlayerPage></VideoPlayerPage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
