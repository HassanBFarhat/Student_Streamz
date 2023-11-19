import React, { useEffect } from 'react';

function ShowOptionsPage() {

    useEffect(() => {
        const handleUrlChange = () => {
          // Reload the page when the URL changes
          window.location.reload();
        };
    
        // Attach the event listener to the current window
        window.addEventListener('popstate', handleUrlChange);
    
        // Cleanup the event listener when the component unmounts
        return () => {
          window.removeEventListener('popstate', handleUrlChange);
        };
      }, []); // Empty dependency array ensures the effect runs only once on component mount
    

    const inputText = decodeURIComponent(window.location.href.split('/').pop());

    return (
        <>
        <h1>ShowOptionsPage</h1>
        <h1>{inputText}</h1>
        <h1>ShowOptionsPage</h1>
        </>
    );
}

export default ShowOptionsPage;