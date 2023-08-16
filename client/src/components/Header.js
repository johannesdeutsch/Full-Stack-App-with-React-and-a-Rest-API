import React from 'react';

const Header = () => {



    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><a href="index.html">Courses</a></h1>
                <nav>
                {/* If the user is not authenticated: */}
                    <ul className="header--signedout">
                        <li><a href={<UserSignUp />}>Sign Up</a></li>
                        <li><a href={<UserSignIn />}>Sign In</a></li>
                    </ul>
                {/* If the user is authenticated, display user's name and button for signing out */}
                </nav>
            </div>
        </header>
    );
}

export default Header;