const Footer = () => {
  return (
    <footer className=" border-t border-indigo-200 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Social */}
        <div>
          <div className="flex items-center gap-2 text-lg font-semibold mb-4">
            <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm">↗</div>
            <span>
              <span className="text-indigo-600">Hustle</span>
              <span className="text-amber-500">Hub</span>
            </span>
          </div>
          <p className="font-medium mb-2 text-indigo-800">Connect with us</p>
          <div className="flex gap-3 text-indigo-600 text-xl">
            <a href="#" className="hover:text-indigo-800 transition-colors"><i className="fab fa-facebook-square"></i></a>
            <a href="#" className="hover:text-indigo-800 transition-colors"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-indigo-800 transition-colors"><i className="fab fa-x-twitter"></i></a>
            <a href="#" className="hover:text-indigo-800 transition-colors"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>

        {/* First Column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-medium text-indigo-800 mb-1">Company</h4>
          <a href="#" className="hover:text-indigo-600 transition-colors">About us</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Careers</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Employer home</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Sitemap</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Credits</a>
        </div>

        {/* Second Column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-medium text-indigo-800 mb-1">Support</h4>
          <a href="#" className="hover:text-indigo-600 transition-colors">Help center</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Summons/Notices</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Grievances</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Report issue</a>
        </div>

        {/* Third Column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-medium text-indigo-800 mb-1">Legal</h4>
          <a href="#" className="hover:text-indigo-600 transition-colors">Privacy policy</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Terms & conditions</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Fraud alert</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Trust & safety</a>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-indigo-200 py-6 text-center text-gray-600">
        <p>© {new Date().getFullYear()} HustleHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;