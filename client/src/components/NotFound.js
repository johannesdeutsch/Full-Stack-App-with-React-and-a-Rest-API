import React from 'react';


// this component shows the "Not Found" message for 404 errors, when this route didn't exist
const NotFound = () => {


    return (
        <div className="wrap">
            <h2>Not Found</h2>
            <p>Sorry! We couldn't find the page you're looking for.</p>
        </div>
    );
}

export default NotFound;
