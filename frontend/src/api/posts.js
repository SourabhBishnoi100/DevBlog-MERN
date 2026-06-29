import {apiFetch} from "./client.js";

export async function getPosts(page=1){
    return apiFetch(`/posts?page=${page}`);
}