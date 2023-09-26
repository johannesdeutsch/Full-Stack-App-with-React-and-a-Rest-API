import React from 'react';

//component for unexpected errors when a 500 internal server error occours 
const UnhandledError = () => {

    return (
        <div className="wrap">
            <h2>Error</h2>
            <p>Sorry! We just encountered an unexpected error.</p>
        </div>
    )
}

export default UnhandledError;