import React, { Children, createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { ENDPOINT } from '../App';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth()
{
    return useContext(AuthContext);
}

function AuthProvider({children}) {
    const history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(null);

    let credentials = null;

    useEffect(()=>{

        credentials = {
            user_id: localStorage.user_id
        }
    
        if(!credentials.user_id)
        {
            history.push("/signup")
            return null;
        }

        try{
            axios.post(`${ENDPOINT}/login`, credentials).then( (res) => {
                if(res.status == 200)
                {
                    setAuthorized(true);
                }
                setLoading(false);
            })
        }
        catch(err)
        {
            setAuthorized(false);
            history.push("/signup");
            console.log("User is not authorized!", err);
        }
    
    }, [])


    return (
        (authorized && !isLoading) ? 
            <AuthContext.Provider value={credentials}>
                {children}
            </AuthContext.Provider>
        :
            <h1>Authorizing...</h1>
    )
}

export default AuthProvider
