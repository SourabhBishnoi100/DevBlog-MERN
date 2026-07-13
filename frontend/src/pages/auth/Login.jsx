import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser(formData);
      login(response.data.user);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Shared input class styles for structural consistency across themes
  const inputClasses =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/20";

  return (
    <div className="mx-auto my-12 max-w-md px-4 sm:my-20">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/50 dark:shadow-slate-950/40">
        {/* Auth Heading */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
            Log in to your developer profile
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-slate-400">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>

          {/* Password Input Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-slate-400">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>

          {/* Dynamic Form Error Alert Box */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-900/30 dark:bg-red-950/20">
              <p className="text-xs font-medium text-red-800 dark:text-red-400">
                {error}
              </p>
            </div>
          )}

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:focus:ring-offset-slate-900"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        {/* Bottom Route Direct Navigation Link */}
        <p className="mt-8 text-center text-sm text-gray-500 dark:text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
