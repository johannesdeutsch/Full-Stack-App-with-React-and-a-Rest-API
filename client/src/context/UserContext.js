import { createContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = (props) => {
    const [authUser, setAuthUser] = useState(null);

    const signInUser = async (credentials) => {
        const encodedCredentials = btoa(`${credentials.email}:${credentials.password}`);

        const fetchOptions = {
            method: 'GET',
            headers: {
                Authorization: `Basic ${encodedCredentials}`
            }
        };
        
        const response = await fetch('http://localhost:5000/api/users', fetchOptions);
            console.log(response);
            if (response.status === 200) {
                const user = await response.json();
                
            } else if (response.status === 401) {

            } else {
                throw new Error();
            }
        
        const newUser = {
          firstName,
          lastName,
          emailAddress,
          password
        };
        setAuthUser(newUser);
    }
    
    const signOutUser = () => {
        setUser(null);
    }

    return(
        <UserContext.Provider value={{
            authUser, 
            actions: {
                signIn: signInUser,
                signOut: signOutUser
            }

         }}>
         {props.children}
        </UserContext.Provider>
    );
}


export default UserContext;