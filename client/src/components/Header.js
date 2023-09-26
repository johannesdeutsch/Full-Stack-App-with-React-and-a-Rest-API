import React, { useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const Header = () => {
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignInClick = () => {
        navigate('/signin', { state: { from: location.pathname } });
    };

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo">
                    <NavLink to="/">Courses</NavLink>
                </h1>
                <nav>
                    {/* If the user is authenticated, display user's name and button for signing out */}
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
                        ) : (
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
                                        onClick={handleSignInClick}
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