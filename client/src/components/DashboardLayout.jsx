import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import ByteBuddyWidget from './ByteBuddyWidget';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-white flex">
      <Sidebar />
      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col pt-16 lg:pt-0 overflow-x-hidden">
        <Outlet />
      </main>
      <ByteBuddyWidget />
    </div>
  );
};

export default DashboardLayout;
