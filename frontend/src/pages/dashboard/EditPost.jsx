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
    navigate("/dashboard", { replace: true });
  }

  // Prompts user before discarding modifications
  function handleCancel() {
    const confirmed = window.confirm(
      "Are you sure you want to discard your edits? Edits made to this article will not be saved.",
    );
    if (confirmed) {
      navigate("/dashboard");
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="inline-flex h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600 dark:border-slate-800 dark:border-t-blue-400" />
        <p className="mt-3 text-sm font-medium text-gray-500 dark:text-slate-400">
          Loading editor state...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-xl px-4 my-12 text-center">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-950/20">
          <p className="text-sm font-medium text-red-800 dark:text-red-400">
            Failed to fetch article data: {error}
          </p>
          <button
            onClick={handleCancel}
            className="mt-3 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-12">
      {/* Page Header Header Row with Navigation Breadcrumb */}
      <header className="mb-8 border-b border-gray-200 pb-5 dark:border-slate-800">
        <div className="mb-3">
          <button
            onClick={handleCancel}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <span>←</span> Cancel Edits & Go Back
          </button>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 dark:text-white">
              Edit Post
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
              Update your content text, adjust cover images, or refine metadata
              keywords.
            </p>
          </div>

          {/* Desktop Side Cancel Button */}
          <button
            onClick={handleCancel}
            className="self-start rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel Changes
          </button>
        </div>
      </header>

      {/* Core Post Form Container */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/40">
        <PostForm
          initialValues={initialValues}
          onSubmit={handleUpdate}
          submitText="Save Modifications"
          onCancel={handleCancel} // Passed to form if you want an extra button at the bottom
        />
      </div>
    </div>
  );
}

export default EditPost;
