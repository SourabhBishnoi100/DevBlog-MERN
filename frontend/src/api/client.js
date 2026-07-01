const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function apiFetch(endpoint, options = {}) {

    const storedAuth = localStorage.getItem("auth");

    const token = storedAuth ? JSON.parse(storedAuth).token : null;

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers ?? {}),
            ...(token && {Authorization: `Bearer ${token}`})
        },
        ...options,
    })

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
    }

    return data;
}


