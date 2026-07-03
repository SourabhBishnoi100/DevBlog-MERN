import { useState } from "react";

function PostForm({
    initialValues,
    onSubmit,
    submitText,
}) {
    const [formData, setFormData] = useState(initialValues);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const postData = {
                ...formData,
                tags: formData.tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean),
            };

            await onSubmit(postData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded border p-2"
                required
            />

            <input
                name="excerpt"
                placeholder="Excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                className="w-full rounded border p-2"
                required
            />

            <input
                name="coverImage"
                placeholder="Cover Image URL"
                value={formData.coverImage}
                onChange={handleChange}
                className="w-full rounded border p-2"
            />

            <textarea
                name="content"
                placeholder="Content"
                rows={10}
                value={formData.content}
                onChange={handleChange}
                className="w-full rounded border p-2"
                required
            />

            <input
                name="tags"
                placeholder="react, node, mongodb"
                value={formData.tags}
                onChange={handleChange}
                className="w-full rounded border p-2"
            />

            {error && (
                <p className="text-red-600">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
                {loading
                    ? "Saving..."
                    : submitText}
            </button>
        </form>
    );
}

export default PostForm;