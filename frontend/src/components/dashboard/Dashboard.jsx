import React, { useState } from 'react';
import DashboardSection from './DashboardSection';
import './Dashboard.scss';

import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../../store/actions/alert-action';

const baseUrl = 'http://localhost:5000/api/v1/';


const Dashboard = ({ setAlert }) => {
  const [usersCount, setUsersCount] = useState(0);

  const getUsersCount = async (from) => {
    try {
      const res = await axios.get(baseUrl + `admin/users?${from && `days=${from}`}`);
      
      setUsersCount(res.data.usersCount);
    } catch (err) {
      setAlert(err.response.data.message, 'danger');
    }
  }

  return (
    <section className='dashboard'>
      <DashboardSection 
        title='Users'
        usersCount={usersCount}
        getUsersCount={getUsersCount}
      />
      <DashboardSection 
        title='Posts'
      />
    </section>
  );
}

export default connect(null, { setAlert })(Dashboard);
