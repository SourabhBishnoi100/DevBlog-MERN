import { apiFetch } from "./client";

export function loginUser(credentials) {
    return apiFetch("/users/login", {
        method: "POST",
        body: JSON.stringify(credentials)
    })
}

export function registerUser(userData) {
    return apiFetch("/users/register", {
        method: "POST",
        body: JSON.stringify(userData),
    })
}

export function getCurrentUser() {
    return apiFetch("/users/me");
}

export function logoutUser() {
    return apiFetch("/users/logout", {
        method: "POST",
    });
}