import express from "express";
import { createPost, deletePost, getPostBySlug, getPosts, updatePost } from "../controllers/postcontroller.js";

const router = express.Router();

router.post("/", createPost);
router.get("/", getPosts);
router.get("/:slug", getPostBySlug);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
