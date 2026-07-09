import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { getCurrentUser, logoutUser } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function initializeAuth() {

            try {
                const response = await getCurrentUser();
                setUser(response.data);

            } catch {
                setUser(null);

            } finally {
                setLoading(false);

            }
        }
        initializeAuth();

    }, []);

    function login(user) {
        setUser(user);

    }

    async function logout() {

        try {
            await logoutUser();
        } finally {
            setUser(null);
        }

    }

    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider.");
    }

    return context;
}