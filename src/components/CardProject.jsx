import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const [showIframe, setShowIframe] = useState(false);
  
  // Handle kasus ketika ProjectLink kosong
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      console.log("ProjectLink kosong");
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };
  
  const handleDetails = (e) => {
    if (!id) {
      console.log("ID kosong");
      e.preventDefault();
      alert("Project details are not available");
    }
  };
  

  return (
    <div className="group relative w-full">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
        <div className="relative p-5 z-10">
          {id ? (
            <Link
              to={`/project/${id}`}
              onClick={handleDetails}
              className="text-4xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4 cursor-pointer hover:underline"
            >
              {Title}
            </Link>
          ) : (
            <h3 className="text-4xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
              {Title}
            </h3>
          )}
          <div className="relative overflow-hidden rounded-lg aspect-[16/9] bg-black">
            {showIframe && ProjectLink ? (
              <iframe
                src={ProjectLink}
                title="Live Website"
                className="w-full h-full rounded-lg"
                style={{ border: 'none' }}
                allowFullScreen
              />
            ) : (
              <img
                src={Img}
                alt={Title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            )}
            {ProjectLink && (
              <button
                onClick={() => setShowIframe((prev) => !prev)}
                className="absolute bottom-2 right-2 bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600 text-xs"
              >
                {showIframe ? "Hide Live Website" : "Show Live Website"}
              </button>
            )}
          </div>
          
          <div className="mt-4 space-y-3">
            <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-2">
              {Description}
            </p>
            
            <div className="pt-4 flex items-center justify-between">
              {ProjectLink ? (
                <a
                href={ProjectLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  <span className="text-sm font-medium">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-gray-500 text-sm"></span>
              )}
              
     

              {id ? (
                <Link
                  to={`/project/${id}`}
                  onClick={handleDetails}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <span className="text-sm font-medium">Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-gray-500 text-sm">Details Not Available</span>
              )}
            </div>
          </div>
          
          <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;