import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { LoadingSpinner } from './LoadingSpinner.tsx';

const PrivateRoutes = () => {
  const { isLoading, currentUser } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (currentUser?.role === 'mentor' && !currentUser.mentor_profile) {
    return <Navigate to="/signup/mentor" />;
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
