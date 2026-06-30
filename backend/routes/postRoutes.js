import express from "express";
import { createPost, deletePost, getPostById, getPostBySlug, getPosts, updatePost } from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",protect, createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.get("/slug/:slug", getPostBySlug);
router.put("/:id",protect, updatePost);
router.delete("/:id",protect, deletePost);

export default router;
