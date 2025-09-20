import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resume-upload" element={<ResumeUpload />} />
        <Route path="/post-gig" element={<PostGigForm />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
         <Route path="/prepare" element={<Prepare />} />
         <Route path="/participate" element={<Participate/>} />
         <Route path="/oppurtunities" element={<Opportunities/>} />
         <Route path="/profile-create" element={<ProfileCreate/>} />
         <Route path="/interview-prep" element={<InterviewPrep/>} />
        <Route path="/admin/gigs" element={<Gigs />} />



         

         
      </Routes>
    </Router>
  );
}

export default App;