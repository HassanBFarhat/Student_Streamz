import { Link } from 'react-router-dom';
import logo from '../logoimages/student_streamz_logo.png'

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
            <nav class="navbar bg-body-tertiary ">
                <div class="container">
                    <a class="navbar-brand" href="/">
                        <img src={logo} alt="Logo" width="40" height="40" class="logo"/>
                        Student Streamz
                    </a>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </>
    );
}

export default NavBar;