import { Route, Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BlogPosts from './BlogPosts';
import Container from 'react-bootstrap/Container'

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const history = useHistory();

    useEffect(() => {
        (async () => {
            const blogs = await _fetchBlogs();
            setBlogs(blogs);
        })();
    }, [setBlogs]);

    const _fetchBlogs = async () => {
        const url = 'http://127.0.0.1:3000/';
        const response = await fetch(url).then(response => response.json());
        return response;
    }

    return (
        <>
            {!!blogs.length ? (
                <>
                    <Route exact path="/">
                        <Container>
                            <div className="blog"> 
                                {blogs.map((blog, index) => (
                                    <>
                                        <div key={index} className="col">
                                            <h2>{blog.blog_name}</h2>
                                            <p>Written by {blog.blog_author}</p>
                                            <Link to={`/blog/${blog.slug}`}> Explore Blog</Link>
                                        </div>

                                    </>

                                ))}
                                </div>
                        </Container>
                    </Route>
                    <Route path="/blog/:slug">
                        <BlogPosts
                            blogList={blogs}
                        />
                    </Route>

                </>
            ) : (
                <h2>Loading blogs...</h2>
            )}
        </>
    )
}

export default BlogList;