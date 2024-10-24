import { createContext, useState} from "react";
import { loginAuth, removeAuthenticatedUser } from "../../service/AuthService";

const DataContext = createContext({})

// eslint-disable-next-line react/prop-types
export const DataContextProvider = ({children}) =>{
    const [launchId, setLaunchId] = useState()

    const [user, setUser] = useState({ isAuthenticated: false, userAuthenticated: null })

    const login = (user) => { 
        loginAuth(user)
        setUser({
            isAuthenticated: true,
            userAuthenticated: user
        })
    }

    const endSession = () => {
        removeAuthenticatedUser()
        setUser({
            isAuthenticated: false,
            userAuthenticated: null
        })
    }

    return(
        <DataContext.Provider value={{launchId, setLaunchId, user,  login, endSession}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;