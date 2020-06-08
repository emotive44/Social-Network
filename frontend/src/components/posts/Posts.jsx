import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Pagination from '../common/Pagination';
import Card from '../common/Card';
import CardsContainer from '../common/CardsContainer';


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [countPost, setCountPost] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/posts?page=${page}`);
        
        setPosts(res.data.posts);
        setCountPost(res.data.countPost)
        setLoading(false);
      } catch(err) {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [page]);

  const fetchedPosts = posts.map(post => {
    return <Card {...post} key={post._id}/>
  });

  const prevPage = () => {
    if(page >= 2) {
      setPage(prev => prev - 1);
    } 
  }

  const nextPage = () => {
    if(page < Math.ceil(countPost / 3)) {
      setPage(prev => prev + 1);
    }
  }

  const choosedPage = (x) => {
    setPage(x);
  }

  let countOfPages = [];
  for(let i = 1; i <= Math.ceil(countPost / 3); i++ ) {
    countOfPages.push(i);
  }

  return (
    <CardsContainer fetchedData={fetchedPosts}>
      {loading && <div>Loading....</div>}

      <Pagination 
        page={page}
        prevPage={prevPage}
        nextPage={nextPage}
        choosedPage={choosedPage}
        countOfPages={countOfPages}
      />
    </CardsContainer>
  );
}

export default Posts;
