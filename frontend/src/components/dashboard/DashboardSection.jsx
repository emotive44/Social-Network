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
  getDataCount
}) => {
  const [period, setPeriod] = useState('Total');

  useEffect(() => {
    getDataCount && getDataCount();
  },[]);

  const getDaily = () => {
    getDataCount(1);
    setPeriod('Daily');
  }

  const getWeekly = () => {
    getDataCount(7);
    setPeriod('Weekly');
  }

  const getMonthly = () => {
    getDataCount(30);
    setPeriod('Monthly');
  }

  const getTotal = () => {
    getDataCount();
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
