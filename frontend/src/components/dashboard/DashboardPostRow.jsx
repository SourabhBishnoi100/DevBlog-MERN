import { Link } from "react-router";

function DashboardPostRow({ post, onDelete }) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    /* 
          Removed 'border' and 'rounded-lg'. 
          Added a hover state transition so rows light up elegantly when you mouse over them.
        */
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-4 transition-colors hover:bg-gray-50/70 dark:bg-slate-900/40 dark:hover:bg-slate-800/40">
      {/* Left Content Column */}
      <div className="space-y-1">
        <h2 className="text-base font-bold text-gray-900 line-clamp-1 dark:text-slate-100">
          {post.title}
        </h2>
        <p className="text-xs text-gray-500 dark:text-slate-400">
          Published on <time dateTime={post.createdAt}>{formattedDate}</time>
        </p>
      </div>

      {/* Right Action Controls Column */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          to={`/dashboard/posts/${post._id}/edit`}
          className="inline-flex items-center justify-center rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800 shadow-sm transition-colors hover:bg-amber-100 dark:border-amber-900/30 dark:bg-amber-950/20 dark:text-amber-400 dark:hover:bg-amber-950/40"
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(post._id)}
          className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-800 shadow-sm transition-colors hover:bg-red-100 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DashboardPostRow;
