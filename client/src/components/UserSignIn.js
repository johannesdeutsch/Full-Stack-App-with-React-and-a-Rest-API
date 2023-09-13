import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { NavLink } from 'react-router-dom';

const UserSignIn = () => {
    const { actions } = useContext(UserContext);

    const email = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    // Event Handlers
    const handleSignIn = async (event) => {
        event.preventDefault();
        actions.signIn(email.current.value, password.current.value);


        const credentials = {
            email: email.current.value,
            password: password.current.value
        }

        

        try {
            // TODO: get User from UserContext
                // success (user !== null) -> show signout button and be signed in in header
                // failure (user === null) -> update errors state
        } catch (error) {
            console.log(error);
            navigate('/error');
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    }

    return (
        <div className="form--centered">
            <h2>Sign In</h2>

            <form onSubmit={handleSignIn}>
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" ref={email} placeholder="Email" />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" ref={password} placeholder="Password" />
                <button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
            <p>Don't have a user account? Click here to <NavLink to="sign-up">sign up</NavLink>!</p>
        </div>
    );
}

export default UserSignIn;