import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';

//stateless component with Welcome message, SignIn, SignUp and SignOut navigation links
const Header = () => {
    const { authUser } = useContext(UserContext);

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo">
                    <NavLink to="/">Courses</NavLink>
                </h1>
                <nav>
                    {/* If the user is authenticated, display user's name and navigation link for signing out */}
                    <ul className="header--nav">
                        {authUser ? (
                            <>
                                <li>Welcome, {authUser.firstName}!</li>
                                <li>
                                    <NavLink to="/signout" className="header-nav-buttons">
                                        Sign Out
                                    </NavLink>
                                </li>
                            </>
                        ) : ( /* If the user is not authenticated, show SignUp and SignIn links */
                            <>
                                <li>
                                    <NavLink to="/signup" className="header-nav-buttons">
                                        Sign Up
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/signin"
                                        className="header-nav-buttons"
                                    >
                                        Sign In
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;