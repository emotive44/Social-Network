import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../common/Card';


const usePagination = (collection) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [countArticles, setCountArticles] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/${collection}?page=${page}`);
        
        setCountArticles(res.data.countPost);
        setData(res.data[collection]);
        setLoading(false);
      } catch(err) {
        setLoading(false);
      }
    }
    fetchData();
  }, [page, collection]);


  const fetchedData = data.map(x => {
    return <Card {...x} key={x._id}/>
  });

  const prevPage = () => {
    if(page >= 2) {
      setPage(prev => prev - 1);
    } 
  }

  const nextPage = () => {
    if(page < Math.ceil(countArticles / 3)) {
      setPage(prev => prev + 1);
    }
  }

  const choosedPage = (x) => {
    setPage(x);
  }

  let countOfPages = [];
  for(let i = 1; i <= Math.ceil(countArticles / 3); i++ ) {
    countOfPages.push(i);
  }

  return { page, loading, fetchedData, countOfPages, prevPage, nextPage, choosedPage}
}

export default usePagination;