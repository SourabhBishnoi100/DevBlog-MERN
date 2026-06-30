import { useEffect, useState } from "react";
import { getPosts } from "../api/posts.js";
import PostCard from "../components/posts/PostCard.jsx";
import Spinner from "../components/ui/Spinner.jsx";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPosts() {
      console.log("useEffect is run")
      try {
        console.log("Loading Posts");
        const response = await getPosts(2);
        setPosts(response.data);
      }
      catch (error) {
        setError(error.message);
      }
      finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);


  if (loading) {
    return <Spinner/>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8">
      {posts.map(post => (
        <PostCard
          key={post._id}
          post={post}
        />
      ))}
    </div>
  )
}