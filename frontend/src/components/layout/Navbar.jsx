import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <h1 className="text-xl font-bold">
          MERN Blog
        </h1>

        <div className="flex gap-6">
          <NavLink to="/" className={linkClass}>Home</NavLink>

          <NavLink to="/login" className={linkClass}>Login</NavLink>

          <NavLink to="/register" className={linkClass}>Register</NavLink>
        </div>
      </nav>
    </header>
  );
}

const linkClass = ({ isActive }) => {
  return isActive ? "font-semibold text-blue-600"
    : "text-gray-600 hover:text-black";
}