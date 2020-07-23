import React from 'react';
import DashboardSection from './DashboardSection';
import './Dashboard.scss';


const Dashboard = () => {
  return (
    <section className='dashboard'>
      <DashboardSection />
      <DashboardSection />
      <DashboardSection />
      <DashboardSection />
    </section>
  );
}

export default Dashboard;