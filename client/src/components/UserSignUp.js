import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../context/UserContext';

const UserSignUp = () => {
    const { actions } = useContext(UserContext);
    const navigate = useNavigate();

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailAddressRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSignUp = async event => {
        event.preventDefault();
    
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailAddressRef.current.value;
        const password = passwordRef.current.value;

        try {
          const response = await axios.post('http://localhost:5000/api/users', {
            firstName,
            lastName,
            emailAddress: email,
            password,
          });
    
          if (response.status === 201) {
            // Successful sign up, you can automatically sign in the user here if needed
            actions.signIn(email, password); // Sign in the user
            navigate('/courses'); // Redirect to the list of courses
          } else {
            console.log('Error signing up:', response.data.errors);
          }
        } catch (error) {
          console.log('Error signing up:', error);
        }
    };

    return (
        <div className="form--centered">
            <h2>Sign Up</h2>

            <form onSubmit={handleSignUp}>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" ref={firstNameRef} />
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" ref={lastNameRef} />
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" ref={emailAddressRef} />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" ref={passwordRef} />
                <button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={event => { event.preventDefault(); navigate('/courses'); }}>Cancel</button>
            </form>
            <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
        </div>
    );
}

export default UserSignUp;