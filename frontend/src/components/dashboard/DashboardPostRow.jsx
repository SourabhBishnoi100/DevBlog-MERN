import { Link } from "react-router";

function DashboardPostRow({ post }) {
    return (
        <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
                <h2 className="text-lg font-semibold">
                    {post.title}
                </h2>

                <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                </p>
            </div>

            <div className="flex gap-3">
                <Link
                    to={`/dashboard/posts/${post._id}/edit`}
                    className="rounded bg-yellow-500 px-3 py-2 text-white hover:bg-yellow-600"
                >
                    Edit
                </Link>

                <button
                    className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default DashboardPostRow;