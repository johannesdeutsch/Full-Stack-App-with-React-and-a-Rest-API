import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Link } from 'react-router-dom';

const UserSignIn = () => {
    const { actions } = useContext(UserContext);

    const email = useRef(null);
    const password = useRef(null);

    const navigate = useNavigate();

    // Event Handlers
    const handleSignIn = (event) => {
        event.preventDefault();
        actions.signIn(email.current.value, password.current.value);
        navigate('/courses');
    }

    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/courses');
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
            <p>Don't have a user account? Click here to <Link to="/sign-up">sign up</Link>!</p>
        </div>
    );
}

export default UserSignIn;