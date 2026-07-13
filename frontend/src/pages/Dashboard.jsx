import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getMyPosts, deletePost } from "../api/posts";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/ui/Spinner";
import DashboardPostRow from "../components/dashboard/DashboardPostRow";

function Dashboard() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await getMyPosts();
        setPosts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  async function handleDelete(postId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?",
    );
    if (!confirmed) return;

    try {
      await deletePost(postId);
      setPosts((currentPosts) =>
        currentPosts.filter((post) => post._id !== postId),
      );
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-xl px-4 my-12 text-center">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-950/20">
          <p className="text-sm font-medium text-red-800 dark:text-red-400">
            Dashboard Error: {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-12">
      {/* Top Dashboard Header Action Bar */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-6 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 dark:text-white">
            Welcome, {user?.name}
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
            Manage, edit, or check the statuses of your personal articles.
          </p>
        </div>

        <Link
          to="/dashboard/posts/new"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
        >
          + Create New Post
        </Link>
      </div>

      {/* Main Content Area Conditional Layout */}
      {posts.length === 0 ? (
        /* Polished Empty State Display Banner */
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white/50 p-12 text-center dark:border-slate-800 dark:bg-slate-900/20">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            ✍️
          </div>
          <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
            No articles published yet
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500 dark:text-slate-400">
            Share your engineering insights, coding tips, or tech project post
            mortems with the world.
          </p>
          <Link
            to="/dashboard/posts/new"
            className="mt-5 inline-flex text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            Write your first article →
          </Link>
        </div>
      ) : (
        /* Post Rows Collection Container */
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-slate-800/80 dark:bg-slate-900/40">
          <div className="divide-y divide-gray-200 dark:divide-slate-800">
            {posts.map((post) => (
              <DashboardPostRow
                key={post._id}
                post={post}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
