import { useNavigate, Link } from "react-router";
import { createPost } from "../../api/posts";
import PostForm from "../../components/posts/PostForm";

function CreatePost() {
  const navigate = useNavigate();

  async function handleCreate(postData) {
    await createPost(postData);
    navigate("/dashboard", { replace: true });
  }

  // Prompts user before discarding changes
  function handleCancel() {
    const confirmed = window.confirm(
      "Are you sure you want to cancel? Any unsaved changes to this article draft will be lost.",
    );
    if (confirmed) {
      navigate("/dashboard");
    }
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
            <span>←</span> Cancel & Back to Dashboard
          </button>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 dark:text-white">
              Create New Post
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
              Draft a new article, structure your insights, and share it with
              the world.
            </p>
          </div>

          {/* Desktop Side Cancel Button */}
          <button
            onClick={handleCancel}
            className="self-start rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Discard Draft
          </button>
        </div>
      </header>

      {/* Core Post Form Container */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/40">
        <PostForm
          initialValues={{
            title: "",
            excerpt: "",
            coverImage: "",
            content: "",
            tags: "",
          }}
          onSubmit={handleCreate}
          submitText="Publish Article"
          onCancel={handleCancel} // Passed to form if you want an extra button at the bottom
        />
      </div>
    </div>
  );
}

export default CreatePost;
