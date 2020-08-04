import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../common/Card';

const usePagination = (collection, search) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [countArticles, setCountArticles] = useState(0);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setErr(null);

        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}${collection}?page=${page}&user=${search}`
        );

        setCountArticles(res.data.countPost);
        setData(res.data[collection]);
        setLoading(false);
      } catch (err) {
        setErr(err.response.data.message);
        setCountArticles(1);
        setLoading(false);
      }
    };
    fetchData();
  }, [page, collection, search]);

  let fetchedData;
  if (err) {
    fetchedData = (
      <div style={{ gridColumn: 'span 3', color: 'tomato' }}>{err}</div>
    );
  } else {
    fetchedData = data.map((x) => {
      return <Card {...x} key={x._id} />;
    });
  }

  const prevPage = () => {
    if (page >= 2) {
      setPage((prev) => prev - 1);
    }
  };

  const nextPage = () => {
    if (page < Math.ceil(countArticles / 5)) {
      setPage((prev) => prev + 1);
    }
  };

  const choosedPage = (x) => {
    setPage(x);
  };

  const countOfPages = [];
  for (let i = 1; i <= Math.ceil(countArticles / 5); i++) {
    countOfPages.push(i);
  }

  return {
    page,
    loading,
    fetchedData,
    countOfPages,
    prevPage,
    nextPage,
    choosedPage,
  };
};

export default usePagination;
