import React, { useContext } from 'react';
import { NavLink, Route, Routes} from 'react-router-dom';
import UserContext from '../context/UserContext';
import UserSignOut from '../components/UserSignOut';

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
                                    <NavLink to="signup">Sign Up</NavLink>
                                </li>
                                <li>
                                    <NavLink to="signin">Sign In</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                    <Routes>
                        <Route path="signout" element={<UserSignOut />} />
                    </Routes>
                </nav>
            </div>
        </header>
    );
}

export default Header;