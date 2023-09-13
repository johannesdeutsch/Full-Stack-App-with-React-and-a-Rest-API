import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';

const Header = () => {
    const { user, actions } = useContext(UserContext);


    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><NavLink to="/">Courses</NavLink></h1>
                <nav>
                
                        {/*If the user is authenticated, display user's name and button for signing out*/}
                        <ul className="header--nav">
                        {user ? (
                            // If the user is authenticated, display user's name and button for signing out
                            <>
                                <li>Welcome, {user.firstName}!</li>
                                <li>
                                    <button onClick={actions.signOut}>Sign Out</button>
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
                                <li>
                                    <NavLink to="/signout">Sign Out</NavLink>
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