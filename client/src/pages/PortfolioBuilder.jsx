import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const PortfolioBuilder = () => {
  const { authToken } = useAuth();
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    liveUrl: '',
    codeUrl: '',
    imageUrl: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch existing projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/portfolio/projects', {
          headers: { 'Authorization': `Bearer ${authToken}` },
        });
        const data = await response.json();
        if (response.ok) {
          setProjects(data);
        } else {
          throw new Error(data.message || 'Failed to fetch projects');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (authToken) {
      fetchProjects();
    }
  }, [authToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/portfolio/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });
      const newProject = await response.json();
      if (response.ok) {
        setProjects(prev => [newProject, ...prev]);
        setFormData({ title: '', description: '', technologies: '', liveUrl: '', codeUrl: '', imageUrl: '' }); // Reset form
      } else {
        throw new Error(newProject.message || 'Failed to add project');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Portfolio Builder</h1>
          <p className="text-lg md:text-xl mt-2">Showcase your best work to the world.</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Add Project Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200/50">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Add a New Project</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Project Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full px-4 py-3 bg-gray-50 rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" className="mt-1 block w-full px-4 py-3 bg-gray-50 rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Technologies (comma-separated)</label>
                  <input type="text" name="technologies" value={formData.technologies} onChange={handleChange} required placeholder="React, Node.js, MongoDB" className="mt-1 block w-full px-4 py-3 bg-gray-50 rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Live URL</label>
                  <input type="url" name="liveUrl" value={formData.liveUrl} onChange={handleChange} placeholder="https://..." className="mt-1 block w-full px-4 py-3 bg-gray-50 rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Code URL (GitHub)</label>
                  <input type="url" name="codeUrl" value={formData.codeUrl} onChange={handleChange} placeholder="https://github.com/..." className="mt-1 block w-full px-4 py-3 bg-gray-50 rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image URL</label>
                  <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://image-url.com/..." className="mt-1 block w-full px-4 py-3 bg-gray-50 rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors">Add Project</button>
              </form>
            </div>
          </div>

          {/* Project Gallery */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Projects</h2>
            {isLoading ? <p>Loading projects...</p> : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.length > 0 ? projects.map(project => (
                  <div key={project._id} className="bg-white rounded-xl shadow-lg overflow-hidden group border border-gray-200/50 transform hover:-translate-y-2 transition-transform duration-300">
                    <img src={project.imageUrl || 'https://via.placeholder.com/400x250/E0E7FF/818CF8?text=Project'} alt={project.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map(tech => <span key={tech} className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{tech}</span>)}
                      </div>
                      <p className="text-gray-600 mb-4 h-24 overflow-y-auto">{project.description}</p>
                      <div className="flex justify-between mt-4">
                        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold hover:underline">Live Demo</a>}
                        {project.codeUrl && <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 font-semibold hover:underline">Source Code</a>}
                      </div>
                    </div>
                  </div>
                )) : <p className="md:col-span-2 text-gray-500">You haven't added any projects yet. Use the form to get started!</p>}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PortfolioBuilder;