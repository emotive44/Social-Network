import React from 'react';
import './DashboardSection.scss';


const DashboardSection = () => {
  return (
    <section className='container-dashboard'>
      <div>
        <ul>
          <li>Daily</li>
          <li>Weekly</li>
          <li>Monthly</li>
          <li>Total</li>
        </ul>
        <div className='total-count'>
          <h3>1290</h3>
          <p>Total Register Users</p>
        </div>
      </div>
      <p className='tittle'>USERS</p>
    </section>
  );
}

export default DashboardSection;
