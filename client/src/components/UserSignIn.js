import { useContext, useRef, useState } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';


const UserSignIn = () => {
    const { actions } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);

    const email = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);
   

    
    

    const handleSignIn = async (event) => {
        event.preventDefault();
        //location state for redirecting the user back to the create course page when they came from there
        
        let from = '/';

        if (location.state) {
            from = location.state.from;
        }
        
        //get the values of email and password fields
        const credentials = {
            email: email.current.value,
            password: password.current.value,
        };

        try {
            const user = await actions.signIn(credentials);
            if (!user) {
                setErrors("Sign-in was unsuccessful");
                errors(setErrors);
            } else if (user) {
                navigate(from); // Use replace to replace the history entry
            } 
        } catch (error) {
            console.log(error);
            navigate('/error');
        }
    };

    //navigate the user back to the main page if Cancel is entered
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
        <button className="button" type="submit">Sign In</button>
        <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>
      <p>Don't have a user account? Click here to <NavLink to="/signup">sign up</NavLink>!</p>
    </div>
  );
};

export default UserSignIn;