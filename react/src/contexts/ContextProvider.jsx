import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
})

// eslint-disable-next-line react/prop-types
   export const ContextProvider = ({children}) => {

    const[user, setUser] = useState({});
    const[token, _setToken] = useState(localStorage.getItem('GET_TOKEN'));

    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem('GET_TOKEN',token)
        } else {
            localStorage.removeItem('GET_TOKEN');
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
        }}>
            {children}
        </StateContext.Provider>
    )
   }

   export const useStateContext = () => useContext(StateContext);