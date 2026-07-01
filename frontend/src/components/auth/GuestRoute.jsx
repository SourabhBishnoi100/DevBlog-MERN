import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

function GuestRoute({ children }) {
    const { auth } = useAuth();

    if (auth.token) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default GuestRoute;