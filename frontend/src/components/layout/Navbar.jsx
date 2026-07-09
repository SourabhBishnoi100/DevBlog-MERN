import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
    const navigate = useNavigate();

    const {
        user,
        isAuthenticated,
        logout,
    } = useAuth();

    async function handleLogout() {
        await logout();

        navigate("/", {
            replace: true,
        });
    }

    return (
        <nav className="border-b bg-white shadow-sm">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">

                <NavLink
                    to="/"
                    className="text-xl font-bold"
                >
                    DevBlog
                </NavLink>

                <div className="flex items-center gap-6">

                    <NavLink to="/">
                        Home
                    </NavLink>

                    {isAuthenticated ? (
                        <>
                            <NavLink to="/dashboard">
                                Dashboard
                            </NavLink>

                            <span className="text-gray-600">
                                Hello, {user?.name}
                            </span>

                            <button
                                onClick={handleLogout}
                                className="text-red-600 hover:underline"
                            >
                                Logout
                            </button>

                        </>
                    ) : (
                        <>
                            <NavLink to="/login">
                                Login
                            </NavLink>

                            <NavLink to="/register">
                                Register
                            </NavLink>
                        </>
                    )}

                </div>

            </div>
        </nav>
    );
}

export default Navbar;