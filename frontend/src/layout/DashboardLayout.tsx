import React from 'react';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { Navigate, Outlet} from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import toast from 'react-hot-toast';

const DashboardLayout: React.FC = () => {
  const { currentUser } = useAuth();

  if (currentUser?.role !== 'mentor') {
    toast.error('You do not have access to this page. Please log in as a mentor.');
    return <Navigate to="/" />;
  }

  if (currentUser.role === "mentor" && currentUser.mentor_profile?.status !== "approved") {
    toast.error('Your mentor profile is not approved yet. Please wait for approval.');
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden md:flex">
        <DashboardSidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
