import { Link } from "react-router";

function PostCard({ post }) {
    const formattedDate = new Date(post.createdAt).toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    );

    return (
        <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <img
                src={post.coverImage}
                alt={post.title}
                className="aspect-video w-full object-cover"
            />

            <div className="space-y-4 p-6">
                <div>
                    <Link
                        to={`/posts/${post.slug}`}
                        className="text-2xl font-bold text-gray-900 transition hover:text-blue-600"
                    >
                        {post.title}
                    </Link>

                    <p className="mt-2 text-sm text-gray-500">
                        By {post.author?.name} • {formattedDate}
                    </p>
                </div>

                <p className="text-gray-600">
                    {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2">
                    {post.tags?.map(tag => (
                        <span
                            key={tag}
                            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <Link
                    to={`/posts/${post.slug}`}
                    className="inline-flex font-medium text-blue-600 hover:underline"
                >
                    Read More →
                </Link>
            </div>
        </article>
    );
}

export default PostCard;