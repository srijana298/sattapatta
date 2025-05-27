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
import MentorDashboard from './pages/Mentor/Dashboard';
import MentorBookingUI from './pages/Booking';
import BookingDetailsPage from './pages/BookingDetails';
import Dashboard from './pages/admin/pages/Dashboard';
import Layout from './pages/admin/components/Layout';
import Mentors from './pages/admin/pages/Mentors';
import MentorDetail from './pages/admin/pages/MentorDetail';
import { ThemeProvider } from './pages/admin/context/ThemeContext';

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
              <Route path="bookings/:id" element={<BookingDetailsPage />} />
              <Route path="my-bookings" element={<MyPosts />} />
              <Route path="messages/*" element={<Messages />} />
              <Route path="booking" element={<BookingDetailsPage />} />
              <Route path="matches" element={<Matches />} />
              <Route path="/mentors/:id" element={<Profile/>} />
              <Route path="send-booking-request" element={<MentorBookingUI />} />
              <Route path="mentor-dashboard" element={<MentorDashboard />} />
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
