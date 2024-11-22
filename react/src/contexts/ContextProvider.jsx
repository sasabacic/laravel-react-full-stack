import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {}
})

// eslint-disable-next-line react/prop-types
   export const ContextProvider = ({children}) => {

    const[user, setUser] = useState({});
    const[notification, _setNotification] = useState('');
    const[token, _setToken] = useState(localStorage.getItem('GET_TOKEN'));

    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem('GET_TOKEN',token)
        } else {
            localStorage.removeItem('GET_TOKEN');
        }
    }

    const setNotification = (message) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification('')
        }, 5000);
    };




    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            notification,
            setNotification
        }}>
            {children}
        </StateContext.Provider>
    )
   }

   export const useStateContext = () => useContext(StateContext);