import { createContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = (props) => {
    const [user, setUser] = useState(null);

    const signInUser = (firstName, lastName, emailAddress, password) => {
        const newUser = {
          firstName,
          lastName,
          emailAddress,
          password
        };
        setUser(newUser);
    }
    
    const signOutUser = () => {
        setUser(null);
    }

    return(
        <UserContext.Provider value={{
            user, 
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