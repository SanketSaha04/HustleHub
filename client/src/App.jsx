import { Routes, Route, useLocation } from 'react-router-dom';
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
import FreelanceProjects from './pages/FreelanceProjects';
import Hackathons from './pages/Hackathons';
import MentorshipProgram from './pages/MentorshipProgram';
import Challenges from './pages/Challenges';
import AdminLogin from './pages/admin/AdminLogin'; // Import AdminLogin
import MyProfile from './pages/MyProfile';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import Contracts from './pages/admin/Contracts';
import Reports from './pages/admin/Reports';
import Notifications from './pages/Notifications';
import ActiveJob from './pages/ActiveJob';

function App() {
  const { isLoading } = useAuth();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      {!isAdminRoute && <Navbar />}
      <main className={!isAdminRoute ? "pt-20" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/resume-upload" element={<ResumeUpload />} />
          <Route path="/post-gig" element={<PostGigForm />} />
          <Route path="/admin" element={<AdminLogin />} /> {/* Admin root is now the login page */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/prepare" element={<Prepare />} />
          <Route path="/participate" element={<Participate />} />
          <Route path="/oppurtunities" element={<Opportunities />} />
          <Route path="/profile-create" element={<ProfileCreate />} />
          <Route path="/interview-prep" element={<InterviewPrep />} />
          <Route path="/admin/gigs" element={<Gigs />} />
          <Route path="/portfolio-builder" element={<PortfolioBuilder />} />
          <Route path="/freelance-projects" element={<FreelanceProjects />} />
          <Route path="/hackathons" element={<Hackathons />} />
          <Route path="/mentorship-program" element={<MentorshipProgram />} />
          <Route path="/my-profile" element={<MyProfile />} /> 
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/privacy" element={<PrivacyPolicy />} /> {/* Add Privacy Route */}
          <Route path="/terms" element={<TermsAndConditions />} /> {/* Add Terms Route */}
          <Route path="/admin/contracts" element={<Contracts/>} /> {/* Add Contracts Route */}
          <Route path="/admin/reports" element={<Reports/>} /> {/* Add Reports Route */}
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/job/:contractId" element={<ActiveJob />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;