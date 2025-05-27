import React from 'react';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { Outlet } from 'react-router-dom';


const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden md:flex">
        <DashboardSidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="mx-auto max-w-7xl"><Outlet /></div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
