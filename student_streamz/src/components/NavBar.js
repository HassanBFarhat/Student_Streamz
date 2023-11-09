import { Link } from 'react-router-dom';
import logo from '../logoimages/logo6.png';
import '../NavBar.css';


function NavBar() {

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
            <Link to="/videoinformation">
                <button>Video Information</button>
            </Link>
            <Link to="/videoplayer">
                <button>Video Player</button>
            </Link>
            <nav class="navbar">
                <div class="container-fluid">
                    <a class="navbar-brand" id="logoContainer" href="/#">
                        <img src={logo} alt="Logo" class="logo"/>
                        Student Streamz
                    </a>
                    <br/>
                    <form class="d-flex"  role="search">
                        <input class="form-control me-2" id="searchBar" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success" id="searchBtn" type="submit">Search</button>
                    
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