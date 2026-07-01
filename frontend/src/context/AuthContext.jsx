import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [auth, setAuth] = useState(() => {

        const storedAuth = localStorage.getItem("auth");

        if (!storedAuth) {
            return {
                token: null,
                user: null,
            };
        }

        try {
            return JSON.parse(storedAuth);
        }
        catch (error) {
            localStorage.removeItem("auth");

            return {
                token: null,
                user: null,
            };
        }
    })

    function login(authData) {
        setAuth(authData);

        localStorage.setItem(
            "auth",
            JSON.stringify(authData)
        )
    }

    function logout() {
        setAuth({
            token: null,
            user: null,
        })

        localStorage.removeItem("auth");
    }

    const value = {
        auth,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("useAuth must be used inside AuthProvider.");
    }

    return context;
}