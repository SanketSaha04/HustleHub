import React, { useEffect, useState } from 'react';

// Video Modal Component - NOW HANDLES BOTH VIDEOS AND PLAYLISTS
const VideoModal = ({ videoId, playlistId, onClose }) => {
  if (!videoId && !playlistId) return null;

  // Construct the URL based on whether it's a single video or a playlist
  const src = playlistId
    ? `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1`
    : `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg overflow-hidden shadow-2xl w-11/12 max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <div className="relative" style={{ paddingBottom: '56.25%' }}> {/* 16:9 Aspect Ratio */}
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={src}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

// Accordion Item Component
const AccordionItem = ({ category, description, videoId, playlistId, topics, isOpen, onClick, onPlayVideo }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center p-6 text-left hover:bg-indigo-50 focus:outline-none transition-colors duration-200"
      >
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{category}</h3>
          <p className="text-gray-500 mt-1">{description}</p>
        </div>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="p-6 bg-gray-50/70">
          <div className="mb-6">
            <button 
              onClick={() => onPlayVideo({ videoId, playlistId })}
              className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path></svg>
              Watch Full Course
            </button>
          </div>
          <ul className="space-y-4">
            {topics.map((topic, index) => (
              <li key={index} className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-semibold text-gray-700">{topic.name}</h4>
                <p className="text-gray-600 mt-1">{topic.details}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Main Interview Prep Page Component
const InterviewPrep = () => {
  const [prepData, setPrepData] = useState([]);
  const [openIndex, setOpenIndex] = useState(0);
  const [activeMedia, setActiveMedia] = useState({ videoId: null, playlistId: null });

  useEffect(() => {
    const fetchPrepData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/interview-prep');
        const data = await response.json();
        setPrepData(data);
      } catch (error) {
        console.error("Failed to fetch interview prep data:", error);
      }
    };
    fetchPrepData();
  }, []);

  const handleAccordionClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handlePlayVideo = ({ videoId, playlistId }) => {
    setActiveMedia({ videoId, playlistId });
  };

  return (
    <>
      <VideoModal 
        videoId={activeMedia.videoId} 
        playlistId={activeMedia.playlistId} 
        onClose={() => setActiveMedia({ videoId: null, playlistId: null })} 
      />
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Interview Preparation</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Everything you need to ace your next technical and behavioral interview.
            </p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200/50">
            {prepData.length > 0 ? (
              prepData.map((item, index) => (
                <AccordionItem
                  key={index}
                  category={item.category}
                  description={item.description}
                  videoId={item.videoId}
                  playlistId={item.playlistId}
                  topics={item.topics}
                  isOpen={openIndex === index}
                  onClick={() => handleAccordionClick(index)}
                  onPlayVideo={handlePlayVideo}
                />
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">Loading preparation topics...</div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default InterviewPrep;