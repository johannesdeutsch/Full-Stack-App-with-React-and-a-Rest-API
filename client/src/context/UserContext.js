import { createContext, useState } from "react";
import Cookies from 'js-cookie';

export const UserContext = createContext(null);

export const UserProvider = (props) => {
    const cookie = Cookies.get("authenticatedUser");
    const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

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
            user.password = credentials.password;
            setAuthUser(user);
            Cookies.set("authenticatedUser", JSON.stringify(user), {expires: 1});
            return user;
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    }



    const signOutUser = () => {
        setAuthUser(null);
        Cookies.remove("authenticatedUser");
        console.log('authenticatedUser');
    }

    return (
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