import { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");

        try {
            const response = await loginUser({
                email,
                password,
            });

            login({
                token: response.data.token,
                user: response.data.user,
            });

            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p>{error}</p>}

            <button type="submit">
                Login
            </button>
        </form>
    );
}

export default Login;