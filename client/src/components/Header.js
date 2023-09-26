import React, { useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const Header = () => {
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
   
    
    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo">
                <NavLink to="/">Courses</NavLink></h1>
                <nav>
                
                        {/*If the user is authenticated, display user's name and button for signing out*/}
                        <ul className="header--nav">
                        {authUser ? (
                            // If the user is authenticated, display user's name and button for signing out
                            <>
                                <li>Welcome, {authUser.firstName}!</li>
                                <li>
                                    <NavLink to="/signout" className="header-nav-buttons">Sign Out</NavLink> {/*eslint-disable-line no-unused-expressions*/}
                                </li>
                            </>
                        ) : (
                            // If the user is not authenticated, display buttons for signing in and signing up
                            <>
                                <li>
                                    <NavLink to="/signup" className="header-nav-buttons">Sign Up</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/signin" className="header-nav-buttons" onClick={() => navigate('/signin', { state: { from: location.pathname } })}>Sign In</NavLink>
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