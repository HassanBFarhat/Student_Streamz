import { useNavigate } from 'react-router-dom';
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
            <nav class="navbar">
                <div class="container-fluid">
                    <a class="navbar-brand" id="logoContainer" href="/#">
                        <img src={logo} alt="Logo" class="logo"/>
                        Student Streamz
                    </a>
                    <br/>
                    <form class="d-flex"  role="search">
                        <input class="form-control me-2" 
                               id="searchBar" 
                               type="text" 
                               placeholder="Search" 
                               aria-label="Search" 
                               value={searchText} 
                               onChange={(e) => setSearchText(e.target.value)}/>
                        <button class="btn btn-outline-success" 
                                id="searchBtn" 
                                type="submit" 
                                onClick={handleSubmit}>
                                    Search
                        </button>
                    </form>
                    <br/>
                    <br/>
                    <div></div>
                    <a href="#/login">
                        <button class="btn btn-outline-success" id="loginBtn">Login</button>
                    </a>
                </div>
            </nav>
        </>
    );
}

export default NavBar;