import { useContext, useRef, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';

const UserSignUp = () => {
  const { actions } = useContext(UserContext);
  const navigate = useNavigate();

  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);
  const [validationErrors, setValidationErrors] = useState([]);

  const handleSignUp = async event => {
    event.preventDefault();

    //sets the state for a validation error
    if (!firstName.current.value || !lastName.current.value || !emailAddress.current.value || !password.current.value) {
      setValidationErrors(['Please fill out every field']);
      return;
    }

    //gets the values of the form fields
    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: emailAddress.current.value,
      password: password.current.value
    }

    //fetch request to create a new user on the server
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(user)
    }

    try {
      const response = await fetch("http://localhost:5000/api/users", fetchOptions);

      if (response.status === 201) {
        // Automatically sign in the user after successful sign-up
        const signInCredentials = {
          email: user.emailAddress,
          password: user.password,
        };
        const signedInUser = await actions.signIn(signInCredentials);

        if (signedInUser) {
          console.log(`${user.firstName} is successfully signed up and authenticated`);

          // Redirect the user to the desired page after signing up
          navigate("/"); 
        } else {
          // Handle sign-in failure (if actions.signIn returns null)
          console.log('Sign-in after sign-up failed.');
        }
      } else if (response.status === 400) {
        const data = await response.json();
        if (data.errors) {
          setValidationErrors(data.errors);
        } else {
          throw new Error();
        }
      } else if (response.status === 500) {
        navigate('/error'); //internal server error
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      navigate("/error");
    }


  };



  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
      <ErrorsDisplay errors={validationErrors} />
      <form onSubmit={handleSignUp}>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" ref={firstName} />
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" ref={lastName} />
        <label htmlFor="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress} />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" ref={password} />
        <button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={event => { event.preventDefault(); navigate('/'); }}>Cancel</button>
      </form>
      <p>Already have a user account? Click here to <NavLink to="/signin">sign in</NavLink>!</p>
    </div>
  );
}

export default UserSignUp;