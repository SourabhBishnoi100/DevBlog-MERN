import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { title, content, author, coverImage, excerpt, slug, tags } = req.body;
    const newPost = new Post({ title, content, author, coverImage, excerpt, slug, tags });
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully..." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: "Post not found..." });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedPost) res.status(404).json({ message: "Could Not Update the Post...." });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
