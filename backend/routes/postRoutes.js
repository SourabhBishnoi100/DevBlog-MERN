import express from "express";
import { createPost, deletePost, getMyPosts, getPostById, getPostBySlug, getPosts, updatePost } from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",protect, createPost);
router.get("/", getPosts);
router.get("/me", protect, getMyPosts);
router.get("/slug/:slug", getPostBySlug);
router.get("/:id", getPostById);
router.put("/:id",protect, updatePost);
router.delete("/:id",protect, deletePost);

export default router;
