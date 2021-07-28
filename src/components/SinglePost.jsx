import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SinglePost = ({ posts, blog_slug }) => {
    const { post_slug } = useParams();
    console.log(post_slug)
    const [post, setPost] = useState([]);

    useEffect(() => {
        (async () => {
            const post = await _fetchSinglePost();
            setPost(post)
        })();
    }, [setPost]);

    const _fetchSinglePost = async () => {
        const url = `http://127.0.0.1:3000/${blog_slug}/${post_slug}`;
        const response = await fetch(url).then(response => response.json());
        return response;
    }
    return (
        <>
        <h2>{post.post_name}</h2>
        <p>{post.post_content}</p>
        </>
    )
}

export default SinglePost;