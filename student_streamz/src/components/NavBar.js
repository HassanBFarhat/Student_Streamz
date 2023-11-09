import { Link } from 'react-router-dom';

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
        </>
    );
}

export default NavBar;