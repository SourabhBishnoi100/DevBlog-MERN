import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

function GuestRoute({ children }) {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default GuestRoute;