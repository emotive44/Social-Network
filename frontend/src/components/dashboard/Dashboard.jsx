import React, { useState, useEffect } from 'react';
import DashboardSection from './DashboardSection';
import './Dashboard.scss';

import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../../store/actions/alert-action';

const baseUrl = 'http://localhost:5000/api/v1/';


const Dashboard = ({ setAlert }) => {
  const [usersCount, setUsersCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [fetchingUsersData, setFetchingUsersData] = useState([]);
  const [fetchingPostsData, setFetchingPostsData] = useState([]);

  useEffect(() => {
    getPostsImage();
    getUsersAvatar();
  },[]);

  const usersData =  {
    datasets: [{
        data: fetchingUsersData,
        backgroundColor: [
          '#5499C7',
          '#D4E6F1',
        ]
    }],
    labels: [
        'Users with own avatar',
        'Users with default avatar'
    ]
  }

  const postsData = {
    datasets: [{
        data: fetchingPostsData,
        backgroundColor: [
          '#EC7063',
          '#F5B7B1',
        ]
    }],
    labels: [
        'Posts with image',
        'Posts without image'
    ]
  }

  const getUsersCount = async (from) => {
    try {
      const res = await axios.get(baseUrl + `admin/users?${from && `days=${from}`}`);
      
      setUsersCount(res.data.usersCount);
    } catch (err) {
      setAlert(err.response.data.message, 'danger');
    }
  }

  const getPostsCount = async (from) => {
    try {
      const res = await axios.get(baseUrl + `admin/posts?${from && `days=${from}`}`);
      
      setPostsCount(res.data.postsCount);
    } catch (err) {
      setAlert(err.response.data.message, 'danger');
    }
  }

  const getUsersAvatar = async () => {
    try {
      const res = await axios.get(baseUrl + 'admin/users-avatar');
      
      setFetchingUsersData(res.data);
    } catch (err) {
      setAlert(err.response.data.message, 'danger');
    }
  }

  const getPostsImage = async () => {
    try {
      const res = await axios.get(baseUrl + 'admin/posts-image');
      
      setFetchingPostsData(res.data);
    } catch (err) {
      setAlert(err.response.data.message, 'danger');
    }
  }

  return (
    <section className='dashboard'>
      <DashboardSection title='Users' usersCount={usersCount} getDataCount={getUsersCount} />
      <DashboardSection title='Posts' postsCount={postsCount} getDataCount={getPostsCount} />
      <DashboardSection diagram title='Users' data={usersData} />
      <DashboardSection diagram pie title='Posts'data={postsData} />
    </section>
  );
}

export default connect(null, { setAlert })(Dashboard);
