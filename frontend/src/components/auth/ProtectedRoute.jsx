import { Navigate } from "react-router";

import { useAuth } from "../../context/AuthContext";

import Spinner from "../ui/Spinner";

function ProtectedRoute({ children }) {

    const {
        loading,
        isAuthenticated,
    } = useAuth();

    if (loading) {
        return <Spinner />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;