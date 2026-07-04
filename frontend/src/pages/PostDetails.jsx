import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import { getPost } from "../api/posts";

import Spinner from "../components/ui/Spinner";

function PostDetails() {
    const { slug } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await getPost(slug);
                setPost(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchPost();
    }, [slug]);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <p className="text-center text-red-600">
                {error}
            </p>
        );
    }

    if (!post) {
        return (
            <p className="text-center">
                Post not found.
            </p>
        );
    }

    return (
        <article className="mx-auto max-w-4xl p-6">

            <img
                src={post.coverImage}
                alt={post.title}
                className="mb-8 h-96 w-full rounded-xl object-cover"
            />

            <h1 className="mb-4 text-5xl font-bold">
                {post.title}
            </h1>

            <div className="mb-6 flex flex-wrap items-center gap-4 text-gray-600">

                <span>
                    By <strong>{post.author?.name}</strong>
                </span>

                <span>
                    {new Date(post.createdAt).toLocaleDateString()}
                </span>

            </div>

            <div className="mb-8 flex flex-wrap gap-2">
                {post.tags?.map((tag) => (
                    <span
                        key={tag}
                        className="rounded-full bg-gray-200 px-3 py-1 text-sm"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            <div className="prose prose-lg max-w-none whitespace-pre-wrap">
                {post.content}
            </div>

            <div className="mt-12">
                <Link
                    to="/"
                    className="font-medium text-blue-600 hover:underline"
                >
                    ← Back to Posts
                </Link>
            </div>

        </article>
    );
}

export default PostDetails;