import { useNavigate } from "react-router";

import { createPost } from "../../api/posts";

import PostForm from "../../components/posts/PostForm";

function CreatePost() {
    const navigate = useNavigate();

    async function handleCreate(postData) {
        await createPost(postData);

        navigate("/dashboard", {
            replace: true,
        });
    }

    return (
        <div className="mx-auto max-w-3xl p-6">

            <h1 className="mb-6 text-3xl font-bold">
                Create New Post
            </h1>

            <PostForm
                initialValues={{
                    title: "",
                    excerpt: "",
                    coverImage: "",
                    content: "",
                    tags: "",
                }}
                onSubmit={handleCreate}
                submitText="Create Post"
            />

        </div>
    );
}

export default CreatePost;