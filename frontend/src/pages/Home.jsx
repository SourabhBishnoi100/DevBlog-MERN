import { useEffect, useState } from "react";
import { getPosts } from "../api/posts.js";
import PostCard from "../components/posts/PostCard.jsx";
import Spinner from "../components/ui/Spinner.jsx";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const response = await getPosts(page);
        setPosts(response.data);
        setTotalPages(response.totalPages);

        if (page !== response.currentPage) {
          setPage(response.currentPage);
          return;
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, [page]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-xl px-4 my-12 text-center">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-950/20">
          <p className="text-sm font-medium text-red-800 dark:text-red-400">
            Error loading articles: {error}
          </p>
        </div>
      </div>
    );
  }

  // Common pagination button styles
  const pageBtnClasses =
    "inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Title Header */}
      <header className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 dark:text-white sm:text-4xl">
          Latest Articles
        </h1>
        <p className="mt-2 text-md text-gray-600 dark:text-slate-400">
          Deep dives, tutorials, and ecosystem updates from our engineering
          team.
        </p>
      </header>

      {/* Dynamic Responsive Post Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      {/* Modernized Pagination Controls */}
      <footer className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-slate-800">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className={pageBtnClasses}
        >
          ← Previous
        </button>

        <span className="text-sm font-medium text-gray-600 dark:text-slate-400">
          Page <span className="text-gray-900 dark:text-white">{page}</span> of{" "}
          {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
          className={pageBtnClasses}
        >
          Next →
        </button>
      </footer>
    </div>
  );
}
