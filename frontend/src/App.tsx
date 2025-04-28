import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Messages from './pages/Message';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './components/AuthContext';
import { Toaster } from 'react-hot-toast';
import Admin from './pages/Admin';
import Listings from './pages/CreateListing';
import MyPosts from './pages/MyPosts';
import Matches from './pages/Matches';

const client = new QueryClient();
function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/my-posts" element={<MyPosts />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/submit-request" element={<Listings />} />
            <Route path="/admin/*" element={<Admin />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
