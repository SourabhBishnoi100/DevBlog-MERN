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
      console.log("useEffect is run")
      try {
        console.log("Loading Posts");
        const response = await getPosts(page);
        setPosts(response.data);
        setTotalPages(response.totalPages);

        if (page !== response.currentPage) {
          setPage(response.currentPage);
          return;
        }
      }
      catch (error) {
        setError(error.message);
      }
      finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, [page]);


  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="mx-auto max-w-5xl p-6">

      <div className="grid gap-6">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">

        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>


  )
}