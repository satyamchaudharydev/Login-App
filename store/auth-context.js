import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
    token: "",
    isAuthenticated: false,
    authenticate: () => {},
    logout: () => {},
})

function AuthContextProvider({children}){
    const [token, setToken] = useState();
    useEffect(() => {
        AsyncStorage.getItem("token").then(token => {
            if(token){
                setToken(token);
            }
        })
    }, [])

    function authenticate(token){
        AsyncStorage.setItem("token", token);
        setToken(token);
    }
    function logout(){
        AsyncStorage.removeItem("token");
        setToken(null);
    }
    const initialValue = {
        token: token,
        isAuthenticated: !!token,
        authenticate: authenticate,
        logout: logout,
    
    }
    return <AuthContext.Provider value={initialValue}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;