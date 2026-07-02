import {apiFetch} from "./client.js";

export async function getPosts(page=1){
    return apiFetch(`/posts?page=${page}`);
}

export async function getPost(slug) {
    return apiFetch(`/posts/slug/${slug}`);
}

export async function getMyPosts(){
    return apiFetch('/posts/me');
}