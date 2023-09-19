import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';

const Header = () => {
    const { authUser } = useContext(UserContext);
    


    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><NavLink to="/">Courses</NavLink></h1>
                <nav>
                
                        {/*If the user is authenticated, display user's name and button for signing out*/}
                        <ul className="header--nav">
                        {authUser ? (
                            // If the user is authenticated, display user's name and button for signing out
                            <>
                                <li>Welcome, {authUser.firstName}!</li>
                                <li>
                                    <NavLink to="/signout">Sign Out</NavLink>
                                </li>
                            </>
                        ) : (
                            // If the user is not authenticated, display buttons for signing in and signing up
                            <>
                                <li>
                                    <NavLink to="/signup">Sign Up</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/signin">Sign In</NavLink>
                                </li>
                                
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;