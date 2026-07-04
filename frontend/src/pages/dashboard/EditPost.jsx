import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { getPostById, updatePost } from "../../api/posts";

import PostForm from "../../components/posts/PostForm";

function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await getPostById(id);

                const post = response.data;

                setInitialValues({
                    title: post.title,
                    excerpt: post.excerpt,
                    coverImage: post.coverImage,
                    content: post.content,
                    tags: post.tags.join(", "),
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchPost();
    }, [id]);

    async function handleUpdate(postData) {
        await updatePost(id, postData);

        navigate("/dashboard", {
            replace: true,
        });
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="mx-auto max-w-3xl p-6">
            <h1 className="mb-6 text-3xl font-bold">
                Edit Post
            </h1>

            <PostForm
                initialValues={initialValues}
                onSubmit={handleUpdate}
                submitText="Save Changes"
            />
        </div>
    );
}

export default EditPost;