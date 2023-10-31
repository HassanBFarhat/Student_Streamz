import React from 'react';
import { Link } from 'react-router-dom';
function NavBar() {

    function changed() {
        console.log("Button Clicked");
    }

    return (
        <nav>
            <ul>
                <li>
                    <Link to="../webpages/HomePage.js" onClick={changed}>HomePage</Link>
                </li>
                <li>
                    <Link to="../webpages/NotFoundPage.js" onClick={changed}>NotFoundPage</Link>
                </li>
                <li>
                    <Link to="../webpages/VideoInformationPage.js" onClick={changed}>VideoInformationPage</Link>
                </li>
                <li>
                    <Link to="../webpages/ShowSelectionPage.js" onClick={changed}>ShowSelectionPage</Link>
                </li>
                <li>
                    <Link to="../webpages/VideoPlayerPage.js" onClick={changed}>VideoPlayerPage</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;