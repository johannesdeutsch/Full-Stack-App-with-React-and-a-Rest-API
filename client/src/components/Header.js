import React, { useContext } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import UserContext from '../context/UserContext';
import UserSignOut from '../components/UserSignOut';

const Header = () => {
    const { user, actions } = useContext(UserContext);


    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><a href="index.html">Courses</a></h1>
                <nav>
                {user ? (
                        // If the user is authenticated, display user's name and button for signing out
                        <ul className="header--signedin">
                            <li>Welcome, {user.firstName}!</li>
                            <li>
                                <button onClick={actions.signOut}>Sign Out</button>
                            </li>
                        </ul>
                    ) : (
                        // If the user is not authenticated, display buttons for signing in and signing up
                        <ul className="header--signedout">
                            <li>
                                <NavLink to="/signup">Sign Up</NavLink>
                            </li>
                            <li>
                                <NavLink to="/signin">Sign In</NavLink>
                            </li>
                        </ul>
                    )}
                    <Routes>
                        <Route path="signout" element={<UserSignOut />} />
                    </Routes>
                </nav>
            </div>
        </header>
    );
}

export default Header;