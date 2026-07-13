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
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="mx-auto max-w-xl px-4 my-12 text-center">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900/30 dark:bg-red-950/20">
          <p className="text-sm font-medium text-red-800 dark:text-red-400">
            {error || "Article could not be found."}
          </p>
          <Link
            to="/"
            className="mt-4 inline-block text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-16">
      {/* Back Navigation Button */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <span>←</span> Back to Articles
        </Link>
      </div>

      {/* Header Metadata Meta Stack */}
      <header className="mb-8 space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            {/* Avatar Pill */}
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950 text-xs font-bold text-blue-600 dark:text-blue-400">
              {post.author?.name?.charAt(0).toUpperCase()}
            </div>
            <span className="font-semibold text-gray-900 dark:text-slate-200">
              {post.author?.name}
            </span>
          </div>
          <span>•</span>
          <time dateTime={post.createdAt}>{formattedDate}</time>
        </div>
      </header>

      {/* Display Hero Cover Image */}
      <div className="mb-10 overflow-hidden rounded-xl border border-gray-200 shadow-sm dark:border-slate-800/80">
        <img
          src={post.coverImage}
          alt={post.title}
          className="aspect-[21/9] w-full object-cover"
        />
      </div>

      {/* Narrow Content Container optimized for structural readability */}
      <div className="mx-auto max-w-4xl">
        {/* Article Content with Adaptive Typography Layer */}
        <div className="prose prose-base sm:prose-lg max-w-none whitespace-pre-wrap text-gray-800 dark:prose-invert dark:text-slate-300 prose-headings:text-gray-950 dark:prose-headings:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400">
          {post.content}
        </div>

        {/* Footer Tag List */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2 border-t border-gray-200 pt-6 dark:border-slate-800">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-slate-900 dark:text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default PostDetails;
