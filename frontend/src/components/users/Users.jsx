import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Users.scss';

import Card from '../common/Card';
import Pagination from '../common/Pagination';


const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [countPost, setCountPost] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/users?page=${page}`);
        
        setUsers(res.data.users);
        setCountPost(res.data.countPost)
        setLoading(false);
      } catch(err) {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [page]);

  const fetchedUsers = users.map(user => {
    return <Card {...user} key={user._id}/>
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
    <section className="users">
      {loading && <div>Loading....</div>}

      <Pagination 
        page={page}
        prevPage={prevPage}
        nextPage={nextPage}
        choosedPage={choosedPage}
        countOfPages={countOfPages}
      />
      <div className="users-wrapper"> {fetchedUsers} </div>
    </section>
  );
}

export default Users;
