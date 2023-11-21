import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import logo from '../logoimages/logo6.png';
import '../NavBar.css';

function NavBar() {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const handleSubmit = () => {
        // Redirect to the display page with the input text as a parameter
        navigate(`/showoptions/${encodeURIComponent(searchText)}`);        
      };

    return (
        <>
            <Link to="/">
                <button>Home</button>
            </Link>
            <Link to="/notfound">
                <button>Not Found</button>
            </Link>
            <Link to="/showselection">
                <button>Show Selection</button>
            </Link>
            <Link to="/movieinformation">
                <button>Movie Information</button>
            </Link>
            <Link to="/showinformation">
                <button>Show Information</button>
            </Link>
            <Link to="/videoplayer">
                <button>Video Player</button>
            </Link>
            <Link to="/showoptions">
                <button>Show Options</button>
            </Link>
            <nav class="navbar">
                <div class="container-fluid">
                    <a class="navbar-brand" id="logoContainer" href="/#">
                        <img src={logo} alt="Logo" class="logo"/>
                        Student Streamz
                    </a>
                    <br/>
                    <form class="d-flex"  role="search">
                        <input class="form-control me-2" id="searchBar" type="text" placeholder="Search" aria-label="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                        <button class="btn btn-outline-success" id="searchBtn" type="submit" onClick={handleSubmit}>Search</button>
                    
                    </form>
                    <br/>
                    <br/>
                    <div></div>
                    <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" id="customSwitch1"></input>
                        <label class="custom-control-label" for="customSwitch1">L/D</label>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;