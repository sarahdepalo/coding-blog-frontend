import { Route, Link, useHistory, useRouteMatch, Switch } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SinglePost from './SinglePost';

const BlogPosts = ({ blogList }) => {
    const { slug } = useParams();
    const blog = blogList.find((blog) => {
        return blog.slug === slug ? blog : null;
    })

    const [posts, setPosts] = useState([]);

    const [singlePost, setSinglePost] = useState(false)

    useEffect(() => {
        (async () => {
            const posts = await _fetchPosts();
            setPosts(posts);
        })();
    }, [setPosts]);

    const _fetchPosts = async () => {
        const url = `http://127.0.0.1:3000/${blog.slug}`;
        const response = await fetch(url).then(response => response.json());
        return response;
    }


    const _handleClick = () => {
        setSinglePost(true);
        console.log('SINGLE POST IS', singlePost)

    }

    const _redirect = () => {
        setSinglePost(false);
        history.push(`${url}`)
    }

    const history = useHistory();

    window.onpopstate = function(event) {
        window.location.reload();
    };

    const { url } = useRouteMatch();
    console.log('URL', url)
    return <>
        <h2 className="blogTitle">{blog.blog_name}</h2>
        <p className="blogAuthor">{blog.blog_author}</p>
        {!!posts.length ? (
            <>
                <div className={singlePost ? 'hidden' : 'blog'}>
                    {posts.map((post, index) => (
                        <div key={index} className="col">
                            <h3>{post.post_name}</h3>
                            <p className="blogContentOverflow">{post.post_content}</p>
                            <Link to={`${url}/${post.post_slug}`} onClick={_handleClick}>Read More</Link>
                        </div>

                    ))}
                </div>
                <div className="buttonContainer">
                    <Link to="/" className="goBack">Go back to all Blogs</Link>
                </div>
                <Switch>
                    <Route exact path="/blog/:slug/:post_slug">
                        <SinglePost
                            posts={posts}
                            blog_slug={blog.slug}
                        />
                        <button type="button" className="goBack" onClick={_redirect}>Go Back to the Blog</button>
                    </Route>
                </Switch>
            </>
        ) : (
            <h2>Loading Posts</h2>
        )}
    </>
}

export default BlogPosts;