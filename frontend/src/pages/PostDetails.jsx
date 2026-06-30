import React from 'react'
import { useEffect } from 'react'
import { getPost } from '../api/posts'
import { useParams } from 'react-router'
import { useState } from 'react'
import Spinner from '../components/ui/Spinner'

const PostDetails = () => {

  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await getPost(slug);
        setPost(response.data);
      }
      catch (err) {
        setError(err.message);
      }
      finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug])

  if (loading) return <Spinner/>;

  if (error) return <p>{error}</p>;

  if (!post) return <p>Post not found.</p>;

    return (
      <article>
        <h1>{post.title}</h1>

        <img
          src={post.coverImage}
          alt={post.title}
        />

        <p>{post.author?.name}</p>

        <div>{post.content}</div>
      </article>
    );
}

export default PostDetails