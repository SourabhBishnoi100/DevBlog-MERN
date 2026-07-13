import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  async function handleLogout() {
    await logout();
    navigate("/", { replace: true });
  }

  // Adaptable link classes that gracefully toggle between light and dark themes
  const navLinkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400 dark:border dark:border-slate-700/50"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold tracking-tight transition-transform hover:scale-105"
        >
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
            DevBlog
          </span>
        </NavLink>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" className={navLinkClasses}>
                Dashboard
              </NavLink>

              {/* Adaptive Divider */}
              <div
                className="ml-2 hidden h-6 w-px bg-gray-200 dark:bg-slate-800 sm:block"
                aria-hidden="true"
              />

              {/* User Profile Pill */}
              <div className="hidden items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 dark:border-slate-800 dark:bg-slate-900 sm:flex">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 border border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-900/50">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-slate-300">
                  {user?.name}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="ml-2 rounded-md px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/40 dark:hover:text-red-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <div
                className="ml-2 hidden h-6 w-px bg-gray-200 dark:bg-slate-800 sm:block"
                aria-hidden="true"
              />

              <NavLink
                to="/login"
                className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:shadow-blue-950/50 dark:hover:bg-blue-500 dark:focus:ring-offset-slate-950"
              >
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
