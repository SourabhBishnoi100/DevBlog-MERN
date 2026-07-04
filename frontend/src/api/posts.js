import { apiFetch } from "./client.js";

export async function getPosts(page = 1) {
    return apiFetch(`/posts?page=${page}`);
}

export async function getPost(slug) {
    return apiFetch(`/posts/slug/${slug}`);
}

export async function getPostById(id) {
    return apiFetch(`/posts/${id}`);
}

export async function getMyPosts() {
    return apiFetch('/posts/me');
}

export async function createPost(postData) {
    return apiFetch("/posts", {
        method: "POST",
        body: JSON.stringify(postData),
    });
}

export async function updatePost(id, postData) {
    return apiFetch(`/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify(postData),
    });
}

export async function deletePost(id) {
    return apiFetch(`/posts/${id}`, {
        method: "DELETE",
    });
}