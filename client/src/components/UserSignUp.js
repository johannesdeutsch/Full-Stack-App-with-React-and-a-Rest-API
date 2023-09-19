import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';

const UserSignUp = () => {
  const { actions } = useContext(UserContext);
  const navigate = useNavigate();

  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  const handleSignUp = async event => {
    event.preventDefault();

    if (!firstName.current.value || !lastName.current.value || !emailAddress.current.value || !password.current.value) {
      setErrors(['Please fill out every field']);
      return;
    }

    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: emailAddress.current.value,
      password: password.current.value
    }

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
        console.log(`${user.firstName} is successfully signed up and authenticated`);
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
      <ErrorsDisplay errors={errors} />
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
      <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
    </div>
  );
}

export default UserSignUp;