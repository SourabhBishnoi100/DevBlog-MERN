import { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";

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

        setError("");
        setLoading(true);

        try {
            const response = await loginUser(formData);

            login(response.data);

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
        <div className="mx-auto mt-12 max-w-md rounded-lg border p-6 shadow">
            <h1 className="mb-6 text-center text-3xl font-bold">
                Login
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <div>
                    <label className="mb-1 block">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded border p-2"
                        required
                    />
                </div>

                <div>
                    <label className="mb-1 block">
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full rounded border p-2"
                        required
                    />
                </div>

                {error && (
                    <p className="text-red-600">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-60"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default Login;