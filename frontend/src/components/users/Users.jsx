import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Users.scss';

import Card from '../common/Card';


const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/users');
        
        setUsers(res.data);
        setLoading(false);
      } catch(err) {}
    }
    fetchUsers();
  }, []);

  const fetchedUsers = users.map(user => {
    return <Card {...user} key={user._id}/>
  });

  return (
    <section className="users">
      {loading && <div>Loading....</div>}
      <div className="users-wrapper"> {fetchedUsers} </div>
    </section>
  );
}

export default Users;
