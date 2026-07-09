import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { registerUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

function Register() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
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
            const response = await registerUser(formData);

            login(response.data.user);

            navigate("/dashboard", {
                replace: true,
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto max-w-md p-6">
            <h1 className="mb-6 text-center text-3xl font-bold">
                Create Account
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded border p-3"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded border p-3"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded border p-3"
                    required
                />

                {error && (
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Creating Account..." : "Register"}
                </button>
            </form>

            <p className="mt-6 text-center text-sm">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="font-medium text-blue-600 hover:underline"
                >
                    Login
                </Link>
            </p>
        </div>
    );
}

export default Register;