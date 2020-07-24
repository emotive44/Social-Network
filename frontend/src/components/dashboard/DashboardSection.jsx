import React, { useState, useEffect } from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';
import './DashboardSection.scss';


const DashboardSection = ({ 
  pie,
  data,
  title, 
  diagram,
  usersCount, 
  postsCount,
  getUsersCount,
  getPostsCount,
}) => {
  const [period, setPeriod] = useState('Total');

  useEffect(() => {
    getUsersCount && getUsersCount();
    getPostsCount && getPostsCount();
  },[]);

  const getDaily = () => {
    getUsersCount && getUsersCount(1);
    getPostsCount && getPostsCount(1);
    setPeriod('Daily');
  }

  const getWeekly = () => {
    getUsersCount && getUsersCount(7);
    getPostsCount && getPostsCount(7);
    setPeriod('Weekly');
  }

  const getMonthly = () => {
    getUsersCount && getUsersCount(30);
    getPostsCount && getPostsCount(30);
    setPeriod('Monthly');
  }

  const getTotal = () => {
    getUsersCount && getUsersCount();
    getPostsCount && getPostsCount();
    setPeriod('Total');
  }

  return (
    <section className='container-dashboard' style={diagram ? {position: 'relative'} : {}}>
      {diagram ?
        pie ? <Pie data={data} width={120} height={40}/> : <Doughnut data={data} width={120} height={40} /> : 
        <div>
          <ul>
            <li onClick={getDaily}>Daily</li>
            <li onClick={getWeekly}>Weekly</li>
            <li onClick={getMonthly}>Monthly</li>
            <li onClick={getTotal}>Total</li>
          </ul>
          <div className='total-count'>
            <h3>{usersCount >= 0 ? usersCount : postsCount}</h3>
            <p>{period} {title === 'Users' ? 'Register' : 'Created'} {title}</p>
          </div>
        </div>
      }
      <p 
        className='title'
        style={diagram ? {position: 'absolute', right: '-14rem'} : {}}
      >
        {title.toUpperCase()}
      </p>
    </section>
  );
}

export default DashboardSection;
