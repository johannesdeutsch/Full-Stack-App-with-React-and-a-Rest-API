import { useContext, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { NavLink } from 'react-router-dom';

const UserSignIn = () => {
    const { actions } = useContext(UserContext);
    const location = useLocation();
    console.log(location);

    const email = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    // Event Handlers
    const handleSignIn = async (event) => {
        event.preventDefault();
        let from = '/';
        if(location.state) {
            from = location.state?.from || '/';
        }
        actions.signIn(email.current.value, password.current.value);


        const credentials = {
            email: email.current.value,
            password: password.current.value
        }

        

        try {
            const user = await actions.signIn(credentials);
            if (!user) {
                 setErrors("Sign-in was unsuccessful");
                 errors(setErrors);
            } else if (user) {
                navigate(from);
            }
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