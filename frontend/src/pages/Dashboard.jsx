import { useEffect, useState } from "react";

import { Link } from "react-router";

import { getMyPosts } from "../api/posts";

import { useAuth } from "../context/AuthContext";

import Spinner from "../components/ui/Spinner";

import DashboardPostRow from "../components/dashboard/DashboardPostRow";

function Dashboard() {
    const { auth } = useAuth();

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

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <p className="text-center text-red-600">
                {error}
            </p>
        );
    }

    return (
        <div className="mx-auto max-w-5xl p-6">

            <div className="mb-8 flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold">
                        Welcome, {auth.user?.name}
                    </h1>

                    <p className="text-gray-600">
                        Manage your blog posts.
                    </p>
                </div>

                <Link
                    to="/dashboard/posts/new"
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    Create New Post
                </Link>

            </div>

            {posts.length === 0 ? (
                <div className="rounded-lg border p-8 text-center">
                    <h2 className="mb-2 text-xl font-semibold">
                        No posts yet
                    </h2>

                    <p className="text-gray-500">
                        Create your first blog post.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <DashboardPostRow
                            key={post._id}
                            post={post}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}

export default Dashboard;