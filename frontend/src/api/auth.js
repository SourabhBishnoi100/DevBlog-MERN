import { apiFetch } from "./client";

export function loginUser(credentials){
    return apiFetch("/users/login", {
        method: "Post", 
        body: JSON.stringify(credentials)
    })
}

export function registerUser(userData){
    return apiFetch("/users/register", {
        method: "Post",
        body: JSON.parse(userData),
    })
}