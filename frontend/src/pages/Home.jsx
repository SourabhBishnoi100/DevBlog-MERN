import { useEffect, useState } from "react";
import { getPosts } from "../api/posts.js";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(()=>{
    async function loadPosts() {
      console.log("useEffect is run")
      try{
        console.log("Loading Posts");
        const data = await getPosts(2);
        setPosts(data.data);
      }
      catch(error){
        setError(error.message);
      }
      finally{
        setLoading(false);
      }
    }
    loadPosts();
  }, []);


  if (loading){
    return <p>loading...</p>;
  }

  if(error){
    return <p>{error}</p>;
  }

  return(
    <>
    {posts.map(post =>(
      <article key={post._id}>
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
      </article>
    ))}
    </>
  )
}