import React, { useState, useEffect } from 'react';
import './DashboardSection.scss';


const DashboardSection = ({ title, usersCount, getUsersCount }) => {
  const [period, setPeriod] = useState('Total');

  useEffect(() => {
    getUsersCount && getUsersCount();
  },[]);

  const getDaily = () => {
    getUsersCount && getUsersCount(1);
    setPeriod('Daily');
  }

  const getWeekly = () => {
    getUsersCount && getUsersCount(7);
    setPeriod('Weekly');
  }

  const getMonthly = () => {
    getUsersCount && getUsersCount(30);
    setPeriod('Monthly');
  }

  const getTotal = () => {
    getUsersCount && getUsersCount();
    setPeriod('Total');
  }

  return (
    <section className='container-dashboard'>
      <div>
        <ul>
          <li onClick={getDaily}>Daily</li>
          <li onClick={getWeekly}>Weekly</li>
          <li onClick={getMonthly}>Monthly</li>
          <li onClick={getTotal}>Total</li>
        </ul>
        <div className='total-count'>
          <h3>{usersCount}</h3>
          <p>{period} {title === 'Users' ? 'Register' : 'Created'} {title}</p>
        </div>
      </div>
      <p className='title'>{title.toUpperCase()}</p>
    </section>
  );
}

export default DashboardSection;
