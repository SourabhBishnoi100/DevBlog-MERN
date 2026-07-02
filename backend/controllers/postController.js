import Post from "../models/Post.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getPosts = asyncHandler(async (req, res, next) => {

    const page = req.query.page || 1;

    const limit = 10;

    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments();

    const posts = await Post.find().select("title slug excerpt coverImage author tags createdAt").populate("author", "name").sort({ createdAt: -1 }).skip(skip).limit(limit);


    return res.status(200).json({
        success: true,
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts,
        count: posts.length,
        data: posts,
    });
})

export const getPostById = asyncHandler(async (req, res, next) => {
    const postId = req.params.id;

    const post = await Post.findById(postId).populate("author", "name email");

    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    res.status(200).json({
        success: true,
        data: post
    })
})

export const getMyPosts = asyncHandler(async (req, res, next) => {
    const myPosts = await Post.find({ author: req.user._id }.populate("author", "name")).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: myPosts });
})

export const createPost = asyncHandler(async (req, res, next) => {
    const newPost = await Post.create({ ...req.body, author: req.user._id });

    return res.status(201).json({
        success: true,
        data: newPost
    })
})

export const deletePost = asyncHandler(async (req, res, next) => {

    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    if (post.author.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("not authorized, couldn't delete the post !");
    }

    await post.deleteOne();

    return res.status(200).json({
        success: true,
        message: "Post deleted successfully...."
    });
})

export const getPostBySlug = asyncHandler(async (req, res, next) => {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
        return res.status(404).json({ message: "Post not found..." });
    }

    return res.status(200).json({
        sucess: true,
        data: post
    });
})

export const updatePost = asyncHandler(async (req, res, next) => {

    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(404);
        throw new Error("Post not found !");
    }

    if (post.author.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("Not authorized !");
    }

    post.title = req.body.title || post.title;
    post.slug = req.body.slug || post.slug;
    post.excerpt = req.body.excerpt || post.excerpt;
    post.coverImage = req.body.coverImage || post.coverImage;
    post.content = req.body.content || post.content;
    // post.author = req.body.author || post.author;
    post.tags = req.body.tags || post.tags;


    const updatedPost = await post.save();

    return res.status(200).json({
        success: true,
        data: updatedPost
    });
});

