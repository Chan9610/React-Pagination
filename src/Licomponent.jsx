import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Licomponent() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts/")
            .then((result) => {
                setPosts(result.data);
            });
    }, []);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);


    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <h1>Pagination</h1>
            <div>
                {currentPosts.map((item, index) => (
                    <div key={index}>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                    </div>
                ))}
            </div>
            <div>
                {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map(number => (
                    <button key={number} onClick={() => paginate(number + 1)}>
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Licomponent;
