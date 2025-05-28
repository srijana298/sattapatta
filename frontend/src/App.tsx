import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Messages from './pages/Messages/Messages';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './components/AuthContext';
import { Toaster } from 'react-hot-toast';
import Listings from './pages/CreateListing';
import MyPosts from './pages/MyPosts';
import Matches from './pages/Matches';
import Profile from './pages/Profile';
import TutorMultiStepForm from './pages/TutorSignupForm';
import PrivateRoutes from './components/PrivateRoute';
import MentorBookingUI from './pages/Booking';
import BookingDetailsPage from './pages/BookingDetails';
import Dashboard from './pages/admin/pages/Dashboard';
import Layout from './pages/admin/components/Layout';
import Mentors from './pages/admin/pages/Mentors';
import MentorDetail from './pages/admin/pages/MentorDetail';
import DashboardLayout from './layout/DashboardLayout';
import DashboardOverview from './components/dashboard/DashboardOverview';
import BookingsSection from './components/dashboard/BookingsSection';
import MessagesSection from './components/dashboard/MessagesSection';
import ReviewsSection from './components/dashboard/ReviewsSection';
import ProfileSection from './components/dashboard/ProfileSection';

const client = new QueryClient();
function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <Toaster position="top-right" reverseOrder={false} />

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="signup/mentor" element={<TutorMultiStepForm />} />
            <Route path="/admin" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="mentors" element={<Mentors />} />
              <Route path="mentors/:id" element={<MentorDetail />} />
            </Route>
            <Route path="/" element={<PrivateRoutes />}>
              <Route path="" element={<Home />} />
              <Route path="my-bookings" element={<MyPosts />} />
              <Route path="messages/*" element={<Messages />} />
              <Route path="my-bookings/:id" element={<BookingDetailsPage />} />
              <Route path="dashboard" element={<DashboardLayout/>}>
                <Route path="" element={<DashboardOverview/>} />
                <Route path="overview" element={<DashboardOverview/>} />
                <Route path="bookings" element={<BookingsSection/>} />
                <Route path="messages/*" element={<MessagesSection/>} />
                <Route path="reviews" element={<ReviewsSection/>} />
                <Route path="profile" element={<ProfileSection/>} />
              </Route>
              <Route path="matches" element={<Matches />} />
              <Route path="mentors/:id" element={<Profile/>} />
              <Route path="send-booking-request" element={<MentorBookingUI />} />
              <Route path="submit-request" element={<Listings />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
