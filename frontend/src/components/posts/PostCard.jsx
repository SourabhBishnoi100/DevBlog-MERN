import { Link } from "react-router";

function PostCard({ post }) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900 dark:shadow-slate-950/40">
      {/* Image Container with Hover Scale */}
      <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-slate-800">
        <img
          src={post.coverImage}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Post Metadata & Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="space-y-3">
          {/* Author & Date Metadata Row */}
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-slate-400">
            <span>{post.author?.name}</span>
            <span>•</span>
            <time dateTime={post.createdAt}>{formattedDate}</time>
          </div>

          {/* Article Title Linked */}
          <Link
            to={`/posts/${post.slug}`}
            className="block group-hover:text-blue-600 dark:group-hover:text-blue-400"
          >
            <h2 className="text-xl font-bold text-gray-900 transition-colors line-clamp-2 dark:text-slate-100">
              {post.title}
            </h2>
          </Link>

          {/* Excerpt Summary Text */}
          <p className="text-sm leading-relaxed text-gray-600 line-clamp-3 dark:text-slate-400">
            {post.excerpt}
          </p>
        </div>

        {/* Tags and CTA Block */}
        <div className="mt-6 space-y-4">
          {/* Tags Pill List */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Read More Divider & CTA Link */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-slate-800">
            <Link
              to={`/posts/${post.slug}`}
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300"
            >
              Read Article
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
