import {Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import ResumeUpload from './pages/ResumeUpload';
import PostGigForm from './pages/PostGigForm';
import AdminDashboard from './pages/admin/dashboard';
import Prepare from './pages/Prepare';
import Opportunities from './pages/Oppurtunities';
import Participate from './pages/Participate';
import ProfileCreate from './pages/ProfileCreate';
import InterviewPrep from './pages/InterviewPrep';
import Gigs from './pages/admin/Gigs';
import Navbar from './components/Navbar'; 
import AuthCallback from './components/AuthCallback';
import { useAuth } from './context/AuthContext';
import PortfolioBuilder from './pages/PortfolioBuilder'; 


function App() {
  const { isLoading } = useAuth(); // <-- Get the loading state

  // Show a loading spinner while the app is checking for a token
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  return (
    
    <div>
      <Navbar />
      
      
      
      
      
      

      <main className="pt-20"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/resume-upload" element={<ResumeUpload />} />
          <Route path="/post-gig" element={<PostGigForm />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/prepare" element={<Prepare />} />
          <Route path="/participate" element={<Participate/>} />
          <Route path="/oppurtunities" element={<Opportunities/>} />
          <Route path="/profile-create" element={<ProfileCreate/>} />
          <Route path="/interview-prep" element={<InterviewPrep/>} />
          <Route path="/admin/gigs" element={<Gigs />} />
          <Route path="/portfolio-builder" element={<PortfolioBuilder />} />
                  
                
        </Routes>
      </main>
    </div>
  );
}

export default App;